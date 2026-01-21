#!/usr/bin/env node
/**
 * Merge Outscraper data into Supabase
 * - Matches by business_name + city + state
 * - Only updates email/website where currently null
 * - Generates SQL UPDATE statements
 */

const fs = require('fs');
const path = require('path');

// Parse CSV handling quoted fields
function parseCSV(content) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField);
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      currentLine.push(currentField);
      if (currentLine.length > 1 || currentLine[0] !== '') {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
      if (char === '\r') i++;
    } else if (char !== '\r') {
      currentField += char;
    }
  }

  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField);
    lines.push(currentLine);
  }

  return lines;
}

function csvToObjects(lines) {
  const headers = lines[0];
  const objects = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = lines[i][j] || '';
    }
    objects.push(obj);
  }

  return { headers, objects };
}

// Normalize for matching
function normalize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ')    // normalize whitespace
    .trim();
}

// Create match key
function makeKey(name, city, state) {
  return `${normalize(name)}|${normalize(city)}|${normalize(state)}`;
}

// Escape SQL string
function sqlEscape(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Junk URL patterns - these are NOT porta potty related
const JUNK_URL_PATTERNS = [
  // Big tech/retail
  /apple\.com/i, /amazon\.com/i, /facebook\.com\/sap/i,
  /instagram\.com\/amazon/i, /linkedin\.com\/company\/sap/i,
  /x\.com\/sap/i, /twitter\.com\/sap/i,
  /google\.com/i, /microsoft\.com/i,

  // Big box retailers
  /homedepot\.com/i, /lowes\.com/i, /walmart\.com/i,
  /target\.com/i, /costco\.com/i, /bestbuy\.com/i,
  /menards\.com/i, /acehardware\.com/i,

  // Generic/junk
  /wix\.com/i, /wixpress\.com/i, /squarespace\.com/i,
  /godaddy\.com/i, /wordpress\.com/i,
  /sentry\.io/i, /sentry-next/i,

  // Template/theme social accounts (not business accounts)
  /instagram\.com\/devcodela/i,
  /twitter\.com\/devcodela/i,
  /facebook\.com\/developer/i,
];

// Check if a URL is junk
function isJunkUrl(url) {
  if (!url || !url.trim()) return true;
  for (const pattern of JUNK_URL_PATTERNS) {
    if (pattern.test(url)) return true;
  }
  return false;
}

// Main
const dataDir = path.join(__dirname, '../data');
const supabaseFile = process.argv[2] || path.join(dataDir, 'potty_rows.csv');
const outscraperFile = process.argv[3] || path.join(dataDir, 'pottyfirst10-cleaned-new.csv');
const outputSQL = path.join(dataDir, 'merge-updates-new.sql');
const outputReport = path.join(dataDir, 'merge-report-new.txt');

console.log('\n📂 Reading Supabase data...');
const supabaseContent = fs.readFileSync(supabaseFile, 'utf-8');
const supabaseLines = parseCSV(supabaseContent);
const { objects: supabaseData } = csvToObjects(supabaseLines);
console.log(`   ${supabaseData.length.toLocaleString()} records`);

console.log('\n📂 Reading Outscraper data...');
const outscraperContent = fs.readFileSync(outscraperFile, 'utf-8');
const outscraperLines = parseCSV(outscraperContent);
const { objects: outscraperData } = csvToObjects(outscraperLines);
console.log(`   ${outscraperData.length.toLocaleString()} records`);

// Build Outscraper lookup map
console.log('\n🔗 Building lookup map...');
const outscraperMap = new Map();
for (const row of outscraperData) {
  const key = makeKey(row.name, row.city, row.state);
  if (!outscraperMap.has(key)) {
    outscraperMap.set(key, row);
  }
}
console.log(`   ${outscraperMap.size.toLocaleString()} unique keys`);

// Match and generate updates
console.log('\n🔍 Matching records...');

const stats = {
  total: supabaseData.length,
  matched: 0,
  needsEmail: 0,
  needsWebsite: 0,
  updatedEmail: 0,
  updatedWebsite: 0,
  noMatch: 0,
  alreadyComplete: 0,
};

const updates = [];
const noMatches = [];
const matches = [];

for (const supa of supabaseData) {
  const key = makeKey(supa.business_name, supa.city, supa.state);
  const outscraper = outscraperMap.get(key);

  const needsEmail = !supa.email || supa.email.trim() === '';
  const needsWebsite = !supa.website || supa.website.trim() === '';

  if (needsEmail) stats.needsEmail++;
  if (needsWebsite) stats.needsWebsite++;

  if (!outscraper) {
    stats.noMatch++;
    if (needsEmail || needsWebsite) {
      noMatches.push({
        name: supa.business_name,
        city: supa.city,
        state: supa.state,
        needsEmail,
        needsWebsite
      });
    }
    continue;
  }

  stats.matched++;

  const updateFields = [];

  // Update email if missing and Outscraper has it
  if (needsEmail && outscraper.email && outscraper.email.trim()) {
    updateFields.push(`email = ${sqlEscape(outscraper.email)}`);
    stats.updatedEmail++;
  }

  // Update website if missing and Outscraper has it (filter junk)
  if (needsWebsite && outscraper.website && !isJunkUrl(outscraper.website)) {
    updateFields.push(`website = ${sqlEscape(outscraper.website)}`);
    stats.updatedWebsite++;
  }

  // Update social URLs if missing and Outscraper has them (filter junk)
  const needsFacebook = !supa.facebook_url || supa.facebook_url.trim() === '';
  const needsInstagram = !supa.instagram_url || supa.instagram_url.trim() === '';
  const needsLinkedin = !supa.linkedin_url || supa.linkedin_url.trim() === '';
  const needsTwitter = !supa.twitter_url || supa.twitter_url.trim() === '';

  if (needsFacebook && outscraper.company_facebook && !isJunkUrl(outscraper.company_facebook)) {
    updateFields.push(`facebook_url = ${sqlEscape(outscraper.company_facebook)}`);
    stats.updatedFacebook = (stats.updatedFacebook || 0) + 1;
  }
  if (needsInstagram && outscraper.company_instagram && !isJunkUrl(outscraper.company_instagram)) {
    updateFields.push(`instagram_url = ${sqlEscape(outscraper.company_instagram)}`);
    stats.updatedInstagram = (stats.updatedInstagram || 0) + 1;
  }
  if (needsLinkedin && outscraper.company_linkedin && !isJunkUrl(outscraper.company_linkedin)) {
    updateFields.push(`linkedin_url = ${sqlEscape(outscraper.company_linkedin)}`);
    stats.updatedLinkedin = (stats.updatedLinkedin || 0) + 1;
  }
  if (needsTwitter && outscraper.company_x && !isJunkUrl(outscraper.company_x)) {
    updateFields.push(`twitter_url = ${sqlEscape(outscraper.company_x)}`);
    stats.updatedTwitter = (stats.updatedTwitter || 0) + 1;
  }

  if (updateFields.length > 0) {
    updates.push({
      id: supa.id,
      name: supa.business_name,
      city: supa.city,
      state: supa.state,
      fields: updateFields,
      sql: `UPDATE potty SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = '${supa.id}';`
    });
  } else if (!needsEmail && !needsWebsite) {
    stats.alreadyComplete++;
  }

  matches.push({
    name: supa.business_name,
    city: supa.city,
    state: supa.state,
    supaEmail: supa.email,
    supaWebsite: supa.website,
    outEmail: outscraper.email,
    outWebsite: outscraper.website,
  });
}

// Generate SQL file
console.log('\n💾 Writing SQL updates...');
const sqlContent = [
  '-- Merge Outscraper data into Supabase potty table',
  `-- Generated: ${new Date().toISOString()}`,
  `-- Updates: ${updates.length}`,
  '',
  'BEGIN;',
  '',
  ...updates.map(u => u.sql),
  '',
  'COMMIT;',
  '',
  `-- Summary: ${updates.length} records updated`,
].join('\n');

fs.writeFileSync(outputSQL, sqlContent);
console.log(`   ${outputSQL}`);

// Generate report
console.log('\n📊 Writing report...');
const report = [
  '='.repeat(60),
  'MERGE REPORT',
  `Generated: ${new Date().toISOString()}`,
  '='.repeat(60),
  '',
  'STATISTICS',
  '-'.repeat(40),
  `Total Supabase records:     ${stats.total.toLocaleString()}`,
  `Matched with Outscraper:    ${stats.matched.toLocaleString()} (${Math.round(stats.matched/stats.total*100)}%)`,
  `No match found:             ${stats.noMatch.toLocaleString()} (${Math.round(stats.noMatch/stats.total*100)}%)`,
  '',
  `Records needing email:      ${stats.needsEmail.toLocaleString()}`,
  `Records needing website:    ${stats.needsWebsite.toLocaleString()}`,
  '',
  `Emails to be updated:       ${stats.updatedEmail.toLocaleString()}`,
  `Websites to be updated:     ${stats.updatedWebsite.toLocaleString()}`,
  `Already complete:           ${stats.alreadyComplete.toLocaleString()}`,
  '',
  '='.repeat(60),
  'SAMPLE UPDATES (first 20)',
  '-'.repeat(40),
  ...updates.slice(0, 20).map(u =>
    `${u.name} (${u.city}, ${u.state})\n  → ${u.fields.join(', ')}`
  ),
  '',
  '='.repeat(60),
  'NO MATCHES NEEDING DATA (first 50)',
  '-'.repeat(40),
  ...noMatches.slice(0, 50).map(n =>
    `${n.name} (${n.city}, ${n.state}) - needs: ${[n.needsEmail ? 'email' : '', n.needsWebsite ? 'website' : ''].filter(Boolean).join(', ')}`
  ),
  '',
].join('\n');

fs.writeFileSync(outputReport, report);
console.log(`   ${outputReport}`);

// Console summary
console.log('\n' + '='.repeat(50));
console.log('📊 MERGE SUMMARY');
console.log('='.repeat(50));
console.log(`Supabase records:        ${stats.total.toLocaleString()}`);
console.log(`Matched:                 ${stats.matched.toLocaleString()} (${Math.round(stats.matched/stats.total*100)}%)`);
console.log(`No match:                ${stats.noMatch.toLocaleString()}`);
console.log('');
console.log(`Records needing email:   ${stats.needsEmail.toLocaleString()}`);
console.log(`Records needing website: ${stats.needsWebsite.toLocaleString()}`);
console.log('');
console.log(`→ Emails to update:      ${stats.updatedEmail.toLocaleString()}`);
console.log(`→ Websites to update:    ${stats.updatedWebsite.toLocaleString()}`);
console.log(`→ Facebook to update:    ${(stats.updatedFacebook || 0).toLocaleString()}`);
console.log(`→ Instagram to update:   ${(stats.updatedInstagram || 0).toLocaleString()}`);
console.log(`→ LinkedIn to update:    ${(stats.updatedLinkedin || 0).toLocaleString()}`);
console.log(`→ Twitter to update:     ${(stats.updatedTwitter || 0).toLocaleString()}`);
console.log('');
console.log(`SQL file: ${outputSQL}`);
console.log('');
console.log('✅ Run the SQL in Supabase SQL Editor to apply updates');
console.log('');
