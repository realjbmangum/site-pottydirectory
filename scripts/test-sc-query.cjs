const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log('Missing env vars');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase
    .from('potty')
    .select('business_name, city, state')
    .eq('state', 'South Carolina')
    .limit(30);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('SC Vendors in Supabase:', data?.length || 0);
  data?.forEach(v => console.log('  -', v.business_name, '(' + v.city + ')'));
}

test();
