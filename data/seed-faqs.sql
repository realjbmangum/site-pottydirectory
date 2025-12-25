-- Seed FAQs for Potty Directory
-- Run this in Supabase SQL Editor

INSERT INTO content_questions (site_id, question, category, source, priority, score, content_type, status, answer_short, suggested_word_count, created_at) VALUES

-- PRICING CATEGORY
('potty', 'How much does it cost to rent a porta potty?', 'pricing', 'research', 'high', 99, 'faq', 'published',
'<p>Standard porta potty rentals typically cost <strong>$75-$150 per week</strong> or <strong>$150-$250 per month</strong>. Weekend event rentals range from <strong>$100-$200</strong>. Prices vary based on your location, rental duration, and unit type.</p>
<p>Factors that affect pricing include:</p>
<ul>
<li><strong>Location:</strong> Urban areas and remote locations may cost more due to delivery logistics</li>
<li><strong>Duration:</strong> Longer rentals often have lower daily rates</li>
<li><strong>Unit type:</strong> Luxury trailers and ADA units cost more than standard units</li>
<li><strong>Servicing frequency:</strong> More frequent cleaning increases costs</li>
</ul>',
150, NOW()),

('potty', 'What is included in a porta potty rental?', 'pricing', 'research', 'high', 95, 'faq', 'published',
'<p>A standard porta potty rental typically includes:</p>
<ul>
<li><strong>The unit itself:</strong> A clean, sanitized portable restroom</li>
<li><strong>Delivery and pickup:</strong> Transportation to and from your location</li>
<li><strong>Basic supplies:</strong> Toilet paper, hand sanitizer, and deodorizer</li>
<li><strong>Weekly servicing:</strong> For rentals longer than one week</li>
</ul>
<p>Additional services like extra cleanings, hand wash stations, or upgraded units are usually available for an extra fee. Always confirm what''s included when you get a quote.</p>',
120, NOW()),

('potty', 'Are there any hidden fees I should know about?', 'pricing', 'research', 'medium', 85, 'faq', 'published',
'<p>Most reputable companies are upfront about pricing, but here are potential additional charges to ask about:</p>
<ul>
<li><strong>Delivery fees:</strong> Some companies charge extra for locations outside their standard service area</li>
<li><strong>Rush delivery:</strong> Same-day or next-day delivery may cost extra</li>
<li><strong>Extended rental:</strong> Keeping the unit longer than agreed may incur daily charges</li>
<li><strong>Damage fees:</strong> You may be responsible for damage beyond normal wear</li>
<li><strong>Permit fees:</strong> Some areas require permits that you''ll need to obtain</li>
</ul>
<p>Get a written quote that itemizes all costs before booking.</p>',
130, NOW()),

-- PLANNING CATEGORY
('potty', 'How many porta potties do I need for my event?', 'planning', 'research', 'high', 99, 'faq', 'published',
'<p>The general rule is <strong>1 porta potty per 50 guests</strong> for events up to 4 hours. Here''s a more detailed breakdown:</p>
<ul>
<li><strong>Up to 4 hours:</strong> 1 unit per 50-100 guests</li>
<li><strong>4-6 hours:</strong> 1 unit per 40-75 guests</li>
<li><strong>6-8+ hours:</strong> 1 unit per 35-50 guests</li>
</ul>
<p>Increase your count if:</p>
<ul>
<li>Alcohol is being served (add 20-30% more units)</li>
<li>The crowd is mostly women (add 20% more units)</li>
<li>Food is being served (increases restroom usage)</li>
</ul>
<p>For construction sites, OSHA requires 1 toilet per 20 workers.</p>',
160, NOW()),

('potty', 'How far in advance should I book a porta potty?', 'planning', 'research', 'high', 90, 'faq', 'published',
'<p>We recommend booking <strong>2-4 weeks in advance</strong> for most rentals. However, timing varies:</p>
<ul>
<li><strong>Large events (100+ guests):</strong> Book 1-2 months ahead</li>
<li><strong>Wedding season (May-October):</strong> Book 2-3 months ahead</li>
<li><strong>Construction projects:</strong> Book 1-2 weeks ahead</li>
<li><strong>Emergency/same-day:</strong> Many providers offer rush service for an extra fee</li>
</ul>
<p>Peak seasons like summer and major holidays book up fast, so plan accordingly.</p>',
120, NOW()),

