import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  RotateCcw,
  Share2,
  Copy,
  Check,
  Sparkles,
  Shield,
  Clock,
  Diamond,
  CircleDot,
  Trash2,
  Edit3,
  Layers,
  Swords,
  BookOpen,
  Download,
  Upload,
  X,
  Eye,
  Coins,
  Hand,
  FlipVertical,
  FolderOpen,
  SlidersHorizontal
} from 'lucide-react';

// ============================================================================
// CONSTANTS & STARTER DATABASE ("GOLD AND GOONS")
// ============================================================================

const FACTIONS = [
  { id: 'red', name: 'Blob', color: '#dc2626', bg: 'bg-red-600', border: 'border-red-400', text: 'text-red-400', lightBg: 'bg-red-950/60' },
  { id: 'yellow', name: 'Goonger', color: '#e3ea08', bg: 'bg-yellow-500', border: 'border-yellow-300', text: 'text-yellow-400', lightBg: 'bg-yellow-950/60' },
  { id: 'pink', name: 'Bina', color: '#ec4899', bg: 'bg-pink-500', border: 'border-pink-300', text: 'text-pink-400', lightBg: 'bg-pink-950/60' },
  { id: 'blue', name: 'Mutant', color: '#3b82f6', bg: 'bg-blue-500', border: 'border-blue-300', text: 'text-blue-400', lightBg: 'bg-blue-950/60' },
  { id: 'purple', name: 'Slobbant', color: '#170e2e', bg: 'bg-purple-600', border: 'border-purple-300', text: 'text-purple-400', lightBg: 'bg-purple-950/60' },
  { id: 'gray', name: 'Neutral', color: '#6b7280', bg: 'bg-gray-500', border: 'border-gray-300', text: 'text-gray-300', lightBg: 'bg-gray-800/70' },
];

// OWNER-MAINTAINED CARD RULINGS
// Add or update entries here using the permanent card ID as the key.
// This is source-code managed: a client-side password would not provide
// owner-only security because browser code is visible to app users.
// Values may be a string or an array of strings for multiple rulings.
const CARD_RULINGS = {
  // 'gg-card-025': ['Example ruling for a specific game mode.'],
};

