// Verified BTS Core Data (Members, Albums, Timeline, Achievements, Fun Facts, BU Lore)

export const MEMBERS_DATA = [
  {
    id: "rm",
    name: "RM",
    realName: "Kim Namjoon (김남준)",
    role: "Leader, Main Rapper",
    birthDate: "September 12, 1994",
    zodiac: "Virgo",
    height: "181 cm",
    bio: "RM (formerly Rap Monster) is the formidable leader and main rapper of BTS. Known for his profound lyrical philosophical depth, impressive IQ of 148, and fluent English speaking abilities, he has spearheaded BTS's international speeches including landmark addresses at the United Nations.",
    achievements: [
      "Youngest Korean soloist with over 200 KOMCA-credited songs",
      "Delivered historical United Nations General Assembly speech 'Speak Yourself' (2018)",
      "Released critically acclaimed solo albums 'mono.' (2018), 'Indigo' (2022), and 'Right Place, Wrong Person' (2024)"
    ],
    image: "/images/bts/member_rm.jpg",
    color: "from-blue-600 to-indigo-900",
    quote: "No matter who you are, where you're from, your skin colour, gender identity: speak yourself."
  },
  {
    id: "jin",
    name: "Jin",
    realName: "Kim Seokjin (김석진)",
    role: "Sub Vocalist, Visual",
    birthDate: "December 4, 1992",
    zodiac: "Sagittarius",
    height: "179 cm",
    bio: "Jin is the eldest member of BTS, affectionately dubbed 'Worldwide Handsome'. Blessed with a crystalline tenor vocal range that anchors BTS's emotional ballads ('Epiphany', 'The Astronaut'), his humor, warmth, and dedication bring immense positivity to the group.",
    achievements: [
      "Torchbearer for the 2024 Paris Summer Olympics Torch Relay",
      "Solo single 'The Astronaut' co-written with Coldplay reached #1 on iTunes in 100+ countries",
      "First BTS member to complete mandatory Korean military service with distinction"
    ],
    image: "/images/bts/member_jin.jpg",
    color: "from-pink-500 to-rose-900",
    quote: "Your presence can give happiness. I hope you remember that."
  },
  {
    id: "suga",
    name: "SUGA",
    realName: "Min Yoongi (민윤기)",
    role: "Lead Rapper",
    birthDate: "March 9, 1993",
    zodiac: "Pisces",
    height: "174 cm",
    bio: "SUGA (also known by his solo alter-ego Agust D) is a prolific producer, rapper, and songwriter. Renowned for raw, honest lyrics confronting mental health, societal pressures, and ambition, his music resonates deeply with millions worldwide.",
    achievements: [
      "Full member of the Korea Music Copyright Association (KOMCA)",
      "Agust D 'D-DAY' World Arena Tour grossed over $57 Million across North America and Asia",
      "Produced hits for global artists including IU ('Eight'), Psy ('That That'), and Halsey"
    ],
    image: "/images/bts/member_suga.jpg",
    color: "from-emerald-600 to-teal-950",
    quote: "Life is tough, and things don't always work out well, but we should be brave and go on with our lives."
  },
  {
    id: "jhope",
    name: "j-hope",
    realName: "Jung Hoseok (정호석)",
    role: "Main Dancer, Lead Rapper, Sub Vocalist",
    birthDate: "February 18, 1994",
    zodiac: "Aquarius",
    height: "177 cm",
    bio: "j-hope is BTS's main dance captain and sunshine element. A former underground street dancer (Neuron), his razor-sharp dance precision, vibrant energy, and distinct melodic rap style embody the beat and heart of BTS performances.",
    achievements: [
      "First South Korean artist to headline a major US festival (Lollapalooza 2022 Main Stage)",
      "Solo album 'Jack In The Box' debuted in top 20 of Billboard 200",
      "Donated over 1 Billion KRW to child welfare and educational funds"
    ],
    image: "/images/bts/member_jhope.jpg",
    color: "from-amber-500 to-red-900",
    quote: "If you don't work hard, there won't be good results. I'm your hope, you're my hope, I'm j-hope."
  },
  {
    id: "jimin",
    name: "Jimin",
    realName: "Park Jimin (박지민)",
    role: "Main Dancer, Lead Vocalist",
    birthDate: "October 13, 1995",
    zodiac: "Libra",
    height: "174 cm",
    bio: "Jimin is celebrated for his ethereal vocal tone and contemporary dance mastery. Trained at Busan High School of Arts, his graceful body lines, expressive performance charisma, and emotive lead vocals create unforgettable stage moments.",
    achievements: [
      "First Korean solo artist to reach #1 on Billboard Hot 100 with 'Like Crazy' (2023)",
      "Second solo album 'MUSE' (2024) hit #2 on Billboard 200",
      "Awarded Cultural Merit Order alongside BTS from the President of South Korea"
    ],
    image: "/images/bts/member_jimin.jpg",
    color: "from-purple-500 to-violet-900",
    quote: "Remember there is a person here in Korea, in Seoul, who understands you."
  },
  {
    id: "v",
    name: "V",
    realName: "Kim Taehyung (김태형)",
    role: "Sub Vocalist, Visual",
    birthDate: "December 30, 1995",
    zodiac: "Capricorn",
    height: "179 cm",
    bio: "V is famous for his soulful, rich baritone vocals, captivating artistic eye, and unique fashion aesthetic. Coinage author of the iconic ARMY phrase 'I Purple You (보라해)', his solo music fuses jazz, R&B, and neo-soul warmth.",
    achievements: [
      "Coined the global phenomenon phrase 'I Purple You (Borahae)'",
      "Solo debut album 'Layover' (2023) sold over 2 million copies in its first week",
      "OST 'Sweet Night' reached #1 on iTunes in 119 countries worldwide"
    ],
    image: "/images/bts/member_v.jpg",
    color: "from-fuchsia-600 to-purple-950",
    quote: "Purple is the last color of the rainbow. Purple means I will trust and love you for a long time."
  },
  {
    id: "jungkook",
    name: "Jung Kook",
    realName: "Jeon Jungkook (전정국)",
    role: "Main Vocalist, Lead Dancer, Sub Rapper, Center, Golden Maknae",
    birthDate: "September 1, 1997",
    zodiac: "Virgo",
    height: "179 cm",
    bio: "Jung Kook is BTS's multi-talented 'Golden Maknae'. Excelling effortlessly in vocals, dance, rap, video production (G.C.F), and sports, his explosive pop stardom and clear powerhouse vocals anchor BTS's global stadium anthems.",
    achievements: [
      "Performed official FIFA World Cup 2022 anthem 'Dreamers' live at the Opening Ceremony in Qatar",
      "Solo debut single 'Seven (feat. Latto)' debuted at #1 on Billboard Hot 100 & Spotify Global #1 for 70+ days",
      "First K-pop soloist to exceed 1 Billion streams on Spotify in record time"
    ],
    image: "/images/bts/member_jungkook.jpg",
    color: "from-red-600 to-purple-950",
    quote: "Effort makes you. You will regret someday if you don't do your best now."
  }
];

