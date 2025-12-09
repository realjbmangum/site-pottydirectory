/**
 * Outscraper Data Import Script
 *
 * Cleans and imports porta potty vendor data from Outscraper Excel exports.
 *
 * Usage:
 *   node scripts/import-outscraper.js <xlsx-file> <state-name>
 *
 * Example:
 *   node scripts/import-outscraper.js data/outscraper-nc.xlsx "North Carolina"
 *
 * Outputs:
 *   - data/cleaned-vendors.json (cleaned data for review)
 *   - data/import.sql (SQL INSERT statements for Supabase)
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================

const DEFAULT_SERVICES = ['Standard Units', 'Portable Restrooms'];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Normalize phone number to (XXX) XXX-XXXX format
 */
function normalizePhone(phone) {
  if (!phone) return null;

  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Handle +1 prefix
  const cleaned = digits.length === 11 && digits.startsWith('1')
    ? digits.slice(1)
    : digits;

  if (cleaned.length !== 10) {
    console.warn(`  ⚠️  Invalid phone: ${phone}`);
    return phone; // Return original if can't normalize
  }

  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Generate URL-friendly slug from business name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Title case a string
 */
function titleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Validate and clean website URL
 */
function cleanWebsite(url) {
  if (!url) return null;

  let cleaned = url.trim();

  // Add https if missing
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }

  // Convert http to https
  if (cleaned.startsWith('http://')) {
    cleaned = cleaned.replace('http://', 'https://');
  }

  return cleaned;
}

/**
 * Escape single quotes for SQL
 */
function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

/**
 * Infer city from coordinates using known city centers
 */
