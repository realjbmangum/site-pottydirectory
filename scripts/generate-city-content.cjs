#!/usr/bin/env node

/**
 * Generate unique city content for SEO using Claude API
 *
 * Usage:
 *   node scripts/generate-city-content.cjs              # Generate for all top 250 cities
 *   node scripts/generate-city-content.cjs --limit 10   # Generate for first 10 cities
 *   node scripts/generate-city-content.cjs --dry-run    # Preview without saving to DB
 */

const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

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

async function saveCityContent(city, state, content) {
  const { data, error } = await supabase
    .from('city_content')
    .upsert({
      city,
      state,
      intro_paragraph: content.intro_paragraph,
      local_tips: content.local_tips,
      peak_season: content.peak_season,
      popular_for: content.popular_for,
      status: 'published',
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'city,state'
    });

  if (error) throw error;
  return data;
}

async function getExistingCityContent() {
  const { data, error } = await supabase
    .from('city_content')
    .select('city, state');

  if (error) throw error;
  return new Set(data.map(d => `${d.city}|${d.state}`));
}

async function main() {
  console.log('=== City Content Generator ===\n');

  // Load top cities
  const topCities = JSON.parse(fs.readFileSync('data/top-250-cities.json', 'utf8'));

  // Filter out "Unknown" cities
  const validCities = topCities.filter(c =>
    c.city !== 'Unknown' &&
    c.city !== 'US' &&
    c.city.length > 1
  );

  console.log(`Loaded ${validCities.length} valid cities from top 250`);

  // Get existing content to skip
  const existing = await getExistingCityContent();
  console.log(`Found ${existing.size} cities with existing content\n`);

  // Filter to cities needing content
  const needsContent = validCities
    .filter(c => !existing.has(`${c.city}|${c.state}`))
    .slice(startIndex, startIndex + limit);

  console.log(`Will generate content for ${needsContent.length} cities`);
  if (dryRun) console.log('(DRY RUN - not saving to database)\n');
  console.log('');

  let success = 0;
  let failed = 0;

  for (let i = 0; i < needsContent.length; i++) {
    const { city, state, vendor_count } = needsContent[i];
    const progress = `[${i + 1}/${needsContent.length}]`;

    try {
      process.stdout.write(`${progress} ${city}, ${state} (${vendor_count} vendors)... `);

      const content = await generateCityContent(city, state, vendor_count);

      if (!dryRun) {
        await saveCityContent(city, state, content);
        console.log('✓ saved');
      } else {
        console.log('✓ generated');
        console.log(`    intro: "${content.intro_paragraph.substring(0, 60)}..."`);
      }

      success++;

      // Rate limit: wait 500ms between requests
      await new Promise(r => setTimeout(r, 500));

    } catch (error) {
      console.log(`✗ error: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);

  if (!dryRun && success > 0) {
    console.log(`\nContent saved to city_content table in Supabase.`);
    console.log(`Rebuild site to see changes on city pages.`);
  }
}

main().catch(console.error);
