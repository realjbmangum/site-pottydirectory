-- Create multi-city listings for Northwest Restroom Trailers
-- Customer approved: "great add them all"
--
-- This will create 17 new listings across Washington state
-- Each listing will have its own URL for city-specific searches

-- First, update the existing Chehalis listing to highlight luxury trailer features
UPDATE potty
SET
  has_luxury = true,
  has_trailer = true,
  serves_events = true,
  serves_construction = true
WHERE slug = 'northwest-restroom-trailers-chehalis-washington';

-- Core Service Area (8 new listings)
INSERT INTO potty (
  id, business_name, slug, city, state, phone, website, email,
  street_address, postal_code, latitude, longitude,
  rating, review_count, photo_url, hours, description,
  verified, has_luxury, has_trailer, serves_events, serves_construction,
  created_at, updated_at
) VALUES
-- Tacoma
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-tacoma-washington',
 'Tacoma', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Olympia
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-olympia-washington',
 'Olympia', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Centralia
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-centralia-washington',
 'Centralia', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Longview
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-longview-washington',
 'Longview', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Kelso
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-kelso-washington',
 'Kelso', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Vancouver
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-vancouver-washington',
 'Vancouver', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Aberdeen
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-aberdeen-washington',
 'Aberdeen', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Packwood
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-packwood-washington',
 'Packwood', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Statewide Coverage (9 new listings)

-- Seattle
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-seattle-washington',
 'Seattle', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Bellevue
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-bellevue-washington',
 'Bellevue', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Everett
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-everett-washington',
 'Everett', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Bellingham
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-bellingham-washington',
 'Bellingham', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Spokane
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-spokane-washington',
 'Spokane', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Yakima
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-yakima-washington',
 'Yakima', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Kennewick (Tri-Cities)
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-kennewick-washington',
 'Kennewick', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Richland (Tri-Cities)
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-richland-washington',
 'Richland', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW()),

-- Pasco (Tri-Cities)
(gen_random_uuid(), 'Northwest Restroom Trailers', 'northwest-restroom-trailers-pasco-washington',
 'Pasco', 'Washington', '(360) 345-3717', 'https://www.northwestrestroomtrailers.com/',
 'info@northwestrestroomtrailers.com', '1804 Bishop Rd', '98532', 46.6193775, -122.9176977,
 5, 8, 'https://lh3.googleusercontent.com/p/AF1QipOtQEUvIP_wLucvGh_EhgtOwm15dzduvl7y48MW=w800-h500-k-no',
 '{"Sunday": "Closed", "Monday": "9AM-5PM", "Tuesday": "9AM-5PM", "Wednesday": "9AM-5PM", "Thursday": "Closed", "Friday": "9AM-5PM", "Saturday": "9AM-5PM"}',
 'Restroom trailer rentals for Lewis County, Portland, Seattle, and Cascades weddings, events, long-term, construction & disaster relief. Fast, fair & friendly luxury restroom trailer rentals from a local business.',
 true, true, true, true, true, NOW(), NOW());

-- Expected result: 1 row updated + 17 rows inserted = 18 total Northwest Restroom Trailers listings across Washington
