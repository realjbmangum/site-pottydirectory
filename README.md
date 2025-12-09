# Potty Directory

The largest directory of portable restroom rental companies across the United States.

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Hosting**: Cloudflare Pages

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

Run the SQL in `supabase_setup.sql` to create the vendors table.

## Deployment

Connected to Cloudflare Pages for automatic deployments on push to main.

## License

All rights reserved.
