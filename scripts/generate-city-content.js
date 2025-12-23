/**
 * Generate City-Specific SEO Content
 *
 * This script generates unique intro paragraphs and local tips
 * for city pages to improve local SEO rankings.
 *
 * Usage:
 *   node scripts/generate-city-content.js              # Process all draft cities
 *   node scripts/generate-city-content.js --city "Austin" --state "Texas"  # Single city
 *   node scripts/generate-city-content.js --limit 10   # Process first 10
 *
 * Requires: ANTHROPIC_API_KEY in .env
 */

import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

// Initialize clients
const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

if (!anthropicKey) {
  console.error('Missing ANTHROPIC_API_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const anthropic = new Anthropic({ apiKey: anthropicKey });

// Parse command line args
const args = process.argv.slice(2);
const cityArg = args.includes('--city') ? args[args.indexOf('--city') + 1] : null;
const stateArg = args.includes('--state') ? args[args.indexOf('--state') + 1] : null;
const limitArg = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : null;
const dryRun = args.includes('--dry-run');

// Get vendor count for a city
async function getVendorCount(city, state) {
  const { count } = await supabase
    .from('potty')
    .select('*', { count: 'exact', head: true })
    .eq('city', city)
    .eq('state', state);
  return count || 0;
}

// Get services offered in a city
async function getCityServices(city, state) {
  const { data } = await supabase
    .from('potty')
    .select('services_offered')
    .eq('city', city)
    .eq('state', state);

  if (!data || data.length === 0) return [];

  const allServices = data.flatMap(v => v.services_offered || []);
  const serviceCounts = {};
  allServices.forEach(s => {
    serviceCounts[s] = (serviceCounts[s] || 0) + 1;
  });

  return Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([service]) => service);
}

// Generate content using Claude
async function generateCityContent(city, state, stateAbbr, vendorCount, topServices) {
  const prompt = `Generate SEO-optimized content for a porta potty rental directory page for ${city}, ${state}.

Context:
- City: ${city}, ${stateAbbr}
- Number of local providers listed: ${vendorCount}
- Top services offered locally: ${topServices.join(', ') || 'Standard porta potties, luxury trailers, ADA units'}

Generate the following in JSON format:

{
  "intro_paragraph": "2-3 sentences introducing porta potty rentals in this specific city. Mention what makes this city unique (events, construction growth, outdoor culture, etc). Be specific to this city, not generic. Do not mention the number of providers.",

  "local_tips": "2-3 sentences with practical local tips. Could include: best time to book, local permit considerations, weather factors, or peak seasons for this area.",

  "peak_season": "One of: 'Spring and summer', 'Year-round', 'Festival season (March-October)', 'Construction season (April-November)', or similar",

  "popular_for": ["array", "of", "3-5", "use cases like 'construction', 'weddings', 'festivals', 'film_production', 'corporate_events'"]
}

Important:
- Be specific to ${city} - mention real neighborhoods, landmarks, or regional characteristics if you know them
- Keep intro_paragraph to 2-3 sentences max
- Keep local_tips practical and actionable
- Return ONLY valid JSON, no markdown or explanation`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0].text;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(`Error generating content for ${city}, ${state}:`, error.message);
    return null;
  }
}

// Process a single city
async function processCity(cityRow) {
  const { city, state, state_abbr } = cityRow;

  console.log(`\nProcessing: ${city}, ${state_abbr}...`);

  // Get local data
  const vendorCount = await getVendorCount(city, state);
  const topServices = await getCityServices(city, state);

  console.log(`  - Vendors: ${vendorCount}`);
  console.log(`  - Top services: ${topServices.join(', ') || 'None'}`);

  // Generate content
  const content = await generateCityContent(city, state, state_abbr, vendorCount, topServices);

  if (!content) {
    console.log(`  ❌ Failed to generate content`);
    return false;
  }

  console.log(`  ✓ Generated intro: "${content.intro_paragraph.slice(0, 60)}..."`);

  if (dryRun) {
    console.log(`  [DRY RUN] Would update city_content`);
    console.log(JSON.stringify(content, null, 2));
    return true;
  }

  // Update database
  const { error } = await supabase
    .from('city_content')
    .update({
      intro_paragraph: content.intro_paragraph,
      local_tips: content.local_tips,
      peak_season: content.peak_season,
      popular_for: content.popular_for,
      status: 'review',
      generated_at: new Date().toISOString()
    })
    .eq('city', city)
    .eq('state', state);

  if (error) {
    console.error(`  ❌ Database error:`, error.message);
    return false;
  }

  console.log(`  ✓ Saved to database (status: review)`);
  return true;
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('CITY CONTENT GENERATOR');
  console.log('='.repeat(60));

  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No changes will be saved\n');
  }

  let query = supabase
    .from('city_content')
    .select('*')
    .eq('status', 'draft')
    .order('city');

  // Filter by specific city if provided
  if (cityArg && stateArg) {
    query = supabase
      .from('city_content')
      .select('*')
      .eq('city', cityArg)
      .eq('state', stateArg);
  }

  if (limitArg) {
    query = query.limit(limitArg);
  }

  const { data: cities, error } = await query;

  if (error) {
    console.error('Error fetching cities:', error.message);
    process.exit(1);
  }

  if (!cities || cities.length === 0) {
    console.log('\nNo cities to process. Make sure city_content table has rows with status=draft');
    process.exit(0);
  }

  console.log(`\nFound ${cities.length} cities to process`);

  let success = 0;
  let failed = 0;

  for (const city of cities) {
    const result = await processCity(city);
    if (result) {
      success++;
    } else {
      failed++;
    }

    // Rate limiting - wait 1 second between API calls
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('COMPLETE');
  console.log('='.repeat(60));
  console.log(`Processed: ${success + failed}`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
