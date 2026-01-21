#!/usr/bin/env node
/**
 * Generate INSERT SQL for new vendors not in Supabase
 *
 * Usage:
 *   node scripts/generate-inserts.cjs [outscraper.csv] [supabase.csv]
 *
 * Default:
 *   Outscraper: data/Outscraper/combined-4-5-cleaned.csv
 *   Supabase:   data/potty_rows.csv
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
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Create match key
function makeKey(name, city, state) {
  return `${normalize(name)}|${normalize(city)}|${normalize(state)}`;
}

// Generate URL-friendly slug
function generateSlug(name, city, state, existingSlugs) {
  let base = `${name}-${city}-${state}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let slug = base;
  let counter = 1;
  while (existingSlugs.has(slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }
  existingSlugs.add(slug);
  return slug;
}

// Normalize phone
function normalizePhone(phone) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  const cleaned = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (cleaned.length !== 10) return phone;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

// Clean website URL
function cleanWebsite(url) {
  if (!url) return null;
  let cleaned = url.trim();
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }
  if (cleaned.startsWith('http://')) {
    cleaned = cleaned.replace('http://', 'https://');
  }
  return cleaned;
}

// Escape SQL
function sqlEscape(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Junk business names to filter out (not porta potty companies)
const JUNK_BUSINESS_PATTERNS = [
  // Big box retailers
  /^lowe'?s\b/i, /^the home depot/i, /^home depot/i, /^walmart/i, /^costco/i,
  /^menards/i, /^ace hardware/i, /^tractor supply/i, /^target\b/i, /^sam'?s club/i,

  // Travel centers / gas stations
  /^flying j/i, /^pilot\b/i, /^love'?s travel/i, /^ta travel/i, /^petro/i,
  /travel center$/i, /truck stop$/i, /^sapp bros/i, /^one9\b/i,

  // Mobile office / storage companies (not porta potty focused)
  /^willscot\b/i, /^mobile mini\b/i, /^pods\b/i,

  // General retail
  /^tsc stores/i, /^rural king/i, /^atwoods/i, /^bomgaars/i,

  // Car washes / gas stations
  /^speedway\b/i, /^shell\b/i, /^bp\b/i, /^chevron\b/i, /^exxon\b/i,
  /^circle k/i, /^7-eleven/i, /^wawa\b/i, /^sheetz\b/i, /^quiktrip/i,
  /^casey'?s/i, /^kum & go/i, /^kwik trip/i, /^holiday\b.*station/i,
];

function isJunkBusiness(name) {
  if (!name) return false;
  for (const pattern of JUNK_BUSINESS_PATTERNS) {
    if (pattern.test(name)) return true;
  }
  return false;
}

// Main
const dataDir = path.join(__dirname, '../data');
const outscraperFile = process.argv[2] || path.join(dataDir, 'Outscraper/combined-4-5-cleaned.csv');
const supabaseFile = process.argv[3] || path.join(dataDir, 'potty_rows.csv');
const outputSQL = path.join(dataDir, 'new-vendors-insert.sql');
const outputReport = path.join(dataDir, 'new-vendors-report.txt');

console.log('\n📂 Reading Supabase data...');
const supabaseContent = fs.readFileSync(supabaseFile, 'utf-8');
const supabaseLines = parseCSV(supabaseContent);
const { objects: supabaseData } = csvToObjects(supabaseLines);
console.log(`   ${supabaseData.length.toLocaleString()} existing records`);

console.log('\n📂 Reading Outscraper data...');
const outscraperContent = fs.readFileSync(outscraperFile, 'utf-8');
const outscraperLines = parseCSV(outscraperContent);
const { objects: outscraperData } = csvToObjects(outscraperLines);
console.log(`   ${outscraperData.length.toLocaleString()} records`);

// Build Supabase lookup
console.log('\n🔗 Building Supabase lookup...');
const supabaseKeys = new Set();
const existingSlugs = new Set();
for (const row of supabaseData) {
  const key = makeKey(row.business_name, row.city, row.state);
  supabaseKeys.add(key);
  if (row.slug) existingSlugs.add(row.slug);
}
console.log(`   ${supabaseKeys.size.toLocaleString()} unique existing vendors`);

// Find new vendors
console.log('\n🔍 Finding new vendors...');
const newVendors = [];
const stateCount = {};
let skippedNoLocation = 0;
let skippedJunkBusiness = 0;

for (const row of outscraperData) {
  // Skip records with empty city or state (bad data from Outscraper)
  if (!row.city || !row.state || !row.city.trim() || !row.state.trim()) {
    skippedNoLocation++;
    continue;
  }

  // Skip junk businesses (retailers, gas stations, etc.)
  if (isJunkBusiness(row.name)) {
    skippedJunkBusiness++;
    continue;
  }

  const key = makeKey(row.name, row.city, row.state);

  if (!supabaseKeys.has(key)) {
    // Generate unique slug
    const slug = generateSlug(row.name, row.city, row.state, existingSlugs);

    newVendors.push({
      business_name: row.name,
      slug: slug,
      city: row.city,
      state: row.state,
      phone: normalizePhone(row.phone),
      website: cleanWebsite(row.website),
      email: row.email || null,
      street_address: row.street || null,
      postal_code: row.postal_code || null,
      latitude: row.latitude || null,
      longitude: row.longitude || null,
      rating: row.rating || null,
      review_count: row.reviews || 0,
      photo_url: row.photo || null,
      hours: row.working_hours || null,
      facebook_url: row.company_facebook || null,
      instagram_url: row.company_instagram || null,
      linkedin_url: row.company_linkedin || null,
      twitter_url: row.company_x || null,
      description: row.website_description || null,
    });

    stateCount[row.state] = (stateCount[row.state] || 0) + 1;
  }
}

console.log(`   ${newVendors.length.toLocaleString()} NEW vendors to insert`);
if (skippedNoLocation > 0) {
  console.log(`   ${skippedNoLocation.toLocaleString()} skipped (no city/state)`);
}
if (skippedJunkBusiness > 0) {
  console.log(`   ${skippedJunkBusiness.toLocaleString()} skipped (junk business names)`);
}

// Generate SQL
console.log('\n💾 Generating SQL...');
const inserts = newVendors.map(v => {
  return `INSERT INTO potty (business_name, slug, city, state, phone, website, email, street_address, postal_code, latitude, longitude, rating, review_count, photo_url, hours, facebook_url, instagram_url, linkedin_url, twitter_url, description, scrape_status, enrich_status)
VALUES (
  ${sqlEscape(v.business_name)},
  ${sqlEscape(v.slug)},
  ${sqlEscape(v.city)},
  ${sqlEscape(v.state)},
  ${sqlEscape(v.phone)},
  ${sqlEscape(v.website)},
  ${sqlEscape(v.email)},
  ${sqlEscape(v.street_address)},
  ${sqlEscape(v.postal_code)},
  ${v.latitude || 'NULL'},
  ${v.longitude || 'NULL'},
  ${v.rating || 'NULL'},
  ${v.review_count || 0},
  ${sqlEscape(v.photo_url)},
  ${sqlEscape(v.hours)},
  ${sqlEscape(v.facebook_url)},
  ${sqlEscape(v.instagram_url)},
  ${sqlEscape(v.linkedin_url)},
  ${sqlEscape(v.twitter_url)},
  ${sqlEscape(v.description)},
  'raw',
  'pending'
);`;
});

// Split into ~10 batches (roughly 400 per batch)
const BATCH_SIZE = 400;
const batches = [];
for (let i = 0; i < inserts.length; i += BATCH_SIZE) {
  batches.push(inserts.slice(i, i + BATCH_SIZE));
}

// Write batch files with clear naming
const batchDir = path.join(dataDir, 'sql-batches');
if (!fs.existsSync(batchDir)) {
  fs.mkdirSync(batchDir, { recursive: true });
}

// Use date-based naming: pottyscrape-4-5-YYYYMMDD-batch-01.sql
const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const prefix = `pottyscrape-4-5-${dateStr}`;

console.log(`   Creating ${batches.length} batch files with prefix: ${prefix}`);

for (let i = 0; i < batches.length; i++) {
  const batchNum = i + 1;
  const batchFile = path.join(batchDir, `${prefix}-batch-${String(batchNum).padStart(2, '0')}.sql`);
  const batchContent = [
    `-- Pottyscrape 4+5 Combined - Batch ${batchNum} of ${batches.length}`,
    `-- Vendors: ${batches[i].length}`,
    `-- Generated: ${new Date().toISOString()}`,
    `-- Source: data/Outscraper/pottyscrape-4.csv + pottyscrape-5.csv (cleaned, deduplicated, filtered)`,
    '',
    'BEGIN;',
    '',
    batches[i].join('\n\n'),
    '',
    'COMMIT;',
    '',
  ].join('\n');
  fs.writeFileSync(batchFile, batchContent);
}

console.log(`   ${outputSQL}`);
console.log(`   ${batches.length} batch files in ${batchDir}`);

// Write report
const sortedStates = Object.entries(stateCount).sort((a, b) => b[1] - a[1]);
const report = [
  '='.repeat(60),
  'NEW VENDORS REPORT',
  `Generated: ${new Date().toISOString()}`,
  '='.repeat(60),
  '',
  'SUMMARY',
  '-'.repeat(40),
  `Existing Supabase records:  ${supabaseData.length.toLocaleString()}`,
  `Outscraper records:         ${outscraperData.length.toLocaleString()}`,
  `NEW vendors to insert:      ${newVendors.length.toLocaleString()}`,
  '',
  'BY STATE',
  '-'.repeat(40),
  ...sortedStates.map(([state, count]) => `${state.padEnd(20)} ${count.toLocaleString().padStart(6)}`),
  '',
  'WITH DATA',
  '-'.repeat(40),
  `With email:     ${newVendors.filter(v => v.email).length.toLocaleString()}`,
  `With website:   ${newVendors.filter(v => v.website).length.toLocaleString()}`,
  `With phone:     ${newVendors.filter(v => v.phone).length.toLocaleString()}`,
  `With rating:    ${newVendors.filter(v => v.rating).length.toLocaleString()}`,
  '',
].join('\n');

fs.writeFileSync(outputReport, report);
console.log(`   ${outputReport}`);

// Console summary
console.log('\n' + '='.repeat(50));
console.log('📊 NEW VENDORS SUMMARY');
console.log('='.repeat(50));
console.log(`Existing Supabase:    ${supabaseData.length.toLocaleString()}`);
console.log(`Outscraper total:     ${outscraperData.length.toLocaleString()}`);
console.log(`NEW to insert:        ${newVendors.length.toLocaleString()}`);
console.log('');
console.log('Top states:');
sortedStates.slice(0, 10).forEach(([state, count]) => {
  console.log(`  ${state}: ${count}`);
});
console.log('');
console.log(`Batch files: ${batches.length} (run in Supabase SQL Editor)`);
console.log('');