export const ALBUMS_DATA = [
  {
    id: "proof",
    title: "Proof",
    year: "2022",
    releaseDate: "June 10, 2022",
    type: "Anthology Album",
    cover: "/images/bts/album_proof.svg",
    tracks: ["Yet To Come", "Run BTS", "For Youth", "Born Singer", "DNA", "Fake Love", "Spring Day", "Boy With Luv", "Dynamite", "Butter"],
    description: "A 3-CD anthology album reflecting on BTS's 9-year musical journey while looking ahead to the future."
  },
  {
    id: "be",
    title: "BE",
    year: "2020",
    releaseDate: "November 20, 2020",
    type: "Studio Album",
    cover: "/images/bts/album_be.svg",
    tracks: ["Life Goes On", "Fly To My Room", "Blue & Grey", "Skit", "Telepathy", "Dis-ease", "Stay", "Dynamite"],
    description: "A deeply self-produced album conceived during the pandemic, delivering heartfelt messages of healing and connection."
  },
  {
    id: "mots7",
    title: "Map of the Soul: 7",
    year: "2020",
    releaseDate: "February 21, 2020",
    type: "Studio Album",
    cover: "/images/bts/album_mots7.svg",
    tracks: ["ON", "Black Swan", "Louder Than Bombs", "Zero O'Clock", "Friends", "Filter", "My Time", "Inner Child", "We are Bulletproof : the Eternal", "Interlude : Shadow", "Outro : Ego"],
    description: "BTS's monumental 7th anniversary album exploring ego, shadow, persona, and acceptance of light and dark."
  },
  {
    id: "persona",
    title: "Map of the Soul: Persona",
    year: "2019",
    releaseDate: "April 12, 2019",
    type: "EP Album",
    cover: "/images/bts/album_persona.svg",
    tracks: ["Intro : Persona", "Boy With Luv (feat. Halsey)", "Make It Right", "Jamais Vu", "Dionysus", "Mikrokosmos", "HOME"],
    description: "An album dedicated to understanding the self and expressing gratitude toward ARMY."
  },
  {
    id: "ly_answer",
    title: "Love Yourself 結 'Answer'",
    year: "2018",
    releaseDate: "August 24, 2018",
    type: "Repackage Album",
    cover: "/images/bts/album_ly_answer.svg",
    tracks: ["IDOL", "Euphoria", "Trivia 轉 : Seesaw", "Trivia 起 : Just Dance", "Trivia 承 : Love", "Epiphany", "I'm Fine", "Answer : Love Myself"],
    description: "The grand finale of the Love Yourself series, delivering the ultimate message: 'Loving yourself is the true answer'."
  },
  {
    id: "ly_tear",
    title: "Love Yourself 轉 'Tear'",
    year: "2018",
    releaseDate: "May 18, 2018",
    type: "Studio Album",
    cover: "/images/bts/album_ly_tear.svg",
    tracks: ["Fake Love", "Singularity", "The Truth Untold", "134340", "Paradise", "Love Maze", "Magic Shop", "Airplane pt.2", "Anpanman", "Outro : Tear"],
    description: "The dark, emotional turning point of the series dealing with heartbreak, fear, and loss of identity."
  },
  {
    id: "wings",
    title: "WINGS / You Never Walk Alone",
    year: "2016",
    releaseDate: "October 10, 2016",
    type: "Studio Album",
    cover: "/images/bts/album_wings.svg",
    tracks: ["Blood Sweat & Tears", "Spring Day", "Not Today", "Lie", "Stigma", "First Love", "Awake", "Reflection", "Lost", "Am I Wrong", "2! 3!"],
    description: "The breakthrough dark concept album based on Hermann Hesse's Demian, exploring temptation and adulthood."
  },
  {
    id: "hyyh_young_forever",
    title: "The Most Beautiful Moment in Life: Young Forever",
    year: "2016",
    releaseDate: "May 2, 2016",
    type: "Special Album",
    cover: "/images/bts/album_hyyh.svg",
    tracks: ["FIRE", "Save ME", "EPILOGUE : Young Forever", "I NEED U", "RUN", "Butterfly", "DOPE", "Converse High"],
    description: "The epic compilation encapsulating youth, vulnerability, anxiety, and blooming passion."
  }
];

