# Gold & Goons TCG Companion

## Run locally on Windows

**Important:** Extract the entire ZIP first. Open the extracted `gold_goons_local` folder itself in VS Code. Do not copy only `src/App.tsx` into another project; this bundle already includes the required `src/main.tsx`, `index.html`, Vite configuration, dependencies, card images, and tribe icons.

1. Install the current Node.js LTS release from https://nodejs.org/.
2. Open this folder in VS Code (or another editor).
3. Open a terminal in this folder and run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.

## This update
- Collection sorted in the tribe order: Blob, Goonger, Bina/Lubina, Mutant, Slobbant, Neutral.
- Tribe buttons use the six supplied hand-drawn icons, displayed in equal-size icon boxes.
- The collection offers all five card types and one Aureum rarity spelling; imported values are trimmed and legacy `Aurum` is normalized to `Aureum`.
- Search matches normalized names and text, including hyphenated card names such as Micro Blob-pult.
- Collection grid expands to eight cards per row on wide displays; inspect controls appear on hover/focus.
- Card detail includes the supplied Taunt rules popup. Other keyword definitions can be added when their exact wording is supplied.
- Deck building enforces a maximum of two non-Neutral tribes; Neutral cards are exempt.
- Deck sidebar has its own viewport-height panel and independently scrollable card list.
- Match tracker gold is capped at 15, including turn-yield gains, and Reset Match asks for confirmation.

Card images are in `public/cards/` and tribe icons are in `public/tribes/`. The blank Dr. Heal Hammer scan remains represented by the existing fallback behavior.
