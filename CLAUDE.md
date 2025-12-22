# Potty Directory - Claude Code Context

## Project Overview
The largest directory of portable restroom rental companies across the United States.

**Live URL:** https://www.pottydirectory.com
**Preview URL:** https://pottyallthetime.pages.dev
**GitHub:** realjbmangum/pottyallthetime (note: repo name differs from folder name)

## Tech Stack
- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Cloudflare Pages
- **Analytics:** Google Analytics (G-1VDEQX7WJS)
- **Monetization:** Google AdSense (pending approval)

## Key Files
- `src/pages/index.astro` - Homepage (redesigned Dec 2024)
- `src/lib/supabase.ts` - Database queries with pagination
- `src/data/site-config.json` - Site configuration
- `src/data/states.json` - US states data
- `src/data/categories.json` - Service categories

## Database
Table: `potty` in Supabase
- Contains 1,400+ vendor listings
- Key columns: `name`, `city`, `state`, `phone`, `rating`, `reviews`, `featured`, `verified`
- Pagination required (Supabase 1000-row default limit)

## Design System
- **Primary color:** Blue (#2563eb)
- **Brand color:** Green (#138d57)
- **Font:** Fredoka for display text
- **Dark sections:** slate-900 background
- **Cards:** rounded-2xl with hover effects

### Service Card Colors
- Construction: Orange
- Events: Purple
- Weddings: Pink
- Emergency: Red
- Long-term: Green
- Luxury: Yellow/Gold

## Deployment
- Push to `main` branch auto-deploys to Cloudflare Pages
- Preview branches get auto-built (e.g., `redesign.pottyallthetime.pages.dev`)

## Important Notes
- Always use pagination when fetching vendors (see `getVendors()` in supabase.ts)
- Empty city pages have `noindex` meta tag
- Blog posts require author byline ("Port Pottimer")
- Featured vendors show on homepage (fallback: highest-rated if none flagged)

## Session Summaries
- `SESSION-SUMMARY-2024-12-09.md` - Initial launch, SEO setup
- `SESSION-SUMMARY-2024-12-10.md` - Blog section, email outreach skill
- `SESSION-SUMMARY-2024-12-18.md` - Pagination fix, featured/verified flags
- `SESSION-SUMMARY-2024-12-21.md` - Homepage redesign
