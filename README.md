# Odd Tile Out

A geography guessing game — 8 satellite tiles share a country, 1 doesn't. Find the impostor.

## Project structure

```
odd-tile-out/
├── index.html          # Entry point — all screens live here
├── src/
│   ├── style.css       # All styles (dark mode included)
│   ├── game.js         # All game logic
│   └── data/
│       └── rounds.js   # All round content (tiles, hints, learn text)
```

The three files are intentionally separated so you can:
- Edit content in `rounds.js` without touching logic
- Restyle in `style.css` without touching HTML
- Extend game logic in `game.js` without touching structure

## Running locally

No build step needed. Just open `index.html` in a browser, or use any static server:

```bash
# Option 1: Python (built into macOS/Linux)
python3 -m http.server 3000

# Option 2: Node (if you have npx)
npx serve .

# Then open: http://localhost:3000
```

## Deploying to Vercel

### First time setup

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From the project folder, run:
   ```bash
   vercel
   ```

3. Follow the prompts — select "No" for framework detection (this is a plain static site). Vercel will give you a live URL instantly.

### Subsequent deploys

```bash
vercel --prod
```

That's it. No config files needed for a static site.

### Alternative: Deploy via GitHub

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects it as static and deploys — zero config needed

## Adding new rounds

Open `src/data/rounds.js` and add a new object to the `ROUNDS` array:

```js
{
  hint: "8 tiles: [home region] — 1 impostor from [impostor region]",
  learn: "What makes them visually different — teach the player something.",
  tiles: [
    { url: "https://mt1.google.com/vt/lyrs=s&x=XXXX&y=YYYY&z=ZZ", label: "Home region", imp: false },
    // ... 7 more home tiles ...
    { url: "https://mt1.google.com/vt/lyrs=s&x=XXXX&y=YYYY&z=ZZ", label: "Impostor region", imp: true },
  ]
}
```

### Finding tile coordinates

1. Open Google Maps in satellite view
2. Navigate to your target location
3. Right-click → "What's here?" to get lat/lng
4. Convert lat/lng to tile XYZ at your chosen zoom using:
   https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/

Recommended zoom levels:
- `z=13` for large landscape features (rainforest, desert)
- `z=14` for agricultural patterns (fields, paddies)
- `z=15` for urban/infrastructure details

## Scoring

| Result | Points |
|--------|--------|
| Correct guess | +100 pts |
| Correct on a streak (2+) | +150 pts |
| Wrong guess | 0 pts, streak reset |

Max score = rounds × 150 (all correct, all streak after round 1)
