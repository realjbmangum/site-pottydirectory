#!/usr/bin/env node
/**
 * Merge and Deduplicate Supabase Records
 *
 * This script:
 *   1. Finds duplicates by normalized name + city + state
 *   2. Picks the BEST record to keep (correct slug format, most complete)
 *   3. MERGES data from duplicates into the keeper (preserves all data)
 *   4. Generates SQL to UPDATE the keeper and DELETE duplicates
 *
 * This ensures we don't lose any data (reviews, social URLs, etc.)
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// NORMALIZATION (same as other scripts)
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

// ============================================================================
// SLUG VALIDATION
// ============================================================================

/**
 * Check if slug follows correct format (name without city suffix)
 */
function isCorrectSlugFormat(slug, businessName, city) {
  if (!slug) return false;

  // Bad: slug ends with city name
  const citySlug = city.toLowerCase().replace(/[^\w]/g, '-').replace(/-+/g, '-');
  if (slug.endsWith('-' + citySlug)) return false;

  // Bad: slug has weird hash-like patterns
  if (/[0-9a-f]{8,}/.test(slug)) return false;

  // Bad: slug ends with state abbreviation pattern
  if (/-[a-z]{2}$/.test(slug) && slug.split('-').pop().length === 2) {
    // Could be state abbr, check if it's actually the state
    // This is a heuristic - might need refinement
  }

  return true;
}

/**
 * Score a record for "keepability" - higher is better
 */
function scoreRecord(record) {
  let score = 0;

  // Slug format is CRITICAL - we want to keep correct slugs
  if (isCorrectSlugFormat(record.slug, record.business_name, record.city)) {
    score += 100; // Heavily weight correct slug format
  }

  // Data completeness
  if (record.email && record.email.trim() && !record.email.includes('sentry')) score += 10;
  if (record.website && record.website.trim()) score += 10;
  if (record.phone && record.phone.trim()) score += 5;
  if (record.street_address && record.street_address.trim()) score += 5;
  if (record.description && record.description.trim()) score += 5;
  if (record.photo_url && record.photo_url.trim()) score += 3;

  // Social media
  if (record.facebook_url && record.facebook_url.trim()) score += 5;
  if (record.instagram_url && record.instagram_url.trim()) score += 5;
  if (record.linkedin_url && record.linkedin_url.trim()) score += 3;
  if (record.twitter_url && record.twitter_url.trim()) score += 3;

  // Reviews (valuable but not as important as slug format)
  const reviewCount = parseInt(record.review_count) || 0;
  if (reviewCount > 0) score += Math.min(reviewCount / 10, 10); // Max 10 points for reviews

  // Rating
  const rating = parseFloat(record.rating) || 0;
  if (rating > 0) score += rating; // 0-5 points

  // Features
  if (record.has_luxury === 'true' || record.has_luxury === true) score += 2;
  if (record.has_ada === 'true' || record.has_ada === true) score += 2;
  if (record.has_trailer === 'true' || record.has_trailer === true) score += 2;
  if (record.serves_construction === 'true' || record.serves_construction === true) score += 2;
  if (record.serves_events === 'true' || record.serves_events === true) score += 2;

  // Flags
  if (record.verified === 'true' || record.verified === true) score += 15;
  if (record.featured === 'true' || record.featured === true) score += 10;

  return score;
}

// ============================================================================
// DATA MERGING
// ============================================================================

/**
 * Fields that can be merged from one record to another
 */
const MERGEABLE_FIELDS = [
  'email', 'website', 'street_address', 'postal_code',
  'phone', 'description', 'photo_url',
  'facebook_url', 'instagram_url', 'linkedin_url', 'twitter_url',
  'hours', 'latitude', 'longitude',
  'has_luxury', 'has_ada', 'has_trailer', 'serves_construction', 'serves_events',
];

/**
 * Fields where we take the MAX value
 */
const MAX_FIELDS = ['rating', 'review_count'];

/**
 * Merge data from source record into target record
 * Only fills in missing values, never overwrites
 * Returns array of fields that were merged
 */
function mergeRecords(target, source) {
  const merged = [];

  for (const field of MERGEABLE_FIELDS) {
    const targetVal = target[field];
    const sourceVal = source[field];

    // Target is empty but source has data
    if ((!targetVal || targetVal.trim() === '' || targetVal === 'null') &&
        (sourceVal && sourceVal.trim() !== '' && sourceVal !== 'null')) {
      // Skip junk emails
      if (field === 'email' && sourceVal.includes('sentry')) continue;

      merged.push({ field, value: sourceVal });
    }
  }

  // For rating/review_count, take the higher value
  for (const field of MAX_FIELDS) {
    const targetVal = parseFloat(target[field]) || 0;
    const sourceVal = parseFloat(source[field]) || 0;

    if (sourceVal > targetVal) {
      merged.push({ field, value: sourceVal.toString() });
    }
  }

  return merged;
}

/**
 * Escape SQL string
 */