// Official 180-card database generated from the supplied Gold & Goons card sheet.
const OFFICIAL_CARDS = [
  {
    "id": "gg-card-001",
    "cardNumber": 1,
    "name": "Sluggo",
    "faction": "yellow",
    "rarity": "Vanilla",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 4,
    "durability": null,
    "ability": "",
    "flavor": "Before you ask, no, we don't know why he needs that many belts.",
    "imagePath": "/cards/000.webp",
    "deckArtPath": "/deck-art/000.webp"
  },
  {
    "id": "gg-card-002",
    "cardNumber": 2,
    "name": "Stalwart Guardian",
    "faction": "yellow",
    "rarity": "Vanilla",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 2,
    "power": 1,
    "health": 4,
    "durability": null,
    "ability": "Taunt.",
    "flavor": "\"You want the others? Then you have to go through me first. No really, you do.\"",
    "imagePath": "/cards/001.webp",
    "deckArtPath": "/deck-art/001.webp"
  },
  {
    "id": "gg-card-003",
    "cardNumber": 3,
    "name": "Vengeful Paladin",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "Revenge.",
    "flavor": "He believes in justice, honor, and immediate reimbursement.",
    "imagePath": "/cards/002.webp",
    "deckArtPath": "/deck-art/002.webp"
  },
  {
    "id": "gg-card-004",
    "cardNumber": 4,
    "name": "Medic",
    "faction": "yellow",
    "rarity": "Vanilla",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 4,
    "power": 3,
    "health": 5,
    "durability": null,
    "ability": "When played, heal a unit or player by 4.",
    "flavor": "Five damage a day keeps the Medic away!",
    "imagePath": "/cards/003.webp",
    "deckArtPath": "/deck-art/003.webp"
  },
  {
    "id": "gg-card-005",
    "cardNumber": 5,
    "name": "Reanimating Skelegoon",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Boned. While in Gooraveyard, you may Pay(2) to return this to the space it died on Stunned.",
    "flavor": "Death is just a lunch break for this guy.",
    "imagePath": "/cards/004.webp",
    "deckArtPath": "/deck-art/004.webp"
  },
  {
    "id": "gg-card-006",
    "cardNumber": 6,
    "name": "Blogg",
    "faction": "yellow",
    "rarity": "Vanilla",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 7,
    "power": 7,
    "health": 9,
    "durability": null,
    "ability": "Air Blocker.",
    "flavor": "\"Try flying past this, chumps!\"",
    "imagePath": "/cards/005.webp",
    "deckArtPath": "/deck-art/005.webp"
  },
  {
    "id": "gg-card-007",
    "cardNumber": 7,
    "name": "Flick",
    "faction": "yellow",
    "rarity": "Vanilla",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Push a card two spaces forward or back. If the unit is pushed to an occupied space, give it Stack until the end of combat.",
    "flavor": "Some call it tactical repositioning. Blobs call it bullying.",
    "imagePath": "/cards/006.webp",
    "deckArtPath": "/deck-art/006.webp"
  },
  {
    "id": "gg-card-008",
    "cardNumber": 8,
    "name": "Paralyze",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Stun a Goon.",
    "flavor": "How can Goons be paralyzed if they have no bones? Think about that for a turn.",
    "imagePath": "/cards/007.webp",
    "deckArtPath": "/deck-art/007.webp"
  },
  {
    "id": "gg-card-009",
    "cardNumber": 9,
    "name": "Resummoning Castle",
    "faction": "yellow",
    "rarity": "Platinum",
    "tribe": "Goonger",
    "type": "Tower",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "When you draw a card, you may Dredge a card instead. Lasts 3 turns.",
    "flavor": "Gooraveyard? Wrong! Its a second draw pile.",
    "imagePath": "/cards/008.webp",
    "deckArtPath": "/deck-art/008.webp"
  },
  {
    "id": "gg-card-010",
    "cardNumber": 10,
    "name": "Eternal Chains",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 1,
    "ability": "Trip: Permanently Stun the triggering unit.",
    "flavor": "More time to regret about everything.",
    "imagePath": "/cards/009.webp",
    "deckArtPath": "/deck-art/009.webp"
  },
  {
    "id": "gg-card-011",
    "cardNumber": 11,
    "name": "Prancing Punk",
    "faction": "pink",
    "rarity": "Vanilla",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 2,
    "power": 3,
    "health": 2,
    "durability": null,
    "ability": "",
    "flavor": "Why is a punk the basic 3/2 of this game? She's too busy rocking out to ask such questions.",
    "imagePath": "/cards/010.webp",
    "deckArtPath": "/deck-art/010.webp"
  },
  {
    "id": "gg-card-012",
    "cardNumber": 12,
    "name": "Boogie-na",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 1,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Sidewinder.",
    "flavor": "She hits you, leaves, and refuses to elaborate further.",
    "imagePath": "/cards/011.webp",
    "deckArtPath": "/deck-art/011.webp"
  },
  {
    "id": "gg-card-013",
    "cardNumber": 13,
    "name": "Dance Floor Fighter",
    "faction": "pink",
    "rarity": "Vanilla",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "Valor: Has +3/+3.",
    "flavor": "\"The floor is mine!\"",
    "imagePath": "/cards/012.webp",
    "deckArtPath": "/deck-art/012.webp"
  },
  {
    "id": "gg-card-014",
    "cardNumber": 14,
    "name": "Breakdancer LuBiggs",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 6,
    "power": 4,
    "health": 4,
    "durability": null,
    "ability": "Brawl. When played, this gets +1/+1 for each other Goon in play.",
    "flavor": "The bigger her audience, the crazier her moves.",
    "imagePath": "/cards/013.webp",
    "deckArtPath": "/deck-art/013.webp"
  },
  {
    "id": "gg-card-015",
    "cardNumber": 15,
    "name": "Lane Shuffle",
    "faction": "pink",
    "rarity": "Vanilla",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Choose a card. Switch it to a different lane.",
    "flavor": "\"You either get outta safety or inta safety. No exceptions.\" -Mr. Lu \"Funkalicious\" Binett",
    "imagePath": "/cards/014.webp",
    "deckArtPath": "/deck-art/014.webp"
  },
  {
    "id": "gg-card-016",
    "cardNumber": 16,
    "name": "Sneak Attack",
    "faction": "pink",
    "rarity": "Vanilla",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "A friendly unit instantly uses an attack to damage another unit.",
    "flavor": "Bet you didn't see THAT coming!",
    "imagePath": "/cards/015.webp",
    "deckArtPath": "/deck-art/015.webp"
  },
  {
    "id": "gg-card-017",
    "cardNumber": 17,
    "name": "Encore Summons",
    "faction": "pink",
    "rarity": "Platinum",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Create a copy of any unit in play or played this turn and give it +1/+1 and Stack. You must pay its original cost.",
    "flavor": "The second listen is always the best!",
    "imagePath": "/cards/016.webp",
    "deckArtPath": "/deck-art/016.webp"
  },
  {
    "id": "gg-card-018",
    "cardNumber": 18,
    "name": "Slime Spray",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Trinket",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a unit: +1/+2.",
    "flavor": "A +1/+2 buff may not be much, but it definitely adds 100% more drip.",
    "imagePath": "/cards/017.webp",
    "deckArtPath": "/deck-art/017.webp"
  },
  {
    "id": "gg-card-019",
    "cardNumber": 19,
    "name": "The Omega Oozium Mask",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Trinket",
    "cost": 6,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: +6/+6 and Overkill.",
    "flavor": "Heavy is the head that wears the mask.",
    "imagePath": "/cards/018.webp",
    "deckArtPath": "/deck-art/018.webp"
  },
  {
    "id": "gg-card-020",
    "cardNumber": 20,
    "name": "Shinigami Speaker",
    "faction": "pink",
    "rarity": "Vanilla",
    "tribe": "Lubina",
    "type": "Tower",
    "cost": 3,
    "power": 4,
    "health": 2,
    "durability": null,
    "ability": "Overkill. Lasts 3 turns.",
    "flavor": "What, you thought shinigami's didn't jam out as well?",
    "imagePath": "/cards/019.webp",
    "deckArtPath": "/deck-art/019.webp"
  },
  {
    "id": "gg-card-021",
    "cardNumber": 21,
    "name": "Lil Blobaby",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 0,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Stack",
    "flavor": "\"Goo goo gaga.\" He says as he finishes off a Blogg 10 times his size.",
    "imagePath": "/cards/020.webp",
    "deckArtPath": "/deck-art/020.webp"
  },
  {
    "id": "gg-card-022",
    "cardNumber": 22,
    "name": "Blob Bros",
    "faction": "red",
    "rarity": "Vanilla",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Swarm 2 .",
    "flavor": "Two heads are better than one, but are two 1/1's better than one 2/2? Bobby and Blobby fully agree with the former.",
    "imagePath": "/cards/021.webp",
    "deckArtPath": "/deck-art/021.webp"
  },
  {
    "id": "gg-card-023",
    "cardNumber": 23,
    "name": "Blob Scout",
    "faction": "red",
    "rarity": "Vanilla",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 1,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Nimble.",
    "flavor": "\"Think fast chucklenuts comin' through!\"",
    "imagePath": "/cards/022.webp",
    "deckArtPath": "/deck-art/022.webp"
  },
  {
    "id": "gg-card-024",
    "cardNumber": 24,
    "name": "Viral Blob",
    "faction": "red",
    "rarity": "Aureum",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 1,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Stack. When this deals damage, create a 1/1 Blobteria token on this column with Low Opacity and Stack.",
    "flavor": "\"What's a single hit from this thing gonna do?\" Famous last words.",
    "imagePath": "/cards/023.webp",
    "deckArtPath": "/deck-art/023.webp"
  },
  {
    "id": "gg-card-025",
    "cardNumber": 25,
    "name": "Mini-gun Mandy",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 4,
    "power": 3,
    "health": 1,
    "durability": null,
    "ability": "Crossfire, Nimble. When played, deal 1 damage to all enemy units and opponents.",
    "flavor": "\"I ALWAYS make a cool entrance.\"",
    "imagePath": "/cards/024.webp",
    "deckArtPath": "/deck-art/024.webp"
  },
  {
    "id": "gg-card-026",
    "cardNumber": 26,
    "name": "Zany Blob",
    "faction": "red",
    "rarity": "Vanilla",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 4,
    "power": 5,
    "health": 4,
    "durability": null,
    "ability": "",
    "flavor": "He's just a silly little character. Who doesn't love silly little characters?",
    "imagePath": "/cards/025.webp",
    "deckArtPath": "/deck-art/025.webp"
  },
  {
    "id": "gg-card-027",
    "cardNumber": 27,
    "name": "Transfigooration Blob",
    "faction": "red",
    "rarity": "Platinum",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 6,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Stack. When played, transform ALL cards in play into 2/2 Transfigooration Blobs with Stack. All friendly Transfigooration Blobs have Nimble.",
    "flavor": "\"You had a board of 10/10's? Skill issue. You're a 2/2 now.\"",
    "imagePath": "/cards/026.webp",
    "deckArtPath": "/deck-art/026.webp"
  },
  {
    "id": "gg-card-028",
    "cardNumber": 28,
    "name": "Fling O Dynamite",
    "faction": "red",
    "rarity": "Vanilla",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 3 damage.",
    "flavor": "Start it, fling it, watch it, enjoy it!",
    "imagePath": "/cards/027.webp",
    "deckArtPath": "/deck-art/027.webp"
  },
  {
    "id": "gg-card-029",
    "cardNumber": 29,
    "name": "Caltrops",
    "faction": "red",
    "rarity": "Vanilla",
    "tribe": "Blob",
    "type": "Trap",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": 2,
    "ability": "Trip: Deal 2 damage to the triggering unit.",
    "flavor": "You activated my trap card! Lego bricks!",
    "imagePath": "/cards/028.webp",
    "deckArtPath": "/deck-art/028.webp"
  },
  {
    "id": "gg-card-030",
    "cardNumber": 30,
    "name": "Blob Factory",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Tower",
    "cost": 3,
    "power": 0,
    "health": 5,
    "durability": null,
    "ability": "Start of turn, create a 1/1 Blob token on the column in front of this. Lasts 5 turns.",
    "flavor": "\"Mommy, where do Blobabies come from?\"",
    "imagePath": "/cards/029.webp",
    "deckArtPath": "/deck-art/029.webp"
  },
  {
    "id": "gg-card-031",
    "cardNumber": 31,
    "name": "Candy Consumer",
    "faction": "purple",
    "rarity": "Vanilla",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Poison.",
    "flavor": "Despite Slobbants not having teeth, this man somehow has a sweet tooth. Its sweet but still deadly.",
    "imagePath": "/cards/030.webp",
    "deckArtPath": "/deck-art/030.webp"
  },
  {
    "id": "gg-card-032",
    "cardNumber": 32,
    "name": "Slime Buddy",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "Stack. When an Overslimed card is revealed, this gets +2/+0.",
    "flavor": "\"Yipee! A new friend!\"",
    "imagePath": "/cards/031.webp",
    "deckArtPath": "/deck-art/031.webp"
  },
  {
    "id": "gg-card-033",
    "cardNumber": 33,
    "name": "Soul Stealer",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "When played, this gets +1/+1 for each card in this lane that died last turn and this turn.",
    "flavor": "\"Your soul is mine! Heh. Always been wantin' to say that!\"",
    "imagePath": "/cards/032.webp",
    "deckArtPath": "/deck-art/032.webp"
  },
  {
    "id": "gg-card-034",
    "cardNumber": 34,
    "name": "Murderer",
    "faction": "purple",
    "rarity": "Vanilla",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 5,
    "power": 5,
    "health": 7,
    "durability": null,
    "ability": "",
    "flavor": "No ability text. No witnesses.",
    "imagePath": "/cards/033.webp",
    "deckArtPath": "/deck-art/033.webp"
  },
  {
    "id": "gg-card-035",
    "cardNumber": 35,
    "name": "Tyrant of Death, Borlogg",
    "faction": "purple",
    "rarity": "Platinum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 20,
    "power": 10,
    "health": 10,
    "durability": null,
    "ability": "Paywall 3, Air Blocker, Virus 3. While in hand, this costs (1) less for each Goon in both players' Gooraveyards and tokens destroyed.",
    "flavor": "Little known fact, he used to be in a heavy death metal rock band with Blogg and Reanimating Skelegoon, but he fell into the toxic wasteland and became a monster. Separated, he only plays for the dead now.",
    "imagePath": "/cards/034.webp",
    "deckArtPath": "/deck-art/034.webp"
  },
  {
    "id": "gg-card-036",
    "cardNumber": 36,
    "name": "Slime Slice",
    "faction": "purple",
    "rarity": "Vanilla",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Destroy a Goon with 2 or less strength.",
    "flavor": "2 strength? Well 2 bad!",
    "imagePath": "/cards/035.webp",
    "deckArtPath": "/deck-art/035.webp"
  },
  {
    "id": "gg-card-037",
    "cardNumber": 37,
    "name": "Sinister Scissors",
    "faction": "purple",
    "rarity": "Vanilla",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Destroy a card.",
    "flavor": "Snip snip.",
    "imagePath": "/cards/036.webp",
    "deckArtPath": "/deck-art/036.webp"
  },
  {
    "id": "gg-card-038",
    "cardNumber": 38,
    "name": "Sick Spray",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Trinket",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a unit: -1/-2.",
    "flavor": "What really sucks isn't the -1/-2 debuff, its the smell this thing applies. A single shower doesn't get rid of it!",
    "imagePath": "/cards/037.webp",
    "deckArtPath": "/deck-art/037.webp"
  },
  {
    "id": "gg-card-039",
    "cardNumber": 39,
    "name": "Toxic Wasteland",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Give -2/-2 to the triggering unit.",
    "flavor": "In here, pollution is POWER.",
    "imagePath": "/cards/038.webp",
    "deckArtPath": "/deck-art/038.webp"
  },
  {
    "id": "gg-card-040",
    "cardNumber": 40,
    "name": "Sludged Cannon",
    "faction": "purple",
    "rarity": "Vanilla",
    "tribe": "Slobbant",
    "type": "Tower",
    "cost": 2,
    "power": 2,
    "health": 3,
    "durability": null,
    "ability": "Overslimed. Lasts 4 turns.",
    "flavor": "You didn't see it, but it most definitely saw you.",
    "imagePath": "/cards/039.webp",
    "deckArtPath": "/deck-art/039.webp"
  },
  {
    "id": "gg-card-041",
    "cardNumber": 41,
    "name": "Mutant Artist",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "Pay(1): Use an attack to draw a card.",
    "flavor": "\"Do not judge the quality of my art. What you get is what you get.\"",
    "imagePath": "/cards/040.webp",
    "deckArtPath": "/deck-art/040.webp"
  },
  {
    "id": "gg-card-042",
    "cardNumber": 42,
    "name": "Golden Goozie",
    "faction": "blue",
    "rarity": "Aureum",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 1,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "When damaged, gain (+1). Invader: When destroyed, gain (+1).",
    "flavor": "\"Wh..why are you all looking at me like that?\"",
    "imagePath": "/cards/041.webp",
    "deckArtPath": "/deck-art/041.webp"
  },
  {
    "id": "gg-card-043",
    "cardNumber": 43,
    "name": "Card Goolem",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 3,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "When you draw a card, this gets +1/+1.",
    "flavor": "He's lived in dark caves for all his life, which is why he loves seeing the light of cards.",
    "imagePath": "/cards/042.webp",
    "deckArtPath": "/deck-art/042.webp"
  },
  {
    "id": "gg-card-044",
    "cardNumber": 44,
    "name": "Bog Surfer",
    "faction": "blue",
    "rarity": "Vanilla",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 3,
    "power": 3,
    "health": 4,
    "durability": null,
    "ability": "",
    "flavor": "Being isolated and trapped in the wetlands is not a problem for this radical dude.",
    "imagePath": "/cards/043.webp",
    "deckArtPath": "/deck-art/043.webp"
  },
  {
    "id": "gg-card-045",
    "cardNumber": 45,
    "name": "Skyward Slime",
    "faction": "blue",
    "rarity": "Vanilla",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 4,
    "power": 5,
    "health": 3,
    "durability": null,
    "ability": "Avian.",
    "flavor": "\"Most problems can be blocked. Good thing I'm not most problems!\"",
    "imagePath": "/cards/044.webp",
    "deckArtPath": "/deck-art/044.webp"
  },
  {
    "id": "gg-card-046",
    "cardNumber": 46,
    "name": "Card Supplier",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 5,
    "power": 4,
    "health": 4,
    "durability": null,
    "ability": "When played and destroyed, draw a card.",
    "flavor": "He makes sure the cards are delivered on time, even if that means on death too.",
    "imagePath": "/cards/045.webp",
    "deckArtPath": "/deck-art/045.webp"
  },
  {
    "id": "gg-card-047",
    "cardNumber": 47,
    "name": "Goo Lord",
    "faction": "blue",
    "rarity": "Platinum",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 9,
    "power": 5,
    "health": 5,
    "durability": null,
    "ability": "Overslimed. When revealed, create a 2/1 Goorunt token with Brawl and Stack on your side of the board for each card in hand.",
    "flavor": "\"Knowledge fuels my army! So you must be REAL dimwitted to give me only one measely soldier...\"",
    "imagePath": "/cards/046.webp",
    "deckArtPath": "/deck-art/046.webp"
  },
  {
    "id": "gg-card-048",
    "cardNumber": 48,
    "name": "Crud Coil",
    "faction": "blue",
    "rarity": "Vanilla",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Recall a card.",
    "flavor": "Aaandd back you go!",
    "imagePath": "/cards/047.webp",
    "deckArtPath": "/deck-art/047.webp"
  },
  {
    "id": "gg-card-049",
    "cardNumber": 49,
    "name": "Quick Prints",
    "faction": "blue",
    "rarity": "Vanilla",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Draw two cards.",
    "flavor": "You're lucky you got these prints for cheap!",
    "imagePath": "/cards/048.webp",
    "deckArtPath": "/deck-art/048.webp"
  },
  {
    "id": "gg-card-050",
    "cardNumber": 50,
    "name": "Gold Bank",
    "faction": "blue",
    "rarity": "Vanilla",
    "tribe": "Mutant",
    "type": "Tower",
    "cost": 3,
    "power": 0,
    "health": 3,
    "durability": null,
    "ability": "Start of turn, gain (+2). Lasts 3 turns.",
    "flavor": "\"We'll pay you back...in a couple turns. And then some!\"",
    "imagePath": "/cards/049.webp",
    "deckArtPath": "/deck-art/049.webp"
  },
  {
    "id": "gg-card-051",
    "cardNumber": 51,
    "name": "Hyper-Fortify",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "A unit cannot be damaged until the end of combat.",
    "flavor": "Make fun of anyone you want for a single turn, then pay the consequences afterwards!",
    "imagePath": "/cards/050.webp",
    "deckArtPath": "/deck-art/050.webp"
  },
  {
    "id": "gg-card-052",
    "cardNumber": 52,
    "name": "Watchtower",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Tower",
    "cost": 3,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "All friendly units on your side have Air Blocker and Paywall 1. Lasts 2 turns.",
    "flavor": "\"YOU SHALL NOT PASS!\"",
    "imagePath": "/cards/051.webp",
    "deckArtPath": "/deck-art/051.webp"
  },
  {
    "id": "gg-card-053",
    "cardNumber": 53,
    "name": "Buckler Shield",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: +0/+2 and Revenge.",
    "flavor": "Right back 'atcha!",
    "imagePath": "/cards/052.webp",
    "deckArtPath": "/deck-art/052.webp"
  },
  {
    "id": "gg-card-054",
    "cardNumber": 54,
    "name": "Popstar Binetta",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 4,
    "power": 3,
    "health": 3,
    "durability": null,
    "ability": "When played: All friendly Goons get +1/+1.",
    "flavor": "Her lyrics have significant meaning, so much so that Goons immediately feel empowered listening to it.",
    "imagePath": "/cards/053.webp",
    "deckArtPath": "/deck-art/053.webp"
  },
  {
    "id": "gg-card-055",
    "cardNumber": 55,
    "name": "Cookie Cakewalk",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Give +2/+2 to the triggering unit.",
    "flavor": "Its a sugary wonderland! Bringing Blobabies here is a environmental hazard.",
    "imagePath": "/cards/055.webp",
    "deckArtPath": "/deck-art/054.webp"
  },
  {
    "id": "gg-card-056",
    "cardNumber": 56,
    "name": "Bonus Track#040",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Add an extra Celerity attack to a unit.",
    "flavor": "Even better than Bonus Track#038. No gameplay difference, but it sounds better.",
    "imagePath": "/cards/054.webp",
    "deckArtPath": "/deck-art/055.webp"
  },
  {
    "id": "gg-card-057",
    "cardNumber": 57,
    "name": "Micro Blob-pult",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a unit: \"End of turn, this deals 1 damage.\"",
    "flavor": "Its not much but hey its doing honorable work.",
    "imagePath": "/cards/058.webp",
    "deckArtPath": "/deck-art/056.webp"
  },
  {
    "id": "gg-card-058",
    "cardNumber": 58,
    "name": "Goon Mortar",
    "faction": "red",
    "rarity": "Aureum",
    "tribe": "Blob",
    "type": "Tower",
    "cost": 2,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Artillery. When a friendly Goon enters the board, deal 1 damage to the opponent. Lasts 2 turns.",
    "flavor": "Ping ping ping! Delivery service!",
    "imagePath": "/cards/056.webp",
    "deckArtPath": "/deck-art/057.webp"
  },
  {
    "id": "gg-card-059",
    "cardNumber": 59,
    "name": "Drawing Frenzy",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 6,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 1 damage to the opponent for each card in their hand.",
    "flavor": "Mutants hate this simple Trick.",
    "imagePath": "/cards/057.webp",
    "deckArtPath": "/deck-art/058.webp"
  },
  {
    "id": "gg-card-060",
    "cardNumber": 60,
    "name": "Gravedigger",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 2,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "When a unit is destroyed on the same side as this, this gets +1/+1.",
    "flavor": "\"Yes, I do funerals.\"",
    "imagePath": "/cards/059.webp",
    "deckArtPath": "/deck-art/059.webp"
  },
  {
    "id": "gg-card-061",
    "cardNumber": 61,
    "name": "The Doom Protocol",
    "faction": "purple",
    "rarity": "Platinum",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 9,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Destroy ALL cards.",
    "flavor": "Nothing is left. Not even this flavor t..",
    "imagePath": "/cards/060.webp",
    "deckArtPath": "/deck-art/060.webp"
  },
  {
    "id": "gg-card-062",
    "cardNumber": 62,
    "name": "Essence Sapper",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Overslimed. When revealed, a unit gets -2/-1.",
    "flavor": "The core of demotivation.",
    "imagePath": "/cards/061.webp",
    "deckArtPath": "/deck-art/061.webp"
  },
  {
    "id": "gg-card-063",
    "cardNumber": 63,
    "name": "Midas Boxer",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 3,
    "power": 1,
    "health": 4,
    "durability": null,
    "ability": "When this deals damage, gain (+1).",
    "flavor": "You've heard of the Midas touch, but what about the Midas hospital bill?",
    "imagePath": "/cards/062.webp",
    "deckArtPath": "/deck-art/062.webp"
  },
  {
    "id": "gg-card-064",
    "cardNumber": 64,
    "name": "Unsummoning Whirlpool",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 6,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Recall ALL enemy cards.",
    "flavor": "Not to be. That is the answer.",
    "imagePath": "/cards/063.webp",
    "deckArtPath": "/deck-art/063.webp"
  },
  {
    "id": "gg-card-065",
    "cardNumber": 65,
    "name": "Jetpack",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Trinket",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: Avian. If it already has Avian, it gets +2/+0 and instantly moves three spaces instead.",
    "flavor": "Its a joyride you can't miss.",
    "imagePath": "/cards/064.webp",
    "deckArtPath": "/deck-art/064.webp"
  },
  {
    "id": "gg-card-066",
    "cardNumber": 66,
    "name": "Halo Dredger",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: \"When this enters the Gooraveyard, immediately Dredge it. It costs (1) less.\"",
    "flavor": "Do not fall, it is not your time yet.",
    "imagePath": "/cards/065.webp",
    "deckArtPath": "/deck-art/065.webp"
  },
  {
    "id": "gg-card-067",
    "cardNumber": 67,
    "name": "Dr. Heal Hammer",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Heal yourself by 3 and increase your maximum health by 3 (without adding health) OR give a Tower +0/+2 and +2 Lifetime Draw a card.",
    "flavor": "Who knew bashing at things makes them better? Dr. H didn't, he was just lucky.",
    "imagePath": "/cards/066.webp",
    "deckArtPath": "/deck-art/066.webp"
  },
  {
    "id": "gg-card-068",
    "cardNumber": 68,
    "name": "Fanfare Cannon",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Tower",
    "cost": 3,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "All friendly units in adjacent lanes have +1/+1. Lasts 2 turns.",
    "flavor": "Make way for the glorious group of goons!",
    "imagePath": "/cards/067.webp",
    "deckArtPath": "/deck-art/067.webp"
  },
  {
    "id": "gg-card-069",
    "cardNumber": 69,
    "name": "Stage Prop",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Trinket",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a card: Immobile, set stats to 0/3, and remove all abilities from this.",
    "flavor": "\"They're definitely acting, their character is just really still in this scene! Reeeally still!\"",
    "imagePath": "/cards/068.webp",
    "deckArtPath": "/deck-art/068.webp"
  },
  {
    "id": "gg-card-070",
    "cardNumber": 70,
    "name": "Team Play",
    "faction": "red",
    "rarity": "Aureum",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "All friendly units in a column get +2/+0 and Celerity until the end of combat.",
    "flavor": "There is no 'i' in team, but there is one in Celerity!",
    "imagePath": "/cards/069.webp",
    "deckArtPath": "/deck-art/069.webp"
  },
  {
    "id": "gg-card-071",
    "cardNumber": 71,
    "name": "Turbo Track",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Trap",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "When a friendly Goon would step on this, trigger this. When triggered, the triggering Goon moves over this Trap and deals 1 damage to the first target it encounters this way.",
    "flavor": "Wanna see me run past this Trap? Wanna see me do it again?",
    "imagePath": "/cards/070.webp",
    "deckArtPath": "/deck-art/070.webp"
  },
  {
    "id": "gg-card-072",
    "cardNumber": 72,
    "name": "Deadly Dagger",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: Poison. If it already has Poison, then its Poison would trigger instantly.",
    "flavor": "Was secretly used in plagues long ago but everyone who knew that got poisoned, so will you!",
    "imagePath": "/cards/071.webp",
    "deckArtPath": "/deck-art/071.webp"
  },
  {
    "id": "gg-card-073",
    "cardNumber": 73,
    "name": "Sanctum of Sacrifice",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Tower",
    "cost": 4,
    "power": 3,
    "health": 4,
    "durability": null,
    "ability": "End of turn, you may sacrifice a Goon. When a Goon is sacrificed, add a counter to this card. Pay(all counters): Give all enemy units -X/-X until the end of combat (X=counters consumed) and if any of them reached 0 strength, destroy them. Lasts 4 turns.",
    "flavor": "The stones call for you...",
    "imagePath": "/cards/072.webp",
    "deckArtPath": "/deck-art/072.webp"
  },
  {
    "id": "gg-card-074",
    "cardNumber": 74,
    "name": "Card-O-Dilly",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Tower",
    "cost": 4,
    "power": 2,
    "health": 6,
    "durability": null,
    "ability": "Start of turn, both players draw an additional card. Lasts 5 turns.",
    "flavor": "Drawin' cards since 1863!",
    "imagePath": "/cards/073.webp",
    "deckArtPath": "/deck-art/073.webp"
  },
  {
    "id": "gg-card-075",
    "cardNumber": 75,
    "name": "Card Clam",
    "faction": "blue",
    "rarity": "Aureum",
    "tribe": "Mutant",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip(one time): Deal 2 damage to the triggering unit. Start of turn, trigger this. When triggered, discard a card from your hand to get (2) OR spend (2) to draw a card.",
    "flavor": "Watch your step...and your resources.",
    "imagePath": "/cards/074.webp",
    "deckArtPath": "/deck-art/074.webp"
  },
  {
    "id": "gg-card-076",
    "cardNumber": 76,
    "name": "Tabula Munitionis",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Create a column 0/3 Tabula Rasa tokens for any player.",
    "flavor": "Is it a gift or an insult? Who knows, I'm not the one receiving it.",
    "imagePath": "/cards/075.webp",
    "deckArtPath": "/deck-art/075.webp"
  },
  {
    "id": "gg-card-077",
    "cardNumber": 77,
    "name": "Tabula Militaris",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 3,
    "power": 3,
    "health": 2,
    "durability": null,
    "ability": "Paywall 2. When played, destroy a Tabula Rasa token to give this +0/+3.",
    "flavor": "The milities have no soul or emotion, but through an unknown power, they can turn nothing into something.",
    "imagePath": "/cards/076.webp",
    "deckArtPath": "/deck-art/076.webp"
  },
  {
    "id": "gg-card-078",
    "cardNumber": 78,
    "name": "Schistus Trappaeus",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Trap",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": 2,
    "ability": "Trip: Deal 1 damage to the triggering unit and push it a space back. End of combat,  destroy this and discard a card to create a 0/3 Tabula Rasa token here.",
    "flavor": "Grounds of the Tabula yield strange effects. Perhaps far below the terrain lies a home for unseen inhabitants, where they rise to strike, and to earth they return.",
    "imagePath": "/cards/077.webp",
    "deckArtPath": "/deck-art/077.webp"
  },
  {
    "id": "gg-card-079",
    "cardNumber": 79,
    "name": "Crazy Cobulus",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "Revenge.",
    "flavor": "His erratic and mischevious energy seeps through his slate core, driving it to strike back whatever contacts its fragile shell.",
    "imagePath": "/cards/078.webp",
    "deckArtPath": "/deck-art/078.webp"
  },
  {
    "id": "gg-card-080",
    "cardNumber": 80,
    "name": "Catapalta",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Tower",
    "cost": 1,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Artillery. Cannot attack enemy units two spaces ahead. Lasts 3 turns.",
    "flavor": "You would think because it had wheels it would move, but no one has the gall to move this ancient slate machinery even a space forward.",
    "imagePath": "/cards/079.webp",
    "deckArtPath": "/deck-art/079.webp"
  },
    {
    "id": "gg-card-081",
    "cardNumber": 81,
    "name": "Devorator Charta",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 5,
    "power": 6,
    "health": 6,
    "durability": null,
    "ability": "When played, discard a card.",
    "flavor": "\"Nyam nyam nyam, chartae ventri meo bonae sunt!\"",
    "imagePath": "/cards/090.webp",
    "deckArtPath": "/deck-art/080.webp"
  },
  {
    "id": "gg-card-082",
    "cardNumber": 82,
    "name": "Catenae Ferreae",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Goon: -1/-0 and Sluggish.",
    "flavor": "Its heavy and tingling, like being bloated. Being bloated with slate shackles reducing your gravity.",
    "imagePath": "/cards/080.webp",
    "deckArtPath": "/deck-art/081.webp"
  },
  {
    "id": "gg-card-083",
    "cardNumber": 83,
    "name": "Petravir",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 2,
    "power": 3,
    "health": 3,
    "durability": null,
    "ability": "Sluggish.",
    "flavor": "A massive slate construct moving with agonizing slowness, yet possessing an unending goal of reaching the other side. Despite being a heartless statue, curiousity keeps him moving. Something that the Terrestris can't seem to explain.",
    "imagePath": "/cards/082.webp",
    "deckArtPath": "/deck-art/082.webp"
  },
  {
    "id": "gg-card-084",
    "cardNumber": 84,
    "name": "Schistus Terrestris",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Pay(1): Sacrifice a Tabula Rasa token to create a 3/3 Petravir with Sluggish.",
    "flavor": "He channels the terra beneath the Tabula, consuming other slate structures to birth relentless clay guardians. They are not always just for battle though.",
    "imagePath": "/cards/083.webp",
    "deckArtPath": "/deck-art/083.webp"
  },
  {
    "id": "gg-card-085",
    "cardNumber": 85,
    "name": "Infirmious Goolem",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 3,
    "durability": null,
    "ability": "When you draw your second card this turn, this gets +1/+1.",
    "flavor": "Always jealous of the other Goolems far beyond the lands of the Tabula. \"They are just like me, but not with me,\" he says to himself.",
    "imagePath": "/cards/084.webp",
    "deckArtPath": "/deck-art/084.webp"
  },
  {
    "id": "gg-card-086",
    "cardNumber": 86,
    "name": "Fragmentum Dele",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Destroy a Trinket. Draw a card.",
    "flavor": "Fight with your true strength that lies inside of you!",
    "imagePath": "/cards/085.webp",
    "deckArtPath": "/deck-art/085.webp"
  },
  {
    "id": "gg-card-087",
    "cardNumber": 87,
    "name": "Rudera",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Trick",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Destroy a Tower and deal damage equal to its health split among enemies.",
    "flavor": "How rude!",
    "imagePath": "/cards/086.webp",
    "deckArtPath": "/deck-art/086.webp"
  },
   {
    "id": "gg-card-088",
    "cardNumber": 88,
    "name": "Insidarum Speculator",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Enemy faced-down cards are now face-up.  Upgrade(3): When played, destroy a faced-down card.",
    "flavor": "You cannot hide. Not from the Speculator.",
    "imagePath": "/cards/081.webp",
    "deckArtPath": "/deck-art/087.webp"
  },
  {
    "id": "gg-card-089",
    "cardNumber": 89,
    "name": "Tabula Magica",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 4,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "When played, create a 0/3 Tabula Rasa token in both adjacent lanes this column. Pay(1): Sacrifice a Tabula Rasa token to draw a card.",
    "flavor": "She reshapes the terrane with Tabula Rasa, then sacrifices what was built to draw upon deeper arcane truths.",
    "imagePath": "/cards/087.webp",
    "deckArtPath": "/deck-art/088.webp"
  },
  {
    "id": "gg-card-090",
    "cardNumber": 90,
    "name": "Tabula Nugatoria",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Trinket",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a unit: \"When this deals damage, create a 0/3 Tabula Rasa token anywhere on the board. If there is a unit on the space where the Tabula Rasa would be, deal 1 damage to it and push it back a space if able.\"",
    "flavor": "Not imbued with terra magic? Now you are with the Tabula Nugatoria! Feel the volatile slate energy force structures into existence and violently push who dares stand in the way of your Rasa!",
    "imagePath": "/cards/088.webp",
    "deckArtPath": "/deck-art/089.webp"
  },
  {
    "id": "gg-card-091",
    "cardNumber": 91,
    "name": "Tribitum Trappaeus",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Trap",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Deal 2 damage to the triggering unit, Stun it, and its owner loses (2).",
    "flavor": "A subterranean snare that crushes footsteps, leaving trespassers stunned and robbed of their momentum. Kind of like a bad day with the wife.",
    "imagePath": "/cards/089.webp",
    "deckArtPath": "/deck-art/090.webp"
  },
  {
    "id": "gg-card-092",
    "cardNumber": 92,
    "name": "Rex Ardesius",
    "faction": "gray",
    "rarity": "Platinum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 5,
    "power": 3,
    "health": 6,
    "durability": null,
    "ability": "When an enemy unit deals damage to a Tabula Rasa token, destroy the enemy unit that damaged it.",
    "flavor": "The King of Slate. He stands as guardian over the Tabula, exacting swift retribution upon any who strikes his own domain and making sure the scale stays in equillibrium.",
    "imagePath": "/cards/091.webp",
    "deckArtPath": "/deck-art/091.webp"
  },
  {
    "id": "gg-card-093",
    "cardNumber": 93,
    "name": "Gigas Venenosus",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 6,
    "power": 2,
    "health": 6,
    "durability": null,
    "ability": "Crossfire. When destroyed, deal 6 damage to the opponent and ALL units in this column and the column in front of it.",
    "flavor": "Critical question: Is it the presence of the Venenosus that pollutes the battlefield, or is it the nasty fart he lets out when he goes down?",
    "imagePath": "/cards/092.webp",
    "deckArtPath": "/deck-art/092.webp"
  },
  {
    "id": "gg-card-094",
    "cardNumber": 94,
    "name": "Tegula Tectoria Terris",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Tower",
    "cost": 6,
    "power": 4,
    "health": 5,
    "durability": null,
    "ability": "Air Blocker, Crossfire. End of turn, create a 0/3 Tabula Rasa token on your side. All friendly Tabula Rasa tokens have Air Blocker, Everlasting, Stack, and +1/+2. Lasts 4 turns.",
    "flavor": "This towering bastion continuously spreads the reach of the Tabula and empowers the stone entities in its shadow. So immense is its influence that scholars no longer call it Tabula Rasa, it has become Tabula Inscripta.",
    "imagePath": "/cards/093.webp",
    "deckArtPath": "/deck-art/093.webp"
  },
  {
    "id": "gg-card-095",
    "cardNumber": 95,
    "name": "Tabula Colossa",
    "faction": "gray",
    "rarity": "Platinum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 10,
    "power": 6,
    "health": 8,
    "durability": null,
    "ability": "Air Blocker, Everlasting, Sluggish. When played, destroy ALL Tabula Rasa tokens on the board. For each Tabula Rasa token destroyed this way, choose one: deal 3 damage to the opponent, draw a card and it costs (3) less, or deal 3 damage to a unit. Start of turn, create a column of 0/3 Tabula Rasa tokens.",
    "flavor": "He is manifestation absolute. There is no creature able to replicate its unearthly devastation. This is the ultimate manifestation of the ancient slate, commanded by Ardesius to smash, smash, smash.",
    "imagePath": "/cards/094.webp",
    "deckArtPath": "/deck-art/094.webp"
  },
  {
    "id": "gg-card-096",
    "cardNumber": 96,
    "name": "Healthcare Courier",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 2,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "When you or a friendly unit is healed, this gets +2/+1.",
    "flavor": "\"Thank you for choosing Goongers Hospital, and me as your courier!\"",
    "imagePath": "/cards/095.webp",
    "deckArtPath": "/deck-art/095.webp"
  },
  {
    "id": "gg-card-097",
    "cardNumber": 97,
    "name": "Honorary Crusader",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 4,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "Cleave. End of turn, heal all friendly Goons and yourself by 1.",
    "flavor": "\"I have THE POWAAAAA!\"",
    "imagePath": "/cards/096.webp",
    "deckArtPath": "/deck-art/096.webp"
  },
  {
    "id": "gg-card-098",
    "cardNumber": 98,
    "name": "Impenetrable Wall",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Tower",
    "cost": 5,
    "power": 0,
    "health": 10,
    "durability": null,
    "ability": "Everlasting, Taunt, Air Blocker. Lasts 4 turns.",
    "flavor": "It has earned the name 'Impenetrable' after defending its side for 2,000 years.",
    "imagePath": "/cards/097.webp",
    "deckArtPath": "/deck-art/097.webp"
  },
  {
    "id": "gg-card-099",
    "cardNumber": 99,
    "name": "Dissipate",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 6,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Banish a card. This Trick ignores any Wardlocked, Paywall, and Everlasting keywords and does not activate a card's \"When destroyed...\" abilities.",
    "flavor": "Reduced to ash and nothingness. Blip! Just like that. Forgotten. ",
    "imagePath": "/cards/098.webp",
    "deckArtPath": "/deck-art/098.webp"
  },
  {
    "id": "gg-card-100",
    "cardNumber": 100,
    "name": "Zura, Majesty of the Regenerating Light",
    "faction": "yellow",
    "rarity": "Platinum",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 10,
    "power": 5,
    "health": 5,
    "durability": null,
    "ability": "Everlasting. When played, Dredge three Goons. They cost (0) and have Everlasting.",
    "flavor": "\"Clothes are temporary, but regenerating light is eternal. Besides, the clouds do all the heavy lifting.\"",
    "imagePath": "/cards/099.webp",
    "deckArtPath": "/deck-art/099.webp"
  },
  {
    "id": "gg-card-101",
    "cardNumber": 101,
    "name": "Flamenco Rose",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a Goon: Sidewinder and Stack. It also gets Wardlocked until the end of combat.",
    "flavor": "¡Arrrrrrribaa!",
    "imagePath": "/cards/100.webp",
    "deckArtPath": "/deck-art/100.webp"
  },
  {
    "id": "gg-card-102",
    "cardNumber": 102,
    "name": "Ecstatic Fan",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 5,
    "durability": null,
    "ability": "Sidewinder. End of turn: If you have a unit with 4 or more strength, draw a card.",
    "flavor": "\"EEEEEE ITS ME, MY BIGGEST FAN!\"",
    "imagePath": "/cards/101.webp",
    "deckArtPath": "/deck-art/101.webp"
  },
  {
    "id": "gg-card-103",
    "cardNumber": 103,
    "name": "Hair Stylist",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 3,
    "durability": null,
    "ability": "Start of turn: Gain a Slime Spray (1 cost Vanilla Bina Trinket, Equip a unit: +1/+2).",
    "flavor": "One of the highest paying jobs in the Bina economy!",
    "imagePath": "/cards/102.webp",
    "deckArtPath": "/deck-art/102.webp"
  },
  {
    "id": "gg-card-104",
    "cardNumber": 104,
    "name": "Conga Line",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Give +X/+X to all friendly units in a lane (x = number of friendly units in targeted lane). You must spend (X) to play this Trick.",
    "flavor": "CONGA GONGA CONGA!",
    "imagePath": "/cards/103.webp",
    "deckArtPath": "/deck-art/103.webp"
  },
  {
    "id": "gg-card-105",
    "cardNumber": 105,
    "name": "Greedy Gangster",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 5,
    "power": 6,
    "health": 5,
    "durability": null,
    "ability": "Overkill, Overslimed. When revealed, if the Opponent has (5) or more, this gets +1/+0. The first time this destroys two or more cards this turn, the Opponent loses (1).",
    "flavor": "\"Listen, I'm not greedy, its the one in front of you!\"",
    "imagePath": "/cards/104.webp",
    "deckArtPath": "/deck-art/104.webp"
  },
  {
    "id": "gg-card-106",
    "cardNumber": 106,
    "name": "Acceleratigoon",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Overslimed. When revealed, a Goon instantly moves an additional three spaces.",
    "flavor": "\"What are you waiting for? Move it move it!\"",
    "imagePath": "/cards/105.webp",
    "deckArtPath": "/deck-art/105.webp"
  },
  {
    "id": "gg-card-107",
    "cardNumber": 107,
    "name": "Goo Essence Detonation",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 2 damage, increasing by 1 for each friendly unit in play. If you are targeting the opponent for 5 or more damage with this, then Pay(3).",
    "flavor": "Its one step for Blob kind, one MASSIVE leap for the game.",
    "imagePath": "/cards/106.webp",
    "deckArtPath": "/deck-art/106.webp"
  },
  {
    "id": "gg-card-108",
    "cardNumber": 108,
    "name": "Volcanic Grounds",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Deal 1 damage to the opponent and two other enemy units. If there are no other enemy units, then damage the opponent again.",
    "flavor": "This is when Goons who don't have footwear regret their choices.",
    "imagePath": "/cards/107.webp",
    "deckArtPath": "/deck-art/107.webp"
  },
  {
    "id": "gg-card-109",
    "cardNumber": 109,
    "name": "Boots of Speediness",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Trinket",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a Goon: Nimble and Paywall 1.",
    "flavor": "\"You're too slow!\"",
    "imagePath": "/cards/108.webp",
    "deckArtPath": "/deck-art/108.webp"
  },
  {
    "id": "gg-card-110",
    "cardNumber": 110,
    "name": "Mom Blob",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 5,
    "power": 4,
    "health": 3,
    "durability": null,
    "ability": "Crossfire. When played, create two 1/1 Lil’ Blobabies on your side with Stack. If they were created on the same column, they both get Nimble.",
    "flavor": "If motherhood wasn't hard enough, try bringing your own kids to battle.",
    "imagePath": "/cards/109.webp",
    "deckArtPath": "/deck-art/109.webp"
  },
  {
    "id": "gg-card-111",
    "cardNumber": 111,
    "name": "Little Luncher",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 6,
    "durability": null,
    "ability": "Overslimed. When revealed, destroy all other Goons with 2 or less strength.",
    "flavor": "\"Blobs? Early game Goons? All I'm hearing is a buffet!\"",
    "imagePath": "/cards/110.webp",
    "deckArtPath": "/deck-art/110.webp"
  },
  {
    "id": "gg-card-112",
    "cardNumber": 112,
    "name": "Sea Dog & Killer Squid",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "Poison, Crossfire. When a Poisoned unit is destroyed, steal (1) from the opponent.",
    "flavor": "The deadly duo. One robs, the other shoots poisonous globs!",
    "imagePath": "/cards/111.webp",
    "deckArtPath": "/deck-art/111.webp"
  },
  {
    "id": "gg-card-113",
    "cardNumber": 113,
    "name": "Amalgabog",
    "faction": "purple",
    "rarity": "Platinum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 8,
    "power": 3,
    "health": 3,
    "durability": null,
    "ability": "Overslimed. Trip: Destroy the triggering unit. When a card is destroyed on this column or the column in front, this gets +X/+X (x = cost of the card destroyed).",
    "flavor": "He's got a bit of a two-face personality.",
    "imagePath": "/cards/112.webp",
    "deckArtPath": "/deck-art/112.webp"
  },
  {
    "id": "gg-card-114",
    "cardNumber": 114,
    "name": "Forbidden Rites",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Sacrifice a Goon to draw two cards.",
    "flavor": "You'll be sacrificed for the greater good.",
    "imagePath": "/cards/113.webp",
    "deckArtPath": "/deck-art/113.webp"
  },
  {
    "id": "gg-card-115",
    "cardNumber": 115,
    "name": "An Eye for an I",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Both players sacrifice a card.",
    "flavor": "Fair and balanced, as all things should be.",
    "imagePath": "/cards/114.webp",
    "deckArtPath": "/deck-art/114.webp"
  },
  {
    "id": "gg-card-116",
    "cardNumber": 116,
    "name": "Balloon Goon",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 1,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Pay(1): Has Avian until the end of combat.",
    "flavor": "\"I'm flying! I'm flying! Only for a turn!\"",
    "imagePath": "/cards/115.webp",
    "deckArtPath": "/deck-art/115.webp"
  },
  {
    "id": "gg-card-117",
    "cardNumber": 117,
    "name": "Dragoon's Den",
    "faction": "blue",
    "rarity": "Platinum",
    "tribe": "Mutant",
    "type": "Trap",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": 4,
    "ability": "Trip: You gain a Diamond but create an enemy 4/4 Dragoon token with Avian and Flame here. If triggered again after this, you get (2) but the Dragoon deals 2 damage to you. When the Dragoon is destroyed, destroy this Trap too.",
    "flavor": "Don't poke the dragoon.",
    "imagePath": "/cards/116.webp",
    "deckArtPath": "/deck-art/116.webp"
  },
  {
    "id": "gg-card-118",
    "cardNumber": 118,
    "name": "Merchant's Blessing",
    "faction": "blue",
    "rarity": "Aureum",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Start of next turn, you gain a Diamond.",
    "flavor": "Thank The Great Merchant after this match!",
    "imagePath": "/cards/117.webp",
    "deckArtPath": "/deck-art/117.webp"
  },
  {
    "id": "gg-card-119",
    "cardNumber": 119,
    "name": "Flight School",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Tower",
    "cost": 4,
    "power": 3,
    "health": 3,
    "durability": null,
    "ability": "All friendly Avian units have +2/+1 and Crossfire. Lasts 3 turns.",
    "flavor": "Where fliers get their Aviary License.",
    "imagePath": "/cards/118.webp",
    "deckArtPath": "/deck-art/118.webp"
  },
  {
    "id": "gg-card-120",
    "cardNumber": 120,
    "name": "Excessive Intel",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 5,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "A player draws five cards.",
    "flavor": "YEEESSS YESSS! ..Wait no TOO MUCH POWER !",
    "imagePath": "/cards/119.webp",
    "deckArtPath": "/deck-art/119.webp"
  },
  {
    "id": "gg-card-121",
    "cardNumber": 121,
    "name": "Royal Carpet",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Two Goonger cards or any card in your hand cost (1) less. If it was an enemy that triggered this, heal its owner by 2 instead.",
    "flavor": "Welcome, welcome! Drinks to all, even our rivals!",
    "imagePath": "/cards/120.webp",
    "deckArtPath": "/deck-art/120.webp"
  },
  {
    "id": "gg-card-122",
    "cardNumber": 122,
    "name": "Backstage Manager",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 3,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Invader: Search your deck for a card, draw it, then shuffle your deck and discard a card.",
    "flavor": "\"Hey you're not needed for this scene, Blogg, you're up!\"",
    "imagePath": "/cards/121.webp",
    "deckArtPath": "/deck-art/121.webp"
  },
  {
    "id": "gg-card-123",
    "cardNumber": 123,
    "name": "Back From the Shadow Realm",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Choose a card in your Gooraveyard and Dredge it. If it was in the Gooraveyard for more than two turns, then it also costs (1) less.",
    "flavor": "Shadow realm? Not for long!",
    "imagePath": "/cards/122.webp",
    "deckArtPath": "/deck-art/122.webp"
  },
  {
    "id": "gg-card-124",
    "cardNumber": 124,
    "name": "Trash Bin",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Trap",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": 3,
    "ability": "Trip: Owner Recycles two cards. They may Recycle an extra card to gain (1) for saving the environment!",
    "flavor": "This bin isn't old, it keeps getting reused.",
    "imagePath": "/cards/123.webp",
    "deckArtPath": "/deck-art/123.webp"
  },
  {
    "id": "gg-card-125",
    "cardNumber": 125,
    "name": "Second Wind",
    "faction": "red",
    "rarity": "Aureum",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "The last friendly Trick or Trap ability that was triggered will be copied and you may choose different targets for the copy. Deal damage to yourself equal to the cost of the card.",
    "flavor": "The real cause for black holes is playing two Second Winds with each other...nah thats just the lore side of it-it doesn't even work with each other so don't try!",
    "imagePath": "/cards/124.webp",
    "deckArtPath": "/deck-art/124.webp"
  },
  {
    "id": "gg-card-126",
    "cardNumber": 126,
    "name": "Barbaric Axeman",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 3,
    "power": 3,
    "health": 2,
    "durability": null,
    "ability": "Cleave. Upgrade(2): This gets +2/+2.",
    "flavor": "\"I not fear death! To battle!\"",
    "imagePath": "/cards/125.webp",
    "deckArtPath": "/deck-art/125.webp"
  },
  {
    "id": "gg-card-127",
    "cardNumber": 127,
    "name": "Elite Javelineer",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 4,
    "power": 3,
    "health": 5,
    "durability": null,
    "ability": "Overkill, Sluggish. When this destroys an enemy unit, this gets +1/+0.",
    "flavor": "\"Wheeeeeewwww! This sucks! It sucks, it sucks, it sucks, it sucks, it sucks, it sucks, it sucks sooooo bad! It sucks so bad to be weak, ain't that right, Blobby!\"",
    "imagePath": "/cards/126.webp",
    "deckArtPath": "/deck-art/126.webp"
  },
  {
    "id": "gg-card-128",
    "cardNumber": 128,
    "name": "Torch",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Trinket",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a card: Flame.",
    "flavor": "You always gotta make sure you have yer trusty torch before entering wicked caves.",
    "imagePath": "/cards/127.webp",
    "deckArtPath": "/deck-art/127.webp"
  },
  {
    "id": "gg-card-129",
    "cardNumber": 129,
    "name": "Pledge of Plaguing",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Trinket",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a card: Virus 2.",
    "flavor": "Sign here here and here. Now, start a worldwide plague and cause global quarantines!",
    "imagePath": "/cards/128.webp",
    "deckArtPath": "/deck-art/128.webp"
  },
  {
    "id": "gg-card-130",
    "cardNumber": 130,
    "name": "Excavator",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 4,
    "power": 3,
    "health": 2,
    "durability": null,
    "ability": "Nimble. When played, you gain a Diamond.",
    "flavor": "\"Dia-MINE!\"",
    "imagePath": "/cards/129.webp",
    "deckArtPath": "/deck-art/129.webp"
  },
  {
    "id": "gg-card-131",
    "cardNumber": 131,
    "name": "Cleric of Sudden Judgement",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Overslimed. When revealed, Stun a unit. Upgrade(5): When revealed, Stun all enemy units instead and get +1/+1 for each.",
    "flavor": "\"By the will of the Goonger Lord, you shall be judged by I! And I do not like your hair!\"",
    "imagePath": "/cards/130.webp",
    "deckArtPath": "/deck-art/130.webp"
  },
  {
    "id": "gg-card-132",
    "cardNumber": 132,
    "name": "Ravaging Warmaster",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 5,
    "power": 1,
    "health": 5,
    "durability": null,
    "ability": "Revenge, Boned. When a friendly Revenge takes damage, it gets +1/+0.",
    "flavor": "He simply amplifies the inner rage of his soldiers. I mean, we all would naturally get angry if we got hurt, right??",
    "imagePath": "/cards/131.webp",
    "deckArtPath": "/deck-art/131.webp"
  },
  {
    "id": "gg-card-133",
    "cardNumber": 133,
    "name": "The Black Spear Hunter",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 7,
    "power": 4,
    "health": 9,
    "durability": null,
    "ability": "Revenge, Wardlocked. If the opponent plays a Goon in another lane, this moves a space forward to that lane. This damages all targets on the space in front and behind.",
    "flavor": "\"I have survived because I was born struggling. I will keep swinging this slab of iron until my breath stops, my heart bursts, and the ground swallows my bones!\"",
    "imagePath": "/cards/132.webp",
    "deckArtPath": "/deck-art/132.webp"
  },
  {
    "id": "gg-card-134",
    "cardNumber": 134,
    "name": "Popsperity Overseer",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Start of turn, you may give this Sluggish until the end of combat and skip its next attack to gain (1).",
    "flavor": "Boogie breaks are her way of living and hey, it pays.",
    "imagePath": "/cards/133.webp",
    "deckArtPath": "/deck-art/133.webp"
  },
  {
    "id": "gg-card-135",
    "cardNumber": 135,
    "name": "Buff Buffer Bot",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Tower",
    "cost": 4,
    "power": 3,
    "health": 3,
    "durability": null,
    "ability": "When a friendly unit is buffed, they get an additional +1/+1 buff (does not work with other buffs from this card). Lasts 3 turns.",
    "flavor": "\"BEEP BOOP BUP, YOUR BUFF WILL GET BUFFED!\"",
    "imagePath": "/cards/134.webp",
    "deckArtPath": "/deck-art/134.webp"
  },
  {
    "id": "gg-card-136",
    "cardNumber": 136,
    "name": "Duet Combo",
    "faction": "pink",
    "rarity": "Platinum",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Choose a unit in your hand and pay its original cost. It gets Stack and is played on top of another friendly unit, where both of them get +1/+2, Brawl, and Crossfire.",
    "flavor": "\"Alright, me and you, we got this, let's go!\"",
    "imagePath": "/cards/135.webp",
    "deckArtPath": "/deck-art/135.webp"
  },
  {
    "id": "gg-card-137",
    "cardNumber": 137,
    "name": "Pyro-ate",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Flame, Low Opacity.",
    "flavor": "Maybe the burning hat was a bad idea..",
    "imagePath": "/cards/136.webp",
    "deckArtPath": "/deck-art/136.webp"
  },
  {
    "id": "gg-card-138",
    "cardNumber": 138,
    "name": "Goobeard's Pirate Crew",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Swarm 2. When this card is played, create a copy of this in other lanes. Invader: Has +1/+1.",
    "flavor": "\"Yo ho ho! We's Goobeard's skallywag crew, and you's ourrrr foe!\"",
    "imagePath": "/cards/137.webp",
    "deckArtPath": "/deck-art/137.webp"
  },
  {
    "id": "gg-card-139",
    "cardNumber": 139,
    "name": "Piercing Blast",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 2 damage to all enemy units in a lane and the opponent.",
    "flavor": "\"GAMEGAMEHA!\"",
    "imagePath": "/cards/138.webp",
    "deckArtPath": "/deck-art/138.webp"
  },
  {
    "id": "gg-card-140",
    "cardNumber": 140,
    "name": "Voodoo Doll",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a unit: This is played on your opponent's side and it is in their control. The first time this loses health this turn, the opponent takes that much damage. When destroyed, Banish this to draw a card and it costs (1) less.",
    "flavor": "A liability, just for you!",
    "imagePath": "/cards/139.webp",
    "deckArtPath": "/deck-art/139.webp"
  },
  {
    "id": "gg-card-141",
    "cardNumber": 141,
    "name": "Infectious Slobbug",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Virus 1, Low Opacity.",
    "flavor": "Small but ugly.",
    "imagePath": "/cards/140.webp",
    "deckArtPath": "/deck-art/140.webp"
  },
  {
    "id": "gg-card-142",
    "cardNumber": 142,
    "name": "Card Master",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 3,
    "power": 3,
    "health": 1,
    "durability": null,
    "ability": "Crossfire. When played, both players look at the top four cards in their deck; they Recycle two and draw two.",
    "flavor": "Both players lose some and get some, he always makes sure things are even and fair. ",
    "imagePath": "/cards/141.webp",
    "deckArtPath": "/deck-art/141.webp"
  },
  {
    "id": "gg-card-143",
    "cardNumber": 143,
    "name": "Paper Peeler",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 3,
    "power": 3,
    "health": 2,
    "durability": null,
    "ability": "When a friendly card is destroyed, deal 1 damage to yourself and draw a card. When an enemy card is destroyed, you may discard a card to gain (1).",
    "flavor": "\"Normally, you get cuts from paper, but now we cut you to get paper!\"",
    "imagePath": "/cards/142.webp",
    "deckArtPath": "/deck-art/142.webp"
  },
  {
    "id": "gg-card-144",
    "cardNumber": 144,
    "name": "Return to Earth",
    "faction": "blue",
    "rarity": "Aureum",
    "tribe": "Mutant",
    "type": "Trap",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": 1,
    "ability": "When you spend a Diamond, trigger this. When triggered, Recall all cards on this side and they cost (3) more. Deal 3 damage to the opponent.",
    "flavor": "They say shine bright like a diamond, but what if that diamond sends you out of existance?",
    "imagePath": "/cards/143.webp",
    "deckArtPath": "/deck-art/143.webp"
  },
  {
    "id": "gg-card-145",
    "cardNumber": 145,
    "name": "Shiny Drake",
    "faction": "blue",
    "rarity": "Aureum",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Avian, Crossfire. Start of turn, if the Yield Rate is (3) or more, gain a Diamond for this turn only. When you spend a Diamond, this gets +1/+1.",
    "flavor": "He doesn't guard the treasure. He IS the treasure.",
    "imagePath": "/cards/144.webp",
    "deckArtPath": "/deck-art/144.webp"
  },
  {
    "id": "gg-card-146",
    "cardNumber": 146,
    "name": "Explorarator",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "The first time this deals damage, look at three cards in the opponent's hand.",
    "flavor": "Curiosity never hurt any cats! Thats a myth!",
    "imagePath": "/cards/145.webp",
    "deckArtPath": "/deck-art/145.webp"
  },
  {
    "id": "gg-card-147",
    "cardNumber": 147,
    "name": "Perat",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 1,
    "power": 1,
    "health": 1,
    "durability": null,
    "ability": "Avian. When you discard a card, you may Pay(1) to draw a copy of it.",
    "flavor": "Here, you dropped this.",
    "imagePath": "/cards/146.webp",
    "deckArtPath": "/deck-art/146.webp"
  },
  {
    "id": "gg-card-148",
    "cardNumber": 148,
    "name": "Lapicidina",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Tower",
    "cost": 2,
    "power": 0,
    "health": 2,
    "durability": null,
    "ability": "End of turn, all other friendly Towers get +1/+1. Lasts 6 turns.",
    "flavor": "A large stronghold that strengthens buildings in its vicinity, improving their effectiveness before they inevitably get consumed by dust. Inhabitants of the Tabula know that very well.",
    "imagePath": "/cards/147.webp",
    "deckArtPath": "/deck-art/147.webp"
  },
  {
    "id": "gg-card-149",
    "cardNumber": 149,
    "name": "Grex Duo",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 3,
    "durability": null,
    "ability": "Swarm 2.",
    "flavor": "The only company they have is each other, but even then they're rivals because they always fight for food.",
    "imagePath": "/cards/148.webp",
    "deckArtPath": "/deck-art/148.webp"
  },
  {
    "id": "gg-card-150",
    "cardNumber": 150,
    "name": "Fremitus Terrae",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Trick",
    "cost": 13,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 3 damage to the first enemy unit in each lane, three times. If there are no enemy units in a lane, damage the opponent instead. When this destroys a unit, create a 3/3 Petravir with Sluggish on the space where the unit died.",
    "flavor": "With the right amount of time, this invasion of Petravirs can wipe out 80% of Goomanity.",
    "imagePath": "/cards/149.webp"
  },
  {
    "id": "gg-card-151",
    "cardNumber": 151,
    "name": "Tome of Life",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Trinket",
    "cost": 2,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Equip a Tower: +1/+1 and cannot lose lifetime OR Equip a Goon: +1/+1 and Boned.",
    "flavor": "Rumors has it that Dr. Frankenstein actually used THIS to give life to his monster. At least thats what the clerics want to believe.",
    "imagePath": "/cards/150.webp",
    "deckArtPath": "/deck-art/150.webp"
  },
  {
    "id": "gg-card-152",
    "cardNumber": 152,
    "name": "Blessed Ballista",
    "faction": "yellow",
    "rarity": "Silver",
    "tribe": "Goonger",
    "type": "Tower",
    "cost": 3,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Artillery, Crossfire. When this deals damage, you heal by that much. Lasts 3 turns.",
    "flavor": "Sometimes, we have to hurt to heal.",
    "imagePath": "/cards/151.webp",
    "deckArtPath": "/deck-art/151.webp"
  },
  {
    "id": "gg-card-153",
    "cardNumber": 153,
    "name": "Lifesteal",
    "faction": "yellow",
    "rarity": "Bronze",
    "tribe": "Goonger",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 1 damage to all enemy units and you heal that much. While in the Gooraveyard, you may Pay(4) to replay this and Banish it.",
    "flavor": "\"I'VE REJECTED MY GOOMANITY!\"",
    "imagePath": "/cards/152.webp",
    "deckArtPath": "/deck-art/152.webp"
  },
  {
    "id": "gg-card-154",
    "cardNumber": 154,
    "name": "Sunblast Knight",
    "faction": "yellow",
    "rarity": "Aureum",
    "tribe": "Goonger",
    "type": "Goon",
    "cost": 5,
    "power": 3,
    "health": 7,
    "durability": null,
    "ability": "When an enemy unit is Stunned, destroy it.",
    "flavor": "\"Praise the sun!\"",
    "imagePath": "/cards/153.webp",
    "deckArtPath": "/deck-art/153.webp"
  },
  {
    "id": "gg-card-155",
    "cardNumber": 155,
    "name": "Legendary Warrior Statue",
    "faction": "yellow",
    "rarity": "Platinum",
    "tribe": "Goonger",
    "type": "Tower",
    "cost": 6,
    "power": 4,
    "health": 5,
    "durability": null,
    "ability": "Boned, Cleave. The health of other friendly units on this side and yourself cannot go below 1. Lasts 7 turns.",
    "flavor": "A tribute to Sir Onoda Cartoon di Wiart. A fighter so brave, so couragous, that his statue inspires others and shields them from the despair he faced, granting them his strength and endurance.",
    "imagePath": "/cards/154.webp",
    "deckArtPath": "/deck-art/154.webp"
  },
  {
    "id": "gg-card-156",
    "cardNumber": 156,
    "name": "Fashionista Bina",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 2,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "When a friendly unit enters a lane adjacent to this, this gets +1/+1.",
    "flavor": "You could say her hairstyle is quite bizarre.",
    "imagePath": "/cards/155.webp",
    "deckArtPath": "/deck-art/155.webp"
  },
  {
    "id": "gg-card-157",
    "cardNumber": 157,
    "name": "Goolympic Acrobat",
    "faction": "pink",
    "rarity": "Bronze",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 2,
    "power": 2,
    "health": 4,
    "durability": null,
    "ability": "Sidewinder. When this enters a lane, this moves a space forward, passing through enemy units.",
    "flavor": "Six-year time Goolympics champion, participating in every sport. Even the burger eating competitions!",
    "imagePath": "/cards/156.webp",
    "deckArtPath": "/deck-art/156.webp"
  },
  {
    "id": "gg-card-158",
    "cardNumber": 158,
    "name": "Orchestra Conductor",
    "faction": "pink",
    "rarity": "Aureum",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 5,
    "durability": null,
    "ability": "End of turn, a unit will do an extra attack this combat. Valor: It will do an extra movement as well.",
    "flavor": "\"That first note was off. Try again.\"",
    "imagePath": "/cards/157.webp",
    "deckArtPath": "/deck-art/157.webp"
  },
  {
    "id": "gg-card-159",
    "cardNumber": 159,
    "name": "Wild Riot",
    "faction": "pink",
    "rarity": "Silver",
    "tribe": "Lubina",
    "type": "Trick",
    "cost": 7,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "All friendly units have +3/+3 and Overkill until the end of combat.",
    "flavor": "Don't mess with goo protests.",
    "imagePath": "/cards/158.webp",
    "deckArtPath": "/deck-art/158.webp"
  },
  {
    "id": "gg-card-160",
    "cardNumber": 160,
    "name": "Carmen La Bailarina",
    "faction": "pink",
    "rarity": "Platinum",
    "tribe": "Lubina",
    "type": "Goon",
    "cost": 8,
    "power": 6,
    "health": 7,
    "durability": null,
    "ability": "Sidewinder, Wardlocked. Units with Sidewinder will always switch to the next lane and when they do, they will have an extra movement and attack. Valor: When this deals damage, give a unit Sidewinder and +1/+1 until the end of combat.",
    "flavor": "The only language she speaks is dance.",
    "imagePath": "/cards/159.webp",
    "deckArtPath": "/deck-art/159.webp"
  },
  {
    "id": "gg-card-161",
    "cardNumber": 161,
    "name": "Booming Ballista",
    "faction": "red",
    "rarity": "Silver",
    "tribe": "Blob",
    "type": "Tower",
    "cost": 3,
    "power": 2,
    "health": 1,
    "durability": null,
    "ability": "Artillery. When this damages a unit, adjacent units also take 1 damage. When this deals damage to the opponent, create a Fire Trap token on their space. Lasts 3 turns.",
    "flavor": "It was built with explosive ideas in mind.",
    "imagePath": "/cards/160.webp",
    "deckArtPath": "/deck-art/160.webp"
  },
  {
    "id": "gg-card-162",
    "cardNumber": 162,
    "name": "Miniature Ranger",
    "faction": "red",
    "rarity": "Aureum",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 3,
    "power": 1,
    "health": 3,
    "durability": null,
    "ability": "When another friendly unit with 2 or less strength attacks, this deals 1 damage to the target they are attacking. When a friendly Trick or Trap deals damage, you may Pay(1) to deal 1 damage to all units and players it was targeting.",
    "flavor": "\"Defense is the best offense? What about support?\"",
    "imagePath": "/cards/161.webp",
    "deckArtPath": "/deck-art/161.webp"
  },
  {
    "id": "gg-card-163",
    "cardNumber": 163,
    "name": "Gate of the Sun",
    "faction": "red",
    "rarity": "Platinum",
    "tribe": "Blob",
    "type": "Trap",
    "cost": 4,
    "power": null,
    "health": null,
    "durability": 2,
    "ability": "Flame. When played, this is immediately revealed. When a card with Flame deals damage, it creates three Fire Trap tokens instead, two of which can be placed in different areas. End of combat, destroy this. Upgrade(3): Instead of being destroyed at the end of combat, this Trap gains “Trip: Deal 3 damage to the triggering unit. When this deals damage, it creates a Fire Trap token in adjacent spaces too.”",
    "flavor": "WARNING: Do not actually pass through this gate, its kinda hot.",
    "imagePath": "/cards/162.webp",
    "deckArtPath": "/deck-art/162.webp"
  },
  {
    "id": "gg-card-164",
    "cardNumber": 164,
    "name": "Teeny Crossbow Towers",
    "faction": "red",
    "rarity": "Bronze",
    "tribe": "Blob",
    "type": "Tower",
    "cost": 4,
    "power": 1,
    "health": 2,
    "durability": null,
    "ability": "Swarm 3, Crossfire. Lasts 3 turns.",
    "flavor": "Like small little pinches that can start to hurt when piled up.",
    "imagePath": "/cards/163.webp",
    "deckArtPath": "/deck-art/163.webp"
  },
  {
    "id": "gg-card-165",
    "cardNumber": 165,
    "name": "Multiplying Morpho-blob",
    "faction": "red",
    "rarity": "Platinum",
    "tribe": "Blob",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 2,
    "durability": null,
    "ability": "Brawl, Swarm 1, Paywall 2 HP. End of turn, this gets Swarm +1 or Swarm -1 to create a Multiplying Morpho-blob in a space adjacent to this.",
    "flavor": "\"You can kill me, but can you kill AALLL of me's?\"",
    "imagePath": "/cards/164.webp",
    "deckArtPath": "/deck-art/164.webp"
  },
  {
    "id": "gg-card-166",
    "cardNumber": 166,
    "name": "Sewage Shower Handel",
    "faction": "purple",
    "rarity": "Silver",
    "tribe": "Slobbant",
    "type": "Trinket",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Imbue a card: Overslimed (any ‘When played..’ abilities become ‘When revealed…’ abilities). Upgrade(1): Equip this instead.",
    "flavor": "A stinky, smelly, sludgy shower that does its job of keeping you dirty.",
    "imagePath": "/cards/165.webp",
    "deckArtPath": "/deck-art/165.webp"
  },
  {
    "id": "gg-card-167",
    "cardNumber": 167,
    "name": "Witch Doctor",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 2,
    "power": 1,
    "health": 4,
    "durability": null,
    "ability": "When a friendly Overslimed unit is revealed, it gets +1/+2.",
    "flavor": "She doesn't know actual voodoo witch magic, she just knows her mystical words. ",
    "imagePath": "/cards/166.webp",
    "deckArtPath": "/deck-art/166.webp"
  },
  {
    "id": "gg-card-168",
    "cardNumber": 168,
    "name": "Zombifying Fog",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Trap",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": 2,
    "ability": "When a non-Zombie unit dies on this Trap, Trigger it. When triggered, create a Zombie copy of that unit with Low Opacity under your control. You may Pay (3) when this would be Triggered to remove Low Opacity from the Zombie.",
    "flavor": "Couldn't have died in a better place, right?",
    "imagePath": "/cards/167.webp",
    "deckArtPath": "/deck-art/167.webp"
  },
  {
    "id": "gg-card-169",
    "cardNumber": 169,
    "name": "Swarm Feeder",
    "faction": "purple",
    "rarity": "Bronze",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 4,
    "power": 4,
    "health": 4,
    "durability": null,
    "ability": "Valor: Has Virus 1.",
    "flavor": "\"Feast, feast my pretties! Feast!\"",
    "imagePath": "/cards/168.webp",
    "deckArtPath": "/deck-art/168.webp"
  },
  {
    "id": "gg-card-170",
    "cardNumber": 170,
    "name": "Goon of Impending Doom",
    "faction": "purple",
    "rarity": "Aureum",
    "tribe": "Slobbant",
    "type": "Goon",
    "cost": 5,
    "power": 2,
    "health": 3,
    "durability": null,
    "ability": "Overslimed. Invader: Destroy all cards on the opponents side. This gets +1/+1 for each one destroyed.",
    "flavor": "\"Doom is coming.\"",
    "imagePath": "/cards/169.webp",
    "deckArtPath": "/deck-art/169.webp"
  },
  {
    "id": "gg-card-171",
    "cardNumber": 171,
    "name": "Scour the Garbage",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Trick",
    "cost": 1,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "A player Recycles two cards. Draw a card.",
    "flavor": "One's man trash is my treasure.",
    "imagePath": "/cards/170.webp",
    "deckArtPath": "/deck-art/170.webp"
  },
  {
    "id": "gg-card-172",
    "cardNumber": 172,
    "name": "Wise Scientist",
    "faction": "blue",
    "rarity": "Bronze",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 3,
    "power": null,
    "health": 3,
    "durability": null,
    "ability": "The strength of this is always equal to the amount of cards in your hand.",
    "flavor": "\"A person who thinks all the time, has nothing to think about except thoughts. Or, I think about how many 'Megamind' comments I've been receiving recently.\"",
    "imagePath": "/cards/171.webp",
    "deckArtPath": "/deck-art/171.webp"
  },
  {
    "id": "gg-card-173",
    "cardNumber": 173,
    "name": "Jewel Market",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Tower",
    "cost": 4,
    "power": 1,
    "health": 5,
    "durability": null,
    "ability": "Start of turn, if you have a Diamond, a card in your hand costs (1) less. Pay(Diamond): Draw three cards. Lasts 4 turns.",
    "flavor": "\"Pay by..card? Are you mocking me?!\" -Jewel Merchant",
    "imagePath": "/cards/172.webp",
    "deckArtPath": "/deck-art/172.webp"
  },
  {
    "id": "gg-card-174",
    "cardNumber": 174,
    "name": "Brain Moggler 5000",
    "faction": "blue",
    "rarity": "Silver",
    "tribe": "Mutant",
    "type": "Tower",
    "cost": 5,
    "power": 3,
    "health": 6,
    "durability": null,
    "ability": "Crossfire. When a player would Recycle or discard a card, they Recycle or discard an additional one. Lasts 4 turns.",
    "flavor": "Ever heard of the Great Wise Goozies? Exactly.",
    "imagePath": "/cards/173.webp",
    "deckArtPath": "/deck-art/173.webp"
  },
  {
    "id": "gg-card-175",
    "cardNumber": 175,
    "name": "Abominatigoon",
    "faction": "blue",
    "rarity": "Platinum",
    "tribe": "Mutant",
    "type": "Goon",
    "cost": 6,
    "power": 10,
    "health": 5,
    "durability": null,
    "ability": "Avian. When a card would damage the opponent, they Recycle that many cards instead. Invader: Instead of attacking enemy units, this will attack the opponent directly.",
    "flavor": "Its eyesight works best when its hungry.",
    "imagePath": "/cards/174.webp",
    "deckArtPath": "/deck-art/174.webp"
  },
  {
    "id": "gg-card-176",
    "cardNumber": 176,
    "name": "Abicio",
    "faction": "gray",
    "rarity": "Silver",
    "tribe": "Neutral",
    "type": "Trick",
    "cost": 3,
    "power": null,
    "health": null,
    "durability": null,
    "ability": "Deal 2 damage and a player discards a card.",
    "flavor": "You had an Ace in your hand? Well where is it? What Ace?",
    "imagePath": "/cards/175.webp",
    "deckArtPath": "/deck-art/175.webp"
  },
  {
    "id": "gg-card-177",
    "cardNumber": 177,
    "name": "Custos Latro",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 4,
    "power": 4,
    "health": 4,
    "durability": null,
    "ability": "Wardlocked.",
    "flavor": "Hears all, feels nothing.",
    "imagePath": "/cards/176.webp",
    "deckArtPath": "/deck-art/176.webp"
  },
  {
    "id": "gg-card-178",
    "cardNumber": 178,
    "name": "Tauntus Latronem",
    "faction": "gray",
    "rarity": "Bronze",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 4,
    "power": 1,
    "health": 6,
    "durability": null,
    "ability": "Taunt, Revenge.",
    "flavor": "Actions do INDEED have consequences.",
    "imagePath": "/cards/177.webp",
    "deckArtPath": "/deck-art/177.webp"
  },
  {
    "id": "gg-card-179",
    "cardNumber": 179,
    "name": "Magna Arca Aureum",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Tower",
    "cost": 5,
    "power": 1,
    "health": 4,
    "durability": null,
    "ability": "Start of turn, set all players' gold to (5). Unspent gold is not carried over. Lasts 4 turns.",
    "flavor": "If a card creates balance between player resources, does that make it balanced? Hopefully, yes.",
    "imagePath": "/cards/178.webp",
    "deckArtPath": "/deck-art/178.webp"
  },
  {
    "id": "gg-card-180",
    "cardNumber": 180,
    "name": "Porcus Laborious",
    "faction": "gray",
    "rarity": "Aureum",
    "tribe": "Neutral",
    "type": "Goon",
    "cost": 7,
    "power": 8,
    "health": 8,
    "durability": null,
    "ability": "Start of combat, choose a lane. Only that lane will move, attack, and have their abilities trigger this combat. Invader: Start of combat, all friendly units in the selected lane also have +1/+1 and Brawl.",
    "flavor": "This amalgam of a Goon uses its meaty skin to immobilize other fighters so he can go hogwild.",
    "imagePath": "/cards/179.webp",
    "deckArtPath": "/deck-art/179.webp"
  }
];

