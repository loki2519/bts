import React, { useState } from 'react';
import { Mail, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import BtsImage from '../components/BtsImage';

const LoginView = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [memberName, setMemberName] = useState('');
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStep(2);
  };

  const handleMemberSubmit = (event) => {
    event.preventDefault();
    const selectedMember = memberName.trim();
    if (!selectedMember) {
      setErrorMsg('Please enter a BTS member name.');
      return;
    }

    localStorage.setItem('bts_user_account', JSON.stringify({
      id: email.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      favoriteMember: selectedMember,
      role: 'user'
    }));
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BtsImage src="/images/bts/group_portrait.jpg" alt="BTS Group Portrait" className="w-full h-full object-cover object-top sm:object-center opacity-40 filter brightness-90 contrast-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0410] via-black/75 to-[#0b0410]/85"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#140524]/90 border border-purple-500/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in shadow-purple-950/90">
        <div className="text-center space-y-3">
          {/* Increased BTS Logo Size with NO glow filter */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
            <img src="/images/bts/logo.svg" alt="BTS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">BTS WORLD</h1>
            <p className="text-xs text-purple-300/90 tracking-widest uppercase mt-1 font-bold">{step === 1 ? 'Fan Access' : 'Choose Your BTS Member'}</p>
          </div>
        </div>

        {errorMsg && <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-200 text-center font-medium">{errorMsg}</div>}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-purple-200 uppercase mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => { setEmail(event.target.value); setErrorMsg(''); }}
                placeholder="army@btsworld.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/40 text-purple-100 text-sm focus:outline-none focus:border-purple-400 font-medium"
              />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2">
              <span>ENTER THE BTS WORLD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleMemberSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Email accepted: <strong>{email}</strong></span>
            </div>
            <div>
              <label className="block text-xs font-bold text-purple-200 uppercase mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span>Enter Your Favorite BTS Member</span>
              </label>
              <input
                type="text"
                required
                value={memberName}
                onChange={(event) => { setMemberName(event.target.value); setErrorMsg(''); }}
                placeholder="RM, Jin, SUGA, j-hope, Jimin, V, or Jung Kook"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0f041a] border border-purple-500/40 text-center font-bold text-purple-100 text-sm uppercase focus:outline-none focus:border-purple-400"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2">
              <span>ENTER THE BTS WORLD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginView;
