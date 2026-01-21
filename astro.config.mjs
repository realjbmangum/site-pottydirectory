import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Filter out pages that shouldn't be in sitemap
      // Note: Empty city pages are no longer generated (fixed in getStaticPaths)
      // This filter is a safety net for any edge cases
      filter: (page) => {
        // Exclude any API routes (if they exist)
        if (page.includes('/api/')) return false;
        // Exclude search results page (dynamic content)
        if (page.includes('/search')) return false;
        // Include everything else
        return true;
      },
      // Customize priority for different page types
      serialize(item) {
        // Home page gets highest priority
        if (item.url === 'https://pottydirectory.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // State pages
        else if (item.url.match(/^https:\/\/pottydirectory\.com\/[a-z-]+\/?$/)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // City pages
        else if (item.url.match(/^https:\/\/pottydirectory\.com\/[a-z-]+\/[a-z-]+\/?$/)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Vendor pages
        else if (item.url.match(/^https:\/\/pottydirectory\.com\/[a-z-]+\/[a-z-]+\/[a-z0-9-]+\/?$/)) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Service pages
        else if (item.url.includes('/services/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Utility pages (calculator, pricing, faq)
        else if (item.url.match(/\/(calculator|pricing|faq|states)\/?$/)) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  output: 'static',
  site: 'https://pottydirectory.com',
  trailingSlash: 'always',
});
