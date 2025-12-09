-- Potty Directory Database Schema
-- Run this in Supabase SQL Editor

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
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
CREATE TABLE IF NOT EXISTS submissions (
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
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_vendors_state_city ON vendors(state, city);
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_state ON vendors(state);

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

-- Insert sample data (only if vendors table is empty)
INSERT INTO vendors (business_name, city, state, phone, website, services_offered, slug)
SELECT * FROM (VALUES
    ('John''s Johns', 'Birmingham', 'Alabama', '205-555-0123', 'https://johnsjohns.com', ARRAY['Standard Units', 'Handicap Accessible', 'Luxury Trailers'], 'johns-johns'),
    ('Porta Pro', 'Birmingham', 'Alabama', '205-555-0124', 'https://portapro.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers', 'Shower Units'], 'porta-pro'),
    ('Royal Restrooms', 'Mobile', 'Alabama', '251-555-0125', 'https://royalrestrooms.com', ARRAY['Luxury Trailers', 'VIP Units', 'Wedding Packages'], 'royal-restrooms'),
    ('Quick Relief', 'Montgomery', 'Alabama', '334-555-0126', 'https://quickrelief.com', ARRAY['Standard Units', 'Handicap Accessible'], 'quick-relief'),
    ('Elite Portables', 'Huntsville', 'Alabama', '256-555-0127', 'https://eliteportables.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers', 'Shower Units'], 'elite-portables'),
    ('Southern Comfort', 'Atlanta', 'Georgia', '404-555-0128', 'https://southerncomfort.com', ARRAY['Standard Units', 'Handicap Accessible', 'Luxury Trailers'], 'southern-comfort'),
    ('Peach State Portables', 'Atlanta', 'Georgia', '404-555-0129', 'https://peachstateportables.com', ARRAY['Standard Units', 'VIP Trailers'], 'peach-state-portables'),
    ('Georgia Gold', 'Savannah', 'Georgia', '912-555-0130', 'https://georgiagold.com', ARRAY['Standard Units', 'Handicap Accessible', 'Wedding Packages'], 'georgia-gold'),
    ('Sunshine Sanitation', 'Miami', 'Florida', '305-555-0131', 'https://sunshinesanitation.com', ARRAY['Standard Units', 'Handicap Accessible', 'VIP Trailers'], 'sunshine-sanitation'),
    ('Beachside Bathrooms', 'Orlando', 'Florida', '407-555-0132', 'https://beachsidebathrooms.com', ARRAY['Standard Units', 'Luxury Trailers', 'Wedding Packages'], 'beachside-bathrooms')
) AS v(business_name, city, state, phone, website, services_offered, slug)
WHERE NOT EXISTS (SELECT 1 FROM vendors LIMIT 1);