('potty', 'Where should I place porta potties at my event?', 'planning', 'research', 'medium', 85, 'faq', 'published',
'<p>Strategic placement makes a big difference for guest experience:</p>
<ul>
<li><strong>Accessibility:</strong> Place units on flat, stable ground that''s easy to reach</li>
<li><strong>Distance:</strong> Keep units 50-100 feet from food service areas to minimize odors</li>
<li><strong>Visibility:</strong> Guests should be able to find them easily, but they shouldn''t dominate the view</li>
<li><strong>Truck access:</strong> Ensure the delivery truck can reach the spot (8-10 feet wide path)</li>
<li><strong>Lighting:</strong> For evening events, place near existing lighting or add portable lights</li>
</ul>
<p>Your rental company can help recommend optimal placement based on your venue layout.</p>',
140, NOW()),

-- DELIVERY CATEGORY
('potty', 'When will my porta potty be delivered and picked up?', 'delivery', 'research', 'high', 95, 'faq', 'published',
'<p>Standard delivery and pickup timing:</p>
<ul>
<li><strong>Delivery:</strong> Usually 1-2 days before your event or project start date</li>
<li><strong>Pickup:</strong> Usually 1-2 days after your event ends or project completion</li>
</ul>
<p>You can typically request specific delivery windows. Same-day delivery is available from many providers for an additional fee. For construction sites, units can be delivered the morning work begins.</p>
<p>Always confirm delivery timing when you book, and provide a contact number for the driver.</p>',
110, NOW()),

('potty', 'What do I need to prepare for porta potty delivery?', 'delivery', 'research', 'medium', 80, 'faq', 'published',
'<p>To ensure smooth delivery:</p>
<ul>
<li><strong>Clear access:</strong> Make sure the delivery truck can reach the placement location (minimum 8-foot wide path)</li>
<li><strong>Level ground:</strong> The spot should be relatively flat and stable</li>
<li><strong>Mark the spot:</strong> If you won''t be present, mark where you want units placed</li>
<li><strong>Remove obstacles:</strong> Clear any debris, vehicles, or equipment from the delivery path</li>
<li><strong>Notify security:</strong> If the site has restricted access, arrange entry for the driver</li>
</ul>',
100, NOW()),

-- SERVICING CATEGORY
('potty', 'How often are porta potties cleaned and serviced?', 'servicing', 'research', 'high', 99, 'faq', 'published',
'<p>Servicing frequency depends on usage:</p>
<ul>
<li><strong>Standard weekly service:</strong> For up to 10 users per day, weekly cleaning is sufficient</li>
<li><strong>Twice weekly:</strong> For 10-20 users per day</li>
<li><strong>Daily service:</strong> For high-traffic events or 20+ daily users</li>
<li><strong>Per-event service:</strong> For single-day events, units arrive freshly cleaned</li>
</ul>
<p>Each service visit includes pumping waste, refilling supplies (toilet paper, hand sanitizer), adding deodorizer, and cleaning interior surfaces.</p>',
120, NOW()),

('potty', 'What happens during a porta potty servicing?', 'servicing', 'research', 'medium', 85, 'faq', 'published',
'<p>A complete service visit includes:</p>
<ol>
<li><strong>Waste removal:</strong> The holding tank is pumped out using a vacuum truck</li>
<li><strong>Cleaning:</strong> Interior surfaces are wiped down and sanitized</li>
<li><strong>Deodorizing:</strong> Fresh deodorizer chemicals are added to the tank</li>
<li><strong>Restocking:</strong> Toilet paper, hand sanitizer, and seat covers are refilled</li>
<li><strong>Inspection:</strong> The technician checks for damage or maintenance needs</li>
</ol>
<p>The entire process takes about 10-15 minutes per unit.</p>',
100, NOW()),

