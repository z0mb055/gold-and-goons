GOLD & GOONS TCG COMPANION — DECK OVERVIEW / NEWS / QOL UPDATE

SCOPE PRESERVED
- The Collection grid, all 180 card records, filters, custom-card flow, tracker, and existing collection card artwork rendering are preserved.
- The six neutral full-card scan paths that were cycling into one another are corrected: Devorator Charta, Catenae Ferreae, Insidarum Speculator, Tabula Magica, Tabula Nugatoria, and Tribitum Trappaeus.
- Card scan artwork remains separate from deck-cover artwork.

DECK BUILDER
- Hover a card row in the deck list to preview the full card on the left side of the deck panel.
- Click the card row to open its detailed view. It no longer removes a copy.
- Use only the - and + buttons to change card quantities.

DECK LIBRARY AND FULL DECK OVERVIEW
- Go to decks opens the Deck Library.
- Select a deck to open its full-screen overview.
- The overview shows every copy of every card in a visual grid, a mana curve, and tribe balance.
- Deck cover art can be chosen from a card already in that deck. It uses the matching standalone card illustration in public/deck-art/ (not the full-card scan).
- The redundant Add Deck tile is removed; New Deck is the single create-deck control.

DETAILED CARD VIEW
- Cost and unit stats share one row: e.g. "1 cost     2/1".
- Keyword links use black bold text and recognize inflected forms including Stunned, Poisoned, and Discards.

NEWS & UPDATES
- The News & Updates tab is included.
- Posts are developer-authored in the NEWS_POSTS array near the top of src/App.tsx. Add an object with id, date, category, title, and body. Example:
  { id: '2026-11-15-update', date: 'November 15, 2026', category: 'Update', title: 'Balance Update', body: 'Your announcement text.' }
- There is no in-app editor, so ordinary users cannot edit or publish posts. Editing the source code is the current developer-only workflow. A future remotely editable CMS would require a secured admin login and a backend; putting admin credentials in front-end code would not be secure.

INSTALL
1. Back up your current project folder.
2. Extract this ZIP.
3. Copy the project contents over your current project, keeping any local configuration you intentionally changed.
4. Run: npm install
5. Run: npm run dev

VALIDATION
- The updated TSX passed TypeScript's TSX transpilation syntax check.
- All 180 full-card scan files are present.
- 179 standalone card illustrations are mapped into public/deck-art/; one card has no standalone artwork in the supplied artwork mapping and will fall back to the no-cover placeholder if it is the only card in a deck.
- A full browser runtime test was not available in this environment.


LATEST SOURCE SYNC (November 15, 2026)
- src/App.tsx has been synchronized with the latest App source, including the permanent Skeetus Trappaeus cleanup, immediate deck-hover preview dismissal when the final copy is removed, the blue News & Updates active state, and removal of the redundant top-right Share / Decks button.
- Header navigation is centered between the logo and the empty right-side grid column.
- Card artwork, deck-cover artwork, card database, and project assets are preserved from the supplied project ZIP.
