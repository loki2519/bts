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
import { Gamepad2, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
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
  { id: 9, name: "FIND THE BTS CARD", desc: "Find the requested member in 9 chances • No scrolling", bankName: "find-card" }
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

  // Find Card Specific State (Exactly 9 Chances)
  const [findCards, setFindCards] = useState([]);
  const [findTarget, setFindTarget] = useState(null);
  const [findFeedback, setFindFeedback] = useState('');
  const [findFlipped, setFindFlipped] = useState(null);
  const [findShuffling, setFindShuffling] = useState(false);
  const [findCurrentChance, setFindCurrentChance] = useState(1);
  const TOTAL_FIND_CHANCES = 9;

  const triggerConfetti = () => {
    try { confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
  };

  const select5RandomQuestions = (fullBank, bankName) => {
    const prevIds = gameHistoryCache[bankName] || [];
    const availablePool = fullBank.filter(q => !prevIds.includes(q.id));
    const poolToUse = availablePool.length >= 5 ? availablePool : fullBank;

    const selected5 = shuffleArray(poolToUse).slice(0, 5);
    gameHistoryCache[bankName] = selected5.map(q => q.id);

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

  const startFindRound = (targetChance = 1) => {
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
      setFindCurrentChance(1);
      startFindRound(1);
    } else if (gameConfig && gameConfig.bank) {
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

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
      triggerConfetti();
      setFindFeedback(`CORRECT! Found ${findTarget.name}! 💜`);
    } else {
      setFindFeedback(`NOT ${findTarget.name} (revealed ${card.name})`);
    }

    const nextChance = findCurrentChance + 1;

    window.setTimeout(() => {
      if (nextChance > TOTAL_FIND_CHANCES) {
        // Finished all 9 chances -> Show overall score
        setGameFinished(true);
        triggerConfetti();
      } else {
        setFindCurrentChance(nextChance);
        setFindShuffling(true);
        window.setTimeout(() => startFindRound(nextChance), 600);
      }
    }, 1100);
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
            setScore(8);
            setGameFinished(true);
            triggerConfetti();
          }
          return updated;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 900);
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
    <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 max-w-5xl mx-auto">
      <div className="text-center space-y-1.5">
        <span className="px-3 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-1">
          <Gamepad2 className="w-3.5 h-3.5 text-pink-400" />
          <span>INTERACTIVE ARCADE</span>
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
          BTS Playable Games
        </h1>
        <p className="text-purple-300/80 text-xs sm:text-sm max-w-xl mx-auto">
          Speed, memory, card challenge & trivia with 9-chance limit and instant score calculation.
        </p>
      </div>

      {!gameStarted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {GAMES_LIST.map((game) => (
            <div
              key={game.id}
              className="group rounded-2xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-xl"
            >
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-4 h-4 text-pink-400" />
                </div>
                <h3 className="font-display font-bold text-sm text-purple-100 group-hover:text-pink-300 transition-colors">
                  {game.name}
                </h3>
                <p className="text-xs text-purple-300/80 line-clamp-2">{game.desc}</p>
              </div>

              <button
                onClick={() => startGame(game.id)}
                className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-purple-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                START GAME
              </button>
            </div>
          ))}
        </div>
      )}

      {gameStarted && (
        <div className="rounded-3xl bg-[#140524]/95 border border-purple-500/40 backdrop-blur-xl p-4 sm:p-6 shadow-2xl space-y-4 max-w-2xl mx-auto">
          {/* HEADER CONTROLS */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-pink-300">
                {GAMES_LIST.find((g) => g.id === activeGameId)?.name}
              </span>
              <div className="text-xs text-purple-300 font-semibold">
                {activeGameId === 9 ? (
                  <span>CHANCE: <strong className="text-pink-400 text-sm">{findCurrentChance} / {TOTAL_FIND_CHANCES}</strong> • SCORE: <strong className="text-emerald-400">{score}</strong></span>
                ) : activeGameId === 3 ? (
                  <span>MATCHED: <strong className="text-pink-400 text-sm">{matchedPairs.length} / 8</strong></span>
                ) : (
                  <span>SCORE: <strong className="text-pink-400 text-sm">{score} / {roundQuestions.length}</strong></span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={resetCurrentGame} className="px-2.5 py-1 rounded-lg bg-purple-900/60 text-purple-200 text-xs font-semibold flex items-center gap-1 hover:bg-purple-800 transition-all">
                <RotateCcw className="w-3 h-3" /> RESTART
              </button>
              <button onClick={() => setGameStarted(false)} className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:text-white transition-all">
                EXIT
              </button>
            </div>
          </div>

          {/* OVERALL SCORE SCREEN (WHEN 9 CHANCES OR ROUND ENDS) */}
          {gameFinished ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <Trophy className="w-12 h-12 mx-auto text-amber-400 animate-bounce" />
              <h2 className="font-display text-2xl sm:text-3xl font-black text-purple-100 uppercase">
                {activeGameId === 9 ? "9 CHANCES COMPLETED!" : "GAME OVERALL SCORE!"}
              </h2>
              
              <div className="space-y-2 p-5 rounded-2xl bg-purple-900/40 border border-purple-500/40 max-w-xs mx-auto shadow-xl">
                <div className="text-3xl font-black text-pink-300">
                  {score} / {activeGameId === 9 ? TOTAL_FIND_CHANCES : activeGameId === 3 ? 8 : 5}
                </div>
                <div className="text-xs font-black text-purple-200 uppercase tracking-wider">
                  ACCURACY: {Math.round((score / (activeGameId === 9 ? TOTAL_FIND_CHANCES : activeGameId === 3 ? 8 : 5)) * 100)}%
                </div>
                <div className="text-xs text-purple-300 pt-2 border-t border-purple-500/20 flex justify-around">
                  <span className="text-emerald-400 font-bold">Correct: {score}</span>
                  <span className="text-rose-400 font-bold">Wrong: {(activeGameId === 9 ? TOTAL_FIND_CHANCES : activeGameId === 3 ? 8 : 5) - score}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button onClick={resetCurrentGame} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase shadow-lg hover:scale-105 active:scale-95 transition-all">
                  PLAY AGAIN (9 CHANCES)
                </button>
                <button onClick={() => setGameStarted(false)} className="px-5 py-2.5 rounded-xl bg-purple-900/60 text-purple-200 font-bold text-xs uppercase hover:bg-purple-800 transition-all">
                  EXIT TO ARCADE
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* GAME 9: FIND THE BTS CARD (FIT TO SCREEN, NO SCROLLING, CLEAR FACES, 9 CHANCES) */}
              {activeGameId === 9 && findTarget && (
                <div className="space-y-3 text-center">
                  {/* PROMPT TARGET */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/60 to-purple-950/80 border border-purple-400/40">
                    <div className="text-[10px] font-black tracking-widest text-pink-400 uppercase">
                      CHANCE {findCurrentChance} OF {TOTAL_FIND_CHANCES} • FIND:
                    </div>
                    <div className="font-display text-xl sm:text-2xl font-black text-purple-100 mt-0.5">
                      {findTarget.name}
                    </div>
                  </div>

                  {/* 3x3 COMPACT CARD GRID (FITS COMPLETELY ON SCREEN WITHOUT SCROLLING) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto">
                    {findCards.map((card, index) => {
                      const isFlipped = findFlipped === card.name;
                      return (
                        <div
                          key={`${card.name}-${index}`}
                          className={`aspect-square ${findShuffling ? 'find-card-shuffling' : ''}`}
                          style={{
                            '--shuffle-delay': `${index * 50}ms`,
                            '--shuffle-x': `${(index % 3 - 1) * 30}px`,
                            '--shuffle-y': `${(Math.floor(index / 3) - 1) * 20}px`
                          }}
                        >
                          <button
                            onClick={() => handleFindCard(card)}
                            disabled={Boolean(findFeedback)}
                            className="w-full h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg"
                            aria-label={`Choose ${card.name} card`}
                            style={{ perspective: '900px' }}
                          >
                            <span className="relative block w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                              {/* CARD BACK */}
                              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-950 via-indigo-950 to-fuchsia-950 border border-purple-500/50 shadow-md flex flex-col items-center justify-center p-1" style={{ backfaceVisibility: 'hidden' }}>
                                <img src="/images/bts/logo.svg" alt="BTS card back" className="w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-90 filter drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
                                <span className="text-[9px] font-black text-purple-300 mt-0.5">BTS</span>
                              </span>

                              {/* CARD FRONT (FACE ALIGNED PERFECTLY) */}
                              <span className="absolute inset-0 rounded-2xl overflow-hidden bg-purple-950 border-2 border-pink-400 shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                {card.text ? (
                                  <span className="w-full h-full flex items-center justify-center p-2 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 font-display text-xs sm:text-sm font-black text-white leading-tight text-center">
                                    I 💜 BTS
                                  </span>
                                ) : (
                                  <div className="w-full h-full relative">
                                    <BtsImage
                                      src={card.image}
                                      alt={card.name}
                                      className={`w-full h-full object-cover ${card.name === 'BTS Group' ? 'object-center' : 'object-[50%_15%]'}`}
                                      fallbackTitle={card.name}
                                    />
                                    <div className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] text-center text-purple-100 py-0.5 font-black truncate px-1">
                                      {card.name}
                                    </div>
                                  </div>
                                )}
                              </span>
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {findFeedback && (
                    <div className="text-xs sm:text-sm font-black text-pink-300 animate-pulse py-1">
                      {findFeedback}
                    </div>
                  )}
                </div>
              )}

              {/* GAME 3: MEMORY CARD GAME (COMPACT, NO SCROLLING, CLEAR FACES) */}
              {activeGameId === 3 && (
                <div className="space-y-3">
                  <div className="text-xs text-purple-300 flex justify-between font-bold">
                    <span>MOVES: <strong className="text-pink-300">{moves}</strong></span>
                    <span>MATCHED: <strong className="text-emerald-400">{matchedPairs.length} / 8</strong></span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-md mx-auto">
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
                            className={`w-full h-full relative rounded-xl transition-transform duration-500 shadow-md border ${
                              isFlipped ? 'border-pink-400' : 'border-purple-500/30'
                            }`}
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 flex flex-col items-center justify-center p-1 border border-purple-500/30"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-900/80 p-0.5 flex items-center justify-center border border-purple-400/30">
                                <img src="/images/bts/logo.svg" alt="BTS" className="w-full h-full object-contain" />
                              </div>
                              <span className="font-display text-[8px] sm:text-[9px] text-purple-300 font-bold mt-0.5">BTS</span>
                            </div>

                            <div
                              className="absolute inset-0 rounded-xl overflow-hidden bg-purple-950 border border-purple-400"
                              style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)'
                              }}
                            >
                              <BtsImage
                                src={card.image}
                                alt={card.name}
                                className={`w-full h-full object-cover ${card.name === 'BTS Group' ? 'object-center' : 'object-[50%_15%]'}`}
                                fallbackTitle={card.name}
                              />
                              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] sm:text-[9px] text-center text-purple-100 py-0.5 font-bold tracking-wider truncate px-0.5">
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

              {/* MCQ GAMES (1, 2, 4, 6) */}
              {[1, 2, 4, 6].includes(activeGameId) && roundQuestions[currentIndex] && (
                <div className="space-y-4">
                  <div className="text-xs text-purple-400 font-black tracking-wider uppercase">
                    QUESTION {currentIndex + 1} OF {roundQuestions.length}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-purple-100">
                    {roundQuestions[currentIndex].question}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {roundQuestions[currentIndex].options.map((option, optIdx) => {
                      let btnStyle = "bg-purple-950/60 border-purple-500/30 text-purple-200 hover:bg-purple-900/60";
                      if (isAnswered) {
                        if (optIdx === roundQuestions[currentIndex].correctIdx) {
                          btnStyle = "bg-emerald-950 border-emerald-400 text-emerald-200 font-bold";
                        } else if (optIdx === selectedOption) {
                          btnStyle = "bg-rose-950 border-rose-400 text-rose-200";
                        } else {
                          btnStyle = "bg-purple-950/30 border-purple-500/10 text-purple-400 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleMCQAnswer(optIdx, roundQuestions[currentIndex].correctIdx, roundQuestions.length)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswered && optIdx === roundQuestions[currentIndex].correctIdx && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {isAnswered && optIdx === selectedOption && optIdx !== roundQuestions[currentIndex].correctIdx && <XCircle className="w-4 h-4 text-rose-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <button
                      onClick={() => handleNextQuestion(roundQuestions.length)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                    >
                      {currentIndex + 1 < roundQuestions.length ? "NEXT QUESTION →" : "VIEW OVERALL SCORE"}
                    </button>
                  )}
                </div>
              )}

              {/* GAME 8: WORD SCRAMBLE */}
              {activeGameId === 8 && roundQuestions[currentIndex] && (
                <div className="space-y-4 text-center">
                  <div className="text-xs text-purple-400 font-black uppercase">
                    WORD {currentIndex + 1} OF {roundQuestions.length}
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30">
                    <div className="text-2xl sm:text-3xl font-black text-pink-300 tracking-widest font-mono">
                      {roundQuestions[currentIndex].scrambled}
                    </div>
                    <div className="text-xs text-purple-300 mt-1 italic">Hint: {roundQuestions[currentIndex].hint}</div>
                  </div>

                  <form onSubmit={handleScrambleSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={scrambleInput}
                      onChange={(e) => setScrambleInput(e.target.value)}
                      placeholder="Type unscrambled BTS word..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f041a] border border-purple-500/50 text-white font-bold text-sm text-center uppercase tracking-widest focus:outline-none focus:border-pink-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase"
                    >
                      SUBMIT WORD
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GamesView;
