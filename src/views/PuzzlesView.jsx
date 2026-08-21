import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// BTS Verified Vocabulary Pool (Truncated/Filtered to <= 9 chars for 9x9 Grid)
const BTS_VOCABULARY_POOL_9X9 = [
  { word: "JUNGKOOK", clue: "Golden Maknae & Main Vocalist of BTS" },
  { word: "JIMIN", clue: "Lead Vocalist & Main Dancer" },
  { word: "TAEHYUNG", clue: "V's real birth name" },
  { word: "NAMJOON", clue: "RM's real birth name & Leader" },
  { word: "SEOKJIN", clue: "Jin's real birth name" },
  { word: "YOONGI", clue: "SUGA's real birth name" },
  { word: "HOSEOK", clue: "j-hope's real birth name" },
  { word: "BANGTAN", clue: "Bulletproof Boys" },
  { word: "AGUSTD", clue: "SUGA's solo rapper persona" },
  { word: "SPRINGDAY", clue: "Longest charting song on Melon" },
  { word: "FAKELOVE", clue: "LY: Tear lead single" },
  { word: "DYNAMITE", clue: "BTS's 1st Billboard Hot 100 #1" },
  { word: "BUTTER", clue: "10-week Billboard #1 hit" },
  { word: "MICDROP", clue: "Steve Aoki remix hip-hop hit" },
  { word: "BLACKSWAN", clue: "Emo-hip-hop masterpiece" },
  { word: "BOYWITHLUV", clue: "Funk-pop hit featuring Halsey" },
  { word: "MIKROKOSMOS", clue: "Uplifting stadium anthem" },
  { word: "PIEDPIPER", clue: "Disco-funk track for ARMY" },
  { word: "ANPANMAN", clue: "Sweet bread superhero song" },
  { word: "DIONYSUS", clue: "Greek god rock-hip-hop track" },
  { word: "LIFEGOESON", clue: "Comforting Hot 100 #1 ballad" },
  { word: "YETTOCOME", clue: "Proof anthology lead single" },
  { word: "SAVEME", clue: "Tropical house one-take video" },
  { word: "NOTTODAY", clue: "Rallying underdog anthem" },
  { word: "EUPHORIA", clue: "Jung Kook's solo theme" },
  { word: "SERENDIPITY", clue: "Jimin's solo intro track" },
  { word: "SINGULARITY", clue: "V's dark solo intro track" },
  { word: "EPIPHANY", clue: "Jin's self-love ballad" },
  { word: "ASTRONAUT", clue: "Jin's solo with Coldplay" },
  { word: "PURPLE", clue: "Color of love for BTS & ARMY" },
  { word: "BORAHAE", clue: "I Purple You coined by V" },
  { word: "FREEDOM", clue: "Core youth theme" },
  { word: "PERSONA", clue: "Outer social mask concept" },
  { word: "SHADOW", clue: "Hidden inner shadow concept" },
  { word: "IDENTITY", clue: "Core BTS journey concept" }
];

const DIRECTIONS = [
  { dr: 0, dc: 1 },
  { dr: 0, dc: -1 },
  { dr: 1, dc: 0 },
  { dr: -1, dc: 0 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: -1, dc: 1 },
  { dr: -1, dc: -1 }
];

