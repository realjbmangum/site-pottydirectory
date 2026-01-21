# PRD: Blog Content Expansion for SEO Rankings

**Created:** January 15, 2026
**Status:** Ready for Implementation
**Audience:** Both event planners AND construction/contractors

---

## Overview

Expand the top 3 highest-potential blog posts from ~1,000 words to 2,500+ words each, matching or exceeding competitor content depth. Each post will leverage Potty Directory's unique advantages: directory integration, calculator tool, and comprehensive local provider network.

## Goals

1. Improve search rankings for high-volume porta potty queries
2. Drive traffic to the directory (state/city pages) and calculator tool
3. Capture featured snippets with quick answer boxes and FAQ schema
4. Establish authority over generic competitor content

## Non-Goals

- Creating new blog posts (focus on expanding existing)
- Refreshing all 30 posts (only top 3)
- Building new tools or features

---

## Target Posts (Priority Order)

### 1. How Many Porta Potties Do I Need?
**Current slug:** `/blog/how-many-porta-potties-do-i-need/`
**Search volume:** HIGH (core question everyone asks)
**Current state:** ~1,000 words, basic guide

**Expansion plan:**
- [ ] Add quick answer box at top (featured snippet target)
- [ ] Detailed table: event type × duration × guest count = units needed
- [ ] Construction section with OSHA ratios (1 per 10 workers)
- [ ] Wedding-specific guidance with luxury trailer recommendations
- [ ] Festival/large event calculations (1 per 50 attendees)
- [ ] ADA compliance reminder (1 accessible per 20 units)
- [ ] Prominent CTA to `/calculator/` tool
- [ ] State-specific links: "Find providers in [Texas](/texas/)" etc.
- [ ] Embedded FAQ section (6-8 questions) with FAQPage schema
- [ ] Table of contents for easy navigation

**Competitor benchmark:** portapottycalculator.com, allsiterentals.com
**Target word count:** 2,500-3,000 words

---

### 2. Construction Site Restroom Requirements: OSHA Rules
**Current slug:** `/blog/construction-site-restroom-requirements/`
**Search volume:** MEDIUM-HIGH (B2B, high intent)
**Current state:** ~1,000 words, regulations overview

**Expansion plan:**
- [ ] Quick answer box: "OSHA requires 1 toilet per 20 workers (or 1 per 10 for 40-hour weeks)"
- [ ] Detailed OSHA regulation breakdown (29 CFR 1926.51)
- [ ] Table: worker count × shift length = required units
- [ ] Penalties for non-compliance (fines up to $15,625 per violation)
- [ ] High-rise/multi-floor considerations
- [ ] Hand washing station requirements
- [ ] Servicing frequency for job sites
- [ ] Monthly rental cost expectations (link to pricing post)
- [ ] State-specific notes (California OSHA differences, etc.)
- [ ] CTA: "Find construction porta potty providers near you" → directory
- [ ] Embedded FAQ (6 questions) with schema

**Competitor benchmark:** United Rentals, OSHA.gov references
**Target word count:** 2,500 words

---

### 3. Wedding Restroom Trailer vs Porta Potty
**Current slug:** `/blog/wedding-restroom-trailer-vs-porta-potty/`
**Search volume:** MEDIUM (high commercial intent, emotional buyers)
**Current state:** ~1,000 words, basic comparison

**Expansion plan:**
- [ ] Quick answer box: "Budget $800-2,500 for luxury trailer (150 guests) vs $300-600 for standard units"
- [ ] Side-by-side comparison table (features, cost, guest experience)
- [ ] "When standard porta potties are fine" section
- [ ] "When you need a luxury trailer" section
- [ ] Photo placement/decoration tips
- [ ] Vendor questions checklist for wedding planners
- [ ] How many units for wedding size (50/100/150/200+ guests)
- [ ] Real cost breakdown by wedding size
- [ ] Farm wedding / outdoor venue specific tips
- [ ] Links to providers that offer luxury trailers → directory pages
- [ ] Embedded FAQ (6 questions) with schema

**Competitor benchmark:** TheKnot.com, wasted.earth
**Target word count:** 2,500 words

---

## Content Template (For Each Post)

```
1. Quick Answer Box (featured snippet target)
2. Introduction (why this matters)
3. Table of Contents
4. Main content sections with:
   - Data tables where applicable
   - Real pricing ranges
   - Calculator/directory CTAs
5. State-specific callouts with directory links
6. Embedded FAQ section (6-8 Qs)
7. Bottom line summary
8. Strong CTA (Find providers / Use calculator)
9. Related articles
```

## Technical Requirements

- [ ] FAQPage structured data on each post
- [ ] Article structured data (already exists)
- [ ] Internal links to:
  - `/calculator/` (prominent placement)
  - `/states/` and specific state pages
  - `/faq/` for additional questions
  - Other related blog posts
- [ ] All internal links must have trailing slashes

## Success Metrics

- **Primary:** Improved Google rankings (track in Search Console)
  - "how many porta potties" → Target top 10
  - "porta potty OSHA requirements" → Target top 10
  - "wedding porta potty vs trailer" → Target top 10
- **Secondary:** Increased clicks from Search Console
- **Tertiary:** Traffic to calculator and directory pages

---

## Implementation Order

| Post | Priority | Est. Effort | Dependencies |
|------|----------|-------------|--------------|
| How Many Do I Need | 1 | 2 hours | None |
| OSHA Construction | 2 | 2 hours | None |
| Wedding Comparison | 3 | 2 hours | None |

## Acceptance Criteria

For each expanded post:
- [ ] 2,500+ words of comprehensive content
- [ ] Quick answer box at top
- [ ] At least 2 data tables
- [ ] Table of contents
- [ ] 6+ FAQ items with FAQPage schema
- [ ] 3+ internal links to directory/calculator
- [ ] State-specific callouts (at least 3 states mentioned with links)
- [ ] Mobile-responsive tables
- [ ] Updated `updatedAt` in blog-posts.json

---

## Session Workflow

Each post expansion session:
1. Read current post content
2. Research competitor top-ranking content
3. Draft expanded content following template
4. Add structured data (FAQPage)
5. Test locally (`npm run dev`)
6. Commit and push
7. Mark complete in this PRD

---

## Progress Tracking

| Post | Status | Completed | Notes |
|------|--------|-----------|-------|
| porta-potty-rental-cost | DONE | Jan 15, 2026 | Expanded to 2,500 words |
| how-many-porta-potties-do-i-need | DONE | Jan 15, 2026 | Expanded to 2,800 words |
| construction-site-restroom-requirements | DONE | Jan 15, 2026 | Expanded to 3,000 words |
| wedding-restroom-trailer-vs-porta-potty | DONE | Jan 15, 2026 | Expanded to 2,800 words |