function sqlEscape(str) {
  if (!str || str === 'null' || str === 'NULL') return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// ============================================================================
// MAIN
// ============================================================================

const dataDir = path.join(__dirname, '../data');
const inputFile = process.argv[2] || path.join(dataDir, 'potty-supabase.csv');

console.log('\n🔄 DUPLICATE MERGER');
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

// Process only duplicates
const duplicates = [];
for (const [key, records] of groups) {
  if (records.length > 1) {
    // Score each record
    const scored = records.map(r => ({
      ...r,
      _score: scoreRecord(r)
    })).sort((a, b) => b._score - a._score);

    duplicates.push({
      key,
      keeper: scored[0],
      toDelete: scored.slice(1)
    });
  }
}

console.log(`⚠️  Found ${duplicates.length} duplicate groups\n`);

// Generate SQL
const sqlLines = [
  '-- Merge and Deduplicate Supabase Records',
  `-- Generated: ${new Date().toISOString()}`,
  `-- Duplicate groups: ${duplicates.length}`,
  '',
  '-- This SQL does two things:',
  '-- 1. UPDATEs the keeper record with merged data from duplicates',
  '-- 2. DELETEs the duplicate records',
  '',
  'BEGIN;',
  '',
];

let totalMerges = 0;
let totalDeletes = 0;

for (const dup of duplicates) {
  const keeper = dup.keeper;

  sqlLines.push(`-- ═══════════════════════════════════════════════════════`);
  sqlLines.push(`-- ${keeper.business_name} (${keeper.city}, ${keeper.state})`);
  sqlLines.push(`-- Keeper: ${keeper.id} (score: ${keeper._score})`);
  sqlLines.push(`-- Slug: ${keeper.slug}`);

  // Collect all data to merge from duplicates
  const allMerges = new Map();

  for (const toDelete of dup.toDelete) {
    sqlLines.push(`-- Delete: ${toDelete.id} (score: ${toDelete._score})`);
    sqlLines.push(`--   Slug: ${toDelete.slug}`);

    const merges = mergeRecords(keeper, toDelete);
    for (const m of merges) {
      // Only keep first value for each field
      if (!allMerges.has(m.field)) {
        allMerges.set(m.field, m.value);
      }
    }
  }

  // Generate UPDATE if there's data to merge
  if (allMerges.size > 0) {
    const updates = [];
    for (const [field, value] of allMerges) {
      updates.push(`${field} = ${sqlEscape(value)}`);
      totalMerges++;
    }
    updates.push(`updated_at = NOW()`);

    sqlLines.push('');
    sqlLines.push(`-- Merging: ${Array.from(allMerges.keys()).join(', ')}`);
    sqlLines.push(`UPDATE potty SET ${updates.join(', ')} WHERE id = '${keeper.id}';`);
  }

  // Generate DELETEs
  for (const toDelete of dup.toDelete) {
    sqlLines.push(`DELETE FROM potty WHERE id = '${toDelete.id}';`);
    totalDeletes++;
  }

  sqlLines.push('');
}

sqlLines.push('COMMIT;');
sqlLines.push('');
sqlLines.push(`-- Summary: ${totalMerges} fields merged, ${totalDeletes} records deleted`);

const outputFile = path.join(dataDir, 'merge-duplicates.sql');
fs.writeFileSync(outputFile, sqlLines.join('\n'));

// Console output
console.log('═'.repeat(60));
console.log('📊 DUPLICATE MERGE PLAN');
console.log('═'.repeat(60));

for (const dup of duplicates) {
  const keeper = dup.keeper;
  console.log(`\n📍 ${keeper.business_name} (${keeper.city}, ${keeper.state})`);
  console.log(`   ✅ KEEP: ${keeper.slug} [score: ${keeper._score}]`);

  const allMerges = new Map();
  for (const toDelete of dup.toDelete) {
    console.log(`   ❌ DELETE: ${toDelete.slug} [score: ${toDelete._score}]`);

    const merges = mergeRecords(keeper, toDelete);
    for (const m of merges) {
      if (!allMerges.has(m.field)) {
        allMerges.set(m.field, m.value);
      }
    }
  }

  if (allMerges.size > 0) {
    console.log(`   📦 MERGE: ${Array.from(allMerges.keys()).join(', ')}`);
  }
}

console.log('\n' + '═'.repeat(60));
console.log('📊 SUMMARY');
console.log('═'.repeat(60));
console.log(`Duplicate groups:   ${duplicates.length}`);
console.log(`Fields to merge:    ${totalMerges}`);
console.log(`Records to delete:  ${totalDeletes}`);
console.log(`Records remaining:  ${objects.length - totalDeletes}`);
console.log('');
console.log(`📄 SQL file: ${outputFile}`);
console.log('');
console.log('⚠️  Review the SQL file before running!');
console.log('');

// Also output a simple report
const report = {
  generated: new Date().toISOString(),
  totalRecords: objects.length,
  duplicateGroups: duplicates.length,
  fieldsMerged: totalMerges,
  recordsToDelete: totalDeletes,
  duplicates: duplicates.map(d => ({
    key: d.key,
    keeper: {
      id: d.keeper.id,
      slug: d.keeper.slug,
      score: d.keeper._score
    },
    toDelete: d.toDelete.map(t => ({
      id: t.id,
      slug: t.slug,
      score: t._score
    }))
  }))
};

const reportFile = path.join(dataDir, 'merge-duplicates-report.json');
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
console.log(`📄 Report: ${reportFile}\n`);