export const TIMELINE_EVENTS = [
  {
    year: "2013",
    date: "June 13, 2013",
    title: "Official Debut with 'No More Dream'",
    description: "BTS debuted under Big Hit Entertainment with single album '2 COOL 4 SKOOL', defining their hip-hop identity and youth social message.",
    image: "/images/bts/moment_whitehouse.jpg",
    type: "Debut"
  },
  {
    year: "2013",
    date: "July 9, 2013",
    title: "Fandom Name 'ARMY' Announced",
    description: "The official fandom name 'A.R.M.Y' (Adorable Representative M.C for Youth) was established, laying the foundation for a global bond.",
    type: "Fandom"
  },
  {
    year: "2015",
    date: "May 5, 2015",
    title: "First Music Show Win ('I NEED U')",
    description: "BTS achieved their historic first music program win on SBS MTV's The Show with 'I NEED U', initiating the legendary HYYH era.",
    type: "Milestone"
  },
  {
    year: "2017",
    date: "May 21, 2017",
    title: "First Billboard Music Award (Top Social Artist)",
    description: "BTS became the first K-pop group to win a Billboard Music Award, breaking a 6-year streak and taking international media by storm.",
    type: "Global"
  },
  {
    year: "2018",
    date: "May 27, 2018",
    title: "First #1 on Billboard 200 ('Love Yourself: Tear')",
    description: "BTS made history as the first Korean act to top the Billboard 200 albums chart with 'Love Yourself 轉 Tear'.",
    type: "Global"
  },
  {
    year: "2018",
    date: "September 24, 2018",
    title: "Historic UN General Assembly Speech",
    description: "BTS delivered their inspiring 'Speak Yourself' address at the 73rd UN General Assembly in New York for UNICEF's Generation Unlimited.",
    type: "Impact"
  },
  {
    year: "2019",
    date: "June 1, 2019",
    title: "Sold Out Wembley Stadium (London)",
    description: "BTS became the first South Korean headliner to sell out London's 90,000-capacity Wembley Stadium for two consecutive nights.",
    type: "Concert"
  },
  {
    year: "2020",
    date: "August 31, 2020",
    title: "First #1 on Billboard Hot 100 ('Dynamite')",
    description: "'Dynamite' debuted at #1 on the Billboard Hot 100 singles chart, marking the first time a Korean artist achieved the top spot in US history.",
    type: "Record"
  },
  {
    year: "2021",
    date: "November 21, 2021",
    title: "Artist of the Year at American Music Awards",
    description: "BTS won the premier 'Artist of the Year' honor at the AMAs, along with Favorite Pop Duo/Group and Favorite Pop Song.",
    type: "Award"
  },
  {
    year: "2022",
    date: "May 31, 2022",
    title: "White House Visit with President Joe Biden",
    description: "BTS visited the White House in Washington D.C. to address anti-Asian hate crimes, inclusion, and Asian diversity representation.",
    type: "Global"
  },
  {
    year: "2022",
    date: "October 15, 2022",
    title: "Yet To Come in BUSAN Concert",
    description: "A free concert attended by 50,000 stadium fans and viewed by over 49 million online viewers worldwide to support Busan's World Expo bid.",
    type: "Concert"
  },
  {
    year: "2025-2026",
    date: "2025 - 2026",
    title: "The Grand BTS Reunion & World Tour Era",
    description: "Following the completion of all 7 members' military service obligations, BTS reunites to embark on a monumental new chapter.",
    type: "Future"
  }
];

