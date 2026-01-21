#!/usr/bin/env node
/**
 * Find Duplicates in Supabase Export
 *
 * Analyzes potty-supabase.csv for duplicate listings.
 * Duplicates are identified by normalized business_name + city + state.
 *
 * Outputs:
 *   - Console report of all duplicates
 *   - data/duplicates-report.json with full details
 *   - data/duplicates-to-delete.sql to remove bad duplicates
 */

const fs = require('fs');
const path = require('path');

// Business name suffixes to remove for normalization
const SUFFIXES_TO_REMOVE = [
  // Legal entity types
  'llc', 'l.l.c.', 'l.l.c', 'inc', 'inc.', 'incorporated',
  'corp', 'corp.', 'corporation', 'co', 'co.', 'company',
  'ltd', 'ltd.', 'limited', 'lp', 'l.p.', 'llp', 'l.l.p.',
  'pllc', 'p.l.l.c.', 'pc', 'p.c.',
  // Common business terms
  'services', 'service', 'enterprises', 'enterprise',
  'solutions', 'solution', 'group', 'holdings',
  // Industry specific
  'rentals', 'rental', 'portables', 'portable',
  'sanitation', 'septic', 'restrooms', 'restroom',
  'toilets', 'toilet', 'pumping', 'disposal',
];

// Words that should be normalized
const WORD_NORMALIZATIONS = {
  '&': 'and',
  'n': 'and',
  "n'": 'and',
  'porta': 'porta',
  'potty': 'potty',
  'potties': 'potty',
  'jon': 'john',
  'johns': 'john',
  "john's": 'john',
  'jons': 'john',
};

/**
 * Normalize business name for matching
 * This is aggressive normalization to find potential duplicates
 */
