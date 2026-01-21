-- Delete duplicate records from potty table
-- Generated: 2025-12-28T14:32:45.305Z
-- Total to delete: 27

-- REVIEW CAREFULLY BEFORE RUNNING!

BEGIN;

-- Royal Restrooms Savannah/Hilton Head Island (Garden City, Georgia)
-- Reason: Duplicate of 02541a30-163e-464d-abda-59acc1288b51 (lower score: 38 vs 58)
DELETE FROM potty WHERE id = '862aea16-6e75-468e-a915-ac2c22a0c846';

-- McGraw Event Pros (Moncks Corner, South Carolina)
-- Reason: Duplicate of 03b52d89-1096-47f3-b484-bfa13aba771d (lower score: 38 vs 56)
DELETE FROM potty WHERE id = '8ebb371d-8566-468d-819d-d8b61a094f25';

-- Elvis Service Company (Myrtle Beach, South Carolina)
-- Reason: Duplicate of 418f4fae-a571-4d7a-83e6-93f503e91ef8 (lower score: 38 vs 57)
DELETE FROM potty WHERE id = '044b9e8b-037e-4d7e-a019-06ca6621a9a1';

-- OnSite Companies, LLC (Hardeeville, South Carolina)
-- Reason: Duplicate of 87df0f91-4d44-41a6-830e-5459e76bfabd (lower score: 38 vs 54)
DELETE FROM potty WHERE id = '08059750-154f-46ca-a93d-54ff8f0b8776';

-- Halftime Rentals (Denver, North Carolina)
-- Reason: Duplicate of 084c3eb4-2d6a-4199-a10e-b68d7c0ad43a (lower score: 38 vs 63)
DELETE FROM potty WHERE id = '10727a03-c40a-47bf-843f-c9c0e5ee2c60';

-- Honey Bucket (Salem, Oregon)
-- Reason: Duplicate of 1965dafc-238b-4ef2-97db-9a3dff0c5d93 (lower score: 35 vs 38)
DELETE FROM potty WHERE id = '1087abfa-0dfa-4d7d-941d-2caadf4e85f2';

-- Safety Quip (Memphis, Tennessee)
-- Reason: Duplicate of 13d72eb7-d82b-4c46-9902-80908797c8e0 (lower score: 33 vs 48)
DELETE FROM potty WHERE id = '2aca7c2f-94d8-439f-aec8-50aaa8d4bec4';

-- Backwoods Portalet Rentals, LLC (St George, South Carolina)
-- Reason: Duplicate of 8b6b4765-b204-41d9-b6b3-5d0f85fd810f (lower score: 28 vs 33)
DELETE FROM potty WHERE id = '16200815-729a-44a8-ad10-366cc3892a8a';

-- BAR Environmental Services LLC (Wellford, South Carolina)
-- Reason: Duplicate of 3c2759a0-7ea5-464e-86b8-329d2413a652 (lower score: 38 vs 56)
DELETE FROM potty WHERE id = '1a1303e5-22c5-4d3d-b249-cdb2f904d163';

-- TOI TOI USA (Florence, South Carolina)
-- Reason: Duplicate of ece4b649-fa36-415b-b155-3c2f3734e6bc (lower score: 38 vs 50)
DELETE FROM potty WHERE id = '3136b3f2-1405-4500-b016-03bcbe9d5cd6';

-- Portable Restroom Trailers, LLC (Lake Wylie, South Carolina)
-- Reason: Duplicate of 3b611126-ab82-4c9b-b52d-91eb7876f029 (lower score: 38 vs 63)
DELETE FROM potty WHERE id = '339a0536-bf12-4f2c-9697-f1c00d4858b7';

-- Right A Way Sewer Service (Joplin, Missouri)
-- Reason: Duplicate of 3638c484-57f5-49a5-ab17-4f85c9586c06 (lower score: 38 vs 38)
DELETE FROM potty WHERE id = '53dc9b17-3e4f-4b0a-899a-eccef14ee9cd';

-- Toilets of Charleston LLC (Summerville, South Carolina)
-- Reason: Duplicate of 38984bf8-9dab-4362-a5a7-77c4411e71bd (lower score: 38 vs 38)
DELETE FROM potty WHERE id = 'e83d2dd6-5c2c-4eef-8468-359f93e9f734';

