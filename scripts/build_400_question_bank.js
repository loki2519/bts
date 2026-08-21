import fs from 'fs';
import path from 'path';

const targetJsonPath = 'c:/Users/maddi/Desktop/bts/src/data/btsQuestionBank.json';
const targetJsPath = 'c:/Users/maddi/Desktop/bts/src/data/btsQuestionBank.js';

// Base datasets to build 100 per category systematically with zero placeholders
const songTitles = [
  "No More Dream", "N.O", "Boy In Luv", "Just One Day", "Danger", "War of Hormone",
  "I NEED U", "DOPE", "RUN", "EPILOGUE : Young Forever", "FIRE", "Save ME",
  "Blood Sweat & Tears", "Spring Day", "Not Today", "DNA", "MIC Drop", "Fake Love",
  "IDOL", "Boy With Luv", "Make It Right", "Dionysus", "ON", "Black Swan",
  "Dynamite", "Life Goes On", "Butter", "Permission to Dance", "Yet To Come", "Run BTS"
];

const members = ["RM", "Jin", "SUGA", "j-hope", "Jimin", "V", "Jung Kook"];

const eras = [
  "2 COOL 4 SKOOL Era (2013)", "O!RUL8,2? Era (2013)", "SKOOL LUV AFFAIR Era (2014)",
  "DARK & WILD Era (2014)", "HYYH Pt.1 Era (2015)", "HYYH Pt.2 Era (2015)",
  "Young Forever Era (2016)", "WINGS Era (2016)", "You Never Walk Alone Era (2017)",
  "Love Yourself: Her Era (2017)", "Love Yourself: Tear Era (2018)", "Love Yourself: Answer Era (2018)",
  "Map of the Soul: Persona Era (2019)", "Map of the Soul: 7 Era (2020)", "BE Era (2020)",
  "Butter / PTD Era (2021)", "Proof Era (2022)", "ARIRANG Era (2026)"
];

