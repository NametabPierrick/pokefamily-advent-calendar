## Pokefamily Advent Calendar (Astro)

Astro site for a family Advent calendar. Each person has a dedicated page that unlocks daily LEGO instruction pages based on real-world dates (1–24 décembre). Past days stay visible.

### Dev quickstart

```bash
npm install
npm run dev
```

If you need to fake the date while developing, append `?debugDate=2024-12-05` (YYYY-MM-DD) to any member page URL.

### Configure the calendars

Edit `src/data/members.ts`:
- `totalPieces`: total LEGO pieces allocated to that person.
- `setName`: the set or combined builds shown on the selection screen.
- `days`: the 24-day plan, including an estimated piece count and one or more instruction-page ranges.

The 2026 schedules keep complete instruction steps together while distributing the piece counts as evenly as each model allows.

### Using per-page JPGs
- Export each selected PDF page as a four-digit JPG such as `page-0004.jpg`.
- Place instruction sets in `public/instructions/<set>/` and reference that directory from each daily range.
- The app only injects images for unlocked days (lazy), so kids ne peuvent pas deviner les pages futures sans ouvrir les fichiers directement.

### Stack
- Astro (static output)
- Vanilla JS in Astro pages only where needed
- Styling in `src/styles/global.css`
