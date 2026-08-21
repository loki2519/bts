// Data for the 8 Playable Games

export const GUESS_SONG_DATA = [
  {
    id: 1,
    hint: "♪ 'Bogaosipda... how much longer do I have to wait?' ♪",
    options: ["Spring Day", "Butterfly", "Save ME", "Run"],
    correct: 0,
    song: "Spring Day"
  },
  {
    id: 2,
    hint: "♪ 'Peonnummul... take it away, my last breath...' ♪",
    options: ["Fake Love", "Blood Sweat & Tears", "DNA", "IDOL"],
    correct: 1,
    song: "Blood Sweat & Tears"
  },
  {
    id: 3,
    hint: "♪ 'I'm so sick of this fake love, fake love, fake love...' ♪",
    options: ["Black Swan", "Fake Love", "ON", "Dionysus"],
    correct: 1,
    song: "Fake Love"
  },
  {
    id: 4,
    hint: "♪ 'Shining through the city with a little funk and soul...' ♪",
    options: ["Butter", "Dynamite", "Permission to Dance", "Boy With Luv"],
    correct: 1,
    song: "Dynamite"
  },
  {
    id: 5,
    hint: "♪ 'You got me I look at you I dream, I got you in inside those dark nights...' ♪",
    options: ["Mikrokosmos", "Lights", "Magic Shop", "Heartbeat"],
    correct: 0,
    song: "Mikrokosmos"
  }
];

export const GUESS_MEMBER_DATA = [
  {
    id: 1,
    clues: ["Leader of BTS", "IQ 148", "Fluent in English", "Deep lyrics & art connoisseur"],
    options: ["SUGA", "RM", "Jin", "j-hope"],
    correct: 1,
    member: "RM"
  },
  {
    id: 2,
    clues: ["Worldwide Handsome", "Eldest member", "Silver voice tenor", "Loves fishing & cooking"],
    options: ["Jin", "V", "Jimin", "Jung Kook"],
    correct: 0,
    member: "Jin"
  },
  {
    id: 3,
    clues: ["Agust D", "Producer mastermind", "Daegu town rapper", "Gummy smile"],
    options: ["j-hope", "RM", "SUGA", "V"],
    correct: 2,
    member: "SUGA"
  },
  {
    id: 4,
    clues: ["Sunshine of ARMY", "Main dancer captain", "Lollapalooza headliner", "Street dance legend"],
    options: ["j-hope", "Jimin", "Jung Kook", "V"],
    correct: 0,
    member: "j-hope"
  },
  {
    id: 5,
    clues: ["Contemporary dance prince", "High vocal range", "Angel wings", "'Like Crazy' soloist"],
    options: ["V", "Jimin", "Jin", "Jung Kook"],
    correct: 1,
    member: "Jimin"
  },
  {
    id: 6,
    clues: ["Deep baritone voice", "Coined 'Borahae'", "Enjoys photography & jazz", "'Layover' soloist"],
    options: ["Jin", "V", "RM", "SUGA"],
    correct: 1,
    member: "V"
  },
  {
    id: 7,
    clues: ["Golden Maknae", "Main vocalist", "FIFA 2022 opener", "'Seven' soloist"],
    options: ["Jung Kook", "Jimin", "j-hope", "SUGA"],
    correct: 0,
    member: "Jung Kook"
  }
];

export const EMOJI_CHALLENGE_DATA = [
  { id: 1, emojis: "🩸 💦 👁️ 💧", answer: "Blood Sweat & Tears", options: ["Blood Sweat & Tears", "Fake Love", "Tear", "Fire"] },
  { id: 2, emojis: "🦋 🌸 ✨", answer: "Butterfly", options: ["Spring Day", "Butterfly", "Serendipity", "Bloom"] },
  { id: 3, emojis: "🌸 ❄️ 🏔️ ☀️", answer: "Spring Day", options: ["Spring Day", "Winter Bear", "Crystal Snow", "Sea"] },
  { id: 4, emojis: "💔 🎭 🖤", answer: "Fake Love", options: ["Fake Love", "Black Swan", "Tear", "Lie"] },
  { id: 5, emojis: "🧨 🕺 🌟", answer: "Dynamite", options: ["Dynamite", "Fire", "Butter", "Permission to Dance"] },
  { id: 6, emojis: "🧈 🥞 👑", answer: "Butter", options: ["Butter", "Dynamite", "Cream", "Sweet"] },
  { id: 7, emojis: "🎤 💧 👟 👑", answer: "MIC Drop", options: ["MIC Drop", "Dope", "Fire", "Cypher"] },
  { id: 8, emojis: "🌌 💫 🪐 ✨", answer: "Mikrokosmos", options: ["Mikrokosmos", "DNA", "Moon", "Pluto"] }
];

