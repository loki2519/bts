import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

const CHAPTERS = [
  {
    title: "Chapter One — Before the World Knew BTS",
    subtitle: "What is your dream?",
    content: `Before stadiums, international awards, number-one records and millions of fans, there was simply a group of young people trying to make music.

BTS emerged from a relatively small Korean entertainment company at a time when the global music industry was dominated by much larger names. Their earliest identity was strongly connected to hip-hop. Their debut release, 2 COOL 4 SKOOL, introduced BTS with the song “No More Dream.” Rather than presenting themselves as perfect idols living an untouchable fantasy, their early music spoke directly about the frustrations of young people.

The question behind their debut was simple:
What is your dream?

That question became important because BTS did not begin by telling the world that everything was beautiful. They talked about pressure, expectations, school, competition, uncertainty and the feeling of being pushed toward a life chosen by somebody else.

Their first releases continued this approach. O!RUL8,2?, for example, questioned a society in which young people could become trapped by academic and social expectations, asking them to find their own happiness and life before it was too late.

This became one of the foundations of BTS's identity.
They were young artists talking about the problems of being young.

And importantly, members were involved in creating their music. BIGHIT MUSIC's description of their debut notes that the members participated in writing and composing across the release, reflecting their belief that hip-hop could be a way of telling their own stories.

The seven members were also very different.
RM emerged as a leader and rapper with a strong interest in writing and language.
Jin, the oldest member, brought a different personality and eventually became known for balancing the group with humor, warmth and his vocal identity.
SUGA brought a deeply personal songwriting and production perspective, often expressing emotions through a more direct and introspective style.
j-hope became associated with dance, performance energy and an unmistakable sense of optimism.
Jimin brought a distinctive vocal color and performance style.
V developed an individual artistic identity characterized by his deep voice and unconventional charisma.
And Jung Kook, the youngest, grew from a young trainee into a versatile performer capable of singing, dancing and performing across increasingly demanding stages.

They were not identical pieces of a machine.
That difference eventually became one of their greatest strengths.`
  },
  {
    title: "Chapter Two — Finding Their Voice",
    subtitle: "The Most Beautiful Moment in Life",
    content: `BTS's early years were not an overnight success story.

They gradually developed their audience and identity through successive releases. The School Trilogy explored the experiences of teenagers and young people, dealing with dreams, love, happiness, pressure and uncertainty.

Then came a major shift.
In 2015, BTS began the The Most Beautiful Moment in Life era.

The music started looking beyond the immediate frustrations of adolescence and toward something more complicated: youth itself.

BIGHIT MUSIC described The Most Beautiful Moment in Life pt.1 as a work about young adulthood, where beauty exists alongside uncertainty. It also marked an important development in the members' creative participation, with vocal members joining the songwriting and production credits alongside the rappers.

The follow-up, The Most Beautiful Moment in Life pt.2, pushed further into the uncertainty of growing up.

The message was not:
Life will always be easy.

It was closer to:
You may fall. You may get hurt. Keep moving anyway.

That emotional honesty became increasingly important.
Songs such as “I Need U,” “Run,” “Dope,” and later “Spring Day” connected BTS's music to feelings that were not restricted to Korea.

You did not have to live the same life as BTS to understand loneliness.
You did not have to speak Korean to understand longing.
You did not have to know their entire story to understand the feeling of wanting someone to stay.

This was one of the reasons their international audience continued to grow.`
  },
  {
    title: "Chapter Three — Wings",
    subtitle: "You Never Walk Alone",
    content: `In 2016, BTS released WINGS, an album that represented another significant transformation.

The group had moved further away from the image of simply being young hip-hop performers.
They were becoming storytellers.

WINGS explored temptation, identity, fear, growth and the complicated process of becoming an adult. It also gave individual members opportunities to express themselves through solo tracks.

The group was becoming larger musically while remaining deeply personal.

Then came You Never Walk Alone, which extended the WINGS story.
Its message was especially meaningful: even when life becomes painful, people do not necessarily have to face it alone. BIGHIT MUSIC described the release as a message of comfort and hope for young people who were suffering.

And then came one of BTS's most emotionally powerful songs:
“Spring Day.”

The song became much more than a pop song for many listeners. Its themes of distance, waiting, memory and the hope of meeting again gave it a lasting emotional significance.

The title itself became symbolic.
Winter does not last forever.
Eventually, spring comes.`
  },
  {
    title: "Chapter Four — Love Yourself",
    subtitle: "Her • Tear • Answer",
    content: `BTS's next major chapter was the LOVE YOURSELF series.

This era expanded the group's storytelling into a larger narrative about relationships, identity and self-acceptance.

It began with: LOVE YOURSELF 承 'Her'
continued through: LOVE YOURSELF 轉 'Tear'
and reached its conclusion with: LOVE YOURSELF 結 'Answer'.

The official description of LOVE YOURSELF 結 'Answer' explains that the series ultimately carried the message that genuine love begins with loving oneself.

The music changed too.
BTS was becoming increasingly comfortable moving between hip-hop, pop, R&B, electronic music and other sounds.

“DNA” brought a bright, energetic sound.
“Fake Love” became darker and more dramatic.
“IDOL” embraced confidence and cultural identity.

The group was no longer simply trying to prove that it deserved attention.
It had begun to understand what it wanted to say with that attention.

And outside Korea, something extraordinary was happening.
The audience was becoming enormous.

ARMY was no longer simply a Korean fanbase.
People across Asia, Europe, North America, South America, Africa, the Middle East and elsewhere were finding themselves in BTS's music.`
  },
  {
    title: "Chapter Five — From Korea to the World",
    subtitle: "Dynamite & Life Goes On",
    content: `The international breakthrough accelerated dramatically.

BTS began appearing at major American award shows and performing on increasingly prominent international stages.
Their success was not restricted to one chart or one country.

BIGHIT MUSIC notes that BTS achieved major milestones across Billboard, the UK's Official Charts, Japan's Oricon and streaming platforms, while also receiving major international awards and recognition.

Then came “Dynamite.”
Released in 2020, the English-language single became a major global event.
It was bright, colorful and deliberately uplifting.

But its timing mattered.
The world was dealing with the COVID-19 pandemic.
People were isolated.
Concerts had disappeared.
Normal life had been disrupted.

And BTS released a song designed to bring energy and happiness into an extraordinarily difficult period.
The song became BTS's first Billboard Hot 100 No. 1 and helped establish an even larger global audience.

The following album BE continued that emotional response to the pandemic.
Its lead song, “Life Goes On,” carried a message that was almost painfully simple:
Life continues.

The official album materials presented BE as a project deeply connected to the circumstances of the time, with members participating in the album's creative direction.

BTS had gone from asking young people about their dreams in 2013 to telling the world, during a global crisis, that even when everything changes, life keeps moving.`
  },
  {
    title: "Chapter Six — The Map of the Soul",
    subtitle: "Persona & Map of the Soul: 7",
    content: `Another important chapter was the MAP OF THE SOUL series.

MAP OF THE SOUL : PERSONA explored the outward-facing self—the identity people show to the world.
The album's concept dealt with questions surrounding love, identity and the relationship between the self and society.

Then came MAP OF THE SOUL : 7.
The number was significant.
Seven members.
Seven years since debut.
And a reflection on everything they had experienced together.

BIGHIT MUSIC described the album as a story of BTS confronting both the self they wanted to show and the darker parts of themselves they might prefer to hide.

That idea was important to BTS's overall story.
Their success did not erase their struggles.
Their achievements did not mean they suddenly became people without fear.

Instead, the message became:
The difficult parts are also part of who you are.
You don't have to erase your past to become stronger.
You can accept it.`
  },
  {
    title: "Chapter Seven — Seven Became More Than a Number",
    subtitle: "Seven Voices Becoming One",
    content: `By this point, the number seven had become deeply connected with BTS.

Seven members.
Seven different personalities.
Seven different histories.
Seven people who could have followed completely different paths.

Yet they became one group.

This became especially visible in their performances.
Each member had an individual identity, but the seven together created something that none could reproduce alone.

The rap line and vocal line had different strengths.
The dancers had different styles.
The personalities were different.
The voices were different.

And that difference was not something BTS needed to eliminate.
It was something they learned to use.

This is perhaps one of the most compelling parts of their story.
BTS did not become powerful because the seven members became identical.
They became powerful because they learned how to function as seven different people moving toward one direction.`
  },
  {
    title: "Chapter Eight — Speaking Beyond Music",
    subtitle: "LOVE MYSELF & UNICEF",
    content: `BTS's influence eventually moved beyond songs and concerts.

The group became involved in the LOVE MYSELF campaign with UNICEF and used its platform to speak about young people, self-worth and hope. BIGHIT MUSIC also highlights their United Nations appearances and other global public engagements as part of their broader social influence.

Their message became larger than:
Listen to our music.

It became:
Find your voice.
Believe in yourself.
Don't let other people decide your entire future.
Love yourself.

That message resonated particularly strongly with younger audiences.
ARMY itself became an enormous global community.

And the relationship between BTS and ARMY became one of the defining elements of their story.
The group repeatedly acknowledged that its journey would not have been possible without its fans.

The relationship was not simply performer and audience.
It became a shared identity.

BTS gave music to ARMY.
ARMY gave BTS a reason to keep going.`
  },
  {
    title: "Chapter Nine — The Pandemic, Solo Paths and Military Service",
    subtitle: "Individual Artistic Directions",
    content: `After years of constant group activity, another chapter arrived.

The members began exploring individual artistic directions.
They released solo projects, worked on personal music and pursued individual interests.

This was not the end of BTS.
It was a period in which the seven members could develop as individual artists while still remaining connected to the group.

At the same time, South Korea's mandatory military service became part of the group's timeline.
In 2022, HYBE announced that the members would fulfill their military service according to individual plans, with Jin beginning the process first. The company said the members looked forward to reconvening as a group after their service commitments.

For ARMY, this created a strange period.
The group that had seemed almost constantly present suddenly became separated.

Concerts changed.
New group releases became less frequent.
Individual projects became more prominent.

But something interesting happened.
The connection did not disappear.
Instead, the waiting itself became part of the BTS story.`
  },
  {
    title: "Chapter Ten — Proof",
    subtitle: "Yet To Come",
    content: `In 2022, BTS released Proof, an anthology album.
It was more than another collection of songs.
It functioned as a reflection on the group's history.

BIGHIT MUSIC described Proof as the core of BTS's history. Its first disc presents a chronological overview of major BTS songs, while the other discs contain solo/sub-unit tracks, unreleased material, demos and a fan song.

The album included:
“Yet To Come (The Most Beautiful Moment)”

The title itself was a statement.
After everything they had already accomplished, BTS was saying that the story was not necessarily finished.
The best moments could still be ahead.

That idea became particularly meaningful as the members entered their individual military-service periods.`
  },
  {
    title: "Chapter Eleven — The Wait",
    subtitle: "Seven Separate Journeys, One BTS",
    content: `For ARMY, the following years became a period of waiting.

The seven members were not always physically together.
Yet BTS remained present through music, old performances, new solo releases, memories and the community built around them.

Each member continued developing individually.
Jimin released FACE in 2023, including “Like Crazy.”
Other members pursued their own musical projects and artistic directions.

The result was unusual.
Instead of one BTS story, ARMY began experiencing several individual stories at the same time.

RM.
Jin.
SUGA.
j-hope.
Jimin.
V.
Jung Kook.

Seven separate journeys.
But still one BTS.`
  },
  {
    title: "Chapter Twelve — Coming Back Together",
    subtitle: "The Reunion & ARIRANG",
    content: `And eventually, the waiting period began to close.

In 2026, BTS entered another major chapter.
BIGHIT MUSIC describes ARIRANG, the group's fifth studio album, as especially significant because it marked the group's first album together in approximately three years and nine months. The album contains 14 tracks and was created with deep involvement from all seven members.

The meaning of that comeback went beyond simply releasing another album.
For ARMY, it represented reunion.
The seven were together again.

The official description of ARIRANG specifically frames the album as a sincere expression of gratitude toward the fans who waited for the group.

And the story did not stop at the album.
BIGHIT MUSIC's current tour information lists the BTS WORLD TOUR 'ARIRANG', alongside the group's previous major tours, showing the group continuing into another large-scale live chapter.

HYBE also reported in April 2026 that BTS's comeback and ARIRANG were major drivers of its first-quarter results, while the company announced sold-out North American tour activity.

So the seven who once stood on small stages eventually returned to stages capable of holding enormous global audiences.`
  },
  {
    title: "Chapter Thirteen — What BTS Really Represents",
    subtitle: "The Story of Connection",
    content: `It is easy to describe BTS using numbers.
Seven members.
Years of music.
Albums.
Awards.
Charts.
Tours.
Records.
Millions of fans.

But numbers cannot completely explain why BTS became important to so many people.
The deeper story is about connection.

A teenager who felt pressured by school heard a song asking about their dream.
Someone struggling with loneliness found comfort in Spring Day.
Someone who hated themselves heard a message about learning to love themselves.
Someone who felt lost heard music telling them that uncertainty did not mean failure.
Someone living thousands of kilometers away from Korea discovered seven artists whose language they did not originally understand—and still understood the emotion.

That is the unusual power of music.
It can cross a border without asking for a passport.
It can cross a language barrier without needing translation.
It can connect two people who have never met.

And BTS built their career around that connection.

The Seven
At the heart of everything is still the same seven: RM, Jin, SUGA, j-hope, Jimin, V, Jung Kook.
Seven individuals. One team.

And Then There Was ARMY
BTS's story cannot be told without ARMY.
The name became more than a fandom label. It became a worldwide community.

The Beginning Was Seven.
Seven young people stood together in 2013 with a dream that was far smaller than the world they would eventually reach.

More than a decade later, that small beginning has grown into one of the most globally recognized stories in modern popular music.

Seven people found each other.
They made music.
People listened.
Those people found one another.
And together, they became ARMY.

You never walk alone. 💜`
  }
];