export const ACHIEVEMENTS_DATA = [
  { metric: "5+", label: "Billboard Hot 100 #1 Hits", detail: "Dynamite, Savage Love, Life Goes On, Butter, Permission to Dance" },
  { metric: "6", label: "Billboard 200 #1 Albums", detail: "Love Yourself: Tear, Answer, Map of the Soul: Persona, 7, BE, Proof" },
  { metric: "5", label: "Grammy Nominations", detail: "Best Pop Duo/Group Performance & Album of the Year credits" },
  { metric: "70M+", label: "Global ARMY Network", detail: "Certified world's largest digital fan community" },
  { metric: "26", label: "Guinness World Records", detail: "Most streamed group on Spotify, most viewed YouTube premiere, etc." },
  { metric: "100+", label: "Daesang Grand Prizes", detail: "Most awarded artist in South Korean music history" }
];

export const FUN_FACTS = [
  {
    id: 1,
    fact: "RM learned English by watching the famous American sitcom 'Friends' repeatedly with his mother.",
    tag: "RM"
  },
  {
    id: 2,
    fact: "Jin was scouted on the street by Big Hit while getting off a bus on his way to Konkuk University, where he studied acting.",
    tag: "Jin"
  },
  {
    id: 3,
    fact: "SUGA wrote the music and lyrics for 'Tomorrow' while recovering in the hospital after an emergency appendectomy.",
    tag: "SUGA"
  },
  {
    id: 4,
    fact: "j-hope was a renowned underground street dancer in Gwangju under the name 'Smile Hoya' before joining Big Hit.",
    tag: "j-hope"
  },
  {
    id: 5,
    fact: "Jimin trained for only 6 months as a trainee before debuting with BTS—the shortest training period among all members.",
    tag: "Jimin"
  },
  {
    id: 6,
    fact: "V was not initially revealed as a member until BTS's debut teaser photos were published; he was Big Hit's secret weapon.",
    tag: "V"
  },
  {
    id: 7,
    fact: "Jung Kook received offers from 7 major Korean entertainment agencies after auditioning for Superstar K, but chose Big Hit after seeing RM rap.",
    tag: "Jung Kook"
  },
  {
    id: 8,
    fact: "The phrase 'I Purple You' (Borahae) was coined spontaneously by V at a fan meeting on November 13, 2016.",
    tag: "ARMY"
  },
  {
    id: 9,
    fact: "BTS stands for 'Bangtan Sonyeondan' in Korean, which translates to 'Bulletproof Boy Scouts', symbolizing resisting social pressure.",
    tag: "BTS"
  },
  {
    id: 10,
    fact: "In 2018, BTS became the youngest recipients ever of the prestigious Order of Cultural Merit awarded by the South Korean President.",
    tag: "History"
  }
];

