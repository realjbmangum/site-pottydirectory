#!/usr/bin/env node
/**
 * Generate a review CSV showing Supabase vs Outscraper data
 * For manual review before running updates
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

function makeKey(name, city, state) {
  return `${normalize(name)}|${normalize(city)}|${normalize(state)}`;
}

// Escape CSV field
function csvEscape(str) {
  if (!str) return '';
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Main
const dataDir = path.join(__dirname, '../data');
const supabaseFile = path.join(dataDir, 'potty-supabase.csv');
const outscraperFile = path.join(dataDir, 'pottyfirst10-cleaned.csv');
const outputFile = path.join(dataDir, 'merge-review.csv');

console.log('\n📂 Reading Supabase data...');
const supabaseContent = fs.readFileSync(supabaseFile, 'utf-8');
const supabaseLines = parseCSV(supabaseContent);
const { objects: supabaseData } = csvToObjects(supabaseLines);

console.log('\n📂 Reading Outscraper data...');
const outscraperContent = fs.readFileSync(outscraperFile, 'utf-8');
const outscraperLines = parseCSV(outscraperContent);
const { objects: outscraperData } = csvToObjects(outscraperLines);

// Build Outscraper lookup map
const outscraperMap = new Map();
for (const row of outscraperData) {
  const key = makeKey(row.name, row.city, row.state);
  if (!outscraperMap.has(key)) {
    outscraperMap.set(key, row);
  }
}

// Generate review data
const reviewRows = [];

// Header
const headers = [
  'action',
  'supabase_id',
  'business_name',
  'city',
  'state',
  'phone',
  'current_email',
  'new_email',
  'email_change',
  'current_website',
  'new_website',
  'website_change',
  'new_facebook',
  'new_instagram',
  'new_linkedin',
  'new_twitter'
];

reviewRows.push(headers.join(','));

let updateCount = 0;
let skipCount = 0;
let noMatchCount = 0;

for (const supa of supabaseData) {
  const key = makeKey(supa.business_name, supa.city, supa.state);
  const outscraper = outscraperMap.get(key);

  const needsEmail = !supa.email || supa.email.trim() === '';
  const needsWebsite = !supa.website || supa.website.trim() === '';

  if (!outscraper) {
    // No match - skip unless needs data
    if (needsEmail || needsWebsite) {
      noMatchCount++;
    }
    continue;
  }

  const willUpdateEmail = needsEmail && outscraper.email && outscraper.email.trim();
  const willUpdateWebsite = needsWebsite && outscraper.website && outscraper.website.trim();

  let action = 'SKIP';
  if (willUpdateEmail || willUpdateWebsite) {
    action = 'UPDATE';
    updateCount++;
  } else {
    skipCount++;
  }

  const row = [
    action,
    csvEscape(supa.id),
    csvEscape(supa.business_name),
    csvEscape(supa.city),
    csvEscape(supa.state),
    csvEscape(supa.phone),
    csvEscape(supa.email),
    csvEscape(willUpdateEmail ? outscraper.email : ''),
    willUpdateEmail ? 'ADD' : (supa.email ? 'KEEP' : 'NONE'),
    csvEscape(supa.website),
    csvEscape(willUpdateWebsite ? outscraper.website : ''),
    willUpdateWebsite ? 'ADD' : (supa.website ? 'KEEP' : 'NONE'),
    csvEscape(outscraper.company_facebook || ''),
    csvEscape(outscraper.company_instagram || ''),
    csvEscape(outscraper.company_linkedin || ''),
    csvEscape(outscraper.company_x || '')
  ];

  reviewRows.push(row.join(','));
}

// Write output
fs.writeFileSync(outputFile, reviewRows.join('\n'));

console.log('\n📊 REVIEW CSV GENERATED');
console.log('═'.repeat(40));
console.log(`Matched records:    ${updateCount + skipCount}`);
console.log(`Will UPDATE:        ${updateCount}`);
console.log(`Will SKIP:          ${skipCount}`);
console.log(`No match (other states): ${noMatchCount}`);
console.log('');
console.log(`📄 Output: ${outputFile}`);
console.log('');
console.log('Open in Excel/Sheets to review before running SQL');
console.log('');