const POEM_STANZAS = [
  "Seven voices rose beneath one sky,\nSeven dreams that refused to die.\nFrom little stages, from days unknown,\nThey built a world they could call their own.",
  "RM gave words to the things we hide,\nA steady voice that walked beside.\nJin brought laughter, warmth, and light,\nA reminder that joy can make things right.",
  "SUGA turned his scars into a song,\nAnd showed the broken they still belong.\nj-hope danced where the shadows fell,\nTurning every dark into a brighter tale.",
  "Jimin moved like a heartbeat in flight,\nSoft as the dawn, powerful as light.\nV carried dreams in a voice so deep,\nThe kind of memories the heart will keep.",
  "And Jung Kook, the youngest of seven,\nGrew with the music beneath the same heaven.\nFrom a young boy chasing a distant dream,\nTo a voice heard far beyond every screen.",
  "They sang of youth, of fear and pain,\nOf losing yourself and finding again.\nThey taught us that falling isn't the end,\nThat strangers can become family and friends.",
  "And then came ARMY, millions strong,\nFinding their place inside every song.\nAcross every border, across every sea,\nSeven became a world for you and me.",
  "When the road grew long, when the nights felt cold,\nTheir music became something we could hold.\nThrough every goodbye, through every day,\nTheir words reminded us: keep finding your way.",
  "Seven stars, one constellation bright,\nSeven voices turning darkness to light.\nAnd wherever tomorrow may choose to lead,\nTheir story will live in every heart that believed.",
  "Because BTS is more than a name we know\nIt's the courage to rise, the strength to grow.\nAnd when the world feels too heavy to bear,\nThere will always be a song waiting there.",
  "Seven members. One story. One bond.\nAnd millions of hearts\nwalking along."
];