const PuzzlesView = () => {
  const gridSize = 9; // FIXED EXACT 9x9 GRID PER USER INSTRUCTION
  const [grid, setGrid] = useState([]);
  const [targetWords, setTargetWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [animatingCells, setAnimatingCells] = useState([]);
  const [blankedCells, setBlankedCells] = useState(new Set());
  const [cellWordRefMap, setCellWordRefMap] = useState({});

  // Selection State
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [keyboardCursor, setKeyboardCursor] = useState({ r: 0, c: 0 });

  useEffect(() => {
    generateDynamicPuzzle();
  }, []);

  const generateDynamicPuzzle = () => {
    // 1. Pick 4-5 random words from 9-char pool
    const pool = BTS_VOCABULARY_POOL_9X9.filter(t => t.word.length <= 9);
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const chosenTargets = shuffledPool.slice(0, 5);

    let newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    let placementRefs = {};
    let placedTargets = [];

    // 2. Random Placement in 9x9 grid
    chosenTargets.forEach(targetObj => {
      const word = targetObj.word.toUpperCase();
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 120) {
        attempts++;
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const startR = Math.floor(Math.random() * gridSize);
        const startC = Math.floor(Math.random() * gridSize);

        const endR = startR + dir.dr * (word.length - 1);
        const endC = startC + dir.dc * (word.length - 1);

        if (endR >= 0 && endR < gridSize && endC >= 0 && endC < gridSize) {
          let fit = true;
          for (let i = 0; i < word.length; i++) {
            const r = startR + dir.dr * i;
            const c = startC + dir.dc * i;
            const existingLetter = newGrid[r][c];
            if (existingLetter !== '' && existingLetter !== word[i]) {
              fit = false;
              break;
            }
          }

          if (fit) {
            for (let i = 0; i < word.length; i++) {
              const r = startR + dir.dr * i;
              const c = startC + dir.dc * i;
              newGrid[r][c] = word[i];

              const key = `${r},${c}`;
              if (!placementRefs[key]) placementRefs[key] = [];
              placementRefs[key].push(word);
            }
            placedTargets.push(targetObj);
            placed = true;
          }
        }
      }
    });

    // 3. Dynamic Filler Letters for empty cells
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    setGrid(newGrid);
    setTargetWords(placedTargets);
    setFoundWords([]);
    setScore(0);
    setAnimatingCells([]);
    setBlankedCells(new Set());
    setCellWordRefMap(placementRefs);
    setSelectedPath([]);
    setIsSelecting(false);
  };

  const handleCellMouseDown = (r, c) => {
    setIsSelecting(true);
    setSelectedPath([{ r, c }]);
  };

  const handleCellMouseEnter = (r, c) => {
    if (!isSelecting || selectedPath.length === 0) return;
    const firstCell = selectedPath[0];

    const dr = r - firstCell.r;
    const dc = c - firstCell.c;

    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
      const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
      const distance = Math.max(Math.abs(dr), Math.abs(dc));

      const newPath = [];
      for (let i = 0; i <= distance; i++) {
        newPath.push({
          r: firstCell.r + stepR * i,
          c: firstCell.c + stepC * i
        });
      }
      setSelectedPath(newPath);
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    validateSelection(selectedPath);
  };

  const validateSelection = (path) => {
    if (!path || path.length === 0) return;

    const selectedWord = path.map(cell => grid[cell.r][cell.c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    const matchedTarget = targetWords.find(t => 
      (t.word === selectedWord || t.word === reversedWord) && !foundWords.includes(t.word)
    );

    if (matchedTarget) {
      const wordStr = matchedTarget.word;
      setFoundWords(prev => [...prev, wordStr]);
      setScore(s => s + 100);

      setAnimatingCells(path);

      setTimeout(() => {
        setAnimatingCells([]);
        setBlankedCells(prev => {
          const nextSet = new Set(prev);
          path.forEach(cell => {
            const key = `${cell.r},${cell.c}`;
            const refs = cellWordRefMap[key] || [];
            const remainingRefs = refs.filter(w => w !== wordStr && !foundWords.includes(w));
            if (remainingRefs.length === 0) {
              nextSet.add(key);
            }
          });
          return nextSet;
        });

        if (foundWords.length + 1 === targetWords.length) {
          try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
        }
      }, 600);
    }

    setSelectedPath([]);
  };

  const handleKeyDown = (e) => {
    let { r, c } = keyboardCursor;
    if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
    if (e.key === 'ArrowDown') r = Math.min(gridSize - 1, r + 1);
    if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
    if (e.key === 'ArrowRight') c = Math.min(gridSize - 1, c + 1);

    setKeyboardCursor({ r, c });

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!isSelecting) {
        setIsSelecting(true);
        setSelectedPath([{ r, c }]);
      } else {
        const path = [...selectedPath, { r, c }];
        setSelectedPath(path);
        validateSelection(path);
        setIsSelecting(false);
      }
    }
  };

  const isCellSelected = (r, c) => selectedPath.some(cell => cell.r === r && cell.c === c);
  const isCellAnimating = (r, c) => animatingCells.some(cell => cell.r === r && cell.c === c);
  const isCellBlanked = (r, c) => blankedCells.has(`${r},${c}`);

  return (
    <div className="space-y-6 py-4 max-w-lg mx-auto select-none px-2" onMouseUp={handleMouseUp} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>BTS DYNAMIC 9x9 WORD SEARCH</span>
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-pink-300">
          BTS 9x9 Word Search
        </h1>
      </div>

      <div className="rounded-3xl bg-[#140524]/90 border border-purple-500/40 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        {/* HEADER CONTROLS & SCORE */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-purple-300">
              PROGRESS: <span className="text-pink-300 font-extrabold text-xs">{foundWords.length} / {targetWords.length} FOUND</span>
            </div>
            <div className="text-[11px] text-purple-200">
              SCORE: <span className="text-emerald-400 font-black text-xs">{score} PTS</span>
            </div>
          </div>

          <button
            onClick={generateDynamicPuzzle}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> RESTART 9x9
          </button>
        </div>

        {/* CRYPTIC CATEGORY CLUES (HIDDEN TARGET WORDS) */}
        <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 space-y-1.5">
          <div className="text-[11px] font-black uppercase text-purple-300 tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            <span>CRYPTIC CLUES ({targetWords.length - foundWords.length} REMAINING)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
            {targetWords.map((t, idx) => {
              const isFound = foundWords.includes(t.word);

              return (
                <div key={idx} className={`p-2 rounded-lg border flex items-center justify-between ${
                  isFound ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 line-through' : 'bg-purple-900/40 border-purple-500/30 text-purple-200'
                }`}>
                  <span className="truncate pr-1 font-medium">{idx + 1}. {t.clue}</span>
                  {isFound ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> : <span className="text-[9px] text-purple-400 font-bold">???</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* EXACT 9x9 PERFECTLY SCALED GRID */}
        <div className="flex justify-center p-1 overflow-hidden">
          <div
            className="grid gap-1 sm:gap-1.5 p-2 sm:p-3 rounded-2xl bg-[#0b0314] border-2 border-purple-500/40 shadow-2xl max-w-full touch-none"
            style={{
              gridTemplateColumns: `repeat(9, minmax(0, 1fr))`
            }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const selected = isCellSelected(r, c);
                const animating = isCellAnimating(r, c);
                const blanked = isCellBlanked(r, c);
                const isCursor = keyboardCursor.r === r && keyboardCursor.c === c;

                let cellStyle = "bg-[#160729] text-purple-100 border-purple-500/20";
                if (blanked) {
                  cellStyle = "bg-[#0b0314]/40 text-purple-950 border-purple-950/20 opacity-20 pointer-events-none";
                } else if (animating) {
                  cellStyle = "bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black scale-110 shadow-lg border-pink-400 z-20 animate-pulse";
                } else if (selected) {
                  cellStyle = "bg-purple-600 text-white font-black border-purple-300 shadow-md z-10";
                } else if (isCursor) {
                  cellStyle = "bg-purple-900/80 border-purple-400 text-white ring-2 ring-pink-400";
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    onMouseDown={() => handleCellMouseDown(r, c)}
                    onMouseEnter={() => handleCellMouseEnter(r, c)}
                    onTouchStart={() => handleCellMouseDown(r, c)}
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-mono font-extrabold text-xs sm:text-sm border transition-all duration-200 ${cellStyle}`}
                  >
                    {blanked ? '' : letter}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* PUZZLE COMPLETE BANNER */}
        {foundWords.length === targetWords.length && targetWords.length > 0 && (
          <div className="text-center py-4 space-y-3 p-4 rounded-2xl bg-purple-900/50 border border-purple-400 animate-fade-in shadow-xl">
            <Trophy className="w-10 h-10 mx-auto text-amber-400 animate-bounce" />
            <h2 className="font-display text-xl font-black text-purple-100">9x9 PUZZLE CLEARED!</h2>
            <p className="text-xs text-purple-300">Score: {score} Points!</p>
            <button
              onClick={generateDynamicPuzzle}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase shadow-md cursor-pointer"
            >
              PLAY AGAIN (NEW 9x9)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzlesView;
