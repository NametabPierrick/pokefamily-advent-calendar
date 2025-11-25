## Pokefamily Advent Calendar (Astro)

Astro site for a family  advent calendar. Each person has a dedicated page that unlocks their daily instruction pages based on real-world dates (1–24 décembre). Past days stay visible.

### Dev quickstart

```bash
npm install
npm run dev
```

If you need to fake the date while developing, append `?debugDate=2024-12-05` (YYYY-MM-DD) to any member page URL.

### Configure the  sets

Edit `src/data/members.ts`:
- `totalPages`: total number of instruction pages for that person.
- `pdfUrl`: optional direct link to their PDF. When present, a secondary link opens the full PDF at the start page for the day via `#page=`.
- `imageDir`: folder (under `public`) where you export per-page JPGs.
- `imagePrefix`: optional file prefix (default `page-`).
- `imagePadLength`: optional padding (default `3`).
- `setName`: displayed under the person’s name.

The split logic distributes pages as evenly as possible across 24 days; the earliest days receive any extra single pages.

### Using per-page JPGs (anti-spoiler)
- Export each PDF page as JPG. Defaults: `page-001.jpg` (3-digit padding). You can override per member with `imagePrefix` (e.g. `guipure_page-`) and `imagePadLength` (e.g. `4`).
- Place them in `public/<folder>/` and set `imageDir` accordingly (e.g. Diego → `public/guipure/guipure_page-0001.jpg` with `imageDir: '/guipure'`).
- The app only injects images for unlocked days (lazy), so kids ne peuvent pas deviner les pages futures sans ouvrir les fichiers directement.
- Optional: remove `pdfUrl` if you don't want full-document access.

### Stack
- Astro (static output)
- Vanilla JS in Astro pages only where needed
- Styling in `src/styles/global.css`
