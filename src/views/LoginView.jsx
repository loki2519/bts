import React, { useState } from 'react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import BtsImage from '../components/BtsImage';

// Negative, sad, vulgar, offensive, toxic, or profane word list
const NEGATIVE_OR_VULGAR_WORDS = [
  'hate', 'bad', 'ugly', 'trash', 'fake', 'die', 'dead', 'death', 'kill', 'killer',
  'sad', 'sadness', 'depressed', 'depression', 'pain', 'painful', 'hopeless', 'terrible',
  'awful', 'evil', 'stupid', 'idiot', 'disgusting', 'loser', 'boring', 'annoying', 'curse',
  'devil', 'fuck', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'crap', 'piss',
  'dick', 'pussy', 'slut', 'whore', 'nigger', 'faggot', 'retard', 'scam', 'worst',
  'horrible', 'darkness', 'angry', 'anger', 'rage', 'gloom', 'sorrow', 'grief', 'despair',
  'suffer', 'suffering', 'misery', 'miserable', 'tears', 'failure', 'useless', 'fool',
  'trashy', 'nasty', 'gross', 'dumb', 'cry', 'crying', 'lonely', 'cruel', 'liar', 'cheat',
  'broken', 'hurt', 'destroy', 'mad', 'jealous', 'shame', 'guilt', 'toxic', 'poison'
];

// Common heartful and positive words
const POSITIVE_HEARTFUL_WORDS = [
  'borahae', 'love', 'purple', 'army', 'bts', 'forever', 'hope', 'peace', 'happiness',
  'happy', 'together', 'magic', 'eternal', 'youth', 'dream', 'dreams', 'passion',
  'healing', 'comfort', 'thank', 'thanks', 'thank you', 'proud', 'smile', 'shine',
  'best', 'sweet', 'beautiful', 'inspiration', 'light', 'life', 'music', 'soul',
  'family', 'friendship', 'support', 'respect', 'kindness', 'angel', 'miracle',
  'harmony', 'bulletproof', 'star', 'stars', 'good', 'great', 'awesome', 'amazing',
  'wonderful', 'precious', 'heart', 'heartful', 'spring', 'sunshine', 'glow', 'blessed',
  'joy', 'joyful', 'care', 'caring', 'loveliness', 'lovelier', 'pure', 'sweetness',
  'strength', 'brave', 'courage', 'warmth', 'empathy', 'grace', 'grateful', 'gratitude',
  'seven', 'rm', 'jin', 'suga', 'jhope', 'j-hope', 'jimin', 'v', 'taehyung', 'jungkook',
  'namjoon', 'seokjin', 'yoongi', 'hoseok'
];

function isHeartfulWordValid(input) {
  if (!input || typeof input !== 'string') return false;
  const clean = input.toLowerCase().trim();
  if (clean.length < 2) return false;

  // Split input into individual tokens/words
  const words = clean.split(/[\s,._\-!?:;'"(){}\[\]]+/);

  // If any word in the input matches the negative/vulgar list, reject immediately
  for (const w of words) {
    if (!w) continue;
    if (NEGATIVE_OR_VULGAR_WORDS.some(bad => w === bad || (w.length > 3 && w.includes(bad)))) {
      return false;
    }
  }

  // Check if any positive heartful word is present
  const hasPositiveKeyword = POSITIVE_HEARTFUL_WORDS.some(pos => clean.includes(pos));
  if (hasPositiveKeyword) return true;

  // If it doesn't have bad words and is at least 3 characters of genuine text, accept as heartfelt expression
  return clean.length >= 3 && /^[a-zA-Z\s\u0080-\uFFFF'💜✨]+$/.test(clean);
}

const LoginView = ({ onLoginSuccess }) => {
  const [heartfulWord, setHeartfulWord] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const trimmed = heartfulWord.trim();

    if (!isHeartfulWordValid(trimmed)) {
      setErrorMsg('Sorry, please enter heartful word to enter BTS World 💜');
      return;
    }

    localStorage.setItem('bts_user_account', JSON.stringify({
      id: trimmed.toLowerCase(),
      heartfulWord: trimmed,
      role: 'user'
    }));
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background group portrait */}
      <div className="absolute inset-0 z-0">
        <BtsImage
          src="/images/bts/group_portrait.jpg"
          alt="BTS Group Portrait"
          className="w-full h-full object-cover object-top sm:object-center opacity-30 filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-black/85 to-[#0b0410]/90"></div>
      </div>

      {/* Card container with clean, sharp styling */}
      <div className="relative z-10 w-full max-w-md bg-[#130424]/95 border border-purple-500/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in shadow-purple-950/90">
        
        {/* BIG BTS LOGO - Free of background lighting/halos */}
        <div className="text-center space-y-2">
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mx-auto flex items-center justify-center">
            <img
              src="/images/bts/logo.svg"
              alt="BTS Logo"
              className="w-full h-full object-contain filter-none"
            />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
              BTS WORLD
            </h1>
            <p className="text-xs text-purple-300/90 tracking-widest uppercase mt-1 font-bold">
              FAN ACCESS
            </p>
          </div>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-950/90 border border-rose-500/60 text-xs text-rose-200 text-center font-bold shadow-lg animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Form to enter heartfelt word */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-purple-200 uppercase mb-1.5 flex items-center gap-1.5 tracking-wider">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>HEARTFUL WORD ON BTS</span>
            </label>
            <input
              type="text"
              required
              value={heartfulWord}
              onChange={(event) => {
                setHeartfulWord(event.target.value);
                setErrorMsg('');
              }}
              placeholder="e.g. Borahae, Love, Hope, Army, Eternal..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/40 text-purple-100 text-sm focus:outline-none focus:border-pink-400 font-semibold placeholder:text-purple-400/50"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-600/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2"
          >
            <span>ENTER THE BTS WORLD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[10px] text-purple-400/60 font-medium">
          Independent fan-made website. Not affiliated with or endorsed by BTS or HYBE.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