-- Access Portable Toilets (North Charleston, South Carolina)
-- Reason: Duplicate of 3a457da3-af1d-4137-a693-38b529016ae0 (lower score: 38 vs 68)
DELETE FROM potty WHERE id = '3b7190e3-5c19-4f0e-bd6e-e9287f3d3949';

-- Barnhill's Services Inc. (Lexington, South Carolina)
-- Reason: Duplicate of e50324e7-2afc-44fb-86c5-b23378c238ec (lower score: 38 vs 48)
DELETE FROM potty WHERE id = '4347a742-4f50-4eb0-b7bb-4ff4b0bf908b';

-- Turner Sanitation, Inc. (Lake Orion, Michigan)
-- Reason: Duplicate of 4a785ba3-760f-4780-a632-45ff0764eb90 (lower score: 38 vs 71)
DELETE FROM potty WHERE id = 'dd1d1816-f30d-4ced-80f0-55ced92ade16';

-- AMERI-CANS (Summerville, South Carolina)
-- Reason: Duplicate of 4b919657-50b3-429a-876d-f1565ced1a90 (lower score: 8 vs 31)
DELETE FROM potty WHERE id = 'd23badb4-0bb3-4efe-82d3-5f73148b9fae';

-- Portable Toilets Champ (Charlotte, North Carolina)
-- Reason: Duplicate of 54f3f1c3-d29b-483c-a437-00db8881abf5 (lower score: 38 vs 73)
DELETE FROM potty WHERE id = 'b37f6e82-65ae-4d1d-a6c2-2a204e358d8b';

-- West Haven Portable Toilet (West Haven, Connecticut)
-- Reason: Duplicate of 5cb43602-5b00-4998-932d-91bc85309148 (lower score: 28 vs 28)
DELETE FROM potty WHERE id = '65c23f81-dd12-42c0-bea7-682a834eb011';

-- Party John LLC (Anderson, South Carolina)
-- Reason: Duplicate of 94568853-459a-4c76-86f3-590c783f046f (lower score: 38 vs 48)
DELETE FROM potty WHERE id = '7460b04f-d9a1-4f3c-82d7-2a7a03a1dd35';

-- Charleston Restroom Trailers (Huger, South Carolina)
-- Reason: Duplicate of 89998cc8-65db-4e7d-842a-64832da713a5 (lower score: 38 vs 66)
DELETE FROM potty WHERE id = '82cbf1a5-6de6-46cd-9a52-70f5547de70a';

-- Palmetto Portables (Myrtle Beach, South Carolina)
-- Reason: Duplicate of f8b4f518-196b-465b-8abf-cb9197c9861f (lower score: 38 vs 68)
DELETE FROM potty WHERE id = '856d8a55-0197-40d7-80ab-8e8e3fce5279';

-- Chastains Septic Tank Services, LLC and Chastain's Portable Toilets, LLC (Anderson, South Carolina)
-- Reason: Duplicate of d32db49c-9425-4859-b30f-f7a245e817b9 (lower score: 18 vs 35)
DELETE FROM potty WHERE id = '87d738c0-015d-43e7-9aa8-81a22da8d699';

-- Portable Services, Inc. - Columbia (Columbia, South Carolina)
-- Reason: Duplicate of 93c3651f-d01f-4a9f-b888-841440395afe (lower score: 38 vs 48)
DELETE FROM potty WHERE id = 'db83d3d6-a8ab-40c4-868f-08b2648aaf4a';

-- Ricky's Portable Toilet Solutions (Myrtle Beach, South Carolina)
-- Reason: Duplicate of d7ba98cb-e23f-425a-b602-adda190a7c31 (lower score: 28 vs 51)
DELETE FROM potty WHERE id = 'b255cc68-c76b-4329-8b9a-db8a46104ded';

-- Pushup Toilet Rentals (Columbia, South Carolina)
-- Reason: Duplicate of cd223216-d4e2-4ed8-b15e-cc33c97ed2b4 (lower score: 23 vs 48)
DELETE FROM potty WHERE id = 'b726086d-1e9c-4933-907c-65f278aa5cae';

-- Grand Restrooms (Clover, South Carolina)
-- Reason: Duplicate of cf15ba64-2915-4be3-be33-cba13e9295c1 (lower score: 38 vs 73)
DELETE FROM potty WHERE id = 'e6f2d64c-232e-4764-b228-0fe8f8be107d';

COMMIT;

-- Deleted 27 duplicate records