export const BU_LORE_NODES = [
  {
    id: "seokjin",
    name: "Kim Seokjin (Time Traveler)",
    role: "The Time Looper seeking to save all 6 friends",
    symbol: "Lotus / Hourglass",
    details: "Trapped in a time loop starting April 11, trying repeatedly to prevent the tragic fates of his 6 younger friends.",
    connections: ["namjoon", "jungkook", "yoongi"]
  },
  {
    id: "namjoon",
    name: "Kim Namjoon (Gas Station)",
    role: "Poverty & Responsibility",
    symbol: "Container House / Petrol Station",
    details: "Working double shifts to support his family, struggling to maintain connection with his brothers.",
    connections: ["seokjin", "taehyung"]
  },
  {
    id: "yoongi",
    name: "Min Yoongi (Piano & Fire)",
    role: "Grief & Self-Destruction",
    symbol: "Brown Piano / Burning Room",
    details: "Haunted by trauma and the death of his mother, drawn to fire until saved by friendship.",
    connections: ["jimin", "jungkook"]
  },
  {
    id: "hoseok",
    name: "Jung Hoseok (Narcolepsy & Amusement Park)",
    role: "Abandonment & Masked Joy",
    symbol: "Snickers / Yellow Pills",
    details: "Abandoned at an amusement park by his mother, fighting medical syncope alongside Jimin in the hospital.",
    connections: ["jimin", "taehyung"]
  },
  {
    id: "jimin",
    name: "Park Jimin (Arboretum & Hospital)",
    role: "Trauma & Isolation",
    symbol: "Water / Locked Ward",
    details: "Traumatized by a childhood incident at the Grass Arboretum, confined in a psychiatric ward until rescued.",
    connections: ["hoseok", "yoongi"]
  },
  {
    id: "taehyung",
    name: "Kim Taehyung (Dreams & Graffiti)",
    role: "Family Pain & Visionary Dreams",
    symbol: "Graffiti / Pier Jump",
    details: "Suffering under domestic abuse, possessing premonitive dreams about Seokjin's time loop.",
    connections: ["namjoon", "hoseok", "seokjin"]
  },
  {
    id: "jungkook",
    name: "Jeon Jungkook (Roof & Accident)",
    role: "Loss of Direction & Sacrifice",
    symbol: "Feather / Rooftop Edge",
    details: "Searching for meaning through his brothers, suffering a tragic car accident in multiple timelines.",
    connections: ["seokjin", "yoongi"]
  }
];

export const GALLERY_IMAGES = [
  { id: 1, title: "Jimmy Fallon Grand Central Performance", category: "GROUP", url: "/images/bts/group_hero.jpg", caption: "BTS performing 'ON' at Grand Central Terminal in New York City." },
  { id: 2, title: "BTS White Suit Stage Performance", category: "GROUP", url: "/images/bts/group_stage.jpg", caption: "BTS's explosive live performance in synchronized white suits." },
  { id: 3, title: "Official 7-Member Group Portrait", category: "GROUP", url: "/images/bts/group_portrait.jpg", caption: "RM, Jin, SUGA, j-hope, Jimin, V, and Jung Kook." },
  { id: 4, title: "RM - Kim Namjoon Portrait", category: "MEMBERS", url: "/images/bts/member_rm.jpg", caption: "BTS Leader RM." },
  { id: 5, title: "Jin - Kim Seokjin Portrait", category: "MEMBERS", url: "/images/bts/member_jin.jpg", caption: "BTS Eldest Member Jin." },
  { id: 6, title: "SUGA - Min Yoongi Portrait", category: "MEMBERS", url: "/images/bts/member_suga.jpg", caption: "BTS Rapper & Producer SUGA." },
  { id: 7, title: "j-hope - Jung Hoseok Portrait", category: "MEMBERS", url: "/images/bts/member_jhope.jpg", caption: "BTS Main Dancer j-hope." },
  { id: 8, title: "Jimin - Park Jimin Portrait", category: "MEMBERS", url: "/images/bts/member_jimin.jpg", caption: "BTS Lead Vocalist Jimin." },
  { id: 9, title: "V - Kim Taehyung Portrait", category: "MEMBERS", url: "/images/bts/member_v.jpg", caption: "BTS Vocalist V." },
  { id: 10, title: "Jung Kook - Jeon Jungkook Portrait", category: "MEMBERS", url: "/images/bts/member_jungkook.jpg", caption: "BTS Golden Maknae Jung Kook." },
  { id: 11, title: "White House Visit (2022)", category: "MOMENTS", url: "/images/bts/group_hero.jpg", caption: "BTS addressing Asian inclusion and youth empowerment at the White House." },
  { id: 12, title: "UN General Assembly Speech (2018)", category: "MOMENTS", url: "/images/bts/group_stage.jpg", caption: "RM delivering the historic 'Speak Yourself' address at the UN." }
];