-- TYPES CATEGORY
('potty', 'What types of porta potties are available?', 'types', 'research', 'high', 99, 'faq', 'published',
'<p>Rental companies typically offer several options:</p>
<ul>
<li><strong>Standard units:</strong> Basic portable toilets with toilet, urinal, and hand sanitizer. Most affordable option.</li>
<li><strong>Deluxe units:</strong> Larger interior, better ventilation, hand sanitizer dispenser, and mirror.</li>
<li><strong>ADA/Wheelchair accessible:</strong> Larger units with ramps, grab bars, and space for wheelchair access. Required for public events.</li>
<li><strong>Luxury restroom trailers:</strong> Climate-controlled trailers with flushing toilets, running water, mirrors, and premium finishes. Ideal for weddings.</li>
<li><strong>Hand wash stations:</strong> Standalone sinks with running water, soap, and paper towels.</li>
</ul>',
150, NOW()),

('potty', 'What is an ADA-compliant porta potty?', 'types', 'research', 'high', 90, 'faq', 'published',
'<p>ADA-compliant portable restrooms are designed for wheelchair accessibility and meet Americans with Disabilities Act requirements:</p>
<ul>
<li><strong>Size:</strong> Larger interior (approximately 5'' x 5'') with room for wheelchair maneuvering</li>
<li><strong>Access:</strong> Ground-level entry or ramp (no step up)</li>
<li><strong>Grab bars:</strong> Sturdy handrails for support</li>
<li><strong>Door:</strong> Wide door (minimum 32") that opens outward</li>
</ul>
<p><strong>When required:</strong> Public events and construction sites with 20+ workers must have at least one ADA unit. It''s also a best practice for any event to ensure accessibility for all guests.</p>',
130, NOW()),

('potty', 'What is a luxury restroom trailer?', 'types', 'research', 'medium', 85, 'faq', 'published',
'<p>Luxury restroom trailers are premium portable restroom solutions that look and feel like permanent bathrooms:</p>
<ul>
<li><strong>Flushing toilets:</strong> Real porcelain toilets with freshwater flush</li>
<li><strong>Running water:</strong> Sinks with hot and cold water, soap dispensers</li>
<li><strong>Climate control:</strong> Air conditioning and heating</li>
<li><strong>Interior finishes:</strong> Hardwood floors, mirrors, lighting, music</li>
<li><strong>Multiple stalls:</strong> Separate men''s and women''s sections</li>
</ul>
<p>Luxury trailers require a water source and electricity hookup (or generator). They''re popular for weddings, corporate events, and upscale gatherings. Expect to pay $500-$1,500+ per day.</p>',
140, NOW()),

-- REGULATIONS CATEGORY
('potty', 'Do I need a permit for a porta potty?', 'regulations', 'research', 'high', 95, 'faq', 'published',
'<p>Permit requirements vary by location and situation:</p>
<ul>
<li><strong>Private property (residential):</strong> Usually no permit needed for temporary use (home renovation, backyard party)</li>
<li><strong>Public events:</strong> Many cities require event permits that include portable restroom requirements</li>
<li><strong>Construction sites:</strong> Building permits typically cover restroom facilities</li>
<li><strong>HOA communities:</strong> Check your HOA rules - some restrict placement or duration</li>
<li><strong>Street/sidewalk placement:</strong> Requires permits in most cities</li>
</ul>
<p>Always check with your local city or county office. Your rental company can often advise on local requirements.</p>',
130, NOW()),

('potty', 'What are OSHA requirements for construction site restrooms?', 'regulations', 'research', 'high', 90, 'faq', 'published',
'<p>OSHA (Occupational Safety and Health Administration) has specific requirements for construction site sanitation:</p>
<ul>
<li><strong>Ratio:</strong> Minimum 1 toilet per 20 workers</li>
<li><strong>Access:</strong> Workers must have reasonable access (within 10 minutes)</li>
<li><strong>Privacy:</strong> Toilets must have locking doors</li>
<li><strong>Sanitation:</strong> Units must be maintained in sanitary condition</li>
<li><strong>Hand cleaning:</strong> Hand washing or sanitizing facilities required</li>
</ul>
<p>Violations can result in fines of $15,000+ per incident. Most rental companies are familiar with OSHA requirements and can help ensure compliance.</p>',
120, NOW()),

-- HYGIENE CATEGORY
('potty', 'Are porta potties sanitary and safe to use?', 'hygiene', 'research', 'high', 95, 'faq', 'published',
'<p>Yes, properly maintained porta potties are safe to use. Here''s why:</p>
<ul>
<li><strong>Deodorizing chemicals:</strong> The blue liquid contains biocides that kill bacteria and reduce odors</li>
<li><strong>Regular servicing:</strong> Professional cleaning and waste removal prevents buildup</li>
<li><strong>Non-porous surfaces:</strong> Plastic interiors are easy to sanitize</li>
<li><strong>Hand sanitizer:</strong> Most units include alcohol-based hand sanitizer</li>
</ul>
<p>The risk of infection is similar to any public restroom when proper hygiene is practiced. Always use the hand sanitizer provided or wash your hands afterward.</p>',
120, NOW()),

('potty', 'How can I reduce porta potty odors?', 'hygiene', 'research', 'medium', 85, 'faq', 'published',
'<p>Several factors help minimize unpleasant odors:</p>
<ul>
<li><strong>Proper placement:</strong> Position units in shaded areas - heat increases odors</li>
<li><strong>Adequate quantity:</strong> Don''t overload units - more users = more smell</li>
<li><strong>Frequent servicing:</strong> Increase cleaning frequency for high-traffic situations</li>
<li><strong>Ventilation:</strong> Keep vents unblocked and doors closed when not in use</li>
<li><strong>Quality matters:</strong> Rent from reputable companies with well-maintained equipment</li>
</ul>
<p>If odor becomes an issue, contact your rental company for an extra service visit.</p>',
110, NOW()),

('potty', 'What should I do if a porta potty needs emergency service?', 'hygiene', 'research', 'medium', 80, 'faq', 'published',
'<p>If a unit becomes unusable or needs immediate attention:</p>
<ol>
<li><strong>Call your rental company:</strong> Most offer emergency service during business hours</li>
<li><strong>Describe the issue:</strong> Let them know if it''s overflowing, tipped over, or damaged</li>
<li><strong>Block access:</strong> If unsanitary, prevent others from using it until serviced</li>
<li><strong>Document damage:</strong> Take photos if you suspect vandalism for insurance purposes</li>
</ol>
<p>Many companies offer after-hours emergency lines for large events. Ask about this when booking.</p>',
100, NOW()),

-- GENERAL CATEGORY
('potty', 'Can I rent a porta potty for just one day?', 'general', 'research', 'medium', 85, 'faq', 'published',
'<p>Yes! Single-day rentals are available from most companies. Here''s what to know:</p>
<ul>
<li><strong>Minimum rental:</strong> Most companies have a 1-day minimum, but pricing may be similar to weekend rates</li>
<li><strong>Delivery timing:</strong> Units are typically delivered the day before and picked up the day after</li>
<li><strong>Event rentals:</strong> Many companies offer special event packages for single-day use</li>
<li><strong>Last-minute availability:</strong> Same-day rentals are often possible for an additional fee</li>
</ul>
<p>For the best rates, book at least a week in advance even for single-day needs.</p>',
110, NOW()),

('potty', 'Can I move a porta potty after it''s delivered?', 'general', 'research', 'low', 70, 'faq', 'published',
'<p><strong>We don''t recommend moving porta potties yourself.</strong> Here''s why:</p>
<ul>
<li><strong>Weight:</strong> Even empty, units weigh 150-250 lbs and are awkward to move</li>
<li><strong>Spillage risk:</strong> Tilting can cause the holding tank contents to splash or spill</li>
<li><strong>Damage:</strong> You may be liable for any damage caused during moving</li>
<li><strong>Safety:</strong> Improper moving can cause injury</li>
</ul>
<p>If you need a unit relocated, contact your rental company. Many will move it for a small fee or at no charge if the original placement was their error.</p>',
100, NOW()),

('potty', 'What happens if a porta potty is damaged or vandalized?', 'general', 'research', 'low', 65, 'faq', 'published',
'<p>Damage responsibility typically works like this:</p>
<ul>
<li><strong>Normal wear:</strong> The rental company covers normal usage wear</li>
<li><strong>Vandalism/theft:</strong> The renter is usually responsible if the unit is on their property</li>
<li><strong>Weather damage:</strong> Policies vary - ask about this when booking</li>
<li><strong>Graffiti:</strong> May be charged a cleaning fee</li>
</ul>
<p>Review the rental agreement carefully to understand liability terms. For large events, consider asking about damage waivers or event insurance that covers rentals.</p>',
100, NOW());
