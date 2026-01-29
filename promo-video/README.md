# Potty Directory - WWETT 2026 Promo Video

Professional promo video for Potty Directory targeting WWETT 2026 trade show attendees.

## Video Overview

**Duration:** 20 seconds
**Formats:** Horizontal (1920x1080), Vertical (1080x1920), Square (1080x1080)

### Scenes:

1. **Welcome (0-2s)** - WWETT welcome with Potty Directory branding
2. **Stats (2-6s)** - Animated key statistics (4,500+ listings, 50 states, 25K searches, 500 leads/month)
3. **Benefits (6-10s)** - 6 reasons to list (free listing, featured placement, verified badge, SEO, leads, mobile-first)
4. **Comparison (10-14s)** - Basic vs Featured listing side-by-side
5. **CTA (14-18s)** - QR code, "Scan to see your listing", PottyDirectory.com
6. **WWETT Special (18-20s)** - 20% off first year promotion

## Quick Start

### Preview in Browser
```bash
npm start
```

This opens http://localhost:3000 where you can see all 3 compositions and scrub through the timeline.

### Render Videos

**Horizontal (YouTube, presentations):**
```bash
npm run build-horizontal
```

**Vertical (TikTok, Reels, Stories):**
```bash
npm run build-vertical
```

**Both:**
```bash
npm run build-horizontal && npm run build-vertical
```

Rendered videos will be in `out/` folder.

## Customization

### Change Duration
Edit `durationInFrames` in `src/Root.tsx` (currently 600 frames = 20 seconds at 30fps)

### Change Colors
Brand colors defined at top of `src/WWETTPromo.tsx`:
- `BLUE = "#2563eb"` (primary)
- `GOLD = "#fbbf24"` (accent)
- `SLATE = "#64748b"` (text)

### Adjust Timing
Each `<Sequence>` in `src/WWETTPromo.tsx` controls scene timing:
```tsx
<Sequence from={0} durationInFrames={60}> // 0-2 seconds
```

### Add Real QR Code
Replace placeholder in CTAScene with actual QR image:
```tsx
<Img src={staticFile("qr-code.png")} style={{ width: 400, height: 400 }} />
```

## File Structure

```
promo-video/
├── src/
│   ├── index.ts           # Entry point
│   ├── Root.tsx           # Composition registry
│   └── WWETTPromo.tsx     # Main video component
├── public/
│   ├── WWETT-Potty Directory.png
│   └── wwett-logo.webp
├── out/                   # Rendered videos go here
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Tips

- **Preview is key**: Use `npm start` to iterate quickly
- **Frame-based**: Everything is controlled by frame numbers (30fps = 30 frames per second)
- **Spring animations**: More natural than linear - used throughout for smooth motion
- **Sequences**: Each scene is its own component in a Sequence for easy timing control

## Export Specs

All videos render at:
- **FPS:** 30
- **Format:** MP4 (H.264)
- **Quality:** High (suitable for social media and presentations)

## Next Steps

1. Run `npm start` to preview
2. Adjust timing/colors/text as needed
3. Add real QR code image if desired
4. Render final videos with `npm run build-horizontal` and `npm run build-vertical`
5. Upload to social media or use in presentations!
