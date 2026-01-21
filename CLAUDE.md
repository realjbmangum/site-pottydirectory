# Potty Directory - Claude Code Context

## Project Overview
The largest directory of portable restroom rental companies across the United States.

**Live URL:** https://www.pottydirectory.com (canonical, non-www)
**Preview URL:** https://pottyallthetime.pages.dev
**GitHub:** realjbmangum/pottyallthetime (note: repo name differs from folder name)

## Tech Stack
- **Framework:** Astro 4.x
- **Styling:** Tailwind CSS 3.x
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Cloudflare Pages
- **Analytics:** Google Analytics (G-1VDEQX7WJS)
- **Monetization:** Google AdSense (ca-pub-2962780862577949)

## Commands
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Environment Variables
Required in `.env`:
```
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=xxx
```

## Key Files & Routes

### Core Files
- `src/lib/supabase.ts` - Database queries with pagination
- `src/data/site-config.json` - Site configuration (name, colors, stats)
- `src/data/states.json` - US states data
- `src/data/categories.json` - Service categories
- `src/data/top-cities.json` - Featured cities
- `src/data/blog-posts.json` - Blog metadata

### Page Routes
- `/` - Homepage (`src/pages/index.astro`)
- `/[state]` - State listing pages
- `/[state]/[city]` - City listing pages
- `/[state]/[city]/[vendor]` - Vendor detail pages
- `/services` - Service categories index
- `/services/[slug]` - Individual service pages
- `/blog` - Blog index
- `/blog/[slug].astro` - Individual blog posts
- `/faq` - FAQ index
- `/faq/[slug]` - Individual FAQ pages
- `/calculator` - Porta potty calculator tool
- `/pricing` - Pricing guide
- `/search` - Search results
- `/submit` - Vendor submission form
- `/contact` - Contact form

### Key Components
- `SEOHead.astro` - Meta tags and structured data
- `VendorCard.astro` - Vendor listing card
- `ServiceCard.astro` - Service category card
- `StateMap.astro` / `NationalMap.astro` - Interactive maps
- `Header.astro` / `Footer.astro` - Layout components
- `Breadcrumb.astro` - Navigation breadcrumbs

## Database Schema

### `potty` table (vendors)
1,400+ vendor listings with pagination required (Supabase 1000-row limit)
```
id, business_name, slug, city, state, phone, email, website
street_address, postal_code, latitude, longitude
rating, review_count, photo_url, hours, description
services_offered (array), featured, verified
has_luxury, has_ada, has_trailer, serves_construction, serves_events
facebook_url, instagram_url, linkedin_url, twitter_url
enriched_at, created_at
```

### `submissions` table
Vendor submission requests: `business_name, contact_name, contact_email, city, state, phone, website, services_offered, description, status (pending/approved/rejected)`

### `contact_messages` table
Contact form submissions: `name, email, message`

### `content_questions` table
FAQs and blog content: `question, category, answer_short, answer_long, content_type (faq/blog), status (draft/review/published), site_id`

### `city_content` table
SEO content for city pages: `city, state, intro_paragraph, local_tips, peak_season, popular_for, status`

## Design System
- **Primary:** Blue (#2563eb)
- **Secondary:** Slate (#64748b)
- **Font:** Fredoka for display text
- **Dark sections:** slate-900 background
- **Cards:** rounded-2xl with shadow-lg hover effects

### Service Card Colors
- Construction: Orange (#f97316)
- Events: Purple (#8b5cf6)
- Weddings: Pink (#ec4899)
- Emergency: Red (#ef4444)
- Long-term: Green (#22c55e)
- Luxury: Yellow/Gold (#eab308)

## Deployment
- Push to `main` branch auto-deploys to Cloudflare Pages
- Preview branches get auto-built (e.g., `redesign.pottyallthetime.pages.dev`)

## Important Patterns
- **Pagination required**: Always paginate when fetching vendors (see `getVendors()` in supabase.ts)
- **Empty pages**: City pages with no vendors have `noindex` meta tag
- **Blog author**: All blog posts use author byline "Port Pottimer"
- **Featured vendors**: Homepage shows featured vendors (fallback: highest-rated with 10+ reviews if none flagged)
- **Canonical URLs**: Use non-www domain (https://pottydirectory.com)

## Session History
All session summaries consolidated in `SESSION-HISTORY.md` (reverse chronological order)
