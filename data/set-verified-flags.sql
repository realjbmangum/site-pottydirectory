-- Set verified=true for all Classy Pottys and Barnes Sewer & Septic listings
-- Run this if the verified flag wasn't set during initial insert

-- Classy Pottys - all Vermont and New York listings
UPDATE potty
SET verified = true
WHERE business_name = 'Classy Pottys';

-- Barnes Sewer & Septic Service LLC - all Indiana and Ohio listings
UPDATE potty
SET verified = true
WHERE business_name = 'Barnes Sewer & Septic Service LLC';
