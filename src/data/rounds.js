// rounds.js — all game content lives here
// To add a new round: copy a round object, update hint/learn/tiles
// Tile URLs use OpenStreetMap satellite: https://mt1.google.com/vt/lyrs=s&x=X&y=Y&z=Z

const ROUNDS = [
  {
    hint: "8 tiles: Amazon rainforest, Brazil — 1 impostor from Congo Basin, DR Congo",
    learn: "Both are dense equatorial rainforests, but Amazon river bends curve more gently. Congo tributaries tend to fork sharper with narrower channels.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=2733&y=4090&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2734&y=4090&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2735&y=4091&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2732&y=4091&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2396&y=4057&z=13", label: "Congo Basin, DR Congo", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2736&y=4092&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2733&y=4092&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2734&y=4091&z=13", label: "Amazon, Brazil", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2731&y=4090&z=13", label: "Amazon, Brazil", imp: false },
    ]
  },
  {
    hint: "8 tiles: Sahara Desert, Algeria — 1 impostor from Atacama Desert, Chile",
    learn: "Both are hyper-arid, but the Atacama sits between coastal mountains. Look for sharper ridgeline shadows and lighter mineral-pale soil.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=2196&y=3203&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2197&y=3203&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2198&y=3204&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2195&y=3204&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=1750&y=3900&z=13", label: "Atacama, Chile", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2199&y=3205&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2196&y=3205&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2197&y=3204&z=13", label: "Sahara, Algeria", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=2194&y=3203&z=13", label: "Sahara, Algeria", imp: false },
    ]
  },
  {
    hint: "8 tiles: Dutch polder farmland, Netherlands — 1 impostor from rural England",
    learn: "Dutch polders are engineered — perfectly rectangular fields with dead-straight drainage canals. English fields follow organic hedgerow boundaries from centuries of enclosure.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=8433&y=5327&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8434&y=5327&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8435&y=5328&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8432&y=5328&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8072&y=5371&z=14", label: "Rural England", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8436&y=5329&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8433&y=5329&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8434&y=5328&z=14", label: "Netherlands", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=8431&y=5327&z=14", label: "Netherlands", imp: false },
    ]
  },
  {
    hint: "8 tiles: American Midwest grid farming, Iowa — 1 impostor from the Pampas, Argentina",
    learn: "Both are flat and agricultural, but American fields follow a strict township-and-range mile-grid. Argentine pampas fields are larger and less uniform, with curving roads.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=7283&y=6176&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7284&y=6176&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7285&y=6177&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7282&y=6177&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=5850&y=6700&z=14", label: "Pampas, Argentina", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7286&y=6178&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7283&y=6178&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7284&y=6177&z=14", label: "Iowa, USA", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=7281&y=6176&z=14", label: "Iowa, USA", imp: false },
    ]
  },
  {
    hint: "8 tiles: Australian Outback, Northern Territory — 1 impostor from Namib Desert, Namibia",
    learn: "Both are orange-red arid. Australian outback has sparse scrub and termite mound shadows. The Namib has smoother sand sea dunes with sharp slip-face edges.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=6840&y=7452&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6841&y=7452&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6842&y=7453&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6839&y=7453&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=4620&y=6700&z=14", label: "Namib Desert, Namibia", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6843&y=7454&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6840&y=7454&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6841&y=7453&z=14", label: "Northern Territory, Australia", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=6838&y=7452&z=14", label: "Northern Territory, Australia", imp: false },
    ]
  },
  {
    hint: "8 tiles: Rice paddies, Vietnam's Red River Delta — 1 impostor from Niigata Prefecture, Japan",
    learn: "Vietnamese paddies are irregular, intersected by narrow earthen paths. Japanese paddies in Niigata are uniform rectangles with paved roads — a result of post-war agricultural consolidation.",
    tiles: [
      { url: "https://mt1.google.com/vt/lyrs=s&x=13540&y=6920&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13541&y=6920&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13542&y=6921&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13539&y=6921&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=14560&y=6440&z=14", label: "Niigata Prefecture, Japan", imp: true },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13543&y=6922&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13540&y=6922&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13541&y=6921&z=14", label: "Red River Delta, Vietnam", imp: false },
      { url: "https://mt1.google.com/vt/lyrs=s&x=13538&y=6920&z=14", label: "Red River Delta, Vietnam", imp: false },
    ]
  },
];
