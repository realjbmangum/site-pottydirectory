-- New Vendor Submission: Mighty Haul Inc
-- Submitted: January 12, 2026
-- Contact: Kenneth Vincent (kenny@mightyhaul.com)

INSERT INTO potty (
  business_name,
  slug,
  city,
  state,
  phone,
  email,
  website,
  description,
  services_offered,
  has_luxury,
  has_ada,
  has_trailer,
  serves_construction,
  serves_events,
  verified
)
VALUES (
  'Mighty Haul Inc',
  'mighty-haul-inc-new-orleans',
  'New Orleans',
  'Louisiana',
  '(504) 570-3007',
  'kenny@mightyhaul.com',
  'https://mightyhaul.com/',
  'Mighty Haul Inc provides professional porta potty rental services in New Orleans, LA and surrounding areas. Kenny and the Mighty Haul team offer standard porta potties, ADA-compliant handicap accessible units, hand wash stations, and holding tanks for construction sites, job sites, events, festivals, renovations, and emergency sanitation needs. Mighty Haul is known for clean units, fast porta potty delivery, reliable service schedules, and responsive local support. Porta potty rentals are available for short-term and long-term use. Roll-off dumpsters are also available as an add-on for construction and cleanup projects.',
  ARRAY['Standard Units', 'Handicap Accessible', 'Luxury Trailers', 'Hand Wash Stations', 'Holding Tanks'],
  true,  -- has_luxury (Luxury Trailers)
  true,  -- has_ada (Handicap Accessible)
  true,  -- has_trailer (Luxury Trailers)
  true,  -- serves_construction (construction sites, job sites)
  true,  -- serves_events (events, festivals)
  false  -- verified (new submission, not yet verified)
);