const DEFAULT_DECK = {
  id: 'deck-starter-1',
  name: 'Untitled Deck',
  cards: {}, // Start with a clean deck; build from the official 180-card collection.
};

const DEFAULT_COUNTERS = [
  { id: 'c-1', name: 'Diamonds', value: 0, icon: 'diamond' },
  { id: 'c-2', name: 'Tower Lifetime 1', value: 0, icon: 'clock' },
  { id: 'c-3', name: 'Trap Durability 2', value: 0, icon: 'shield' },
  { id: 'c-4', name: 'Counter 1', value: 0, icon: 'rings' },
];

const INITIAL_MATCH_STATE = {
  turn: 1,
  yieldRate: 2,
  players: [
    { id: 1, name: 'PLAYER 1', life: 20, gold: 2, hand: 4, counters: JSON.parse(JSON.stringify(DEFAULT_COUNTERS)) },
    { id: 2, name: 'PLAYER 2', life: 20, gold: 2, hand: 4, counters: JSON.parse(JSON.stringify(DEFAULT_COUNTERS)) },
    { id: 3, name: 'PLAYER 3', life: 20, gold: 2, hand: 4, counters: JSON.parse(JSON.stringify(DEFAULT_COUNTERS)) },
    { id: 4, name: 'PLAYER 4', life: 20, gold: 2, hand: 4, counters: JSON.parse(JSON.stringify(DEFAULT_COUNTERS)) },
  ]
};

