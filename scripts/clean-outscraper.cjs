#!/usr/bin/env node
/**
 * Clean Outscraper CSV data
 *
 * Performs comprehensive data hygiene:
 *   - Deduplicates by normalized name + city + state (PRIMARY)
 *   - Falls back to name + phone for additional matching
 *   - Picks best email per business using scoring
 *   - Filters junk emails (theme companies, font services, big box, etc.)
 *   - Validates and cleans phone numbers
 *   - Normalizes business names
 *
 * Usage:
 *   node scripts/clean-outscraper.cjs [input.csv] [output.csv]
 *
 * Default:
 *   Input:  data/pottyfirst10.csv
 *   Output: data/pottyfirst10-cleaned.csv
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// BUSINESS NAME NORMALIZATION
// ============================================================================

// Suffixes to remove for matching (but keep in actual data)
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

// Word normalizations
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
 * Normalize business name for deduplication matching
 */
function normalizeName(name) {
  if (!name) return '';

  let n = name.toLowerCase();

  // Remove punctuation except apostrophes temporarily
  n = n.replace(/[^\w\s']/g, ' ');

  // Apply word normalizations
  for (const [from, to] of Object.entries(WORD_NORMALIZATIONS)) {
    n = n.replace(new RegExp(`\\b${from}\\b`, 'gi'), to);
  }

  // Remove apostrophes
  n = n.replace(/'/g, '');

  // Split into words
  let words = n.split(/\s+/).filter(w => w.length > 0);

  // Remove common suffixes from the end
  while (words.length > 1 && SUFFIXES_TO_REMOVE.includes(words[words.length - 1])) {
    words.pop();
  }

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
 * Normalize phone number (digits only)
 */
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

// ============================================================================
// DEDUPLICATION KEYS
// ============================================================================

/**
 * Primary key: name + city + state
 * This is the authoritative dedup key
 */
function makePrimaryKey(row) {
  const name = normalizeName(row.name);
  const city = normalizeCity(row.city);
  const state = normalizeState(row.state);
  return `${name}|${city}|${state}`;
}

/**
 * Secondary key: name + phone (for catching same business, different city spelling)
 */
function makeSecondaryKey(row) {
  const name = normalizeName(row.name);
  const phone = normalizePhone(row.phone);
  if (phone.length >= 10) {
    return `${name}|${phone}`;
  }
  return null; // No valid secondary key
}

// ============================================================================
// EMAIL FILTERING AND SCORING
// ============================================================================

const JUNK_EMAIL_PATTERNS = [
  // Website builders & hosting
  /wixpress\.com/i, /wix\.com/i, /\.wixsite\.com/i,
  /squarespace\.com/i, /weebly\.com/i, /godaddy\.com/i,
  /wordpress\.com/i, /wpengine\.com/i, /bluehost\.com/i,
  /hostgator\.com/i, /namecheap\.com/i,

  // Theme/template companies
  /goodlayers\.com/i, /theme/i, /template/i,
  /developer@/i, /developer\./i, /themes\.starter/i,

  // Font services
  /latofonts\.com/i, /fonts\.com/i, /fontawesome/i,
  /googlefonts/i, /indiantypefoundry/i, /typefoundry/i,
  /fontfoundry/i, /typekit/i, /myfonts/i,

  // Analytics/tracking
  /sentry\.io/i, /@sentry\./i, /googleapis\.com/i,
  /cloudflare/i, /analytics/i, /tracking/i,

  // Generic/spam
  /example\.com/i, /test@/i, /noreply@/i, /no-reply@/i,
  /donotreply@/i, /do-not-reply@/i, /mailer-daemon/i,
  /postmaster@/i, /webmaster@/i, /@mail\.com$/i,
  /spam/i, /abuse@/i,

  // Marketing platforms
  /mailchimp\.com/i, /sendgrid\.com/i,
  /constantcontact\.com/i, /hubspot\.com/i,

  // Stock photos
  /shutterstock/i, /istockphoto/i, /gettyimages/i,
  /unsplash/i, /pexels/i,

  // Design tools
  /figma\.com/i, /canva\.com/i, /adobe\.com/i, /sketch\.com/i,

  // CMS/ecommerce
  /shopify\.com/i, /bigcommerce\.com/i, /magento\.com/i,

  // Payment processors
  /stripe\.com/i, /paypal\.com/i, /square\.com/i,

  // Malformed
  /@.*@/, /\.com[a-z]/i,

  // Big box retailers
  /@homedepot\.com/i, /@lowes\.com/i, /@target\.com/i,
  /@walmart\.com/i, /@costco\.com/i, /@bestbuy\.com/i,
  /@kohls\.com/i, /@menards\.com/i, /@acehardware\.com/i,
  /@tractorsupply\.com/i, /@unitedrentals\.com/i,
  /@willscot\.com/i, /@apple\.com/i,

  // WordPress/CMS junk
  /infinitewp\.com/i, /developer@developer/i,
  /ancora/i, /starter@/i, /starter/i,
];

/**
 * Score an email - higher is better, 0 means junk
 */
function scoreEmail(email, businessDomain) {
  if (!email) return 0;
  email = email.toLowerCase().trim();

  // Check for junk patterns
  for (const pattern of JUNK_EMAIL_PATTERNS) {
    if (pattern.test(email)) return 0;
  }

  // Check for malformed (multiple @ signs)
  if (email.split('@').length !== 2) return 0;

  let score = 10; // Base score

  // Bonus for domain match
  if (businessDomain) {
    const cleanDomain = businessDomain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0];
    if (email.includes(cleanDomain)) {
      score += 50;
    }
  }

  // Bonus for good prefixes
  if (email.startsWith('info@')) score += 30;
  if (email.startsWith('contact@')) score += 25;
  if (email.startsWith('sales@')) score += 20;
  if (email.startsWith('service@')) score += 20;
  if (email.startsWith('hello@')) score += 15;
  if (email.startsWith('support@')) score += 10;
  if (email.startsWith('office@')) score += 10;

  // Slight penalty for personal email providers
  if (/@gmail\.com$/i.test(email)) score -= 5;
  if (/@yahoo\.com$/i.test(email)) score -= 5;
  if (/@hotmail\.com$/i.test(email)) score -= 5;
  if (/@aol\.com$/i.test(email)) score -= 5;

  return score;
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
// MAIN CLEANING LOGIC
// ============================================================================

function cleanData(objects) {
  // Map by primary key (name + city + state)
  const primaryMap = new Map();
  // Secondary map (name + phone) for cross-reference
  const secondaryMap = new Map();

  for (const row of objects) {
    const primaryKey = makePrimaryKey(row);
    const secondaryKey = makeSecondaryKey(row);

    // Check if this is a duplicate by primary key
    if (primaryMap.has(primaryKey)) {
      // Duplicate - just collect the email
      const existing = primaryMap.get(primaryKey);
      if (row.email && !existing._emails.includes(row.email)) {
        existing._emails.push(row.email);
        existing._emailScores.push(scoreEmail(row.email, row.domain || row.website));
      }
      continue;
    }

    // Check if this matches by secondary key (same business, maybe different city spelling)
    if (secondaryKey && secondaryMap.has(secondaryKey)) {
      const existingPrimaryKey = secondaryMap.get(secondaryKey);
      const existing = primaryMap.get(existingPrimaryKey);
      if (existing && row.email && !existing._emails.includes(row.email)) {
        existing._emails.push(row.email);
        existing._emailScores.push(scoreEmail(row.email, row.domain || row.website));
      }
      continue;
    }

    // New unique business
    primaryMap.set(primaryKey, {
      ...row,
      _primaryKey: primaryKey,
      _emails: [row.email].filter(Boolean),
      _emailScores: [scoreEmail(row.email, row.domain || row.website)]
    });

    // Register secondary key
    if (secondaryKey) {
      secondaryMap.set(secondaryKey, primaryKey);
    }
  }

  // Pick best email for each business
  const cleaned = [];

  for (const [key, biz] of primaryMap) {
    let bestEmail = '';
    let bestScore = 0;

    for (let i = 0; i < biz._emails.length; i++) {
      if (biz._emailScores[i] > bestScore) {
        bestScore = biz._emailScores[i];
        bestEmail = biz._emails[i];
      }
    }

    // Clean up internal tracking fields
    delete biz._primaryKey;
    delete biz._emails;
    delete biz._emailScores;

    // Set best email
    biz.email = bestScore > 0 ? bestEmail : '';

    cleaned.push(biz);
  }

  return cleaned;
}

// ============================================================================
// STATS
// ============================================================================

function printStats(original, cleaned) {
  const withEmail = cleaned.filter(r => r.email).length;
  const withWebsite = cleaned.filter(r => r.website).length;
  const withPhone = cleaned.filter(r => r.phone).length;
  const withSocial = cleaned.filter(r =>
    r.company_facebook || r.company_instagram || r.company_linkedin || r.company_x
  ).length;

  const states = new Set(cleaned.map(r => r.state).filter(Boolean));
  const cities = new Set(cleaned.map(r => `${r.city}|${r.state}`).filter(k => k !== '|'));

  console.log('\n📊 CLEANING RESULTS');
  console.log('═'.repeat(50));
  console.log(`Original rows:       ${original.length.toLocaleString()}`);
  console.log(`Deduplicated to:     ${cleaned.length.toLocaleString()}`);
  console.log(`Duplicates removed:  ${(original.length - cleaned.length).toLocaleString()}`);
  console.log('');
  console.log(`With email:          ${withEmail.toLocaleString()} (${Math.round(withEmail/cleaned.length*100)}%)`);
  console.log(`With website:        ${withWebsite.toLocaleString()} (${Math.round(withWebsite/cleaned.length*100)}%)`);
  console.log(`With phone:          ${withPhone.toLocaleString()} (${Math.round(withPhone/cleaned.length*100)}%)`);
  console.log(`With social:         ${withSocial.toLocaleString()} (${Math.round(withSocial/cleaned.length*100)}%)`);
  console.log('');
  console.log(`Unique states:       ${states.size}`);
  console.log(`Unique cities:       ${cities.size}`);
  console.log('');
}

// ============================================================================
// MAIN
// ============================================================================

const inputFile = process.argv[2] || path.join(__dirname, '../data/pottyfirst10.csv');
const outputFile = process.argv[3] || inputFile.replace('.csv', '-cleaned.csv');

console.log('\n🧹 OUTSCRAPER DATA CLEANER');
console.log('═'.repeat(50));
console.log(`\n📂 Reading: ${inputFile}`);

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = parseCSV(content);
const { headers, objects } = csvToObjects(lines);

console.log(`📋 Found ${objects.length.toLocaleString()} rows, ${headers.length} columns`);

console.log('\n🔍 Deduplicating by name + city + state...');
const cleaned = cleanData(objects);

printStats(objects, cleaned);

console.log(`💾 Writing: ${outputFile}`);
const output = objectsToCSV(cleaned, headers);
fs.writeFileSync(outputFile, output);

console.log('✅ Done!\n');
