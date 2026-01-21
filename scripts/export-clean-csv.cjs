#!/usr/bin/env node
/**
 * Export Clean CSV
 *
 * Applies the merge-duplicates logic and outputs a clean CSV
 * with duplicates merged and removed.
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// NORMALIZATION (same as merge-duplicates.cjs)
// ============================================================================

const SUFFIXES_TO_REMOVE = [
  'llc', 'l.l.c.', 'l.l.c', 'inc', 'inc.', 'incorporated',
  'corp', 'corp.', 'corporation', 'co', 'co.', 'company',
  'ltd', 'ltd.', 'limited', 'lp', 'l.p.', 'llp', 'l.l.p.',
  'pllc', 'p.l.l.c.', 'pc', 'p.c.',
  'services', 'service', 'enterprises', 'enterprise',
  'solutions', 'solution', 'group', 'holdings',
  'rentals', 'rental', 'portables', 'portable',
  'sanitation', 'septic', 'restrooms', 'restroom',
  'toilets', 'toilet', 'pumping', 'disposal',
];

const WORD_NORMALIZATIONS = {
  '&': 'and', 'n': 'and', "n'": 'and',
  'potties': 'potty', 'jon': 'john', 'johns': 'john', "john's": 'john', 'jons': 'john',
};

function normalizeName(name) {
  if (!name) return '';
  let n = name.toLowerCase().replace(/[^\w\s']/g, ' ');
  for (const [from, to] of Object.entries(WORD_NORMALIZATIONS)) {
    n = n.replace(new RegExp(`\\b${from}\\b`, 'gi'), to);
  }
  n = n.replace(/'/g, '');
  let words = n.split(/\s+/).filter(w => w.length > 0);
  while (words.length > 1 && SUFFIXES_TO_REMOVE.includes(words[words.length - 1])) {
    words.pop();
  }
  return words.join(' ').trim();
}

function normalizeCity(city) {
  if (!city) return '';
  return city.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeState(state) {
  if (!state) return '';
  return state.toLowerCase().trim();
}

function makeKey(name, city, state) {
  return `${normalizeName(name)}|${normalizeCity(city)}|${normalizeState(state)}`;
}

// ============================================================================
// CSV PARSING
// ============================================================================

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

function objectsToCSV(objects, headers) {
  const lines = [headers.join(',')];
  for (const obj of objects) {
    const values = headers.map(h => {
      const val = obj[h] || '';
      if (val.includes(',') || val.includes('\n') || val.includes('"')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    lines.push(values.join(','));
  }
  return lines.join('\n');
}

// ============================================================================
// SCORING AND MERGING
// ============================================================================

function isCorrectSlugFormat(slug, businessName, city) {
  if (!slug) return false;
  const citySlug = city.toLowerCase().replace(/[^\w]/g, '-').replace(/-+/g, '-');
  if (slug.endsWith('-' + citySlug)) return false;
  if (/[0-9a-f]{8,}/.test(slug)) return false;
  return true;
}

function scoreRecord(record) {
  let score = 0;
  if (isCorrectSlugFormat(record.slug, record.business_name, record.city)) {
    score += 100;
  }
  if (record.email && record.email.trim() && !record.email.includes('sentry')) score += 10;
  if (record.website && record.website.trim()) score += 10;
  if (record.phone && record.phone.trim()) score += 5;
  if (record.street_address && record.street_address.trim()) score += 5;
  if (record.description && record.description.trim()) score += 5;
  if (record.photo_url && record.photo_url.trim()) score += 3;
  if (record.facebook_url && record.facebook_url.trim()) score += 5;
  if (record.instagram_url && record.instagram_url.trim()) score += 5;
  if (record.linkedin_url && record.linkedin_url.trim()) score += 3;
  if (record.twitter_url && record.twitter_url.trim()) score += 3;
  const reviewCount = parseInt(record.review_count) || 0;
  if (reviewCount > 0) score += Math.min(reviewCount / 10, 10);
  const rating = parseFloat(record.rating) || 0;
  if (rating > 0) score += rating;
  if (record.has_luxury === 'true' || record.has_luxury === true) score += 2;
  if (record.has_ada === 'true' || record.has_ada === true) score += 2;
  if (record.has_trailer === 'true' || record.has_trailer === true) score += 2;
  if (record.serves_construction === 'true' || record.serves_construction === true) score += 2;
  if (record.serves_events === 'true' || record.serves_events === true) score += 2;
  if (record.verified === 'true' || record.verified === true) score += 15;
  if (record.featured === 'true' || record.featured === true) score += 10;
  return score;
}

const MERGEABLE_FIELDS = [
  'email', 'website', 'street_address', 'postal_code',
  'phone', 'description', 'photo_url',
  'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url',
  'hours', 'latitude', 'longitude',
  'has_luxury', 'has_ada', 'has_trailer', 'serves_construction', 'serves_events',
];

const MAX_FIELDS = ['rating', 'review_count'];

function mergeIntoTarget(target, source) {
  // Merge empty fields from source
  for (const field of MERGEABLE_FIELDS) {
    const targetVal = target[field];
    const sourceVal = source[field];
    if ((!targetVal || targetVal.trim() === '' || targetVal === 'null') &&
        (sourceVal && sourceVal.trim() !== '' && sourceVal !== 'null')) {
      if (field === 'email' && sourceVal.includes('sentry')) continue;
      target[field] = sourceVal;
    }
  }

  // Take max for rating/review_count
  for (const field of MAX_FIELDS) {
    const targetVal = parseFloat(target[field]) || 0;
    const sourceVal = parseFloat(source[field]) || 0;
    if (sourceVal > targetVal) {
      target[field] = sourceVal.toString();
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

const dataDir = path.join(__dirname, '../data');
const inputFile = process.argv[2] || path.join(dataDir, 'potty_rows.csv');
const outputFile = process.argv[3] || path.join(dataDir, 'potty_clean_new.csv');

console.log('\n📤 EXPORT CLEAN CSV');
console.log('═'.repeat(50));
console.log(`\n📂 Reading: ${inputFile}`);

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = parseCSV(content);
const { headers, objects } = csvToObjects(lines);

console.log(`📋 Found ${objects.length.toLocaleString()} records`);

// Group by key
const groups = new Map();
for (const record of objects) {
  const key = makeKey(record.business_name, record.city, record.state);
  if (!groups.has(key)) {
    groups.set(key, []);
  }
  groups.get(key).push(record);
}

// Process groups - merge duplicates
const cleanRecords = [];
let duplicatesRemoved = 0;
let fieldsMerged = 0;

for (const [key, records] of groups) {
  if (records.length === 1) {
    // No duplicates
    cleanRecords.push(records[0]);
  } else {
    // Score and sort
    const scored = records.map(r => ({ ...r, _score: scoreRecord(r) }))
      .sort((a, b) => b._score - a._score);

    // Keep the best one
    const keeper = { ...scored[0] };
    delete keeper._score;

    // Merge data from others
    for (let i = 1; i < scored.length; i++) {
      const before = JSON.stringify(keeper);
      mergeIntoTarget(keeper, scored[i]);
      const after = JSON.stringify(keeper);
      if (before !== after) fieldsMerged++;
      duplicatesRemoved++;
    }

    cleanRecords.push(keeper);
  }
}

// Sort by state, city, business_name
cleanRecords.sort((a, b) => {
  if (a.state !== b.state) return a.state.localeCompare(b.state);
  if (a.city !== b.city) return a.city.localeCompare(b.city);
  return a.business_name.localeCompare(b.business_name);
});

console.log(`\n🔄 Processed ${groups.size} unique businesses`);
console.log(`   Duplicates removed: ${duplicatesRemoved}`);
console.log(`   Records with merged data: ${fieldsMerged}`);

// Write output
console.log(`\n💾 Writing: ${outputFile}`);
const output = objectsToCSV(cleanRecords, headers);
fs.writeFileSync(outputFile, output);

// Stats
const withEmail = cleanRecords.filter(r => r.email && r.email.trim()).length;
const withWebsite = cleanRecords.filter(r => r.website && r.website.trim()).length;
const withSocial = cleanRecords.filter(r =>
  (r.facebook_url && r.facebook_url.trim()) ||
  (r.instagram_url && r.instagram_url.trim())
).length;

console.log(`\n📊 CLEAN DATA STATS`);
console.log('─'.repeat(40));
console.log(`Total records:    ${cleanRecords.length.toLocaleString()}`);
console.log(`With email:       ${withEmail.toLocaleString()} (${Math.round(withEmail/cleanRecords.length*100)}%)`);
console.log(`With website:     ${withWebsite.toLocaleString()} (${Math.round(withWebsite/cleanRecords.length*100)}%)`);
console.log(`With social:      ${withSocial.toLocaleString()} (${Math.round(withSocial/cleanRecords.length*100)}%)`);

console.log('\n✅ Done!\n');