// ============================================================================
// CUSTOM SVG ARTWORK & FACTION ICONS (INSPIRED BY USER'S HAND-DRAWN SKETCHES)
// ============================================================================

const FactionIcon = ({ factionId, className = 'w-6 h-6' }) => {
  const iconFiles = {
    red: 'blob', yellow: 'goonger', pink: 'bina', blue: 'mutant', purple: 'slobbant', gray: 'neutral'
  };
  const iconNames = { red: 'Blob', yellow: 'Goonger', pink: 'Bina', blue: 'Mutant', purple: 'Slobbant', gray: 'Neutral' };
  const file = iconFiles[factionId] || 'neutral';
  return <img src={`/tribes/${file}.png`} alt={`${iconNames[factionId] || 'Neutral'} tribe`} className={`${className} object-contain`} draggable={false} />;
};

const CardIllustration = ({ artType, faction }) => {
  const stroke = '#18181b';
  switch (artType) {
    case 'lil-blobaby':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          <path d="M45 78c-12-8-14-28-4-40 10-12 32-16 48-6 16 10 20 32 8 46-12 12-40 8-52 0z" fill="#f87171" stroke={stroke} strokeWidth="3.5" />
          <circle cx="66" cy="48" r="4" fill={stroke} />
          <circle cx="88" cy="48" r="4" fill={stroke} />
          <path d="M74 56c3 2 6 0 4-3 3-2 0-5-4-3" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35 66l15-10 4 8-19 2z" fill="#fca5a5" stroke={stroke} strokeWidth="2.5" />
          <path d="M112 22l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" fill="#fef08a" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'blob-bros':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          {/* Left Blob */}
          <path d="M25 56c-6-12 4-28 20-28 16 0 24 12 20 24-4 12-34 16-40 4z" fill="#ef4444" stroke={stroke} strokeWidth="3" />
          <path d="M36 42l8 4-8 3M54 42l-8 4 8 3" fill="none" stroke={stroke} strokeWidth="2.5" />
          <path d="M38 52c5 4 12 4 16 0" fill="none" stroke={stroke} strokeWidth="2.5" />
          {/* Right Blob */}
          <path d="M84 78c-6-12 4-28 22-28 18 0 26 14 20 26-6 12-36 14-42 2z" fill="#f87171" stroke={stroke} strokeWidth="3" />
          <circle cx="98" cy="64" r="3" fill={stroke} />
          <circle cx="114" cy="64" r="3" fill={stroke} />
          <path d="M97 72c6 6 14 6 20 0z" fill="#fff" stroke={stroke} strokeWidth="2.2" />
        </svg>
      );
    case 'blob-scout':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          {/* Speed lines */}
          <path d="M18 32h34M12 46h32M20 60h28M26 74h26" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          {/* Dashing Helmeted Blob */}
          <path d="M55 76c-4-20 8-44 34-44 24 0 36 22 30 44-8 14-56 14-64 0z" fill="#fb923c" stroke={stroke} strokeWidth="3.2" />
          <path d="M62 42c14-12 38-12 52 0" fill="none" stroke={stroke} strokeWidth="3" />
          <path d="M74 58c10 10 26 10 36 0z" fill="#fff" stroke={stroke} strokeWidth="2.5" />
          <path d="M78 48l10 4M106 48l-10 4" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case 'caltrops':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          {[
            [42, 42], [85, 32], [118, 48], [58, 76], [102, 74]
          ].map(([cx, cy], idx) => (
            <g key={idx} transform={`translate(${cx}, ${cy})`}>
              <path d="M0 -14 L4 -3 L14 4 L2 3 L-6 13 L-4 2 L-14 -3 L-3 -3 Z" fill="#9ca3af" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
            </g>
          ))}
        </svg>
      );
    case 'viral-blob':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          <path d="M80 18l8 14 16-8-4 16 18 4-12 12 12 14-18 2 2 16-16-6-8 14-8-14-16 6 2-16-18-2 12-14-12-12 18-4-4-16 16 8z" fill="#f43f5e" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="70" cy="52" r="7" fill="#fff" stroke={stroke} strokeWidth="2.5" />
          <circle cx="72" cy="52" r="2.5" fill={stroke} />
          <circle cx="92" cy="50" r="8" fill="#fff" stroke={stroke} strokeWidth="2.5" />
          <circle cx="90" cy="50" r="3" fill={stroke} />
          <path d="M68 70c8-6 18-6 26 0" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'dynamite':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          <g transform="rotate(-18 55 50)">
            <rect x="30" y="38" width="44" height="14" rx="3" fill="#ef4444" stroke={stroke} strokeWidth="2.8" />
            <text x="38" y="49" fontSize="9" fontWeight="bold" fill="#fff">TNT</text>
            <path d="M74 45c8-4 12-10 18-8" fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle cx="94" cy="37" r="4" fill="#facc15" />
          </g>
          <g transform="rotate(22 105 68)">
            <rect x="78" y="60" width="46" height="14" rx="3" fill="#dc2626" stroke={stroke} strokeWidth="2.8" />
            <text x="88" y="71" fontSize="9" fontWeight="bold" fill="#fff">TNT</text>
            <path d="M124 67c8 2 12-4 16-2" fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle cx="142" cy="65" r="4" fill="#facc15" />
          </g>
        </svg>
      );
    case 'paralyze':
      return (
        <svg viewBox="0 0 160 110" className="w-full h-full">
          <path d="M22 25l24 14M20 55h28M24 85l24-14M138 25l-24 14M140 55h-28M136 85l-24-14" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
          <rect x="64" y="34" width="32" height="52" rx="14" fill="#fef08a" stroke={stroke} strokeWidth="3" />
          <circle cx="80" cy="28" r="13" fill="#fde047" stroke={stroke} strokeWidth="3" />
          <path d="M73 26l5 3-5 3M87 26l-5 3 5 3" fill="none" stroke={stroke} strokeWidth="2.2" />
          <path d="M74 35h12" stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    default:
      return (
        <div className="w-full h-full flex items-center justify-center opacity-80">
          <FactionIcon factionId={faction} className="w-16 h-16 text-zinc-900" />
        </div>
      );
  }
};