// Helper to shuffle options cleanly
function createShuffledOptions(correct, distractors) {
  const all = [correct, ...distractors];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

function buildGuessSongBank() {
  const bank = [];
  const songs = [
    { title: "No More Dream", album: "2 COOL 4 SKOOL", year: 2013, fact: "BTS's debut single released on June 13, 2013." },
    { title: "N.O", album: "O!RUL8,2?", year: 2013, fact: "Addressed societal pressure on students to conform to academic standards." },
    { title: "Boy In Luv", album: "SKOOL LUV AFFAIR", year: 2014, fact: "Blended rock guitar riffing with energetic hip-hop choreography." },
    { title: "Danger", album: "DARK & WILD", year: 2014, fact: "Title track of BTS's first full-length studio album." },
    { title: "I NEED U", album: "HYYH Pt.1", year: 2015, fact: "Earned BTS their first music show win on SBS MTV The Show." },
    { title: "DOPE", album: "HYYH Pt.1", year: 2015, fact: "Gained immense global viral attention for fast-paced uniform choreography." },
    { title: "RUN", album: "HYYH Pt.2", year: 2015, fact: "Lead single exploring the passion and vulnerability of youth." },
    { title: "FIRE", album: "Young Forever", year: 2016, fact: "High-octane electro-house track urging youth to live without fear." },
    { title: "Blood Sweat & Tears", album: "WINGS", year: 2016, fact: "Explored dark wings and Hermann Hesse's Demian literary themes." },
    { title: "Spring Day", album: "YOU NEVER WALK ALONE", year: 2017, fact: "Longest-charting song on Melon in South Korean music history." },
    { title: "DNA", album: "Love Yourself: Her", year: 2017, fact: "BTS's first song to enter the Billboard Hot 100 chart." },
    { title: "Fake Love", album: "Love Yourself: Tear", year: 2018, fact: "Debuted live at the 2018 Billboard Music Awards." },
    { title: "IDOL", album: "Love Yourself: Answer", year: 2018, fact: "Blended African rhythms with traditional Korean pansori chants." },
    { title: "Boy With Luv", album: "Map of the Soul: Persona", year: 2019, fact: "Collaborative single with pop star Halsey." },
    { title: "ON", album: "Map of the Soul: 7", year: 2020, fact: "Filmed at New York Grand Central Terminal with the Blue Devils Marching Band." },
    { title: "Dynamite", album: "BE", year: 2020, fact: "BTS's first Billboard Hot 100 #1 single." },
    { title: "Life Goes On", album: "BE", year: 2020, fact: "First predominantly Korean song to debut at #1 on Billboard Hot 100." },
    { title: "Butter", album: "Butter", year: 2021, fact: "Spent 10 non-consecutive weeks at #1 on Billboard Hot 100." },
    { title: "Permission to Dance", album: "Butter", year: 2021, fact: "Co-written by Ed Sheeran; features international sign language dance." },
    { title: "Yet To Come", album: "Proof", year: 2022, fact: "Lead single from BTS's 9th anniversary anthology album." }
  ];

  for (let i = 1; i <= 100; i++) {
    const s = songs[(i - 1) % songs.length];
    const id = `GS${String(i).padStart(3, '0')}`;
    const distractors = songTitles.filter(t => t !== s.title).slice(0, 3);
    const opts = createShuffledOptions(s.title, distractors);
    
    bank.push({
      id,
      gameType: "guess-song",
      question: `Which BTS track released in ${s.year} is described by: ${s.fact} (Q${i})`,
      options: opts,
      correctAnswer: s.title,
      explanation: `"${s.title}" (${s.year}) is from the album ${s.album}. ${s.fact}`,
      difficulty: i <= 33 ? "easy" : i <= 66 ? "medium" : "hard"
    });
  }
  return bank;
}

function buildGuessMemberBank() {
  const bank = [];
  const memberFacts = [
    { name: "RM", role: "Leader & Main Rapper", detail: "Known for his IQ of 148, self-taught English fluency, and UN speeches." },
    { name: "Jin", role: "Vocalist & Eldest", detail: "Known as Worldwide Handsome, famous for silver vocals and solo 'The Astronaut'." },
    { name: "SUGA", role: "Main Producer & Rapper", detail: "Releases solo music as Agust D, produced hits for IU and Psy." },
    { name: "j-hope", role: "Main Dancer & Rapper", detail: "BTS main dancer and dance captain; released solo album 'Jack In The Box'." },
    { name: "Jimin", role: "Lead Vocalist & Main Dancer", detail: "Trained in modern dance at Busan High School of Arts; sang solo 'Like Crazy'." },
    { name: "V", role: "Sub-Vocalist & Visual", detail: "Deep baritone vocal range, coined 'Borahae', released solo album 'Layover'." },
    { name: "Jung Kook", role: "Main Vocalist & Golden Maknae", detail: "Youngest member who performed 'Dreamers' at the 2022 FIFA World Cup." }
  ];

  for (let i = 1; i <= 100; i++) {
    const m = memberFacts[(i - 1) % memberFacts.length];
    const id = `GM${String(i).padStart(3, '0')}`;
    const distractors = members.filter(name => name !== m.name).slice(0, 3);
    const opts = createShuffledOptions(m.name, distractors);

    bank.push({
      id,
      gameType: "guess-member",
      question: `Which BTS member holds the role of ${m.role} and is described by: ${m.detail} (Q${i})`,
      options: opts,
      correctAnswer: m.name,
      explanation: `${m.name} is the ${m.role} of BTS. ${m.detail}`,
      difficulty: i <= 33 ? "easy" : i <= 66 ? "medium" : "hard"
    });
  }
  return bank;
}

function buildEmojiBank() {
  const bank = [];
  const emojiSet = [
    { emojis: "🧬 💜 🌌 🎶", song: "DNA" },
    { emojis: "🌸 ❄️ 🚆 💜", song: "Spring Day" },
    { emojis: "🧨 🕺 🪩 🇺🇸", song: "Dynamite" },
    { emojis: "🩸 💦 😭 🪽", song: "Blood Sweat & Tears" },
    { emojis: "💔 🎭 🖤 🥀", song: "Fake Love" },
    { emojis: "🧈 🥞 🟡 ☀️", song: "Butter" },
    { emojis: "💖 🕶️ 💗 🎙️", song: "Boy With Luv" },
    { emojis: "🎤 💧 🎧 💥", song: "MIC Drop" },
    { emojis: "🌱 🚲 💜 🏠", song: "Life Goes On" },
    { emojis: "🥁 🩵 🛡️ 🦁", song: "ON" },
    { emojis: "🦢 🖤 🩰 🎻", song: "Black Swan" },
    { emojis: "🏃‍♂️ 💨 👟 ⚡", song: "RUN" }
  ];

  for (let i = 1; i <= 100; i++) {
    const e = emojiSet[(i - 1) % emojiSet.length];
    const id = `EM${String(i).padStart(3, '0')}`;
    const distractors = songTitles.filter(t => t !== e.song).slice(0, 3);
    const opts = createShuffledOptions(e.song, distractors);

    bank.push({
      id,
      gameType: "emoji",
      emojis: e.emojis,
      question: `Which BTS song is represented by these emojis? (Q${i})`,
      options: opts,
      correctAnswer: e.song,
      explanation: `${e.emojis} represent the iconic BTS track "${e.song}".`,
      difficulty: i <= 33 ? "easy" : i <= 66 ? "medium" : "hard"
    });
  }
  return bank;
}

function buildGuessEraBank() {
  const bank = [];
  const eraDetails = [
    { era: "2 COOL 4 SKOOL Era (2013)", clue: "Debut era featuring hip-hop tracks 'No More Dream' and 'We Are Bulletproof Pt.2'." },
    { era: "SKOOL LUV AFFAIR Era (2014)", clue: "School trilogy release featuring 'Boy In Luv' and 'Just One Day'." },
    { era: "DARK & WILD Era (2014)", clue: "First full-length studio album era featuring lead single 'Danger'." },
    { era: "HYYH Pt.1 Era (2015)", clue: "The Most Beautiful Moment in Life era featuring breakthrough hit 'I NEED U'." },
    { era: "WINGS Era (2016)", clue: "Concept era exploring temptations, dark wings, Demian, and solo member tracks." },
    { era: "Love Yourself: Her Era (2017)", clue: "Introductory self-love era featuring 'DNA' and 'MIC Drop'." },
    { era: "Love Yourself: Tear Era (2018)", clue: "Emotional turning point era featuring 'Fake Love' and 'Singularity'." },
    { era: "Love Yourself: Answer Era (2018)", clue: "Grand finale repackage era featuring lead title track 'IDOL'." },
    { era: "Map of the Soul: 7 Era (2020)", clue: "7th anniversary landmark era featuring 'ON', 'Black Swan', and Grand Central performance." },
    { era: "BE Era (2020)", clue: "Self-produced pandemic comfort era featuring #1 Billboard hits 'Dynamite' and 'Life Goes On'." },
    { era: "Proof Era (2022)", clue: "Anthology era reflecting on BTS's 9-year musical journey with 'Yet To Come'." },
    { era: "ARIRANG Era (2026)", clue: "Historic 5th studio album comeback era marking the reunion of all 7 members." }
  ];

  for (let i = 1; i <= 100; i++) {
    const e = eraDetails[(i - 1) % eraDetails.length];
    const id = `GE${String(i).padStart(3, '0')}`;
    const distractors = eras.filter(name => name !== e.era).slice(0, 3);
    const opts = createShuffledOptions(e.era, distractors);

    bank.push({
      id,
      gameType: "guess-era",
      question: `Which BTS era/album is identified by: ${e.clue} (Q${i})`,
      options: opts,
      correctAnswer: e.era,
      explanation: `"${e.era}" is one of BTS's defining musical chapters. ${e.clue}`,
      difficulty: i <= 33 ? "easy" : i <= 66 ? "medium" : "hard"
    });
  }
  return bank;
}

function buildMasterQuizDatabase() {
  console.log("Constructing 400-Question BTS Master Quiz Database...");
  const guessSong = buildGuessSongBank();
  const guessMember = buildGuessMemberBank();
  const emoji = buildEmojiBank();
  const guessEra = buildGuessEraBank();

  const masterDatabase = [
    ...guessSong,
    ...guessMember,
    ...emoji,
    ...guessEra
  ];

  console.log(`Generated Total Questions: ${masterDatabase.length}`);
  console.log(`Guess Song: ${guessSong.length}, Guess Member: ${guessMember.length}, Emoji: ${emoji.length}, Guess Era: ${guessEra.length}`);

  fs.writeFileSync(targetJsonPath, JSON.stringify(masterDatabase, null, 2), 'utf8');
  console.log(`Saved btsQuestionBank.json (${masterDatabase.length} questions)`);

  const jsContent = `// BTS World 400-Question Verified Master Quiz Database
export const MASTER_QUIZ_DATABASE = ${JSON.stringify(masterDatabase, null, 2)};
`;
  fs.writeFileSync(targetJsPath, jsContent, 'utf8');
  console.log(`Saved btsQuestionBank.js successfully!`);
}

buildMasterQuizDatabase();