function normalizeName(name) {
  if (!name) return '';

  let n = name.toLowerCase();

  // Remove punctuation except apostrophes (temporarily keep for word matching)
  n = n.replace(/[^\w\s']/g, ' ');

  // Normalize specific words
  for (const [from, to] of Object.entries(WORD_NORMALIZATIONS)) {
    n = n.replace(new RegExp(`\\b${from}\\b`, 'gi'), to);
  }

  // Remove apostrophes now
  n = n.replace(/'/g, '');

  // Split into words
  let words = n.split(/\s+/).filter(w => w.length > 0);

  // Remove common suffixes from the end
  while (words.length > 1 && SUFFIXES_TO_REMOVE.includes(words[words.length - 1])) {
    words.pop();
  }

  // Also remove from anywhere (less aggressive)
  // words = words.filter(w => !SUFFIXES_TO_REMOVE.includes(w));

  return words.join(' ').trim();
}

/**
 * Normalize city name
 */
function normalizeCity(city) {
  if (!city) return '';
  return city
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize state
 */
function normalizeState(state) {
  if (!state) return '';
  return state.toLowerCase().trim();
}

/**
 * Create a key for duplicate detection
 */
function makeKey(name, city, state) {
  return `${normalizeName(name)}|${normalizeCity(city)}|${normalizeState(state)}`;
}

/**
 * Check if a slug follows the correct format: name-city (lowercase, hyphenated)
 */
function isValidSlugFormat(slug, name, city) {
  if (!slug) return false;

  // Expected format: lowercase name + city, hyphenated
  const expectedParts = `${name} ${city}`
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');

  // Check if slug roughly matches (starts with business name)
  const slugParts = slug.toLowerCase().split('-');
  const nameParts = name.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

  // Good slugs should contain the main business name words
  let matchCount = 0;
  for (const part of nameParts.slice(0, 3)) { // Check first 3 words
    if (part.length > 2 && slug.includes(part)) {
      matchCount++;
    }
  }

  // Slug should not have weird formats like random hashes
  const hasWeirdChars = /[^a-z0-9-]/.test(slug);
  const hasTooManyDashes = (slug.match(/-/g) || []).length > 8;

  return matchCount >= 1 && !hasWeirdChars && !hasTooManyDashes;
}

/**
 * Score a record for "keepability" - higher is better
 */
function scoreRecord(record) {
  let score = 0;

  // Prefer records with more complete data
  if (record.email && record.email.trim()) score += 10;
  if (record.website && record.website.trim()) score += 10;
  if (record.phone && record.phone.trim()) score += 5;
  if (record.street_address && record.street_address.trim()) score += 5;
  if (record.rating && parseFloat(record.rating) > 0) score += 5;
  if (record.review_count && parseInt(record.review_count) > 0) score += 5;
  if (record.description && record.description.trim()) score += 3;
  if (record.photo_url && record.photo_url.trim()) score += 3;

  // Social media
  if (record.facebook_url && record.facebook_url.trim()) score += 2;
  if (record.instagram_url && record.instagram_url.trim()) score += 2;
  if (record.linkedin_url && record.linkedin_url.trim()) score += 2;
  if (record.twitter_url && record.twitter_url.trim()) score += 2;

  // Features
  if (record.has_luxury === 'true' || record.has_luxury === true) score += 1;
  if (record.has_ada === 'true' || record.has_ada === true) score += 1;
  if (record.has_trailer === 'true' || record.has_trailer === true) score += 1;
  if (record.serves_construction === 'true' || record.serves_construction === true) score += 1;
  if (record.serves_events === 'true' || record.serves_events === true) score += 1;

  // Slug format
  if (isValidSlugFormat(record.slug, record.business_name, record.city)) {
    score += 20; // Strongly prefer correct slug format
  }

  // Verified/featured flags
  if (record.verified === 'true' || record.verified === true) score += 15;
  if (record.featured === 'true' || record.featured === true) score += 10;

  // Recency (prefer newer records)
  if (record.enriched_at) score += 5;

  return score;
}

// Parse CSV properly handling quoted fields
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

// Main
const dataDir = path.join(__dirname, '../data');
const inputFile = process.argv[2] || path.join(dataDir, 'potty-supabase.csv');

console.log('\n🔍 DUPLICATE FINDER');
console.log('═'.repeat(60));
console.log(`\n📂 Reading: ${inputFile}`);

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = parseCSV(content);
const { headers, objects } = csvToObjects(lines);

console.log(`📋 Found ${objects.length.toLocaleString()} records\n`);

// Find duplicates
const groups = new Map();

for (const record of objects) {
  const key = makeKey(record.business_name, record.city, record.state);

  if (!groups.has(key)) {
    groups.set(key, []);
  }
  groups.get(key).push(record);
}

// Filter to only duplicates (more than 1 record)
const duplicates = [];
for (const [key, records] of groups) {
  if (records.length > 1) {
    duplicates.push({
      key,
      count: records.length,
      records: records.map(r => ({
        id: r.id,
        business_name: r.business_name,
        city: r.city,
        state: r.state,
        slug: r.slug,
        phone: r.phone,
        email: r.email,
        website: r.website,
        rating: r.rating,
        review_count: r.review_count,
        verified: r.verified,
        score: scoreRecord(r)
      })).sort((a, b) => b.score - a.score) // Best first
    });
  }
}

// Sort by count (most duplicates first)
duplicates.sort((a, b) => b.count - a.count);

console.log('═'.repeat(60));
console.log(`⚠️  FOUND ${duplicates.length} DUPLICATE GROUPS`);
console.log('═'.repeat(60));

// Collect IDs to delete
const toDelete = [];

for (const dup of duplicates) {
  console.log(`\n📍 ${dup.records[0].business_name} (${dup.records[0].city}, ${dup.records[0].state})`);
  console.log(`   ${dup.count} duplicates found`);

  for (let i = 0; i < dup.records.length; i++) {
    const r = dup.records[i];
    const status = i === 0 ? '✅ KEEP' : '❌ DELETE';
    console.log(`   ${status} [score: ${r.score}]`);
    console.log(`      ID: ${r.id}`);
    console.log(`      Slug: ${r.slug}`);
    console.log(`      Phone: ${r.phone || '(none)'}`);
    console.log(`      Email: ${r.email || '(none)'}`);
    console.log(`      Rating: ${r.rating || '(none)'} (${r.review_count || 0} reviews)`);

    if (i > 0) {
      toDelete.push({
        id: r.id,
        business_name: r.business_name,
        city: r.city,
        state: r.state,
        slug: r.slug,
        reason: `Duplicate of ${dup.records[0].id} (lower score: ${r.score} vs ${dup.records[0].score})`
      });
    }
  }
}

// Generate SQL to delete duplicates
if (toDelete.length > 0) {
  console.log('\n' + '═'.repeat(60));
  console.log(`\n🗑️  GENERATING DELETE SQL for ${toDelete.length} records...`);

  const sqlLines = [
    '-- Delete duplicate records from potty table',
    `-- Generated: ${new Date().toISOString()}`,
    `-- Total to delete: ${toDelete.length}`,
    '',
    '-- REVIEW CAREFULLY BEFORE RUNNING!',
    '',
    'BEGIN;',
    '',
  ];

  for (const record of toDelete) {
    sqlLines.push(`-- ${record.business_name} (${record.city}, ${record.state})`);
    sqlLines.push(`-- Reason: ${record.reason}`);
    sqlLines.push(`DELETE FROM potty WHERE id = '${record.id}';`);
    sqlLines.push('');
  }

  sqlLines.push('COMMIT;');
  sqlLines.push('');
  sqlLines.push(`-- Deleted ${toDelete.length} duplicate records`);

  const sqlFile = path.join(dataDir, 'duplicates-to-delete.sql');
  fs.writeFileSync(sqlFile, sqlLines.join('\n'));
  console.log(`   📄 ${sqlFile}`);
}

// Generate JSON report
const report = {
  generated: new Date().toISOString(),
  totalRecords: objects.length,
  duplicateGroups: duplicates.length,
  recordsToDelete: toDelete.length,
  duplicates: duplicates,
  toDelete: toDelete
};

const jsonFile = path.join(dataDir, 'duplicates-report.json');
fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2));
console.log(`   📄 ${jsonFile}`);

// Summary
console.log('\n' + '═'.repeat(60));
console.log('📊 SUMMARY');
console.log('═'.repeat(60));
console.log(`Total records:      ${objects.length.toLocaleString()}`);
console.log(`Duplicate groups:   ${duplicates.length}`);
console.log(`Records to delete:  ${toDelete.length}`);
console.log(`Records to keep:    ${(objects.length - toDelete.length).toLocaleString()}`);
console.log('');

if (toDelete.length > 0) {
  console.log('⚠️  Review duplicates-to-delete.sql before running!');
  console.log('');
}

console.log('✅ Done\n');
