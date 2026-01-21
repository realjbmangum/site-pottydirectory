#!/usr/bin/env node

/**
 * Generate unique city content for SEO using Claude API
 * Outputs SQL INSERT statements instead of writing to Supabase directly
 *
 * Usage:
 *   node scripts/generate-city-content-sql.cjs              # Generate for all top 250 cities
 *   node scripts/generate-city-content-sql.cjs --limit 10   # Generate for first 10 cities
 *   node scripts/generate-city-content-sql.cjs --dry-run    # Preview without generating SQL
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Parse command line args
const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith('--limit'));
const limit = limitArg ? parseInt(limitArg.split('=')[1] || args[args.indexOf('--limit') + 1]) : 250;
const dryRun = args.includes('--dry-run');
const startFrom = args.find(a => a.startsWith('--start'));
const startIndex = startFrom ? parseInt(startFrom.split('=')[1] || args[args.indexOf('--start') + 1]) : 0;

async function generateCityContent(city, state, vendorCount) {
  const prompt = `Generate SEO content for a porta potty rental directory page for ${city}, ${state}.

This city has ${vendorCount} portable restroom rental companies listed.

Generate the following fields as JSON:

1. intro_paragraph (2-3 sentences): A natural, helpful introduction about finding porta potty rentals in this city. Mention the city name and state. Don't be salesy.

2. local_tips (1-2 sentences): Practical local considerations for renting portable restrooms in this area. Consider climate, terrain, local events, or regulations if relevant.

3. peak_season (1 sentence): When demand for portable restroom rentals is typically highest in this region.

4. popular_for (array of 3-5 strings): Common uses for porta potty rentals in this area (e.g., "Construction sites", "Outdoor weddings", "Local festivals", "Home renovations").

Respond with ONLY valid JSON, no markdown or explanation:
{
  "intro_paragraph": "...",
  "local_tips": "...",
  "peak_season": "...",
  "popular_for": ["...", "...", "..."]
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  });

  const text = response.content[0].text.trim();

  // Parse JSON response
  try {
    return JSON.parse(text);
  } catch (e) {
    // Try to extract JSON if wrapped in markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error(`Failed to parse response: ${text}`);
  }
}

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function generateInsertSQL(city, state, content) {
  // Convert to PostgreSQL text array format: ARRAY['item1', 'item2']
  const popularForArray = `ARRAY[${content.popular_for.map(item => escapeSQL(item)).join(', ')}]`;
  return `INSERT INTO city_content (city, state, intro_paragraph, local_tips, peak_season, popular_for, status, updated_at)
VALUES (${escapeSQL(city)}, ${escapeSQL(state)}, ${escapeSQL(content.intro_paragraph)}, ${escapeSQL(content.local_tips)}, ${escapeSQL(content.peak_season)}, ${popularForArray}, 'published', NOW())
ON CONFLICT (city, state) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_tips = EXCLUDED.local_tips,
  peak_season = EXCLUDED.peak_season,
  popular_for = EXCLUDED.popular_for,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;`;
}

async function main() {
  console.error('=== City Content SQL Generator ===\n');

  // Load top cities
  const topCities = JSON.parse(fs.readFileSync('data/top-250-cities.json', 'utf8'));

  // Filter out "Unknown" cities
  const validCities = topCities.filter(c =>
    c.city !== 'Unknown' &&
    c.city !== 'US' &&
    c.city.length > 1
  );

  console.error(`Loaded ${validCities.length} valid cities from top 250`);

  // Slice based on start and limit
  const citiesToProcess = validCities.slice(startIndex, startIndex + limit);

  console.error(`Will generate content for ${citiesToProcess.length} cities`);
  if (dryRun) console.error('(DRY RUN - not generating SQL)\n');
  console.error('');

  let success = 0;
  let failed = 0;
  const sqlStatements = [];

  // Add transaction begin
  sqlStatements.push('-- Generated city content for Potty Directory');
  sqlStatements.push('-- Run this SQL in your Supabase SQL editor');
  sqlStatements.push('BEGIN;\n');

  for (let i = 0; i < citiesToProcess.length; i++) {
    const { city, state, vendor_count } = citiesToProcess[i];
    const progress = `[${i + 1}/${citiesToProcess.length}]`;

    try {
      process.stderr.write(`${progress} ${city}, ${state} (${vendor_count} vendors)... `);

      if (!dryRun) {
        const content = await generateCityContent(city, state, vendor_count);
        const sql = generateInsertSQL(city, state, content);
        sqlStatements.push(sql);
        console.error('✓ generated');
      } else {
        console.error('✓ (dry run)');
      }

      success++;

      // Rate limit: wait 500ms between requests
      if (!dryRun) {
        await new Promise(r => setTimeout(r, 500));
      }

    } catch (error) {
      console.error(`✗ error: ${error.message}`);
      failed++;
    }
  }

  // Add transaction commit
  sqlStatements.push('\nCOMMIT;');

  console.error(`\n=== Complete ===`);
  console.error(`Success: ${success}`);
  console.error(`Failed: ${failed}`);

  if (!dryRun && success > 0) {
    // Output SQL to stdout
    console.log(sqlStatements.join('\n\n'));
    console.error(`\nSQL output sent to stdout. Redirect to file with:`);
    console.error(`  node scripts/generate-city-content-sql.cjs > city-content.sql`);
  }
}

main().catch(console.error);