const CounterIcon = ({ icon, className = 'w-7 h-7' }) => {
  switch (icon) {
    case 'diamond':
      return <Diamond className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'rings':
    default:
      return <CircleDot className={className} />;
  }
};

const KEYWORD_DEFINITIONS = {
  "Brawl": "This attacks simultaneously with the opposing unit instead of following combat order.",
  "Crossfire": "Can attack units in adjacent lanes.",
  "Trip": "When a unit steps or is played on top of this card, reveal it, trigger its ability, and remove 1 Durability.",
  "Celerity": "Always attacks first. If attacking another unit with Celerity, they both attack simultaneously instead.",
  "Cleave": "Damages all enemy units on the column in front, behind, and adjacent spaces here.",
  "Flame": "After this deals damage, create a Fire Trap token on the space they dealt damage on.",
  "Low Opacity": "This unit dies after attacking and dealing damage.",
  "Overkill": "All excess damage goes to the nearest enemy unit or opponent in the lane.",
  "Poison": "After dealing damage to an enemy unit, at the end of combat, destroy it.",
  "Sidewinder": "After dealing damage, this moves to the adjacent lane.",
  "Virus": "When this destroys a card, all other enemy units on its column and the one behind it get -X/-X. If there are no enemy units initially in that radius, then the opponent loses X health. Virus cannot trigger itself.",
  "Avian": "Cannot be blocked by non-Avian or non-Air Blocker Goons and Traps.",
  "Air Blocker": "Avian units can be attacked by this and they cannot pass through this.",
  "Boned": "Takes 1 less damage from all sources.",
  "Everlasting": "Cannot be destroyed instantly by abilities or keywords.",
  "Immobile": "Cannot move or change lanes.",
  "Paywall": "If this is the target of an enemy ability, the opponent must spend (X). If they do not, then they are forced to choose another target as the ability will not affect this card.",
  "Revenge": "When damaged, this unit deals damage equal to its STR back.",
  "Taunt": "Enemy Goons, Towers, Tricks, and Trinkets must target this unit before targeting any other friendly unit or player behind this unit. Enemy Goons in adjacent lanes entering the same or previous column must attack the Taunt unit adjacently without changing lanes.",
  "Wardlocked": "Cannot be the specific target of ALL other abilities (including your own).",
  "Artillery": "Has infinite range but stats cannot be increased.",
  "Nimble": "Moves an additional three spaces when played and will attack immediately if able.",
  "Sluggish": "Moves one space per turn.",
  "Stun": "Skip the next movement and attack.",
  "Stack": "This can share a space with another friendly unit.",
  "Swarm": "Counts as X units instead of one and they can share the same space with each other. As they are separate units, any ability on the card can trigger for each unit, unless the ability refers to the entire card, then it only happens once (e.g. ‘when this card is played’ instead of ‘when played’). This also applies when targeting the card; if an ability refers to the entire 'card', then ",
  "Discard": "Remove a card from your hand and put it in the Gooraveyard.",
  "Dredge": "Draw the top card from the Gooraveyard.",
  "Recall": "Returns to the player's hand with base stats and cost.",
  "Recycle": "Put the top card of your deck into the Gooraveyard.",
  "Invader": "When this enters the opponent’s side, it gains this extra ability. It is removed when they exit the side.",
  "Valor": "When this enters the Half-Line, it gains this extra ability. It is removed when they exit the Half-line.",
  "Imbue": "Instead of equipping this to a card on the board, it must be equipped while that card is in your hand.",
  "Overslimed": "This card must be played faced down and IF you are player 2, before the opponent’s turn. While face down, it is not a unit; it cannot be damaged, targeted, and does not block or attack. At the end of the opponent’s turn, reveal it. When revealed, it enters play normally.",
  "Upgrade": "Additional ability activates when you spend an extra (X) playing this card.",
  "Banish": "This card is removed from the game and does not go to the Gooraveyard.",
  "Diamonds": "One diamond is equal to three gold. They can be spent instead of gold.",
  "Pay": "Additional ability activates when you spend (X) on this card during your turn.",
  "Sacrifice": "Any act of killing your own cards is considered a sacrifice."
};

const RELATED_CARD_LINKS = {
  "Viral Blob": {
    "Blobteria": [
      "Blobteria",
      "/related/Tokens_card1.webp"
    ]
  },
  "Blob Factory": {
    "Blob": [
      "Blob",
      "/related/Tokens_card2.webp"
    ]
  },
  "Mom Blob": {
    "Lil' Blobabies": [
      "Lil Blobaby",
      "/related/LilBlobaby.webp"
    ]
  },
  "Booming Ballista": {
    "Fire": [
      "Fire Trap Token",
      "/related/Tokens_card8.webp"
    ]
  },
  "Tabula Munitionis": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Tabula Magica": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Tabula Nugatoria": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Schistus Trappaeus": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Schistus Terrestris": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ],
    "Petravir": [
      "Petravir",
      "/related/Cards_card83.webp"
    ]
  },
  "Tegula Tectoria Terris": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Tabula Colossa": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Tabula Militaris": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Rex Ardesius": {
    "Tabula Rasa": [
      "Tabula Rasa",
      "/related/Tokens_card5.webp"
    ]
  },
  "Goo Lord": {
    "Goorunt": [
      "Goorunt",
      "/related/Tokens_card3.webp"
    ]
  },
  "Dragoon's Den": {
    "Dragoon": [
      "Dragoon",
      "/related/Tokens_card7.webp"
    ]
  },
  "Fremitus Terrae": {
    "Petravir": [
      "Petravir",
      "/related/Cards_card83.webp"
    ]
  },
  "Encore Summons": {
    "Copy": [
      "Copy Token",
      "/related/Tokens_card4.webp"
    ]
  },
  "Goobeard's Pirate Crew": {
    "Copy": [
      "Copy Token",
      "/related/Tokens_card4.webp"
    ]
  },
  "Transfigooration Blob": {
    "Transfigooration Blob": [
      "Transfigooration Blob",
      "/related/Tokens_card6.webp"
    ]
  }
};

