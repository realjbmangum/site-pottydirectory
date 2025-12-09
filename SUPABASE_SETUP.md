# Supabase Setup for Potty Directory

## Steps

1. Create new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in the Supabase dashboard
3. Paste and run the SQL below
4. Copy your credentials from **Settings → API**:
   - Project URL
   - anon/public key
5. Update `.env` file with your credentials
6. Add same credentials to Cloudflare Pages environment variables

---

## SQL Schema

```sql
-- Potty Directory Database Schema
-- Run this in Supabase SQL Editor

-- Create vendors table
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT,
    services_offered TEXT[] NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create submissions table (for new business submissions)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT,
    services_offered TEXT[],
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for faster searches
CREATE INDEX idx_vendors_state_city ON vendors(state, city);
CREATE INDEX idx_vendors_slug ON vendors(slug);
CREATE INDEX idx_vendors_state ON vendors(state);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for vendors
CREATE POLICY "Public can view vendors" ON vendors
    FOR SELECT USING (true);

-- RLS Policies: Public can submit
CREATE POLICY "Public can submit listings" ON submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can send messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Insert sample vendor data
INSERT INTO vendors (business_name, city, state, phone, website, services_offered, slug) VALUES
    ('John''s Johns', 'Birmingham', 'Alabama', '205-555-0123', 'https://johnsjohns.com', ARRAY['Standard Units', 'Handicap Accessible', 'Luxury Trailers'], 'johns-johns'),
    ('Porta Pro', 'Birmingham', 'Alabama', '205-555-0124', 'https://portapro.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers', 'Shower Units'], 'porta-pro'),
    ('Royal Restrooms', 'Mobile', 'Alabama', '251-555-0125', 'https://royalrestrooms.com', ARRAY['Luxury Trailers', 'VIP Units', 'Wedding Packages'], 'royal-restrooms'),
    ('Quick Relief', 'Montgomery', 'Alabama', '334-555-0126', 'https://quickrelief.com', ARRAY['Standard Units', 'Handicap Accessible'], 'quick-relief'),
    ('Elite Portables', 'Huntsville', 'Alabama', '256-555-0127', 'https://eliteportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers', 'Shower Units'], 'elite-portables'),
    ('Southern Comfort Portables', 'Atlanta', 'Georgia', '404-555-0128', 'https://southerncomfortportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'Luxury Trailers'], 'southern-comfort-portables'),
    ('Peach State Portables', 'Atlanta', 'Georgia', '404-555-0129', 'https://peachstateportables.com', ARRAY['Standard Units', 'VIP Trailers'], 'peach-state-portables'),
    ('Georgia Gold Restrooms', 'Savannah', 'Georgia', '912-555-0130', 'https://georgiagoldrestrooms.com', ARRAY['Standard Units', 'Handicap Accessible', 'Wedding Packages'], 'georgia-gold-restrooms'),
    ('Sunshine Sanitation', 'Miami', 'Florida', '305-555-0131', 'https://sunshinesanitation.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers'], 'sunshine-sanitation'),
    ('Beachside Bathrooms', 'Orlando', 'Florida', '407-555-0132', 'https://beachsidebathrooms.com', ARRAY['Standard Units', 'Luxury Trailers', 'Wedding Packages'], 'beachside-bathrooms'),
    ('Lone Star Portables', 'Houston', 'Texas', '713-555-0133', 'https://lonestarportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'Construction Units'], 'lone-star-portables'),
    ('Dallas Restroom Rentals', 'Dallas', 'Texas', '214-555-0134', 'https://dallasrestroomrentals.com', ARRAY['Standard Units', 'VIP Trailers', 'Luxury Trailers'], 'dallas-restroom-rentals'),
    ('Austin Porta Potty Co', 'Austin', 'Texas', '512-555-0135', 'https://austinportapotty.com', ARRAY['Standard Units', 'Handicap Accessible', 'Event Units'], 'austin-porta-potty-co'),
    ('Golden State Sanitation', 'Los Angeles', 'California', '213-555-0136', 'https://goldenstatesanitation.com', ARRAY['Standard Units', 'Luxury Trailers', 'VIP Units'], 'golden-state-sanitation'),
    ('Bay Area Portables', 'San Francisco', 'California', '415-555-0137', 'https://bayareaportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'Eco-Friendly Units'], 'bay-area-portables'),
    ('Empire State Restrooms', 'New York', 'New York', '212-555-0138', 'https://empirestaterestrooms.com', ARRAY['Standard Units', 'Luxury Trailers', 'VIP Trailers'], 'empire-state-restrooms'),
    ('Windy City Portables', 'Chicago', 'Illinois', '312-555-0139', 'https://windycityportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'Construction Units'], 'windy-city-portables'),
    ('Rocky Mountain Restrooms', 'Denver', 'Colorado', '303-555-0140', 'https://rockymountainrestrooms.com', ARRAY['Standard Units', 'VIP Trailers', 'Luxury Trailers'], 'rocky-mountain-restrooms'),
    ('Pacific Northwest Portables', 'Seattle', 'Washington', '206-555-0141', 'https://pnwportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'Eco-Friendly Units'], 'pacific-northwest-portables'),
    ('Desert Sun Sanitation', 'Phoenix', 'Arizona', '602-555-0142', 'https://desertsunsanitation.com', ARRAY['Standard Units', 'Handicap Accessible', 'Construction Units'], 'desert-sun-sanitation');
```

---

## Environment Variables

After running the SQL, update your `.env` file:

```
PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Add the same variables to Cloudflare Pages:
1. Go to your Pages project → Settings → Environment variables
2. Add both variables for Production environment

---

## Tables Created

| Table | Purpose |
|-------|---------|
| `vendors` | Porta potty rental companies (public read) |
| `submissions` | New business submission requests (public insert) |
| `contact_messages` | Contact form messages (public insert) |

## Sample Data

20 sample vendors across 10 states:
- Alabama (5)
- Georgia (3)
- Florida (2)
- Texas (3)
- California (2)
- New York (1)
- Illinois (1)
- Colorado (1)
- Washington (1)
- Arizona (1)
