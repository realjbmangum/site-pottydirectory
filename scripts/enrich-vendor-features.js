#!/usr/bin/env node

/**
 * Enrich Vendor Features
 *
 * Uses Claude AI to analyze vendor websites and extract service capabilities.
 * Updates the following flags in the database:
 * - has_luxury: Luxury/VIP restrooms
 * - has_ada: ADA/handicap accessible units
 * - has_trailer: Restroom trailers
 * - serves_construction: Construction site rentals
 * - serves_events: Events/weddings/parties
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Rate limiting
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds between API calls

async function fetchWebsiteContent(url) {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PottyDirectory/1.0; +https://pottydirectory.com)'
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // Extract text content (simple HTML stripping)
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 15000); // Limit content size

    return text;
  } catch (error) {
    console.error(`  ✗ Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

async function analyzeWithClaude(businessName, websiteContent) {
  const prompt = `Analyze this portable restroom rental company's website content and determine which services they offer.

Company: ${businessName}

Website Content:
${websiteContent}

Based on the website content, respond with a JSON object indicating which services this company offers. Only set a flag to true if there is clear evidence on the website. If uncertain, set to false.

{
  "has_luxury": false,      // Luxury restrooms, VIP units, upscale trailers, executive restrooms
  "has_ada": false,         // ADA compliant, handicap accessible, wheelchair accessible units
  "has_trailer": false,     // Restroom trailers, mobile restroom trailers (not just portable toilets)
  "serves_construction": false,  // Construction site rentals, job site services, contractor services
  "serves_events": false    // Events, weddings, parties, festivals, outdoor gatherings
}

Respond with ONLY the JSON object, no other text.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0].text.trim();

    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(`  ✗ Claude analysis failed: ${error.message}`);
    return null;
  }
}

async function updateVendor(vendorId, features) {
  const { error } = await supabase
    .from('potty')
    .update({
      has_luxury: features.has_luxury,
      has_ada: features.has_ada,
      has_trailer: features.has_trailer,
      serves_construction: features.serves_construction,
      serves_events: features.serves_events,
      enriched_at: new Date().toISOString()
    })
    .eq('id', vendorId);

  if (error) {
    console.error(`  ✗ Database update failed: ${error.message}`);
    return false;
  }
  return true;
}

async function getVendorsToEnrich(limit = 100) {
  const { data, error } = await supabase
    .from('potty')
    .select('id, business_name, website')
    .not('website', 'is', null)
    .is('enriched_at', null)
    .limit(limit);

  if (error) {
    throw error;
  }

  // Filter out empty websites
  return data.filter(v => v.website && v.website.trim().length > 0);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('============================================================');
  console.log('VENDOR FEATURE ENRICHMENT');
  console.log('============================================================\n');

  // Get count of vendors needing enrichment
  const { count: totalCount } = await supabase
    .from('potty')
    .select('*', { count: 'exact', head: true })
    .not('website', 'is', null)
    .is('enriched_at', null);

  console.log(`Found ${totalCount} vendors with websites needing enrichment\n`);

  if (totalCount === 0) {
    console.log('No vendors to enrich!');
    return;
  }

  const processLimit = parseInt(process.argv[2]) || 50;
  console.log(`Processing up to ${processLimit} vendors...\n`);

  const vendors = await getVendorsToEnrich(processLimit);

  let processed = 0;
  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const vendor of vendors) {
    processed++;
    console.log(`[${processed}/${vendors.length}] ${vendor.business_name}`);
    console.log(`  Website: ${vendor.website}`);

    // Fetch website content
    const content = await fetchWebsiteContent(vendor.website);

    if (!content || content.length < 100) {
      console.log('  ✗ Skipped: Could not fetch website or content too short');
      skipped++;
      await sleep(500); // Small delay even on skip
      continue;
    }

    console.log(`  ✓ Fetched ${content.length} chars`);

    // Analyze with Claude
    const features = await analyzeWithClaude(vendor.business_name, content);

    if (!features) {
      console.log('  ✗ Skipped: Analysis failed');
      skipped++;
      await sleep(DELAY_BETWEEN_REQUESTS);
      continue;
    }

    // Log detected features
    const detected = Object.entries(features)
      .filter(([_, v]) => v === true)
      .map(([k, _]) => k);

    if (detected.length > 0) {
      console.log(`  ✓ Detected: ${detected.join(', ')}`);
    } else {
      console.log('  ○ No specific features detected');
    }

    // Update database
    const updated = await updateVendor(vendor.id, features);

    if (updated) {
      console.log('  ✓ Saved to database');
      success++;
    } else {
      failed++;
    }

    console.log('');

    // Rate limiting
    await sleep(DELAY_BETWEEN_REQUESTS);
  }

  console.log('============================================================');
  console.log('COMPLETE');
  console.log('============================================================');
  console.log(`Processed: ${processed}`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`\nRemaining: ${totalCount - processed}`);
}

main().catch(console.error);