// Developer-managed announcements. Add/edit posts here in the source code;
// visitors can read announcements but cannot edit them in the app.
const NEWS_POSTS = [
  // Example:
  // { id: '2026-11-launch', date: 'November 15, 2026', category: 'Update', title: 'Welcome to Gold & Goons', body: 'Your announcement goes here.' },
];

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Main screens: collection/deck builder, saved deck library, full deck overview, tracker, news.
  const [activeView, setActiveView] = useState('collection');
  const [hoveredDeckCardId, setHoveredDeckCardId] = useState(null);
  const [hoveredDeckCardTop, setHoveredDeckCardTop] = useState(0);
  const [deckViewerSortMode, setDeckViewerSortMode] = useState('deck');
  const [deckViewerSortDirection, setDeckViewerSortDirection] = useState('asc');

  // Cards & Custom Cards State
  const [customCards, setCustomCards] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_custom_cards');
      const parsed = saved ? JSON.parse(saved) : [];
      // Permanently purge the old test card that was removed from the collection.
      // This also cleans up any stale deck entries that still reference its ID.
      const removedIds = new Set(
        parsed
          .filter((card) => String(card?.name || '').trim().toLowerCase() === 'skeetus trappaeus')
          .map((card) => card.id)
          .filter(Boolean)
      );
      const remaining = parsed.filter(
        (card) => String(card?.name || '').trim().toLowerCase() !== 'skeetus trappaeus'
      );
      if (removedIds.size) {
        localStorage.setItem('gg_custom_cards', JSON.stringify(remaining));
        try {
          const savedDecks = JSON.parse(localStorage.getItem('gg_decks') || '[]');
          const cleanedDecks = savedDecks.map((deck) => {
            const cards = { ...(deck.cards || {}) };
            removedIds.forEach((id) => delete cards[id]);
            return {
              ...deck,
              cards,
              coverCardId: removedIds.has(deck.coverCardId) ? null : deck.coverCardId,
            };
          });
          localStorage.setItem('gg_decks', JSON.stringify(cleanedDecks));
        } catch (cleanupError) {
          console.warn('Could not clean old Skeetus Trappaeus deck references:', cleanupError);
        }
      }
      return remaining;
    } catch {
      return [];
    }
  });

  const allCards = useMemo(() => [...OFFICIAL_CARDS, ...customCards], [customCards]);
  const tribeOrder = ['Blob', 'Goonger', 'Lubina', 'Mutant', 'Slobbant', 'Neutral'];
  // Keep the source/database order by default. Tribe grouping is opt-in via All Tribes.
  const collectionCards = useMemo(() => [...OFFICIAL_CARDS, ...customCards]
    .map((card) => ({
      ...card,
      rarity: String(card.rarity || '').trim() === 'Aurum' ? 'Aureum' : String(card.rarity || '').trim(),
      type: String(card.type || '').trim(),
      tribe: String(card.tribe || '').trim(),
    })), [customCards]);

  // Decks State
  const [decks, setDecks] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_decks');
      return saved ? JSON.parse(saved) : [DEFAULT_DECK];
    } catch {
      return [DEFAULT_DECK];
    }
  });
  const [activeDeckId, setActiveDeckId] = useState(() => {
    return localStorage.getItem('gg_active_deck_id') || DEFAULT_DECK.id;
  });

  const activeDeck = useMemo(
    () => decks.find((d) => d.id === activeDeckId) || decks[0] || DEFAULT_DECK,
    [decks, activeDeckId]
  );

  useEffect(() => {
    if (hoveredDeckCardId && !(activeDeck.cards?.[hoveredDeckCardId] > 0)) {
      setHoveredDeckCardId(null);
      setHoveredDeckCardTop(0);
    }
  }, [activeDeck, hoveredDeckCardId]);

  // Collection Filters & UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFactions, setSelectedFactions] = useState([]);
  const [groupAllTribes, setGroupAllTribes] = useState(false);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [sortMode, setSortMode] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [deckRuleMessage, setDeckRuleMessage] = useState('');
  const [keywordHelp, setKeywordHelp] = useState(null);
  const [relatedCardHelp, setRelatedCardHelp] = useState(null);

  const renderInteractiveCardText = (text, card) => {
    const relatedForCard = RELATED_CARD_LINKS[card?.name] || {};
    const keywordAliases = {
      Stunned: 'Stun',
      Stunning: 'Stun',
      Poisoned: 'Poison',
      Poisoning: 'Poison',
      Discards: 'Discard',
      Discarded: 'Discard',
      Discarding: 'Discard'
    };
    const fixedTerms = [...Object.keys(KEYWORD_DEFINITIONS), ...Object.keys(keywordAliases)]
      .filter((term) => !['Virus', 'Paywall', 'Swarm', 'Upgrade', 'Pay', 'Diamonds'].includes(term))
      .sort((a, b) => b.length - a.length);
    const dynamicPattern = '(?:Paywall|Virus|Swarm|Upgrade|Pay)\\s*(?:\\(\\s*\\d+\\s*\\)|\\d+)';
    const relatedTerms = Object.keys(relatedForCard).sort((a, b) => b.length - a.length);
    const resourceTerms = ['Diamonds', 'Diamond'];
    const escapeRegex = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp('(' + [dynamicPattern, ...fixedTerms.map(escapeRegex), ...relatedTerms.map(escapeRegex), ...resourceTerms.map(escapeRegex)].join('|') + ')', 'gi');
    const parts = String(text || '').split(pattern);
    return parts.map((part, index) => {
      if (!part) return null;
      if (/^diamonds?$/i.test(part)) {
        return <button key={index} type="button" onClick={(e) => { e.stopPropagation(); setKeywordHelp((prev) => prev?.name === 'Diamonds' ? null : { name: 'Diamonds', description: KEYWORD_DEFINITIONS.Diamonds }); }} className="keyword-trigger font-black underline decoration-dotted underline-offset-2 text-black hover:text-zinc-700">{part}</button>;
      }
      const dynamicMatch = part.match(/^(Paywall|Virus|Swarm|Upgrade|Pay)\s*\(?\s*(\d+)\s*\)?$/i);
      let canonical = Object.keys(KEYWORD_DEFINITIONS).find((term) => term.toLowerCase() === part.toLowerCase()) || keywordAliases[part] || Object.entries(keywordAliases).find(([alias]) => alias.toLowerCase() === part.toLowerCase())?.[1];
      let value = null;
      if (dynamicMatch) {
        canonical = dynamicMatch[1][0].toUpperCase() + dynamicMatch[1].slice(1).toLowerCase();
        value = dynamicMatch[2];
      }
      if (canonical && KEYWORD_DEFINITIONS[canonical]) {
        const description = KEYWORD_DEFINITIONS[canonical].replace(/X/g, value || 'X');
        return <button key={index} type="button" onClick={(e) => { e.stopPropagation(); setKeywordHelp((prev) => prev?.name === canonical ? null : { name: canonical, description }); }} className="keyword-trigger font-black underline decoration-dotted underline-offset-2 text-black hover:text-zinc-700">{part}</button>;
      }
      const relatedEntry = Object.entries(relatedForCard).find(([term]) => {
        if (term === "Lil' Blobabies") return /^Lil'?\s*Blobabies$/i.test(part);
        if (term === 'Transfigooration Blob') return /^Transfigooration Blobs?$/i.test(part);
        return term.toLowerCase() === part.toLowerCase();
      });
      if (relatedEntry) {
        const [term, [title, imagePath]] = relatedEntry;
        return <button key={index} type="button" onClick={(e) => { e.stopPropagation(); setRelatedCardHelp({ title, imagePath }); }} className="related-card-trigger font-semibold underline decoration-dotted underline-offset-2 text-emerald-700 hover:text-emerald-900">{part}</button>;
      }
      if (/^(gooraveyard|half-line)$/i.test(part)) return <em key={index}>{part}</em>;
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDecksDrawer, setShowDecksDrawer] = useState(false);
  const [inspectedCard, setInspectedCard] = useState(null);
  useEffect(() => {
    setKeywordHelp(null);
    setRelatedCardHelp(null);
  }, [inspectedCard?.id]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedState, setCopiedState] = useState('');

  // Match Tracker State (Wireframes 1 & 2)
  const [matchState, setMatchState] = useState(() => {
    try {
      const saved = localStorage.getItem('gg_match_state');
      if (!saved) return INITIAL_MATCH_STATE;
      const parsed = JSON.parse(saved);
      return { ...parsed, players: (parsed.players || []).map((player) => ({ ...player, gold: Math.min(15, Math.max(0, Number(player.gold) || 0)) })) };
    } catch {
      return INITIAL_MATCH_STATE;
    }
  });
  const [activeCounterPlayerId, setActiveCounterPlayerId] = useState(null);
  const [flipTopRow, setFlipTopRow] = useState(false);
  const [showAddCounterModal, setShowAddCounterModal] = useState(false);
  const [newCounterName, setNewCounterName] = useState('');
  const [newCounterIcon, setNewCounterIcon] = useState('diamond');
  const [showTurnModal, setShowTurnModal] = useState(false);

  // Import/Export Form State
  const [importCode, setImportCode] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [newCardForm, setNewCardForm] = useState({
    name: '',
    faction: 'red',
    rarity: 'Vanilla',
    tribe: 'Blob',
    type: 'Goon',
    cost: 1,
    power: 1,
    ability: '',
    flavor: ''
  });

  // Load shared state from URL Hash if present on startup
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#gg=')) {
        const encoded = hash.slice(4);
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        if (decoded.customCards && Array.isArray(decoded.customCards)) {
          setCustomCards((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const merged = [...prev];
            decoded.customCards.forEach((c) => {
              if (!existingIds.has(c.id)) merged.push(c);
            });
            return merged;
          });
        }
        if (decoded.deck) {
          const importedDeck = {
            ...decoded.deck,
            id: 'shared-' + Date.now(),
            name: `${decoded.deck.name} (Shared)`
          };
          setDecks((prev) => [importedDeck, ...prev]);
          setActiveDeckId(importedDeck.id);
        }
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {
      console.warn('Could not parse shared link data', e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gg_custom_cards', JSON.stringify(customCards));
    } catch {}
  }, [customCards]);

  useEffect(() => {
    try {
      localStorage.setItem('gg_decks', JSON.stringify(decks));
      localStorage.setItem('gg_active_deck_id', activeDeckId);
    } catch {}
  }, [decks, activeDeckId]);

  useEffect(() => {
    try {
      localStorage.setItem('gg_match_state', JSON.stringify(matchState));
    } catch {}
  }, [matchState]);

  // DECK & COLLECTION HANDLERS
  // ============================================================================

  const toggleFactionFilter = (factionId) => {
    setGroupAllTribes(false);
    setSelectedFactions((prev) => {
      if (prev.includes(factionId)) return prev.filter((id) => id !== factionId);
      if (factionId === 'gray') return [...prev, factionId];
      const nonNeutral = prev.filter((id) => id !== 'gray');
      const neutralSelected = prev.includes('gray');
      // Keep the two earliest selected non-Neutral tribes; a newly selected third replaces the most recent.
      const nextNonNeutral = nonNeutral.length >= 2
        ? [...nonNeutral.slice(0, 1), factionId]
        : [...nonNeutral, factionId];
      return neutralSelected ? [...nextNonNeutral, 'gray'] : nextNonNeutral;
    });
  };

  const filteredCards = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase();
    const normalize = (value) => String(value || '').toLocaleLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const rarityOrder = ['Vanilla', 'Bronze', 'Silver', 'Aureum', 'Platinum'];
    const factionToTribe = { red: 'Blob', yellow: 'Goonger', pink: 'Lubina', blue: 'Mutant', purple: 'Slobbant', gray: 'Neutral' };

    return collectionCards.filter((card) => {
      if (selectedFactions.length > 0 && !selectedFactions.some((factionId) => factionToTribe[factionId] === card.tribe)) return false;
      if (typeFilter !== 'ALL' && card.type !== typeFilter) return false;
      if (q) {
        const fields = [card.name, card.ability, card.flavor, card.tribe, card.type, card.rarity];
        const normalizedQuery = normalize(q);
        return fields.some((field) => normalize(field).includes(normalizedQuery));
      }
      return true;
    }).sort((a, b) => {
      // All Tribes is opt-in. Apply the selected sort inside each tribe.
      if (groupAllTribes) {
        const tribeA = tribeOrder.indexOf(a.tribe);
        const tribeB = tribeOrder.indexOf(b.tribe);
        const rankA = tribeA < 0 ? 99 : tribeA;
        const rankB = tribeB < 0 ? 99 : tribeB;
        if (rankA !== rankB) return rankA - rankB;
      }

      let comparison = 0;
      if (sortMode === 'cost') {
        comparison = (Number(a.cost) || 0) - (Number(b.cost) || 0);
      } else if (sortMode === 'rarity') {
        comparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      } else if (sortMode === 'name') {
        comparison = String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' });
      }

      if (comparison !== 0) return sortDirection === 'desc' ? -comparison : comparison;
      // Preserve the original card-sheet order unless a sort or tribe grouping is active.
      if (sortMode || groupAllTribes) {
        return (a.cardNumber || 9999) - (b.cardNumber || 9999)
          || String(a.name || '').localeCompare(String(b.name || ''));
      }
      return 0;
    });
  }, [collectionCards, selectedFactions, typeFilter, searchQuery, sortMode, sortDirection, groupAllTribes]);

  const totalCardsInDeck = useMemo(() => {
    return Object.values(activeDeck.cards || {}).reduce((sum, count) => sum + count, 0);
  }, [activeDeck]);

  const sortedDeckEntries = useMemo(() => Object.entries(activeDeck.cards || {}).sort(([idA], [idB]) => {
    const cardA = allCards.find((card) => card.id === idA);
    const cardB = allCards.find((card) => card.id === idB);
    const tribeA = tribeOrder.indexOf(cardA?.tribe);
    const tribeB = tribeOrder.indexOf(cardB?.tribe);
    const orderA = tribeA < 0 ? 99 : tribeA;
    const orderB = tribeB < 0 ? 99 : tribeB;
    if (orderA !== orderB) return orderA - orderB;
    return (cardA?.cardNumber || 9999) - (cardB?.cardNumber || 9999) || (cardA?.name || '').localeCompare(cardB?.name || '');
  }), [activeDeck, allCards]);

  const deckOverviewCards = useMemo(
    () => sortedDeckEntries
      .map(([id, qty]) => ({ card: allCards.find((entry) => entry.id === id), qty }))
      .filter((entry) => entry.card && entry.qty > 0),
    [sortedDeckEntries, allCards]
  );

  const deckViewerCards = useMemo(() => {
    const rarityOrder = ['Vanilla', 'Bronze', 'Silver', 'Aureum', 'Platinum'];
    if (deckViewerSortMode === 'deck') return [...deckOverviewCards];
    return [...deckOverviewCards].sort((a, b) => {
      let comparison = 0;
      if (deckViewerSortMode === 'cost') {
        comparison = (Number(a.card.cost) || 0) - (Number(b.card.cost) || 0);
      } else if (deckViewerSortMode === 'rarity') {
        comparison = rarityOrder.indexOf(a.card.rarity) - rarityOrder.indexOf(b.card.rarity);
      } else if (deckViewerSortMode === 'name') {
        comparison = String(a.card.name || '').localeCompare(String(b.card.name || ''), undefined, { sensitivity: 'base' });
      } else {
        const tribeA = tribeOrder.indexOf(a.card.tribe);
        const tribeB = tribeOrder.indexOf(b.card.tribe);
        comparison = (tribeA < 0 ? 99 : tribeA) - (tribeB < 0 ? 99 : tribeB);
      }
      if (comparison !== 0) return deckViewerSortDirection === 'desc' ? -comparison : comparison;
      return (a.card.cardNumber || 9999) - (b.card.cardNumber || 9999) || a.card.name.localeCompare(b.card.name);
    });
  }, [deckOverviewCards, deckViewerSortMode, deckViewerSortDirection, tribeOrder]);

  const deckManaCurve = useMemo(() => {
    const buckets = [
      { label: '1', min: 1, max: 1, count: 0 },
      { label: '2', min: 2, max: 2, count: 0 },
      { label: '3', min: 3, max: 3, count: 0 },
      { label: '4', min: 4, max: 4, count: 0 },
      { label: '5', min: 5, max: 5, count: 0 },
      { label: '6+', min: 6, max: Infinity, count: 0 },
    ];
    deckOverviewCards.forEach(({ card, qty }) => {
      const bucket = buckets.find((item) => Number(card.cost) >= item.min && Number(card.cost) <= item.max);
      if (bucket) bucket.count += qty;
    });
    return buckets;
  }, [deckOverviewCards]);

  const deckTribeBalance = useMemo(() => {
    const counts = {};
    deckOverviewCards.forEach(({ card, qty }) => {
      const tribe = card.tribe || 'Unknown';
      counts[tribe] = (counts[tribe] || 0) + qty;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [deckOverviewCards]);

  const deckFactions = useMemo(() => {
    const set = new Set();
    Object.keys(activeDeck.cards || {}).forEach((cardId) => {
      if (activeDeck.cards[cardId] > 0) {
        const card = allCards.find((c) => c.id === cardId);
        if (card) {
          const tribeToFaction = { Blob: 'red', Goonger: 'yellow', Lubina: 'pink', Bina: 'pink', Mutant: 'blue', Slobbant: 'purple', Neutral: 'gray' };
          if (tribeToFaction[card.tribe]) set.add(tribeToFaction[card.tribe]);
        }
      }
    });
    return FACTIONS.map((f) => f.id).filter((id) => set.has(id));
  }, [activeDeck, allCards]);

  const addCardToDeck = (cardId) => {
    const candidate = allCards.find((card) => card.id === cardId);
    const existingTribes = new Set(Object.entries(activeDeck.cards || {})
      .filter(([, count]) => count > 0)
      .map(([id]) => allCards.find((card) => card.id === id)?.tribe)
      .filter((tribe) => tribe && tribe !== 'Neutral'));
    if (candidate && candidate.tribe !== 'Neutral' && !existingTribes.has(candidate.tribe) && existingTribes.size >= 2) {
      setDeckRuleMessage('A deck can contain cards from only TWO tribes. Neutral cards are always allowed.');
      return;
    }
    setDeckRuleMessage('');
    setDecks((prev) => prev.map((deck) => {
      if (deck.id !== activeDeck.id) return deck;
      const currentCount = deck.cards[cardId] || 0;
      const total = Object.values(deck.cards).reduce((sum, count) => sum + count, 0);
      if (currentCount >= 3 || total >= 30) return deck;
      return { ...deck, cards: { ...deck.cards, [cardId]: currentCount + 1 } };
    }));
  };

  const removeCardFromDeck = (cardId) => {
    const currentCount = activeDeck.cards?.[cardId] || 0;
    // Dismiss the preview immediately when its final copy leaves this deck.
    if (currentCount <= 1 && hoveredDeckCardId === cardId) {
      setHoveredDeckCardId(null);
      setHoveredDeckCardTop(0);
    }
    setDecks((prev) =>
      prev.map((deck) => {
        if (deck.id !== activeDeck.id) return deck;
        const deckCount = deck.cards?.[cardId] || 0;
        if (deckCount <= 0) return deck;
        const updatedCards = { ...deck.cards };
        if (deckCount === 1) {
          delete updatedCards[cardId];
        } else {
          updatedCards[cardId] = deckCount - 1;
        }
        return {
          ...deck,
          cards: updatedCards
        };
      })
    );
  };

  const renameActiveDeck = (newName) => {
    setDecks((prev) =>
      prev.map((deck) => (deck.id === activeDeck.id ? { ...deck, name: newName } : deck))
    );
  };

  const createNewDeck = () => {
    const newDeck = {
      id: 'deck-' + Date.now(),
      name: `New Deck ${decks.length + 1}`,
      description: '',
      coverCardId: null,
      headerColor: '#eab308',
      cards: {}
    };
    setDecks((prev) => [...prev, newDeck]);
    setActiveDeckId(newDeck.id);
    setShowDecksDrawer(false);
    setActiveView('deckOverview');
  };

  const deleteDeck = (deckId) => {
    if (decks.length <= 1) return;
    const remaining = decks.filter((d) => d.id !== deckId);
    setDecks(remaining);
    if (activeDeckId === deckId) {
      setActiveDeckId(remaining[0].id);
    }
  };

  const handleCreateCustomCard = (e) => {
    e.preventDefault();
    if (!newCardForm.name.trim()) return;
    const created = {
      id: 'custom-' + Date.now(),
      name: newCardForm.name.trim(),
      faction: newCardForm.faction,
      rarity: newCardForm.rarity,
      tribe: newCardForm.tribe.trim() || 'Goon',
      type: newCardForm.type,
      cost: Number(newCardForm.cost) || 0,
      power: newCardForm.type === 'Trick' ? null : Number(newCardForm.power) || 0,
      ability: newCardForm.ability.trim() || 'No special ability.',
      flavor: newCardForm.flavor.trim() || '',
      artType: 'custom'
    };
    setCustomCards((prev) => [created, ...prev]);
    setNewCardForm({
      name: '',
      faction: 'red',
      rarity: 'Vanilla',
      tribe: 'Blob',
      type: 'Goon',
      cost: 1,
      power: 1,
      ability: '',
      flavor: ''
    });
    setShowAddCardModal(false);
  };

  // ============================================================================
  // SHARE / EXPORT / IMPORT HANDLERS
  // ============================================================================

  const generateSharePayload = () => {
    return JSON.stringify({
      deck: { name: activeDeck.name, cards: activeDeck.cards },
      customCards
    });
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(''), 2500);
  };

  const handleCopyShareUrl = () => {
    const payload = generateSharePayload();
    const encoded = btoa(encodeURIComponent(payload));
    const url = `${window.location.origin}${window.location.pathname}#gg=${encoded}`;
    copyText(url, 'url');
  };

  const handleCopyDecklistText = () => {
    const lines = [`=== ${activeDeck.name} (${totalCardsInDeck}/30) ===`];
    Object.entries(activeDeck.cards).forEach(([id, count]) => {
      const c = allCards.find((card) => card.id === id);
      if (c) lines.push(`x${count} ${c.name} [${c.faction.toUpperCase()} - ${c.type}]`);
    });
    copyText(lines.join('\n'), 'text');
  };

  const handleImportCode = () => {
    try {
      let raw = importCode.trim();
      if (raw.includes('#gg=')) {
        raw = decodeURIComponent(atob(raw.split('#gg=')[1]));
      }
      const parsed = JSON.parse(raw);
      if (parsed.customCards && Array.isArray(parsed.customCards)) {
        setCustomCards((prev) => {
          const ids = new Set(prev.map((c) => c.id));
          const merged = [...prev];
          parsed.customCards.forEach((c) => {
            if (!ids.has(c.id)) merged.push(c);
          });
          return merged;
        });
      }
      if (parsed.deck && parsed.deck.cards) {
        const importedDeck = {
          id: 'imp-' + Date.now(),
          name: parsed.deck.name || 'Imported Deck',
          cards: parsed.deck.cards
        };
        setDecks((prev) => [importedDeck, ...prev]);
        setActiveDeckId(importedDeck.id);
      }
      setImportStatus('Successfully imported deck & cards!');
      setImportCode('');
      setTimeout(() => setImportStatus(''), 3000);
    } catch {
      setImportStatus('Invalid deck code or JSON. Please check and try again.');
    }
  };

  // ============================================================================
  // MATCH TRACKER & SUB-COUNTERS HANDLERS (WIREFRAMES 1 & 2)
  // ============================================================================

  const updatePlayerStat = (playerId, field, delta) => {
    setMatchState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        const nextVal = field === 'life' ? p[field] + delta : field === 'gold' ? Math.min(15, Math.max(0, p[field] + delta)) : Math.max(0, p[field] + delta);
        return { ...p, [field]: nextVal };
      })
    }));
  };

  const updatePlayerName = (playerId, name) => {
    setMatchState((prev) => ({
      ...prev,
      players: prev.players.map((p) => (p.id === playerId ? { ...p, name } : p))
    }));
  };

  const advanceTurn = (grantYieldToAll = true) => {
    setMatchState((prev) => ({
      ...prev,
      turn: prev.turn + 1,
      players: prev.players.map((p) => ({
        ...p,
        gold: grantYieldToAll ? Math.min(15, p.gold + prev.yieldRate) : p.gold
      }))
    }));
  };

  const updateYieldRate = (delta) => {
    setMatchState((prev) => ({
      ...prev,
      yieldRate: Math.max(0, prev.yieldRate + delta)
    }));
  };

  const resetMatch = () => {
    setMatchState(JSON.parse(JSON.stringify(INITIAL_MATCH_STATE)));
    setActiveCounterPlayerId(null);
    setShowTurnModal(false);
  };

  const updateSubCounter = (playerId, counterId, delta) => {
    setMatchState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        return {
          ...p,
          counters: p.counters.map((c) =>
            c.id === counterId ? { ...c, value: Math.max(0, c.value + delta) } : c
          )
        };
      })
    }));
  };

  const handleAddSubCounter = (e) => {
    e.preventDefault();
    if (!newCounterName.trim() || !activeCounterPlayerId) return;
    const newCounter = {
      id: 'cnt-' + Date.now(),
      name: newCounterName.trim(),
      value: 0,
      icon: newCounterIcon
    };
    setMatchState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === activeCounterPlayerId ? { ...p, counters: [...p.counters, newCounter] } : p
      )
    }));
    setNewCounterName('');
    setShowAddCounterModal(false);
  };

  const deleteSubCounter = (playerId, counterId) => {
    setMatchState((prev) => ({
      ...prev,
      players: prev.players.map((p) => {
        if (p.id !== playerId) return p;
        return {
          ...p,
          counters: p.counters.filter((c) => c.id !== counterId)
        };
      })
    }));
  };

  const activeCounterPlayer = useMemo(
    () => matchState.players.find((p) => p.id === activeCounterPlayerId),
    [matchState.players, activeCounterPlayerId]
  );

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const getFactionObj = (id) => FACTIONS.find((f) => f.id === id) || FACTIONS[0];
  const deckCoverCard = (deck) => {
    const chosen = deck?.coverCardId && (deck.cards?.[deck.coverCardId] || 0) > 0 ? allCards.find((card) => card.id === deck.coverCardId) : null;
    const deckCards = Object.keys(deck?.cards || {}).filter((id) => (deck.cards[id] || 0) > 0).map((id) => allCards.find((card) => card.id === id)).filter(Boolean);
    return (chosen?.deckArtPath ? chosen : null) || deckCards.find((card) => card.deckArtPath) || null;
  };
  const deckCoverSrc = (deck) => {
    const card = deckCoverCard(deck);
    // Use the same verified scan used by the card detail view. Deck covers
    // are the only place this selection is displayed; collection cards stay unchanged.
    return card?.deckArtPath || null;
  };
  const updateDeckField = (deckId, field, value) => {
    setDecks((prev) => prev.map((deck) => deck.id === deckId ? { ...deck, [field]: value } : deck));
  };
  const inspectedCardList = activeView === 'deckOverview'
    ? deckViewerCards.map(({ card }) => card)
    : filteredCards;
  const inspectedIndex = inspectedCard ? inspectedCardList.findIndex((card) => card.id === inspectedCard.id) : -1;
  const navigateInspectedCard = (direction) => {
    if (!inspectedCardList.length || inspectedIndex < 0) return;
    const nextIndex = inspectedIndex + direction;
    if (nextIndex >= 0 && nextIndex < inspectedCardList.length) setInspectedCard(inspectedCardList[nextIndex]);
  };

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none overflow-hidden">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur border-b-2 border-zinc-800 px-3 sm:px-6 py-2.5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 shadow-lg">
        {/* Stylized GOLD AND GOONS Logo Badge */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveView('collection')}
            className="cursor-pointer group flex items-center gap-2 bg-zinc-950 border-2 border-yellow-500/60 rounded-2xl px-3.5 py-1.5 shadow-inner hover:border-yellow-400 transition"
          >
            <img src="/gold-and-goons-logo.png" alt="Gold and Goons" className="w-24 sm:w-28 h-auto object-contain" />
          </div>
        </div>

        {/* Mode Switcher Pills */}
        <nav className="flex items-center bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shadow-inner">
          <button
            onClick={() => setActiveView('collection')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              (activeView === 'collection' || activeView === 'deckLibrary' || activeView === 'deckOverview')
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Collection & Decks</span>
          </button>
          <button
            onClick={() => setActiveView('tracker')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'tracker'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>4-Player Tracker</span>
          </button>
          <button
            onClick={() => setActiveView('news')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeView === 'news'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-blue-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>News & Updates</span>
          </button>
        </nav>

      </header>

      {/* ==================================================================== */}
      {/* VIEW 1: COLLECTION VIEWER & DECK BUILDER (WIREFRAME 3)               */}
      {/* ==================================================================== */}
      {activeView === 'collection' && (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row relative overflow-hidden">
          {/* LEFT / MAIN COLLECTION AREA */}
          <main className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto">
            {/* Search Bar & Action Controls */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search card by name, keyword, ability, etc."
                  className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-yellow-400 rounded-2xl pl-12 pr-10 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 outline-none transition shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>


            </div>

            {/* 6 Faction Icon Buttons + "Filter by" Dropdown (Wireframe 3) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              {/* 6 Faction Icon Toggles */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFactions([]);
                    setGroupAllTribes((previous) => !previous);
                  }}
                  aria-pressed={groupAllTribes}
                  className={`px-3 h-10 sm:h-11 rounded-2xl border-2 text-xs sm:text-sm font-black transition cursor-pointer ${
                    groupAllTribes
                      ? 'bg-yellow-400 border-yellow-300 text-zinc-950'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  All Tribes
                </button>
                {FACTIONS.map((f) => {
                  const isSelected = selectedFactions.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFactionFilter(f.id)}
                      title={`Filter ${f.name}`}
                      className={`w-12 h-10 sm:w-14 sm:h-11 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? `${f.bg} border-white text-zinc-950 scale-105 shadow-lg`
                          : `${f.lightBg} ${f.border}/50 ${f.text} hover:scale-105 opacity-85 hover:opacity-100`
                      }`}
                    >
                      <FactionIcon factionId={f.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                  );
                })}
                {selectedFactions.length > 0 && (
                  <button
                    onClick={() => setSelectedFactions([])}
                    className="text-xs font-bold text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filter by Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown((prev) => !prev)}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 px-4 py-2 rounded-2xl text-sm font-extrabold text-zinc-200 transition cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
                  <span>Sort by</span>
                  {(typeFilter !== 'ALL' || sortMode !== null) && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  )}
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-4 shadow-2xl z-30 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Card Type
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['ALL', 'Goon', 'Tower', 'Trap', 'Trick', 'Trinket'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTypeFilter(t)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                              typeFilter === t
                                ? 'bg-yellow-400 text-zinc-950 border-yellow-300'
                                : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Sort Cards
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { key: 'cost', label: 'Cost' },
                          { key: 'rarity', label: 'Rarity' },
                          { key: 'name', label: 'Name' },
                        ].map(({ key, label }) => {
                          const active = sortMode === key;
                          return (
                            <button
                              key={key}
                              onClick={() => {
                                if (sortMode === key) {
                                  setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
                                } else {
                                  setSortMode(key);
                                  setSortDirection('asc');
                                }
                              }}
                              aria-pressed={active}
                              className={`px-2.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                active
                                  ? 'bg-emerald-400 text-zinc-950 border-emerald-300'
                                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                              }`}
                            >
                              {label}{active ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1.5">
                        Click the active option again to reverse the order.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex justify-between">
                      <button
                        onClick={() => {
                          setTypeFilter('ALL');
                          setSortMode(null);
                          setSortDirection('asc');
                        }}
                        className="text-xs text-zinc-400 hover:text-white font-semibold cursor-pointer"
                      >
                        Reset Filters
                      </button>
                      <button
                        onClick={() => setShowFilterDropdown(false)}
                        className="text-xs text-yellow-400 font-bold cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card Grid */}
            {filteredCards.length === 0 ? (
              <div className="bg-zinc-900/60 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center">
                <p className="text-zinc-400 font-bold text-lg mb-2">No cards match your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFactions([]);
                    setTypeFilter('ALL');
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400 font-bold px-4 py-2 rounded-xl text-sm cursor-pointer"
                >
                  Show All Cards
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4 pb-20 lg:pb-6">
                {filteredCards.map((card) => {
                  const faction = getFactionObj(card.faction);
                  const inDeckCount = activeDeck.cards[card.id] || 0;
                  const remainingCopies = Math.max(0, 3 - inDeckCount);
                  const isMaxed = remainingCopies === 0;

                  return (
                    <div
                      key={card.id}
                      onClick={() => addCardToDeck(card.id)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setInspectedCard(card);
                      }}
                      className={`group relative rounded-2xl border-[3px] border-zinc-900 shadow-xl overflow-hidden flex flex-col aspect-[5/7] transition-all duration-150 cursor-pointer ${
                        isMaxed
                          ? 'opacity-55 grayscale-[35%]'
                          : 'hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.98]'
                      }`}
                      style={{ backgroundColor: faction.color }}
                    >
                      {card.imagePath ? (
                        <>
                          <img
                            src={card.imagePath}
                            alt={`${card.name} full card`}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-contain bg-zinc-950"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectedCard(card);
                            }}
                            title={`Inspect ${card.name}`}
                            className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-black/75 hover:bg-black text-white border border-white/30 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Fallback display for custom and legacy cards without full-card scans */}
                          <div className="p-2 pb-1 flex items-start gap-1.5 bg-black/20">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-2 border-zinc-950 flex items-center justify-center font-black text-zinc-950 text-xs shrink-0 shadow">
                              {card.cost}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-black text-white text-xs sm:text-sm truncate drop-shadow">{card.name}</h3>
                              <div className="inline-block bg-black/35 text-white/90 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full truncate max-w-full">
                                {card.rarity} {card.tribe} {card.type}
                              </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setInspectedCard(card); }} title="Inspect Card" className="p-1 rounded-lg bg-black/35 hover:bg-black/60 text-white transition cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="mx-2 my-1 h-24 sm:h-28 rounded-xl bg-white/15 border border-black/25 overflow-hidden relative flex items-center justify-center">
                            <CardIllustration artType={card.artType} faction={card.faction} />
                          </div>
                          <div className="mx-2 mb-2 p-2 rounded-xl bg-white/85 text-zinc-950 flex-1 flex flex-col justify-between min-h-[76px] relative">
                            <p className="text-[10px] sm:text-[11px] leading-snug">{card.ability}</p>
                            {card.flavor && <p className="text-[8.5px] italic text-zinc-600 leading-tight mt-1 line-clamp-2 pr-6">{card.flavor}</p>}
                            {card.power !== null && card.power !== undefined && (
                              <div className={`absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center font-black text-xs text-white border-2 border-zinc-950 shadow ${card.type === 'Trap' ? 'bg-zinc-600 rounded-b-xl rounded-t-sm' : 'bg-red-700 rounded-full'}`}>
                                {card.power}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Remaining Available Copies Overlay (Wireframe 3: x2, x0) */}
                      {inDeckCount > 0 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/85 text-white font-black text-sm tracking-wider border border-white/25 shadow-lg">
                            x{remainingCopies}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>

          {/* COLLAPSIBLE DECK SIDEBAR (WIREFRAME 3 RIGHT PANEL) */}
          <aside
            className={`fixed lg:sticky lg:top-0 lg:bottom-auto lg:h-full inset-y-0 right-0 z-30 bg-zinc-900 border-l-2 border-zinc-800 flex flex-col transition-all duration-300 shadow-2xl ${
              sidebarOpen ? 'w-80 sm:w-96 translate-x-0' : 'w-0 translate-x-full lg:w-12 lg:translate-x-0'
            }`}
          >
            {/* Collapse Toggle Tab (`>`) */}
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? 'Collapse Deck Panel' : 'Expand Deck Panel'}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-16 bg-zinc-800 hover:bg-zinc-700 border-2 border-r-0 border-zinc-700 rounded-l-xl items-center justify-center text-zinc-200 cursor-pointer shadow"
            >
              {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {sidebarOpen ? (
              <div className="flex-1 flex flex-col h-full pt-14 lg:pt-3 p-4 overflow-hidden">
                {/* Top Row: "Go to decks" button & Active Faction Icons */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <button
                    onClick={() => setActiveView('deckLibrary')}
                    className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 border-2 border-zinc-700 px-3 py-1.5 rounded-full text-xs font-extrabold text-zinc-200 transition cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Go to decks ({decks.length})</span>
                  </button>

                  {/* Active Faction Emblems */}
                  <div className="flex items-center gap-1">
                    {deckFactions.length === 0 ? (
                      <span className="text-[11px] text-zinc-500 font-semibold">No colors</span>
                    ) : (
                      deckFactions.map((fId) => {
                        const f = getFactionObj(fId);
                        return (
                          <div
                            key={fId}
                            className={`w-6 h-6 rounded-full ${f.bg} text-zinc-950 flex items-center justify-center border border-white/40 shadow`}
                          >
                            <FactionIcon factionId={fId} className="w-3.5 h-3.5" />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Inline Editable Deck Title ("Untitled Deck") */}
                <div className="relative mb-3">
                  <Edit3 className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={activeDeck.name}
                    onChange={(e) => renameActiveDeck(e.target.value)}
                    className="w-full bg-zinc-950 border-2 border-zinc-700 focus:border-yellow-400 rounded-2xl pl-9 pr-3 py-2 font-black text-base text-white outline-none transition"
                  />
                </div>

                {deckRuleMessage && <div role="status" className="mb-2 rounded-xl border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs font-bold text-amber-200">{deckRuleMessage}</div>}

                {/* Deck Card List */}
                <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
                  {Object.keys(activeDeck.cards).length === 0 ? (
                    <div className="h-48 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                      <Layers className="w-8 h-8 text-zinc-600 mb-2" />
                      <p className="text-sm font-bold text-zinc-400">Your deck is empty!</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Click any card on the left to add up to 3 copies.
                      </p>
                    </div>
                  ) : (
                    sortedDeckEntries.map(([cardId, qty]) => {
                      const card = allCards.find((c) => c.id === cardId);
                      if (!card) return null;
                      const faction = getFactionObj(card.faction);
                      return (
                        <div
                          key={cardId}
                          onMouseEnter={(e) => {
                            setHoveredDeckCardId(cardId);
                            const rowRect = e.currentTarget.getBoundingClientRect();
                            const asideRect = e.currentTarget.closest('aside')?.getBoundingClientRect();
                            setHoveredDeckCardTop(asideRect
                              ? Math.min(Math.max(12, rowRect.top - asideRect.top), Math.max(12, asideRect.height - 440))
                              : 12);
                          }}
                          onMouseLeave={() => setHoveredDeckCardId(null)}
                          className="flex items-center justify-between bg-zinc-950 border-2 border-zinc-800 hover:border-yellow-400 rounded-xl overflow-hidden group transition"
                        >
                          <button
                            type="button"
                            onClick={() => setInspectedCard(card)}
                            className="flex items-center gap-2.5 px-3 py-2 flex-1 min-w-0 text-left cursor-pointer"
                            title={`View ${card.name}`}
                          >
                            <span className="font-black text-sm text-yellow-400 shrink-0">
                              x{qty}
                            </span>
                            <span className="font-extrabold text-sm text-zinc-100 truncate">
                              {card.name}
                            </span>
                          </button>

                          {/* Mini Faction Art Banner + Quick +/- Controls */}
                          <div
                            className="flex items-center gap-1 px-2 py-2 shrink-0"
                            style={{ backgroundColor: faction.color }}
                          >
                            <button
                              onClick={() => removeCardFromDeck(cardId)}
                              className="w-6 h-6 rounded-lg bg-black/40 hover:bg-black/70 text-white flex items-center justify-center font-black cursor-pointer"
                            >
                              -
                            </button>
                            <button
                              onClick={() => addCardToDeck(cardId)}
                              disabled={qty >= 3 || totalCardsInDeck >= 30}
                              className="w-6 h-6 rounded-lg bg-black/40 hover:bg-black/70 disabled:opacity-40 text-white flex items-center justify-center font-black cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Bottom Card Counter Pill (7/30 CARDS) & Quick Deck Actions */}
                <div className="pt-3 mt-2 border-t border-zinc-800 space-y-2">
                  <div
                    className={`w-full py-2.5 px-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-xl tracking-wide transition ${
                      totalCardsInDeck === 30
                        ? 'bg-emerald-950/70 border-emerald-400 text-emerald-300'
                        : 'bg-zinc-950 border-zinc-700 text-white'
                    }`}
                  >
                    <span className={totalCardsInDeck === 30 ? 'text-emerald-400' : 'text-red-500'}>
                      {totalCardsInDeck}
                    </span>
                    <span className="text-zinc-500">/</span>
                    <span>30</span>
                    <span className="text-xs uppercase tracking-widest text-zinc-400 ml-1">
                      CARDS
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyDecklistText}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-2 rounded-xl transition cursor-pointer"
                    >
                      {copiedState === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedState === 'text' ? 'Copied!' : 'Copy List'}</span>
                    </button>
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-extrabold text-xs py-2 rounded-xl transition cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Deck</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Collapsed Desktop Rail */
              <div
                onClick={() => setSidebarOpen(true)}
                className="hidden lg:flex flex-col items-center justify-between py-6 h-full cursor-pointer hover:bg-zinc-800/50"
              >
                <Layers className="w-5 h-5 text-yellow-400" />
                <span className="[writing-mode:vertical-rl] rotate-180 font-black tracking-widest text-xs text-zinc-300 uppercase">
                  {activeDeck.name} ({totalCardsInDeck}/30)
                </span>
                <span className="text-xs font-black text-red-400">{totalCardsInDeck}</span>
              </div>
            )}
            {hoveredDeckCardId && (() => {
              const hoverCard = allCards.find((entry) => entry.id === hoveredDeckCardId);
              return hoverCard ? (
                <div
                  className="hidden lg:block absolute right-full mr-4 z-50 w-56 rounded-2xl border-2 border-zinc-700 bg-zinc-950 p-2 shadow-2xl pointer-events-none"
                  style={{ top: `${hoveredDeckCardTop}px`, maxHeight: 'calc(100% - 24px)', overflow: 'hidden' }}
                >
                  {hoverCard.imagePath ? (
                    <img src={hoverCard.imagePath} alt={`${hoverCard.name} preview`} className="w-full rounded-lg object-contain" />
                  ) : (
                    <div className="aspect-[5/7] rounded-lg bg-zinc-800 p-3 flex flex-col items-center justify-center text-center">
                      <strong>{hoverCard.name}</strong>
                      <span className="text-xs text-zinc-400 mt-2">{hoverCard.ability}</span>
                    </div>
                  )}
                  <p className="text-sm font-black text-white px-1 pt-2 truncate">{hoverCard.name}</p>
                  <p className="text-[10px] text-zinc-400 px-1">{hoverCard.rarity} · {hoverCard.tribe} {hoverCard.type}</p>
                </div>
              ) : null;
            })()}
          </aside>

          {/* Mobile Floating Deck Toggle Button */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-yellow-400 text-zinc-950 font-black px-4 py-3 rounded-full shadow-2xl border-2 border-zinc-950 cursor-pointer"
          >
            <Layers className="w-5 h-5" />
            <span>Deck ({totalCardsInDeck}/30)</span>
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 2: 4-PLAYER MATCH TRACKER & SUB-COUNTERS (WIREFRAMES 1 & 2)     */}
      {/* ==================================================================== */}
      {activeView === 'tracker' && (
        <div className="flex-1 flex flex-col relative bg-zinc-950">
          {/* Sub-Toolbar for Tabletop Flip & Match Reset */}
          <div className="bg-zinc-900/80 border-b border-zinc-800 px-4 py-1.5 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-semibold hidden sm:inline">
              Tap <strong>-</strong> or <strong>+</strong> to adjust life, or tap <strong>COUNTERS</strong> for Diamonds, Towers & Traps.
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setFlipTopRow((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold border transition cursor-pointer ${
                  flipTopRow
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                }`}
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Flip Top Players (Tabletop)</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold bg-zinc-800 hover:bg-red-950/70 border border-zinc-700 hover:border-red-500/50 text-zinc-300 hover:text-red-300 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Match</span>
              </button>
            </div>
          </div>

          {/* 2x2 QUADRANT GRID (WIREFRAME 1) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 relative min-h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] md:min-h-0">
            {matchState.players.map((player, index) => {
              const isTopRow = index < 2;
              const quadColors = [
                'border-red-500/40 bg-gradient-to-br from-zinc-900 to-red-950/25',
                'border-yellow-500/40 bg-gradient-to-bl from-zinc-900 to-yellow-950/25',
                'border-blue-500/40 bg-gradient-to-tr from-zinc-900 to-blue-950/25',
                'border-emerald-500/40 bg-gradient-to-tl from-zinc-900 to-emerald-950/25',
              ];
              const activeCustomCounters = player.counters.filter((c) => c.value > 0).length;

              return (
                <div
                  key={player.id}
                  style={
                    isTopRow && flipTopRow
                      ? { transform: 'rotate(180deg)' }
                      : undefined
                  }
                  className={`border-2 border-zinc-800 p-2 sm:p-3 flex flex-col justify-between relative transition-transform duration-300 min-h-0 ${quadColors[index]}`}
                >
                  {/* Top Header: Editable PLAYER X Name */}
                  <div className="flex items-center justify-center border-b border-zinc-800 pb-2">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayerName(player.id, e.target.value)}
                      className="bg-transparent text-center font-black text-xl sm:text-2xl tracking-wider uppercase text-zinc-100 focus:text-yellow-400 outline-none w-full max-w-xs"
                    />
                  </div>

                  {/* Middle: Huge `-` | `20` | `+` Life Counter */}
                  <div className="flex-1 flex items-center justify-between my-2 gap-2">
                    <button
                      onClick={() => updatePlayerStat(player.id, 'life', -1)}
                      className="w-14 sm:w-20 h-20 sm:h-24 rounded-2xl bg-zinc-900/90 hover:bg-red-950/60 active:scale-95 border-2 border-zinc-700 hover:border-red-400 flex items-center justify-center text-4xl sm:text-5xl font-black text-zinc-200 transition cursor-pointer shadow-lg"
                    >
                      −
                    </button>

                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`font-black text-6xl sm:text-8xl tracking-tighter tabular-nums ${
                          player.life <= 5 ? 'text-red-500 animate-pulse' : 'text-white'
                        }`}
                      >
                        {player.life}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        LIFE
                      </span>
                    </div>

                    <button
                      onClick={() => updatePlayerStat(player.id, 'life', 1)}
                      className="w-14 sm:w-20 h-20 sm:h-24 rounded-2xl bg-zinc-900/90 hover:bg-emerald-950/60 active:scale-95 border-2 border-zinc-700 hover:border-emerald-400 flex items-center justify-center text-4xl sm:text-5xl font-black text-zinc-200 transition cursor-pointer shadow-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Bottom 3-Column Stat Bar: Gold (2) | COUNTERS | CARDS IN HAND 4 (Wireframe 1) */}
                  <div className="grid grid-cols-3 border-2 border-zinc-700 rounded-xl bg-zinc-950/90 overflow-hidden shadow-md shrink-0">
                    {/* Gold Cell */}
                    <div className="p-2 border-r-2 border-zinc-800 flex flex-col items-center justify-center">
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase text-yellow-400 flex items-center gap-1">
                        <Coins className="w-3 h-3" /> Gold
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                        <button
                          onClick={() => updatePlayerStat(player.id, 'gold', -1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-black text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-black text-lg sm:text-xl text-yellow-300 tabular-nums">
                          ({player.gold})
                        </span>
                        <button
                          onClick={() => updatePlayerStat(player.id, 'gold', 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-black text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* COUNTERS Sub-Screen Trigger Cell */}
                    <button
                      onClick={() => setActiveCounterPlayerId(player.id)}
                      className="p-2 border-r-2 border-zinc-800 flex flex-col items-center justify-center hover:bg-zinc-800/80 active:bg-zinc-800 transition cursor-pointer relative"
                    >
                      <span className="font-black text-xs sm:text-sm tracking-wide text-emerald-400 uppercase">
                        COUNTERS
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold mt-0.5">
                        {activeCustomCounters > 0
                          ? `${activeCustomCounters} active`
                          : `${player.counters.length} tracked`}
                      </span>
                    </button>

                    {/* CARDS IN HAND Cell */}
                    <div className="p-2 flex flex-col items-center justify-center">
                      <span className="text-[9px] sm:text-[11px] font-extrabold uppercase text-sky-400 flex items-center gap-1 text-center leading-tight">
                        <Hand className="w-3 h-3 shrink-0" /> Cards in Hand
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                        <button
                          onClick={() => updatePlayerStat(player.id, 'hand', -1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-black text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-black text-lg sm:text-xl text-white tabular-nums">
                          {player.hand}
                        </span>
                        <button
                          onClick={() => updatePlayerStat(player.id, 'hand', 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 font-black text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CENTER OVERLAPPING TURN & YIELD RATE HUB (WIREFRAME 1) */}
            <div className="my-4 md:my-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 flex flex-col items-center justify-center px-4">
              <div className="bg-zinc-950 border-[3px] border-white rounded-3xl px-5 py-3 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex flex-col items-center text-center">
                <button
                  onClick={() => advanceTurn(true)}
                  title="Advance Turn & Grant Yield Gold to All Players"
                  className="group cursor-pointer flex flex-col items-center"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 group-hover:underline">
                    Tap for Next Turn
                  </span>
                  <div className="font-black text-2xl sm:text-3xl tracking-tight text-white leading-none my-0.5">
                    TURN <span className="underline decoration-yellow-400">{matchState.turn}</span>
                  </div>
                </button>

                {/* Yield Rate = (2) Row */}
                <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-zinc-800">
                  <button
                    onClick={() => updateYieldRate(-1)}
                    className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-black text-zinc-300 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setShowTurnModal(true)}
                    className="text-xs font-extrabold text-yellow-300 hover:text-yellow-200 cursor-pointer"
                  >
                    Yield Rate = ({matchState.yieldRate})
                  </button>
                  <button
                    onClick={() => updateYieldRate(1)}
                    className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-black text-zinc-300 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* PLAYER COUNTERS SUB-SCREEN OVERLAY (WIREFRAME 2: P1 COUNTERS)    */}
          {/* ================================================================ */}
          {activeCounterPlayer && (
            <div className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto">
              {/* Top Header with Back Arrow Button (`↩`) & Title (`P1 COUNTERS`) */}
              <div className="max-w-4xl w-full mx-auto flex items-center justify-between mb-6 sm:mb-8">
                <button
                  onClick={() => setActiveCounterPlayerId(null)}
                  className="w-14 h-12 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center text-white transition active:scale-95 cursor-pointer shadow-lg"
                  title="Back to Match Tracker"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>

                <h2 className="font-black text-3xl sm:text-5xl tracking-wider uppercase text-white text-center">
                  P{activeCounterPlayer.id} COUNTERS
                </h2>

                <div className="w-14" />
              </div>

              {/* Main 2-Column Layout matching Wireframe 2 */}
              <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left Column: Counter Pills (Diamonds, Tower Lifetime 1, Trap Durability 2, Counter 1) */}
                <div className="md:col-span-7 space-y-4">
                  {activeCounterPlayer.counters.map((counter) => (
                    <div
                      key={counter.id}
                      className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl px-5 py-4 flex items-center justify-between gap-4 shadow-lg"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-700 flex items-center justify-center text-yellow-400 shrink-0">
                          <CounterIcon icon={counter.icon} className="w-7 h-7" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-lg sm:text-xl text-white truncate">
                            {counter.name}
                          </h3>
                          <span className="font-black text-2xl sm:text-3xl text-emerald-400 tabular-nums">
                            {counter.value}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() =>
                            updateSubCounter(activeCounterPlayer.id, counter.id, -1)
                          }
                          className="w-11 h-11 rounded-xl bg-zinc-950 hover:bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-2xl font-black text-white cursor-pointer active:scale-95"
                        >
                          −
                        </button>
                        <button
                          onClick={() =>
                            updateSubCounter(activeCounterPlayer.id, counter.id, 1)
                          }
                          className="w-11 h-11 rounded-xl bg-zinc-950 hover:bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-2xl font-black text-white cursor-pointer active:scale-95"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            deleteSubCounter(activeCounterPlayer.id, counter.id)
                          }
                          title="Delete Counter"
                          className="p-2 text-zinc-500 hover:text-red-400 transition cursor-pointer ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: "+ Add Counter" Button (Wireframe 2) */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <button
                    onClick={() => setShowAddCounterModal(true)}
                    className="w-full py-5 px-6 rounded-3xl bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-500 hover:border-yellow-400 flex items-center justify-center gap-3 font-black text-xl sm:text-2xl text-white transition active:scale-95 shadow-xl cursor-pointer"
                  >
                    <Plus className="w-7 h-7 text-yellow-400 stroke-[3]" />
                    <span>Add Counter</span>
                  </button>

                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 space-y-2">
                    
                    <p>
                      Track card-specific counters like <strong>Diamonds</strong>,{' '}
                      <strong>Tower Lifetime</strong>, or <strong>Trap Durability</strong> here.
                      Everything auto-saves even if your phone screen locks!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODALS: CARD DETAIL, ADD CARD, SAVED DECKS, SHARE, ADD COUNTER       */}
      {/* ==================================================================== */}

      {showResetConfirm && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowResetConfirm(false)}>
          <div className="w-full max-w-sm rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-white">Reset match?</h3>
            <p className="mt-2 text-sm text-zinc-300">Are you sure you want to reset the game? All player life, gold, counters, and turn progress will return to their starting values.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setShowResetConfirm(false)} className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-200 hover:bg-zinc-700">Cancel</button>
              <button onClick={() => { resetMatch(); setShowResetConfirm(false); }} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">Reset match</button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Card Detail Modal */}
      {inspectedCard && (
        <div
          onClick={() => { setInspectedCard(null); setKeywordHelp(null); setRelatedCardHelp(null); }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (!e.target.closest('.keyword-trigger') && !e.target.closest('.keyword-explanation') && !e.target.closest('.related-card-trigger')) {
                setKeywordHelp(null);
                setRelatedCardHelp(null);
              }
            }}
            className="max-w-3xl w-full max-h-[96vh] overflow-y-auto rounded-[2rem] border-4 border-zinc-900 shadow-2xl bg-zinc-800"
          >
            <div className="sticky top-0 z-20 px-4 py-3 bg-zinc-900 flex items-center justify-between gap-3">
              <span className="text-sm sm:text-base font-black tracking-[0.18em] text-zinc-400 tabular-nums">
                {Math.max(0, inspectedIndex) + 1} / {inspectedCardList.length}
              </span>
              <div className="flex items-center gap-2">
                {inspectedIndex > 0 && (
                  <button type="button" onClick={() => navigateInspectedCard(-1)} aria-label="Previous card" className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {inspectedIndex >= 0 && inspectedIndex < inspectedCardList.length - 1 && (
                  <button type="button" onClick={() => navigateInspectedCard(1)} aria-label="Next card" className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
                <button type="button" onClick={() => { setInspectedCard(null); setKeywordHelp(null); setRelatedCardHelp(null); }} aria-label="Close card details" className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-5" style={{ backgroundColor: getFactionObj(inspectedCard.faction).color }}>
              <div className="mx-auto w-full max-w-xl rounded-2xl bg-zinc-950 border-4 border-zinc-900 overflow-hidden flex items-center justify-center min-h-[260px]">
                {inspectedCard.imagePath ? (
                  <img src={inspectedCard.imagePath} alt={`${inspectedCard.name} card`} className="w-full max-h-[55vh] object-contain" />
                ) : (
                  <div className="w-full h-64 p-5"><CardIllustration artType={inspectedCard.artType} faction={inspectedCard.faction} /></div>
                )}
              </div>

              <div className="mt-4 mx-auto max-w-xl rounded-3xl bg-white text-zinc-950 p-5 sm:p-7 shadow-xl space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight min-w-0">{inspectedCard.name}</h2>
                  <div className="shrink-0 flex items-baseline gap-5 text-base sm:text-lg font-bold text-zinc-950 tabular-nums">
                    <span>{inspectedCard.cost} cost</span>
                    {inspectedCard.power !== null && inspectedCard.power !== undefined && inspectedCard.health !== null && inspectedCard.health !== undefined && (
                      <span>{inspectedCard.power}/{inspectedCard.health}</span>
                    )}
                    {inspectedCard.durability !== null && inspectedCard.durability !== undefined && (
                      <span>{inspectedCard.durability} DUR</span>
                    )}
                    {inspectedCard.power !== null && inspectedCard.power !== undefined && (inspectedCard.health === null || inspectedCard.health === undefined) && (
                      <span>{inspectedCard.power} STR</span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-extrabold uppercase tracking-wide text-zinc-600">{inspectedCard.tribe} · {inspectedCard.type}</p>
                <div className="border-t-2 border-zinc-900 pt-3" />

                {inspectedCard.ability && (
                  <div className="text-base leading-relaxed">
                    {renderInteractiveCardText(inspectedCard.ability, inspectedCard)}
                    {/\bFlame\b/i.test(inspectedCard.ability) && (
                      <p className="mt-2 text-sm font-semibold text-zinc-700">Related Cards: <button type="button" onClick={() => setRelatedCardHelp({ title: 'Fire Trap Token', imagePath: '/related/Tokens_card8.webp' })} className="related-card-trigger font-semibold underline decoration-dotted text-emerald-800">Fire</button></p>
                    )}
                  </div>
                )}

                {keywordHelp && (
                  <div onClick={(e) => e.stopPropagation()} className="keyword-explanation rounded-xl border border-zinc-300 bg-zinc-100 p-3 text-sm leading-relaxed text-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-1"><strong>{keywordHelp.name}</strong><button type="button" onClick={() => setKeywordHelp(null)} aria-label="Close keyword explanation" className="rounded-md px-2 py-0.5 hover:bg-zinc-200 font-black">×</button></div>
                    {keywordHelp.description}
                  </div>
                )}
                {relatedCardHelp && (
                  <div onClick={(e) => e.stopPropagation()} className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-2"><strong>Related Card: {relatedCardHelp.title}</strong><button type="button" onClick={() => setRelatedCardHelp(null)} aria-label="Close related card" className="rounded-md px-2 py-0.5 hover:bg-emerald-100 font-black">×</button></div>
                    <img src={relatedCardHelp.imagePath} alt={relatedCardHelp.title} className="mx-auto max-h-72 object-contain rounded-lg" />
                  </div>
                )}

                {inspectedCard.flavor && <p className="border-t border-zinc-200 pt-3 text-sm italic text-zinc-600">{inspectedCard.flavor}</p>}

                <section className="border-t-2 border-zinc-200 pt-3 space-y-2" aria-label="Card rulings">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-700">Rulings</h3>
                  {(() => {
                    const ruling = CARD_RULINGS[inspectedCard.id];
                    const entries = Array.isArray(ruling) ? ruling : ruling ? [ruling] : [];
                    return entries.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-zinc-800">
                        {entries.map((entry, index) => <li key={`${inspectedCard.id}-ruling-${index}`}>{entry}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm italic text-zinc-500">No rulings have been added for this card yet.</p>
                    );
                  })()}
                </section>

                <div className="border-t border-zinc-200 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="text-zinc-600">Illustrated by <strong className="text-zinc-950">Fahoodz (Fahad Al Marzooqi)</strong></span>
                  <strong className="uppercase tracking-wide text-zinc-900">{inspectedCard.rarity}</strong>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 bg-zinc-900 flex items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-extrabold text-white">In Deck: {activeDeck.cards[inspectedCard.id] || 0} / 3</span>
              <div className="flex gap-2">
                <button onClick={() => removeCardFromDeck(inspectedCard.id)} className="px-4 py-2 rounded-xl bg-black text-white font-black text-sm cursor-pointer">-1</button>
                <button onClick={() => addCardToDeck(inspectedCard.id)} className="px-4 py-2 rounded-xl bg-yellow-400 text-zinc-950 font-black text-sm cursor-pointer">+1 to Deck</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deck Library: choose a saved deck. */}
      {activeView === 'deckLibrary' && (
        <main className="flex-1 min-h-0 overflow-y-auto bg-zinc-950">
          <div className="max-w-7xl mx-auto p-5 sm:p-8 space-y-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">Your Collection</p>
                <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">Deck Library</h1>
                <p className="text-zinc-400 mt-2">Choose a saved deck to view its full overview.</p>
              </div>
              <button onClick={createNewDeck} className="px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black flex items-center gap-2 cursor-pointer"><Plus className="w-4 h-4" /> New Deck</button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {decks.map((deck, index) => {
                const count = Object.values(deck.cards || {}).reduce((sum, qty) => sum + qty, 0);
                const cover = deckCoverSrc(deck);
                const headerColor = deck.headerColor || ['#eab308', '#4f46e5', '#a855f7', '#dc2626', '#0d9488'][index % 5];
                return (
                  <button key={deck.id} type="button" onClick={() => { setActiveDeckId(deck.id); setActiveView('deckOverview'); }} className="text-left rounded-2xl overflow-hidden border-2 border-zinc-800 hover:border-yellow-400 bg-zinc-900 transition cursor-pointer shadow-lg">
                    <div className="px-5 py-3 font-black text-lg text-zinc-950 truncate" style={{ backgroundColor: headerColor }}>{deck.name || 'Untitled Deck'}</div>
                    <div className="h-64 bg-zinc-950 flex items-center justify-center overflow-hidden">
                      {cover ? (
                        <img
                          src={cover}
                          alt={`${deck.name} cover art`}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            const chosen = deckCoverCard(deck);
                            // If a standalone crop is unavailable, fall back to the verified
                            // full-card scan so the deck tile never shows a broken image.
                            if (chosen?.imagePath && e.currentTarget.dataset.fallback !== 'used') {
                              e.currentTarget.dataset.fallback = 'used';
                              e.currentTarget.src = chosen.imagePath;
                            } else {
                              e.currentTarget.style.display = 'none';
                            }
                          }}
                        />
                      ) : <div className="text-center text-zinc-600"><Layers className="w-12 h-12 mx-auto mb-2"/><span className="text-xs font-bold">Add cards to choose cover art</span></div>}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-zinc-400 line-clamp-2 min-h-10">{deck.description || 'Add a short description for this deck.'}</p>
                      <div className="mt-4 flex items-center justify-between"><span className={`text-sm font-black ${count === 30 ? 'text-emerald-400' : 'text-zinc-300'}`}>{count}/30 cards</span><span className="text-sm text-yellow-400 font-bold">View deck →</span></div>
                    </div>
                  </button>
                );
              })}
            </section>
            <button onClick={() => setActiveView('collection')} className="text-sm font-bold text-zinc-400 hover:text-white cursor-pointer">← Back to Collection & Deck Builder</button>
          </div>
        </main>
      )}

      {/* Full-screen saved deck overview: visual card layout, mana curve, and tribe balance. */}
      {activeView === 'deckOverview' && (
        <main className="flex-1 min-h-0 overflow-y-auto bg-zinc-950">
          <div className="max-w-[1600px] mx-auto p-4 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">Deck Overview</p>
                <input value={activeDeck.name || ''} onChange={(e) => renameActiveDeck(e.target.value)} aria-label="Deck name" className="mt-1 w-full max-w-2xl bg-transparent text-3xl sm:text-4xl font-black text-white outline-none border-b border-transparent focus:border-yellow-400" />
                <textarea value={activeDeck.description || ''} onChange={(e) => updateDeckField(activeDeck.id, 'description', e.target.value)} rows={2} placeholder="Add a short description for this deck..." className="mt-3 w-full max-w-3xl resize-y rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-300 outline-none focus:border-yellow-400" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-zinc-900 px-4 py-3 text-lg font-black text-white">{totalCardsInDeck}/30 cards</span>
                <button onClick={() => setShowShareModal(true)} className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold text-white cursor-pointer">Share Deck</button>
                <button onClick={() => deleteDeck(activeDeck.id)} disabled={decks.length <= 1} className="rounded-xl bg-red-950 px-4 py-3 text-sm font-bold text-red-300 disabled:opacity-40 cursor-pointer">Delete</button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
              <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl font-black text-white">Cards in this deck</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                      Sort by
                      <select
                        value={deckViewerSortMode}
                        onChange={(e) => setDeckViewerSortMode(e.target.value)}
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-2 text-xs text-white"
                      >
                        <option value="deck">Deck Order</option>
                        <option value="cost">Cost</option>
                        <option value="rarity">Rarity</option>
                        <option value="name">Name</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => setDeckViewerSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc')}
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-xs font-bold text-white hover:border-yellow-400"
                      title="Reverse sort order"
                    >
                      {deckViewerSortDirection === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                    Cover card
                    <select value={activeDeck.coverCardId && (activeDeck.cards?.[activeDeck.coverCardId] || 0) > 0 ? activeDeck.coverCardId : ''} onChange={(e) => updateDeckField(activeDeck.id, 'coverCardId', e.target.value || null)} className="max-w-48 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-2 text-xs text-white">
                      <option value="">First card automatically</option>
                      {deckOverviewCards.filter(({card}) => card.deckArtPath).map(({card}) => <option key={card.id} value={card.id}>{card.name}</option>)}
                    </select>
                  </label>
                </div>
                {deckOverviewCards.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-zinc-700 p-12 text-center text-zinc-500">This deck is empty. Open the Deck Builder to add cards.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-3">
                    {deckViewerCards.map(({card, qty}) => (
                      <button key={card.id} type="button" onClick={() => setInspectedCard(card)} className="group text-left rounded-xl border border-zinc-700 bg-zinc-950 overflow-hidden hover:border-yellow-400 transition cursor-pointer">
                        <div className="relative aspect-[5/7] bg-zinc-900 flex items-center justify-center">
                          {card.imagePath ? <img src={card.imagePath} alt={card.name} className="w-full h-full object-contain" loading="lazy"/> : <div className="p-3 text-center text-sm font-bold">{card.name}</div>}
                          <span className="absolute top-2 right-2 rounded-full bg-yellow-400 text-zinc-950 px-2 py-1 text-xs font-black">x{qty}</span>
                        </div>
                        <div className="p-2"><p className="text-xs font-black text-white truncate">{card.name}</p><p className="text-[10px] text-zinc-500 truncate">{card.cost} cost · {card.tribe}</p></div>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <aside className="space-y-5">
                <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <h2 className="text-lg font-black text-white mb-4">Mana Curve</h2>
                  <div className="h-44 flex items-end justify-around gap-2 border-b border-zinc-700 pb-2">
                    {deckManaCurve.map((bucket) => {
                      const max = Math.max(1, ...deckManaCurve.map((entry) => entry.count));
                      const height = bucket.count ? Math.max(8, (bucket.count / max) * 118) : 0;
                      return <div key={bucket.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                        <span className="text-xs font-black text-yellow-300">{bucket.count || ''}</span>
                        <div className="w-full max-w-9 rounded-t-md bg-yellow-400" style={{height: `${height}px`}} />
                        <span className="text-xs font-bold text-zinc-400">{bucket.label}</span>
                      </div>;
                    })}
                  </div>
                </section>

                <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <h2 className="text-lg font-black text-white mb-4">Tribe Balance</h2>
                  <div className="space-y-3">
                    {deckTribeBalance.length ? deckTribeBalance.map(([tribe, count]) => {
                      const max = Math.max(1, ...deckTribeBalance.map((entry) => entry[1]));
                      return <div key={tribe}>
                        <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1"><span>{tribe}</span><span>{count}</span></div>
                        <div className="h-2 rounded-full bg-zinc-800 overflow-hidden"><div className="h-full rounded-full bg-emerald-400" style={{width: `${(count/max)*100}%`}}/></div>
                      </div>;
                    }) : <p className="text-sm text-zinc-500">No cards yet.</p>}
                  </div>
                </section>

                <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                  <h2 className="text-lg font-black text-white mb-2">Deck Details</h2>
                  <p className="text-sm text-zinc-400">{totalCardsInDeck} of 30 cards · {deckOverviewCards.length} unique cards</p>
                  <button onClick={() => setActiveView('collection')} className="mt-4 w-full rounded-xl bg-yellow-400 px-4 py-3 text-sm font-black text-zinc-950 cursor-pointer">Open in Deck Builder</button>
                </section>
              </aside>
            </div>
            <button onClick={() => setActiveView('deckLibrary')} className="text-sm font-bold text-zinc-400 hover:text-white cursor-pointer">← Back to Deck Library</button>
          </div>
        </main>
      )}

      {/* News & Updates: posts are authored in the NEWS_POSTS constant above. */}
      {activeView === 'news' && (
        <main className="flex-1 min-h-0 overflow-y-auto bg-zinc-950">
          <div className="max-w-5xl mx-auto p-5 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">Gold & Goons</p>
              <h1 className="mt-1 text-3xl sm:text-4xl font-black text-white">News & Updates</h1>
              <p className="mt-2 text-zinc-400">Announcements, balance changes, new cards, and app updates.</p>
            </div>
            {NEWS_POSTS.length ? (
              <div className="space-y-4">
                {NEWS_POSTS.map((post) => (
                  <article key={post.id} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400"><span>{post.category || 'Announcement'}</span><span className="text-zinc-600">•</span><time>{post.date}</time></div>
                    <h2 className="mt-3 text-2xl font-black text-white">{post.title}</h2>
                    <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">{post.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center">
                <BookOpen className="w-10 h-10 text-yellow-400 mx-auto mb-3"/>
                <h2 className="text-xl font-black text-white">No announcements yet</h2>
                <p className="mt-2 text-sm text-zinc-400">Check back here for Gold & Goons news, new releases, balance updates, and app improvements.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* 2. Saved Decks Drawer Modal ("Go to decks") */}
      {showDecksDrawer && (
        <div
          onClick={() => setShowDecksDrawer(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xl text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-yellow-400" />
                <span>Saved Decks</span>
              </h3>
              <button
                onClick={() => setShowDecksDrawer(false)}
                className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {decks.map((d) => {
                const count = Object.values(d.cards).reduce((s, c) => s + c, 0);
                const isSelected = d.id === activeDeck.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setActiveDeckId(d.id);
                      setShowDecksDrawer(false);
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-yellow-500/15 border-yellow-400'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <div>
                      <p className="font-black text-white">{d.name}</p>
                      <p className="text-xs text-zinc-400 font-bold">{count} / 30 Cards</p>
                    </div>
                    {decks.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDeck(d.id);
                        }}
                        className="p-2 text-zinc-500 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={createNewDeck}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Deck</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Add Custom Card Modal */}
      {showAddCardModal && (
        <div
          onClick={() => setShowAddCardModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreateCustomCard}
            className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xl text-white">Add Card to Gold & Goons</h3>
              <button
                type="button"
                onClick={() => setShowAddCardModal(false)}
                className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Card Name *</label>
                <input
                  required
                  type="text"
                  value={newCardForm.name}
                  onChange={(e) => setNewCardForm({ ...newCardForm, name: e.target.value })}
                  placeholder="e.g., Mega Bloog"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Faction Color</label>
                <select
                  value={newCardForm.faction}
                  onChange={(e) => setNewCardForm({ ...newCardForm, faction: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                >
                  {FACTIONS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.id.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Card Type</label>
                <select
                  value={newCardForm.type}
                  onChange={(e) => setNewCardForm({ ...newCardForm, type: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="Goon">Goon</option>
                  <option value="Tower">Tower</option>
                  <option value="Trap">Trap</option>
                  <option value="Trick">Trick</option>
                  <option value="Trinket">Trinket</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Rarity / Tier</label>
                <select
                  value={newCardForm.rarity}
                  onChange={(e) => setNewCardForm({ ...newCardForm, rarity: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="Bronze">Bronze</option>
                  <option value="Vanilla">Vanilla</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Aureum">Aureum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Gold Cost</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={newCardForm.cost}
                  onChange={(e) => setNewCardForm({ ...newCardForm, cost: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              {newCardForm.type !== 'Trick' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">
                    {newCardForm.type === 'Trap' ? 'Durability' : 'Power'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={newCardForm.power}
                    onChange={(e) => setNewCardForm({ ...newCardForm, power: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Rules / Ability Text</label>
              <textarea
                rows="2"
                value={newCardForm.ability}
                onChange={(e) => setNewCardForm({ ...newCardForm, ability: e.target.value })}
                placeholder="e.g., Stack. When played: Gain 1 Gold."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Flavor Text (Optional)</label>
              <input
                type="text"
                value={newCardForm.flavor}
                onChange={(e) => setNewCardForm({ ...newCardForm, flavor: e.target.value })}
                placeholder="Funny lore quote..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCardModal(false)}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm cursor-pointer"
              >
                Save Card
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Share / Export / Import Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xl text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-yellow-400" />
                <span>Share Deck With Friends!</span>
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Copy a direct shareable link containing your active deck (
                <strong className="text-white">{activeDeck.name}</strong>) and any custom cards
                you've added so your friends can open it immediately.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleCopyShareUrl}
                  className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3 px-4 rounded-2xl text-sm transition cursor-pointer"
                >
                  {copiedState === 'url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedState === 'url' ? 'Share Link Copied!' : 'Copy Shareable Link'}</span>
                </button>

                <button
                  onClick={() => copyText(generateSharePayload(), 'json')}
                  className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-2xl text-sm border border-zinc-700 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{copiedState === 'json' ? 'Deck Code Copied!' : 'Copy Deck JSON Code'}</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                Import Friend's Deck Code or Link
              </label>
              <textarea
                rows="2"
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder="Paste a shared link or JSON deck code here..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-white"
              />
              {importStatus && (
                <p className="text-xs font-bold text-emerald-400">{importStatus}</p>
              )}
              <button
                onClick={handleImportCode}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Import Deck & Cards</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add Custom Sub-Counter Modal (Wireframe 2: "+ Add Counter") */}
      {showAddCounterModal && (
        <div
          onClick={() => setShowAddCounterModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddSubCounter}
            className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-black text-xl text-white">New Player Counter</h3>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1">Counter Name</label>
              <input
                required
                autoFocus
                type="text"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="e.g., Poison, Shield, Tower 2"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5">Choose Icon</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'diamond', label: 'Diamond' },
                  { id: 'clock', label: 'Timer' },
                  { id: 'shield', label: 'Shield' },
                  { id: 'rings', label: 'Token' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNewCounterIcon(item.id)}
                    className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1 cursor-pointer ${
                      newCounterIcon === item.id
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <CounterIcon icon={item.id} className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCounterModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-yellow-400 text-zinc-950 font-black text-sm cursor-pointer"
              >
                Add Counter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Turn / Yield Rate Helper Modal */}
      {showTurnModal && (
        <div
          onClick={() => setShowTurnModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-zinc-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center"
          >
            <h3 className="font-black text-xl text-white">Turn & Gold Yield Controls</h3>
            <p className="text-xs text-zinc-400">
              Current Turn: <strong className="text-white">{matchState.turn}</strong> • Yield Rate:{' '}
              <strong className="text-yellow-400">{matchState.yieldRate} Gold</strong>
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  advanceTurn(true);
                  setShowTurnModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm cursor-pointer"
              >
                Next Turn + Grant ({matchState.yieldRate}) Gold to All
              </button>
              <button
                onClick={() => {
                  advanceTurn(false);
                  setShowTurnModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm cursor-pointer"
              >
                Next Turn Only (No Gold)
              </button>
            </div>
          </div>
        </div>
      )}

      {relatedCardHelp && (
        <div className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setRelatedCardHelp(null)}>
          <div className="w-full max-w-sm rounded-2xl border-2 border-zinc-700 bg-zinc-900 p-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-1 pb-2">
              <h3 className="font-black text-white text-lg">{relatedCardHelp.title}</h3>
              <button onClick={() => setRelatedCardHelp(null)} className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"><X className="w-4 h-4" /></button>
            </div>
            <img src={relatedCardHelp.imagePath} alt={relatedCardHelp.title} className="w-full max-h-[72vh] object-contain rounded-xl bg-black" />
          </div>
        </div>
      )}
    </div>
  );
}