const CITY_COORDINATES = {
  // North Carolina
  'Asheville': { lat: 35.5951, lng: -82.5515 },
  'Apex': { lat: 35.7327, lng: -78.8503 },
  'Burlington': { lat: 36.0957, lng: -79.4378 },
  'Cary': { lat: 35.7915, lng: -78.7811 },
  'Raleigh': { lat: 35.7796, lng: -78.6382 },
  'Durham': { lat: 35.9940, lng: -78.8986 },
  'Chapel Hill': { lat: 35.9132, lng: -79.0558 },
  'Greensboro': { lat: 36.0726, lng: -79.7920 },
  'Hendersonville': { lat: 35.3187, lng: -82.4612 },
  'Fayetteville': { lat: 35.0527, lng: -78.8784 },
  'Wilmington': { lat: 34.2257, lng: -77.9447 },
  'Charlotte': { lat: 35.2271, lng: -80.8431 },
  'Winston-Salem': { lat: 36.0999, lng: -80.2442 },
  'High Point': { lat: 35.9557, lng: -80.0053 },
  'Greenville': { lat: 35.6127, lng: -77.3664 },
  'Jacksonville': { lat: 34.7541, lng: -77.4302 },
  'Concord': { lat: 35.4088, lng: -80.5795 },
  'Gastonia': { lat: 35.2621, lng: -81.1873 },
  'Rocky Mount': { lat: 35.9382, lng: -77.7905 },
  'Sanford': { lat: 35.4799, lng: -79.1803 },
  'Smithfield': { lat: 35.5085, lng: -78.3394 },
  'Lenoir': { lat: 35.9140, lng: -81.5387 },
  'Sylva': { lat: 35.3734, lng: -83.2260 },
  'Mebane': { lat: 36.0960, lng: -79.2670 },
  'Graham': { lat: 36.0690, lng: -79.4006 },
  'Asheboro': { lat: 35.7079, lng: -79.8136 },
  'Denver': { lat: 35.5318, lng: -81.0298 },
  'Fletcher': { lat: 35.4307, lng: -82.5012 },
  'Boiling Springs': { lat: 35.2543, lng: -81.6676 },
  'Fuquay-Varina': { lat: 35.5844, lng: -78.8000 },
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Infer city from business name, address, or coordinates
 */
function inferCity(row, stateName) {
  if (row.city) return titleCase(row.city);

  // Try to extract from business name
  const name = row.name || '';
  const knownCities = Object.keys(CITY_COORDINATES);

  for (const city of knownCities) {
    if (name.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }

  // Use coordinates to find nearest city
  if (row.latitude && row.longitude) {
    let nearestCity = 'Unknown';
    let minDistance = Infinity;

    for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
      const distance = haversineDistance(row.latitude, row.longitude, coords.lat, coords.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }

    // Only assign if within 25 miles
    if (minDistance <= 25) {
      return nearestCity;
    }
  }

  // Default - will need manual review
  return 'Unknown';
}

// ============================================
// MAIN PROCESSING
// ============================================

function processOutscraperData(filePath, stateName) {
  console.log(`\n📂 Reading: ${filePath}`);
  console.log(`📍 State: ${stateName}\n`);

  // Read Excel file
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${rawData.length} records\n`);

  const cleaned = [];
  const issues = [];
  const seenSlugs = new Set();
  const seenPhones = new Set();

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    const rowNum = i + 2; // Excel row (1-indexed + header)

    // Skip if no name
    if (!row.name) {
      issues.push(`Row ${rowNum}: Missing business name, skipped`);
      continue;
    }

    // Normalize phone
    const phone = normalizePhone(row.phone);

    // Check for duplicate phone
    if (phone && seenPhones.has(phone)) {
      issues.push(`Row ${rowNum}: Duplicate phone ${phone} (${row.name}), skipped`);
      continue;
    }
    if (phone) seenPhones.add(phone);

    // Generate unique slug
    let slug = generateSlug(row.name);
    let slugSuffix = 1;
    while (seenSlugs.has(slug)) {
      slug = `${generateSlug(row.name)}-${slugSuffix}`;
      slugSuffix++;
    }
    seenSlugs.add(slug);

    // Infer city if missing
    const city = inferCity(row, stateName);
    if (city === 'Unknown') {
      issues.push(`Row ${rowNum}: Could not determine city for "${row.name}"`);
    }

    // Build cleaned record
    const vendor = {
      business_name: row.name.trim(),
      city: city,
      state: stateName,
      phone: phone || '',
      website: cleanWebsite(row.site),
      services_offered: DEFAULT_SERVICES,
      slug: slug,
      latitude: row.latitude || null,
      longitude: row.longitude || null,
      street_address: row.street ? titleCase(row.street) : null,
      postal_code: row.postal_code || null,
      rating: row.rating || null,
      review_count: row.reviews || 0,
      photo_url: row.photo || null
    };

    cleaned.push(vendor);
    console.log(`✅ ${vendor.business_name} (${vendor.city})`);
  }

  // Report issues
  if (issues.length > 0) {
    console.log(`\n⚠️  Issues found (${issues.length}):`);
    issues.forEach(issue => console.log(`   ${issue}`));
  }

  return { cleaned, issues };
}

function generateSQL(vendors) {
  const inserts = vendors.map(v => {
    const services = `ARRAY['${v.services_offered.join("', '")}']`;

    return `INSERT INTO vendors (business_name, city, state, phone, website, services_offered, slug, latitude, longitude, street_address, postal_code, rating, review_count, photo_url)
VALUES (
  '${escapeSql(v.business_name)}',
  '${escapeSql(v.city)}',
  '${escapeSql(v.state)}',
  '${escapeSql(v.phone)}',
  ${v.website ? `'${escapeSql(v.website)}'` : 'NULL'},
  ${services},
  '${escapeSql(v.slug)}',
  ${v.latitude || 'NULL'},
  ${v.longitude || 'NULL'},
  ${v.street_address ? `'${escapeSql(v.street_address)}'` : 'NULL'},
  ${v.postal_code ? `'${escapeSql(v.postal_code)}'` : 'NULL'},
  ${v.rating || 'NULL'},
  ${v.review_count || 0},
  ${v.photo_url ? `'${escapeSql(v.photo_url)}'` : 'NULL'}
);`;
  });

  return `-- Outscraper Import - ${vendors.length} vendors
-- Generated: ${new Date().toISOString()}
-- Run this in Supabase SQL Editor

${inserts.join('\n\n')}
`;
}

// ============================================
// CLI ENTRY POINT
// ============================================

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
Usage: node scripts/import-outscraper.js <xlsx-file> <state-name>

Example:
  node scripts/import-outscraper.js data/outscraper-nc.xlsx "North Carolina"
`);
  process.exit(1);
}

const [inputFile, stateName] = args;
const inputPath = path.resolve(inputFile);

if (!fs.existsSync(inputPath)) {
  console.error(`❌ File not found: ${inputPath}`);
  process.exit(1);
}

// Process data
const { cleaned, issues } = processOutscraperData(inputPath, stateName);

// Output directory
const outputDir = path.dirname(inputPath);

// Write cleaned JSON
const jsonPath = path.join(outputDir, 'cleaned-vendors.json');
fs.writeFileSync(jsonPath, JSON.stringify(cleaned, null, 2));
console.log(`\n📄 Cleaned data: ${jsonPath}`);

// Write SQL
const sqlPath = path.join(outputDir, 'import.sql');
fs.writeFileSync(sqlPath, generateSQL(cleaned));
console.log(`📄 SQL file: ${sqlPath}`);

// Summary
console.log(`
========================================
✅ Import preparation complete!

   Total records: ${cleaned.length}
   Issues: ${issues.length}

Next steps:
1. Review ${jsonPath} for any issues
2. Run ${sqlPath} in Supabase SQL Editor
3. Rebuild site: npm run build
========================================
`);
