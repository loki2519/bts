import React, { useState } from 'react';
import {
  GUESS_SONG_BANK,
  GUESS_MEMBER_BANK,
  EMOJI_BANK,
  GUESS_ERA_BANK
} from '../data/expandedQuestionBank';
import {
  COMPLETE_LYRIC_DATA,
  ALBUM_MATCHING_DATA,
  WORD_SCRAMBLE_DATA
} from '../data/gameData';
import { Gamepad2, Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import BtsImage from '../components/BtsImage';

const GAMES_LIST = [
  { id: 1, name: "GUESS THE SONG", desc: "100 Master Questions • 5 Questions Per Round", bank: GUESS_SONG_BANK, bankName: "guess-song" },
  { id: 2, name: "GUESS THE MEMBER", desc: "100 Master Questions • 5 Questions Per Round", bank: GUESS_MEMBER_BANK, bankName: "guess-member" },
  { id: 3, name: "MEMORY CARD GAME", desc: "Flip & match 16 BTS photo cards (7 members + BTS group)", bankName: "memory" },
  { id: 4, name: "BTS EMOJI CHALLENGE", desc: "100 Master Emoji Questions • 5 Questions Per Round", bank: EMOJI_BANK, bankName: "emoji" },
  { id: 5, name: "COMPLETE THE LYRIC", desc: "Fill in missing words from famous BTS anthems", bankName: "lyric" },
  { id: 6, name: "GUESS THE ERA", desc: "100 Master Questions • 5 Questions Per Round", bank: GUESS_ERA_BANK, bankName: "guess-era" },
  { id: 7, name: "ALBUM MATCHING", desc: "Match tracks to their correct album home", bankName: "album" },
  { id: 8, name: "BTS WORD SCRAMBLE", desc: "Unscramble mixed member names & BTS terms", bankName: "scramble" },
  { id: 9, name: "FIND THE BTS CARD", desc: "Find the requested card from 9 shuffled BTS circles", bankName: "find-card" }
];

const FIND_CARD_DECK = [
  { name: 'RM', image: '/images/bts/member_rm.jpg' },
  { name: 'Jin', image: '/images/bts/member_jin.jpg' },
  { name: 'SUGA', image: '/images/bts/member_suga.jpg' },
  { name: 'j-hope', image: '/images/bts/member_jhope.jpg' },
  { name: 'Jimin', image: '/images/bts/member_jimin.jpg' },
  { name: 'V', image: '/images/bts/member_v.jpg' },
  { name: 'Jung Kook', image: '/images/bts/member_jungkook.jpg' },
  { name: 'BTS Group', image: '/images/bts/group_hero.jpg' },
  { name: 'I LOVE BTS', text: true }
];

const MEMBER_DECK_SYMBOLS = [
  { name: "RM", image: "/images/bts/member_rm.jpg" },
  { name: "Jin", image: "/images/bts/member_jin.jpg" },
  { name: "SUGA", image: "/images/bts/member_suga.jpg" },
  { name: "j-hope", image: "/images/bts/member_jhope.jpg" },
  { name: "Jimin", image: "/images/bts/member_jimin.jpg" },
  { name: "V", image: "/images/bts/member_v.jpg" },
  { name: "Jung Kook", image: "/images/bts/member_jungkook.jpg" },
  { name: "BTS Group", image: "/images/bts/group_hero.jpg" }
];

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Stores previous round question IDs per game type to exclude them from the next round
const gameHistoryCache = {
  'guess-song': [],
  'guess-member': [],
  'emoji': [],
  'guess-era': []
};

const GamesView = () => {
  const [activeGameId, setActiveGameId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const [roundQuestions, setRoundQuestions] = useState([]);

  // Memory Card Specific State (16 Cards)
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  // Scramble Specific State
  const [scrambleInput, setScrambleInput] = useState('');
  const [findCards, setFindCards] = useState([]);
  const [findTarget, setFindTarget] = useState(null);
  const [findFeedback, setFindFeedback] = useState('');
  const [findFlipped, setFindFlipped] = useState(null);
  const [findShuffling, setFindShuffling] = useState(false);

  const triggerConfetti = () => {
    try { confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
  };

  const select5RandomQuestions = (fullBank, bankName) => {
    const prevIds = gameHistoryCache[bankName] || [];
    const availablePool = fullBank.filter(q => !prevIds.includes(q.id));
    const poolToUse = availablePool.length >= 5 ? availablePool : fullBank;

    // Fisher-Yates Shuffle on unasked pool
    const selected5 = shuffleArray(poolToUse).slice(0, 5);

    // Save selected question IDs to history cache (Previous round protection)
    gameHistoryCache[bankName] = selected5.map(q => q.id);

    // Independently shuffle option order (A, B, C, D unbiased) for each question
    return selected5.map(q => {
      const originalOptions = [...q.options];
      const correctText = q.correctAnswer;
      const shuffledOptions = shuffleArray(originalOptions);
      const newCorrectIdx = shuffledOptions.indexOf(correctText);

      return {
        ...q,
        options: shuffledOptions,
        correctIdx: newCorrectIdx >= 0 ? newCorrectIdx : 0
      };
    });
  };

  const startFindRound = () => {
    const target = FIND_CARD_DECK[Math.floor(Math.random() * FIND_CARD_DECK.length)];
    setFindTarget(target);
    setFindCards(shuffleArray(FIND_CARD_DECK));
    setFindFeedback('');
    setFindFlipped(null);
    setFindShuffling(false);
  };

  const startGame = (gameId) => {
    const gameConfig = GAMES_LIST.find(g => g.id === gameId);
    setActiveGameId(gameId);
    setGameStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setGameFinished(false);
    setScrambleInput('');

    if (gameId === 3) {
      // Memory Card Init (16 Cards)
      const deck = shuffleArray([...MEMBER_DECK_SYMBOLS, ...MEMBER_DECK_SYMBOLS])
        .map((item, idx) => ({ id: idx, ...item }));
      setCards(deck);
      setFlippedIndices([]);
      setMatchedPairs([]);
      setMoves(0);
    } else if (gameId === 9) {
      startFindRound();
    } else if (gameConfig && gameConfig.bank) {
      // 100-Question Master Bank Random 5 Selection
      const selected5 = select5RandomQuestions(gameConfig.bank, gameConfig.bankName);
      setRoundQuestions(selected5);
    } else {
      let pool = [];
      if (gameId === 5) pool = shuffleArray(COMPLETE_LYRIC_DATA);
      else if (gameId === 7) pool = shuffleArray(ALBUM_MATCHING_DATA);
      else if (gameId === 8) pool = shuffleArray(WORD_SCRAMBLE_DATA);

      const randomized = pool.slice(0, 5).map(item => {
        if (!item.options) return item;
        const correctText = item.options[item.correct !== undefined ? item.correct : 0];
        const shuffledOpts = shuffleArray(item.options);
        return {
          ...item,
          options: shuffledOpts,
          correctIdx: shuffledOpts.indexOf(correctText)
        };
      });

      setRoundQuestions(randomized);
    }
  };

  const handleFindCard = (card) => {
    if (!findTarget || findFeedback) return;
    const isCorrect = card.name === findTarget.name;
    setFindFlipped(card.name);
    setFindFeedback(isCorrect ? 'CORRECT! SHUFFLING A NEW ROUND…' : `NOT ${findTarget.name}. SHUFFLING A NEW ROUND…`);
    if (isCorrect) {
      setScore((value) => value + 1);
      triggerConfetti();
    }
    window.setTimeout(() => setFindShuffling(true), 500);
    window.setTimeout(startFindRound, 1250);
  };

  const resetCurrentGame = () => {
    if (activeGameId) startGame(activeGameId);
  };

  const handleMCQAnswer = (optionIdx, correctIdx, totalQuestions) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === correctIdx;
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = (totalQuestions) => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setGameFinished(true);
      triggerConfetti();
    }
  };

  // Memory Card Click
  const handleCardClick = (idx) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(idx) || matchedPairs.includes(cards[idx].name)) {
      return;
    }

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].name === cards[secondIdx].name) {
        setMatchedPairs((prev) => {
          const updated = [...prev, cards[firstIdx].name];
          if (updated.length === MEMBER_DECK_SYMBOLS.length) {
            setScore(5);
            setGameFinished(true);
            triggerConfetti();
          }
          return updated;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const handleScrambleSubmit = (e) => {
    e.preventDefault();
    if (!scrambleInput) return;
    const currentItem = roundQuestions[currentIndex] || WORD_SCRAMBLE_DATA[0];
    const isCorrect = scrambleInput.trim().toUpperCase() === currentItem.original.toUpperCase();

    if (isCorrect) setScore((s) => s + 1);

    if (currentIndex + 1 < roundQuestions.length) {
      setCurrentIndex((c) => c + 1);
      setScrambleInput('');
    } else {
      setGameFinished(true);
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          INTERACTIVE ARCADE
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
          BTS Playable Games
        </h1>
        <p className="text-purple-300/80 text-sm max-w-xl mx-auto">
          Test your BTS speed, memory, and trivia with 400 master questions & 5-question round randomization.
        </p>
      </div>

      {!gameStarted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES_LIST.map((game) => (
            <div
              key={game.id}
              className="group rounded-2xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md p-5 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-xl"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="font-display font-bold text-sm text-purple-100 group-hover:text-pink-300 transition-colors">
                  {game.name}
                </h3>
                <p className="text-xs text-purple-300/80 line-clamp-2">{game.desc}</p>
              </div>

              <button
                onClick={() => startGame(game.id)}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                START GAME
              </button>
            </div>
          ))}
        </div>
      )}

      {gameStarted && (
        <div className="rounded-3xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
                {GAMES_LIST.find((g) => g.id === activeGameId)?.name}
              </span>
              <div className="text-xs text-purple-300">
                SCORE: <span className="font-bold text-pink-400 text-sm">{activeGameId === 9 ? score : `${score} / ${activeGameId === 3 ? 5 : roundQuestions.length}`}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={resetCurrentGame} className="px-3 py-1.5 rounded-lg bg-purple-900/60 text-purple-200 text-xs font-semibold flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> RESTART
              </button>
              <button onClick={() => setGameStarted(false)} className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                EXIT
              </button>
            </div>
          </div>

          {gameFinished ? (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <Trophy className="w-16 h-16 mx-auto text-amber-400 animate-bounce" />
              <h2 className="font-display text-3xl font-extrabold text-purple-100">ROUND COMPLETED!</h2>
              
              <div className="space-y-2 p-6 rounded-2xl bg-purple-900/40 border border-purple-500/30 max-w-sm mx-auto">
                <div className="text-3xl font-black text-pink-300">{score} / 5</div>
                <div className="text-sm font-bold text-purple-200">{Math.round((score / 5) * 100)}% ACCURACY</div>
                <div className="text-xs text-purple-300 pt-2 border-t border-purple-500/20 flex justify-around">
                  <span className="text-emerald-400">Correct: <strong>{score}</strong></span>
                  <span className="text-rose-400">Wrong: <strong>{5 - score}</strong></span>
                </div>
              </div>

              <p className="text-xs text-purple-300 italic">Clicking Play Again will select 5 completely different questions!</p>
              
              <div className="flex justify-center gap-4">
                <button onClick={resetCurrentGame} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase shadow-lg">
                  PLAY AGAIN
                </button>
                <button onClick={() => setGameStarted(false)} className="px-6 py-3 rounded-xl bg-purple-900/60 text-purple-200 font-bold text-xs uppercase">
                  CHOOSE ANOTHER GAME
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* GAME 3: MEMORY CARD GAME */}
              {activeGameId === 3 && (
                <div className="space-y-4">
                  <div className="text-xs text-purple-300 flex justify-between">
                    <span>MOVES: <strong>{moves}</strong></span>
                    <span>MATCHED PAIRS: <strong>{matchedPairs.length} / {MEMBER_DECK_SYMBOLS.length}</strong></span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-3.5 max-w-xl mx-auto">
                    {cards.map((card, idx) => {
                      const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.name);

                      return (
                        <div
                          key={card.id}
                          onClick={() => handleCardClick(idx)}
                          className="aspect-[3/4] cursor-pointer"
                          style={{ perspective: '1000px' }}
                        >
                          <div
                            className={`w-full h-full relative rounded-2xl transition-transform duration-500 shadow-xl border ${
                              isFlipped ? 'border-purple-400' : 'border-purple-500/30'
                            }`}
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 flex flex-col items-center justify-center p-2 border border-purple-500/30"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="w-9 h-9 rounded-xl bg-purple-900/80 p-1 flex items-center justify-center border border-purple-400/30">
                                <img src="/images/bts/logo.svg" alt="BTS" className="w-full h-full" />
                              </div>
                              <span className="font-display text-[10px] text-purple-300 font-bold mt-1">BTS</span>
                            </div>

                            <div
                              className="absolute inset-0 rounded-2xl overflow-hidden bg-purple-950 border border-purple-400"
                              style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                              }}
                            >
                              <BtsImage src={card.image} alt={card.name} className="w-full h-full object-cover" fallbackTitle={card.name} />
                              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[10px] text-center text-purple-100 py-1 font-bold tracking-wider">
                                {card.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME 9: FIND THE BTS CARD */}
              {activeGameId === 9 && findTarget && (
                <div className="space-y-6 text-center">
                  <div className="p-5 rounded-2xl bg-purple-900/40 border border-purple-400/40 space-y-1">
                    <div className="text-[10px] font-black tracking-[0.2em] text-pink-400 uppercase">Find the card of</div>
                    <div className="font-display text-2xl sm:text-3xl font-black text-purple-100">{findTarget.name}</div>
                    <p className="text-xs text-purple-300">Every choice reshuffles all nine cards and starts a new random question.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-2xl mx-auto">
                    {findCards.map((card, index) => {
                      const isFlipped = findFlipped === card.name;
                      return (
                      <div
                        key={`${card.name}-${index}`}
                        className={`aspect-square ${findShuffling ? 'find-card-shuffling' : ''}`}
                        style={{ '--shuffle-delay': `${index * 70}ms`, '--shuffle-x': `${(index % 3 - 1) * 42}px`, '--shuffle-y': `${(Math.floor(index / 3) - 1) * 32}px` }}
                      >
                      <button
                        onClick={() => handleFindCard(card)}
                        disabled={Boolean(findFeedback)}
                        className="w-full h-full rounded-full focus:outline-none focus:ring-4 focus:ring-pink-400/40"
                        aria-label={`Choose ${card.name} card`}
                        style={{ perspective: '900px' }}
                      >
                        <span className="relative block w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-950 via-indigo-900 to-fuchsia-800 border-2 border-purple-500/60 shadow-xl shadow-purple-950/70 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                            <img src="/images/bts/logo.svg" alt="BTS card back" className="w-1/2 h-1/2 object-contain opacity-90" />
                          </span>
                          <span className="absolute inset-0 rounded-full overflow-hidden bg-purple-950 border-2 border-pink-400" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            {card.text ? (
                              <span className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 font-display text-sm sm:text-xl font-black text-white leading-tight">I<br />LOVE<br />BTS</span>
                            ) : (
                              <BtsImage src={card.image} alt={card.name} className={`w-full h-full object-cover ${card.name === 'BTS Group' ? 'object-center' : 'object-[50%_18%]'}`} fallbackTitle={card.name} />
                            )}
                          </span>
                        </span>
                      </button>
                      </div>
                    )})}
                  </div>
                  {findFeedback && <div className="text-sm font-black text-pink-300 animate-pulse">{findFeedback}</div>}
                </div>
              )}

              {/* GAME 1, 2, 4, 5, 6, 7: 5 QUESTIONS PER ROUND */}
              {activeGameId !== 3 && activeGameId !== 8 && activeGameId !== 9 && roundQuestions[currentIndex] && (
                <div className="space-y-6">
                  <div className="text-xs font-black text-purple-400 tracking-wider">
                    QUESTION {currentIndex + 1} / {roundQuestions.length}
                  </div>

                  {/* Explicit Emojis Banner for Emoji Challenge */}
                  {roundQuestions[currentIndex].emojis ? (
                    <div className="p-8 rounded-3xl bg-[#0f041a] border border-purple-500/40 text-center space-y-3 shadow-inner">
                      <div className="text-5xl sm:text-6xl tracking-widest filter drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]">
                        {roundQuestions[currentIndex].emojis}
                      </div>
                      <p className="text-sm sm:text-base font-bold text-purple-100">
                        {roundQuestions[currentIndex].question}
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-center font-display text-base sm:text-lg text-purple-100">
                      {roundQuestions[currentIndex].question || roundQuestions[currentIndex].hint || roundQuestions[currentIndex].clue || roundQuestions[currentIndex].lyricSnippet}
                    </div>
                  )}

                  {/* Shuffled Options A, B, C, D */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {roundQuestions[currentIndex].options?.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === roundQuestions[currentIndex].correctIdx;

                      let btnStyle = "bg-purple-900/40 border-purple-500/30 text-purple-200 hover:bg-purple-800/60 hover:text-white";
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/60";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-950 border-rose-500 text-rose-200 font-bold shadow-lg shadow-rose-950/60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleMCQAnswer(idx, roundQuestions[currentIndex].correctIdx, roundQuestions.length)}
                          className={`p-4 rounded-xl text-left text-sm font-bold transition-all border flex items-center justify-between ${btnStyle}`}
                        >
                          <div>
                            <span className="text-pink-400 font-black mr-2">{String.fromCharCode(65 + idx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Next Question Button */}
                  {isAnswered && (
                    <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-400/30 space-y-3 animate-fade-in">
                      <div className="text-xs text-purple-200 leading-relaxed font-medium">
                        <strong>Explanation:</strong> {roundQuestions[currentIndex].explanation || "Verified BTS Information."}
                      </div>
                      <button
                        onClick={() => handleNextQuestion(roundQuestions.length)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                      >
                        {currentIndex + 1 === roundQuestions.length ? "FINISH ROUND" : "NEXT QUESTION →"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* GAME 8: WORD SCRAMBLE */}
              {activeGameId === 8 && (
                <form onSubmit={handleScrambleSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="text-xs font-bold text-purple-400">WORD {currentIndex + 1} / {roundQuestions.length}</div>
                  <div className="p-6 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-center space-y-2">
                    <div className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">
                      HINT: {roundQuestions[currentIndex]?.hint}
                    </div>
                    <div className="font-mono text-3xl font-extrabold text-pink-300 tracking-widest">
                      {roundQuestions[currentIndex]?.scrambled?.split('').sort(() => Math.random() - 0.5).join(' ')}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={scrambleInput}
                    onChange={(e) => setScrambleInput(e.target.value)}
                    placeholder="ENTER UNSCRAMBLED WORD"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950 border border-purple-500/40 text-center font-bold text-white text-sm focus:outline-none focus:border-purple-400"
                    autoFocus
                  />

                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase">
                    SUBMIT WORD
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GamesView;