export const COMPLETE_LYRIC_DATA = [
  {
    id: 1,
    lyricSnippet: "No matter who you are, where you're from, your skin color, gender identity: ______ yourself.",
    options: ["love", "speak", "free", "trust"],
    correct: 1,
    songOrSpeech: "RM's UN Speech (2018)"
  },
  {
    id: 2,
    lyricSnippet: "You gave me the best of me, so you'll give you the best of ______.",
    options: ["you", "us", "love", "stars"],
    correct: 0,
    songOrSpeech: "Magic Shop"
  },
  {
    id: 3,
    lyricSnippet: "Passing by the edge of this cold winter, until the days of ______ come again.",
    options: ["summer", "spring", "autumn", "youth"],
    correct: 1,
    songOrSpeech: "Spring Day"
  },
  {
    id: 4,
    lyricSnippet: "Smooth like butter, pull you in like no ______.",
    options: ["other", "brother", "lover", "secret"],
    correct: 0,
    songOrSpeech: "Butter"
  },
  {
    id: 5,
    lyricSnippet: "Look up at the night sky, we shine in our own ______.",
    options: ["light", "dream", "galaxy", "way"],
    correct: 3,
    songOrSpeech: "Mikrokosmos"
  }
];

export const GUESS_ERA_DATA = [
  {
    id: 1,
    era: "The Most Beautiful Moment in Life (HYYH)",
    clues: "Flowers, youth rebellion, running towards dreams, 'I NEED U', 'RUN', 'Butterfly'",
    year: "2015",
    options: ["School Trilogy", "HYYH Era", "WINGS Era", "Love Yourself Era"],
    correct: 1
  },
  {
    id: 2,
    era: "WINGS Era",
    clues: "Dark temptation, wings, chokers, velvet jackets, Demian quotes, 'Blood Sweat & Tears'",
    year: "2016",
    options: ["WINGS Era", "HYYH Era", "Map of the Soul", "BE Era"],
    correct: 0
  },
  {
    id: 3,
    era: "Love Yourself Era",
    clues: "Heartbreak, magic shops, yellow DNA aesthetics, mask choreo, 'Fake Love', 'IDOL'",
    year: "2017-2018",
    options: ["Love Yourself Era", "Proof Era", "BE Era", "Dynamite Era"],
    correct: 0
  },
  {
    id: 4,
    era: "Map of the Soul Era",
    clues: "Pink suits, Greek mythology, Dionysus cups, white feathers, 'Boy With Luv', 'ON'",
    year: "2019-2020",
    options: ["School Trilogy", "Map of the Soul Era", "WINGS Era", "Butter Era"],
    correct: 1
  }
];

export const ALBUM_MATCHING_DATA = [
  { track: "Blood Sweat & Tears", options: ["WINGS", "BE", "Proof", "Persona"], correct: 0 },
  { track: "Spring Day", options: ["You Never Walk Alone", "HYYH Pt.1", "Tear", "7"], correct: 0 },
  { track: "Fake Love", options: ["Love Yourself 轉 'Tear'", "WINGS", "Her", "BE"], correct: 0 },
  { track: "Life Goes On", options: ["BE", "Proof", "Persona", "Dark & Wild"], correct: 0 },
  { track: "Black Swan", options: ["Map of the Soul : 7", "WINGS", "Answer", "Skool Luv Affair"], correct: 0 },
  { track: "Fire", options: ["Young Forever", "BE", "Proof", "Tear"], correct: 0 }
];

export const WORD_SCRAMBLE_DATA = [
  { id: 1, scrambled: "NAMJOON", original: "NAMJOON", hint: "BTS Leader's real name" },
  { id: 2, scrambled: "BORAHAE", original: "BORAHAE", hint: "Famous ARMY purple phrase" },
  { id: 3, scrambled: "MIKROKOSMOS", original: "MIKROKOSMOS", hint: "Persona track about shining stars" },
  { id: 4, scrambled: "JUNGKOOK", original: "JUNGKOOK", hint: "The Golden Maknae" },
  { id: 5, scrambled: "DYNAMITE", original: "DYNAMITE", hint: "First #1 Billboard Hot 100 hit" }
];