const BtsUniverseView = () => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const textBoxRef = useRef(null);

  const currentChapter = CHAPTERS[currentChapterIdx];

  // Auto-scroll both the inner text box and main page window to extreme top on chapter change
  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapterIdx]);

  const handleNext = () => {
    if (currentChapterIdx < CHAPTERS.length - 1) {
      setCurrentChapterIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto">
          <BookOpen className="w-3.5 h-3.5 text-pink-400" />
          <span>OFFICIAL BIOGRAPHY</span>
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-pink-300">
          BOOK OF BTS
        </h1>
        <p className="text-purple-200 text-sm max-w-xl mx-auto font-semibold italic">
          BTS — The Story of Seven Voices Becoming One
        </p>
      </div>

      {/* Styled Text Holder Box with Invisible Scrollbar */}
      <div className="rounded-3xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl shadow-purple-950/80 space-y-6">
        <div className="border-b border-purple-500/20 pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-extrabold text-pink-400 tracking-widest">
              CHAPTER {currentChapterIdx + 1} OF {CHAPTERS.length}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              {currentChapter.title}
            </h2>
          </div>
          <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
        </div>

        {/* Scrollable Context Box (Scrollbar Hidden via Inline CSS) */}
        <div
          ref={textBoxRef}
          className="max-h-[500px] overflow-y-auto pr-2 space-y-4 text-purple-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {currentChapter.content}
        </div>
      </div>

      {/* Chapter Navigation Controls Placed BELOW the Text Holder Box */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0f041a] border border-purple-500/30 shadow-xl">
        <button
          onClick={handlePrev}
          disabled={currentChapterIdx === 0}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 border ${
            currentChapterIdx === 0
              ? 'opacity-40 border-purple-900 text-purple-400 cursor-not-allowed'
              : 'bg-purple-900/60 border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-800'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREVIOUS CHAPTER</span>
        </button>

        {/* Page / Chapter Counter Indicator */}
        <div className="text-xs font-black text-pink-300 uppercase tracking-widest">
          PAGE {currentChapterIdx + 1} / {CHAPTERS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentChapterIdx === CHAPTERS.length - 1}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 border ${
            currentChapterIdx === CHAPTERS.length - 1
              ? 'opacity-40 border-purple-900 text-purple-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white shadow-lg'
          }`}
        >
          <span>NEXT CHAPTER</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dedicated Poem Section ("Seven Stars") Centered Below Book of BTS */}
      <div className="rounded-3xl bg-gradient-to-b from-[#140524]/95 via-[#1a0830]/90 to-[#140524]/95 border border-purple-500/40 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl text-center space-y-8 animate-fade-in shadow-purple-950/90 border-t-2 border-t-pink-500/60">
        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-pink-300 text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>ARMY POEM</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-200 to-purple-300 tracking-wider">
            Seven Stars
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2"></div>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          {POEM_STANZAS.map((stanza, idx) => (
            <div key={idx} className="text-purple-100/90 text-sm sm:text-base leading-relaxed italic font-serif space-y-1">
              {stanza.split('\n').map((line, lineIdx) => (
                <p key={lineIdx}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-purple-500/20 text-xs font-bold text-purple-300 uppercase tracking-widest">
          💜 Seven Members • One Story • One Bond 💜
        </div>
      </div>
    </div>
  );
};

export default BtsUniverseView;
