-- Delete all Ace Hardware listings from the potty table
-- This will remove 309 listings that contain "ace hardware" in the business name
--
-- CAUTION: This is a destructive operation that cannot be undone
-- Review the listings before executing this query
--
-- To preview what will be deleted, first run:
-- SELECT id, business_name, city, state FROM potty WHERE business_name ILIKE '%ace hardware%';

DELETE FROM potty
WHERE business_name ILIKE '%ace hardware%';

-- Expected result: DELETE 309
