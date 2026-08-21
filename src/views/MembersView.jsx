import React, { useState } from 'react';
import { MEMBERS_DATA } from '../data/btsData';
import BtsImage from '../components/BtsImage';
import { Sparkles, Award, Star, X, Calendar, User } from 'lucide-react';

const MembersView = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="space-y-10 py-6">
      {/* Section Title */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          THE 7 MEMBERS OF BTS
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300">
          BTS Members Profile
        </h1>
        <p className="text-purple-300/80 text-sm max-w-2xl mx-auto">
          Explore the distinct artistry, leadership, and verified achievements of all 7 BTS members.
        </p>
      </div>

      {/* Grid of 7 Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MEMBERS_DATA.map((member) => (
          <div
            key={member.id}
            className="group relative rounded-3xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
          >
            {/* Top Member Image Container - 3/4 Portrait Ratio */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-purple-950/80">
              <BtsImage
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
                fallbackTitle={member.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/20 to-transparent"></div>
              
              {/* Member Stage Name Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-400/30 text-xs font-bold text-purple-200">
                {member.name}
              </div>
            </div>

            {/* Member Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-purple-100 group-hover:text-pink-300 transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs text-purple-300/80 font-medium">{member.realName}</div>
                <div className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-purple-900/50 text-[11px] font-semibold text-purple-200 border border-purple-500/20">
                  {member.role}
                </div>
                <p className="text-xs text-purple-300/90 mt-3 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <button
                onClick={() => setSelectedMember(member)}
                className="w-full mt-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-400/30 text-purple-100 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-1.5 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600"
              >
                <span>Explore Profile</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Member Modal - Fixed Aspect Ratio & Face Framing */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-purple-950/95 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/90 text-white max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-purple-500/20 pb-6">
              <div className="relative aspect-[3/4] w-36 sm:w-44 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-purple-400/40 shadow-xl bg-purple-950">
                <BtsImage src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover object-top" fallbackTitle={selectedMember.name} />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="text-xs uppercase font-bold tracking-widest text-pink-400">BTS MEMBER PROFILE</div>
                <h2 className="font-display text-3xl font-extrabold text-purple-100">{selectedMember.name}</h2>
                <div className="text-sm text-purple-300 font-semibold">{selectedMember.realName}</div>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-xs text-purple-200">
                  {selectedMember.role}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-display text-base font-bold text-purple-200">Biography & Contribution</h4>
              <p className="text-xs sm:text-sm text-purple-300/90 leading-relaxed">{selectedMember.bio}</p>

              <div className="grid grid-cols-2 gap-3 text-xs bg-purple-900/30 p-3 rounded-xl border border-purple-500/20">
                <div><strong className="text-purple-200">Birth Date:</strong> {selectedMember.birthDate}</div>
                <div><strong className="text-purple-200">Zodiac:</strong> {selectedMember.zodiac}</div>
              </div>

              <h4 className="font-display text-base font-bold text-purple-200 flex items-center gap-2 pt-2">
                <Award className="w-4 h-4 text-pink-400" />
                <span>Selected Verified Achievements</span>
              </h4>
              <ul className="space-y-2 text-xs text-purple-300/90">
                {selectedMember.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2 bg-purple-900/20 p-2.5 rounded-lg border border-purple-500/10">
                    <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {selectedMember.quote && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-400/30 italic text-xs text-purple-100">
                  "{selectedMember.quote}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersView;
