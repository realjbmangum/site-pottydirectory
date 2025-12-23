/**
 * Get Top Cities by Vendor Count
 *
 * This script identifies cities with the most vendors to prioritize
 * for city-specific SEO content generation.
 *
 * Usage: node scripts/get-top-cities.js
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// State abbreviation mapping
const stateAbbreviations = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

function citySlug(city) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function stateSlug(state) {
  return state.toLowerCase().replace(/\s+/g, '-');
}

async function getTopCities(limit = 50) {
  console.log(`\nFetching top ${limit} cities by vendor count...\n`);

  // Get all vendors with city and state
  const allVendors = [];
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('potty')
      .select('city, state')
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching vendors:', error);
      process.exit(1);
    }

    if (data && data.length > 0) {
      allVendors.push(...data);
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  console.log(`Total vendors: ${allVendors.length}`);

  // Count vendors by city-state
  const cityCounts = {};
  allVendors.forEach(v => {
    const key = `${v.city}|||${v.state}`;
    cityCounts[key] = (cityCounts[key] || 0) + 1;
  });

  // Convert to array and sort
  const cityArray = Object.entries(cityCounts)
    .map(([key, count]) => {
      const [city, state] = key.split('|||');
      return {
        city,
        state,
        state_abbr: stateAbbreviations[state] || '',
        city_slug: citySlug(city),
        state_slug: stateSlug(state),
        vendor_count: count
      };
    })
    .sort((a, b) => b.vendor_count - a.vendor_count)
    .slice(0, limit);

  // Display results
  console.log(`\n${'='.repeat(70)}`);
  console.log(`TOP ${limit} CITIES BY VENDOR COUNT`);
  console.log(`${'='.repeat(70)}\n`);

  console.log('Rank | City                      | State          | Vendors');
  console.log('-----|---------------------------|----------------|--------');

  cityArray.forEach((city, index) => {
    const rank = String(index + 1).padStart(3);
    const cityName = city.city.padEnd(25).slice(0, 25);
    const stateName = city.state.padEnd(14).slice(0, 14);
    console.log(`${rank}  | ${cityName} | ${stateName} | ${city.vendor_count}`);
  });

  // Summary stats
  const totalVendorsInTop = cityArray.reduce((sum, c) => sum + c.vendor_count, 0);
  const coverage = ((totalVendorsInTop / allVendors.length) * 100).toFixed(1);

  console.log(`\n${'='.repeat(70)}`);
  console.log(`SUMMARY`);
  console.log(`${'='.repeat(70)}`);
  console.log(`Top ${limit} cities contain ${totalVendorsInTop} vendors (${coverage}% of total)`);
  console.log(`Unique cities with vendors: ${Object.keys(cityCounts).length}`);

  // Check which cities already have content
  const { data: existingContent } = await supabase
    .from('city_content')
    .select('city, state');

  const existingSet = new Set((existingContent || []).map(c => `${c.city}|||${c.state}`));
  const needContent = cityArray.filter(c => !existingSet.has(`${c.city}|||${c.state}`));

  console.log(`\nCities already with content: ${existingContent?.length || 0}`);
  console.log(`Top ${limit} cities needing content: ${needContent.length}`);

  // Output JSON for content generation
  const outputPath = join(__dirname, '..', 'data', 'top-cities-for-content.json');
  fs.writeFileSync(outputPath, JSON.stringify(cityArray, null, 2));
  console.log(`\nSaved to: ${outputPath}`);

  // Output SQL for seeding city_content table
  if (needContent.length > 0) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`SQL TO SEED city_content (cities needing content)`);
    console.log(`${'='.repeat(70)}\n`);

    const sqlValues = needContent.map(c =>
      `  ('${c.city.replace(/'/g, "''")}', '${c.state}', '${c.state_abbr}', '${c.city_slug}', '${c.state_slug}', 'draft')`
    ).join(',\n');

    const sql = `INSERT INTO city_content (city, state, state_abbr, city_slug, state_slug, status)
VALUES
${sqlValues}
ON CONFLICT (city, state) DO NOTHING;`;

    console.log(sql);

    // Save SQL to file
    const sqlPath = join(__dirname, '..', 'data', 'seed-city-content.sql');
    fs.writeFileSync(sqlPath, sql);
    console.log(`\nSQL saved to: ${sqlPath}`);
  }

  return cityArray;
}

// Run
getTopCities(50);
