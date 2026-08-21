import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Award, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizView = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = async (diffLevel) => {
    setDifficulty(diffLevel);
    setLoading(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setQuizFinished(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: diffLevel, category: 'BTS World Trivia' })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.questions) && data.questions.length >= 10) {
          setQuestions(data.questions.slice(0, 10));
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Quiz API fetch error:", e);
    }

    // Direct client-side fallback fallback if API route unavailable
    import('../data/quizData.js').then((module) => {
      const pool = module.EXPANDED_FALLBACK_POOL[diffLevel] || module.EXPANDED_FALLBACK_POOL.MEDIUM;
      // Shuffle pool questions
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
      // Randomize options position for each question
      const randomized = shuffled.map((q) => {
        const correctText = q.options[q.correctAnswer || 0];
        const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
        const newCorrectIdx = shuffledOpts.indexOf(correctText);
        return {
          ...q,
          options: shuffledOpts,
          correctAnswer: newCorrectIdx >= 0 ? newCorrectIdx : 0
        };
      });
      setQuestions(randomized);
      setLoading(false);
    });
  };

  const handleSelectOption = (optionIdx) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctAnswer;

    const newAnswers = [
      ...userAnswers,
      { question: currentQ.question, selected: optionIdx, correct: currentQ.correctAnswer, isCorrect }
    ];
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex + 1 < 10) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
        try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
      }
    }, 1200);
  };

  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const wrongCount = userAnswers.length - correctCount;
  const percentage = Math.round((correctCount / 10) * 100);

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          DYNAMIC DEDICATED BTS QUIZ
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
          BTS Ultimate Quiz
        </h1>
        <p className="text-purple-300/80 text-sm max-w-lg mx-auto">
          Every quiz session generates 10 fresh, randomized BTS questions.
        </p>
      </div>

      {/* Difficulty Selection Cards */}
      {!difficulty && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { level: "EASY", color: "from-emerald-600 to-teal-900", desc: "Perfect for learning member names & debut basics." },
            { level: "MEDIUM", color: "from-blue-600 to-indigo-900", desc: "For fans familiar with music show wins & UN speeches." },
            { level: "HARD", color: "from-purple-600 to-violet-950", desc: "Deep questions about stadium history & solo OSTs." },
            { level: "LEGENDARY ARMY", color: "from-pink-600 to-rose-950", desc: "For veteran ARMYs with deep lore knowledge of pre-debut days." }
          ].map((tier) => (
            <div
              key={tier.level}
              onClick={() => startQuiz(tier.level)}
              className="group rounded-3xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md p-6 cursor-pointer hover:-translate-y-1 transition-all shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tier.color} shadow-md`}>
                  {tier.level}
                </span>
                <h3 className="font-display font-bold text-xl text-purple-100 mt-2 group-hover:text-pink-300 transition-colors">
                  {tier.level} QUIZ
                </h3>
                <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-pink-400 pt-3 border-t border-purple-500/10">
                <span>10 Questions</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Start</span> <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {difficulty && loading && (
        <div className="text-center py-16 space-y-4">
          <Sparkles className="w-10 h-10 mx-auto text-purple-400 animate-spin" />
          <div className="text-sm font-bold text-purple-200 uppercase tracking-widest">Generating 10 Dynamic Questions...</div>
        </div>
      )}

      {/* Active Question Panel */}
      {difficulty && !loading && !quizFinished && questions.length > 0 && (
        <div className="rounded-3xl bg-purple-950/80 border border-purple-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-300">
              <span className="uppercase text-pink-400">{difficulty} QUIZ</span>
              <span>QUESTION {currentIndex + 1}/10</span>
            </div>
            <div className="w-full h-2 rounded-full bg-purple-950 border border-purple-500/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="font-display font-bold text-lg sm:text-xl text-purple-100 leading-snug">
            {questions[currentIndex].question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {questions[currentIndex].options.map((optionText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === questions[currentIndex].correctAnswer;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border flex items-center justify-between ${
                    selectedOption !== null
                      ? isCorrect
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-md'
                        : isSelected
                        ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-md'
                        : 'bg-purple-900/20 border-purple-500/10 text-purple-400 opacity-60'
                      : 'bg-purple-900/30 border-purple-500/20 text-purple-200 hover:bg-purple-800/40 hover:border-purple-400'
                  }`}
                >
                  <span>{optionText}</span>
                  {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200 animate-fade-in">
              <strong className="text-pink-300">EXPLANATION:</strong> {questions[currentIndex].explanation}
            </div>
          )}
        </div>
      )}

      {/* Quiz Final Results */}
      {quizFinished && (
        <div className="rounded-3xl bg-purple-950/90 border border-purple-500/30 backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center space-y-8 animate-fade-in">
          <Trophy className="w-16 h-16 mx-auto text-amber-400 animate-bounce" />
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-400">{difficulty} QUIZ RESULTS</span>
            <h2 className="font-display text-4xl font-extrabold text-purple-100">FINAL SCORE: {correctCount * 10} / 100</h2>
            <div className="text-2xl font-extrabold text-pink-300">{percentage}% ACCURACY</div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-100">10</div>
              <div className="text-[10px] text-purple-400 uppercase font-bold">TOTAL</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
              <div className="text-xl font-bold text-emerald-300">{correctCount}</div>
              <div className="text-[10px] text-emerald-400 uppercase font-bold">CORRECT</div>
            </div>
            <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30">
              <div className="text-xl font-bold text-rose-300">{wrongCount}</div>
              <div className="text-[10px] text-rose-400 uppercase font-bold">WRONG</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button onClick={() => startQuiz(difficulty)} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase shadow-lg flex items-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>RETRY WITH NEW QUESTIONS</span>
            </button>
            <button onClick={() => setDifficulty(null)} className="px-6 py-3.5 rounded-xl bg-purple-900/60 text-purple-200 font-bold text-xs uppercase">
              CHANGE DIFFICULTY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;
