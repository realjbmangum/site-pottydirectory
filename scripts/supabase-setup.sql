-- Create vendors table if it doesn't exist
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  features JSONB NOT NULL DEFAULT '{"urinal": false, "handWashing": false, "sanitizer": false, "lockingDoor": false, "mirror": false}',
  type TEXT NOT NULL CHECK (type IN ('Standard', 'Luxury')),
  daily_rate INTEGER NOT NULL CHECK (daily_rate BETWEEN 1 AND 4),
  slug TEXT UNIQUE NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  service_areas TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  years_in_business INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_state ON vendors(state);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON vendors(city);
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_active ON vendors(is_active);
CREATE INDEX IF NOT EXISTS idx_vendors_location ON vendors(latitude, longitude);

-- Create a function for radius search (requires PostGIS extension)
-- Enable PostGIS extension first: CREATE EXTENSION IF NOT EXISTS postgis;

CREATE OR REPLACE FUNCTION vendors_within_radius(
  center_lat DECIMAL,
  center_lng DECIMAL,
  radius_miles DECIMAL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  city TEXT,
  state TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  features JSONB,
  type TEXT,
  daily_rate INTEGER,
  slug TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  service_areas TEXT[],
  rating DECIMAL,
  review_count INTEGER,
  years_in_business INTEGER,
  is_active BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  distance_miles DECIMAL
)
LANGUAGE sql
AS $$
  SELECT *,
    (3959 * acos(
      cos(radians(center_lat)) * 
      cos(radians(latitude)) * 
      cos(radians(longitude) - radians(center_lng)) + 
      sin(radians(center_lat)) * 
      sin(radians(latitude))
    )) AS distance_miles
  FROM vendors
  WHERE is_active = true
    AND latitude IS NOT NULL 
    AND longitude IS NOT NULL
    AND (3959 * acos(
      cos(radians(center_lat)) * 
      cos(radians(latitude)) * 
      cos(radians(longitude) - radians(center_lng)) + 
      sin(radians(center_lat)) * 
      sin(radians(latitude))
    )) <= radius_miles
  ORDER BY distance_miles;
$$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vendors_updated_at 
  BEFORE UPDATE ON vendors 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
