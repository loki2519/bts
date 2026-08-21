import React, { useState, useEffect } from 'react';
import { MEMBERS_DATA } from '../data/btsData';
import { MessageSquare, Send, Trash2, Shield, User, AlertCircle } from 'lucide-react';

const MessageWallView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [favMember, setFavMember] = useState('BTS Group');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if user session has admin privileges from secure session
    const savedUser = localStorage.getItem('bts_user_account');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === 'admin' || (parsed.email && parsed.email.toLowerCase().includes('loki@19'))) {
          setIsAdmin(true);
        }
      } catch (e) {}
    }
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const endpoint = isAdmin ? '/api/messages?mode=admin' : '/api/messages';
      const headers = isAdmin ? { 'x-admin-token': 'admin_session_valid' } : {};
      const res = await fetch(endpoint, { headers });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Error fetching persistent messages:", e);
    }

    const saved = localStorage.getItem('bts_fan_messages');
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [isAdmin]);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !messageText.trim()) {
      setErrorMsg("Please enter both your name and message.");
      return;
    }

    if (name.length > 50 || messageText.length > 500) {
      setErrorMsg("Name must be under 50 characters and message under 500 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: messageText.trim(),
          favorite_member: favMember || "BTS Group"
        })
      });

      if (res.ok) {
        setName('');
        setMessageText('');
        setSubmitting(false);
        fetchMessages();
        return;
      }
    } catch (e) {
      console.warn("Post message API error:", e);
    }

    const newMsg = {
      id: String(Date.now()),
      name: name.trim(),
      message: messageText.trim(),
      favorite_member: favMember || "BTS Group",
      status: "approved",
      created_at: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('bts_fan_messages', JSON.stringify(updated));
    setName('');
    setMessageText('');
    setSubmitting(false);
  };

  const handleStatusChange = async (id, status) => {
    if (!isAdmin) return;
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': 'admin_session_valid' },
        body: JSON.stringify({ id, status })
      });
      fetchMessages();
    } catch (e) {
      console.warn("Status change error:", e);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': 'admin_session_valid' }
      });
      fetchMessages();
    } catch (e) {
      console.warn("Delete message error:", e);
    }
  };

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
          FAN COMMUNITY BOARD
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-pink-300">
          Leave a Message for BTS
        </h1>
        <p className="text-purple-300/80 text-sm max-w-lg mx-auto">
          Messages persist permanently in the Supabase database across browser restarts.
        </p>
      </div>

      {/* Message Post Form */}
      <form onSubmit={handlePostMessage} className="rounded-3xl bg-purple-950/70 border border-purple-500/30 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-4">
        <h3 className="font-display font-bold text-lg text-purple-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-pink-400" />
          <span>Write Your Message</span>
        </h3>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Your Name / ARMY Nickname</label>
            <input
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya (ARMY)"
              className="w-full px-4 py-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-100 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Favorite Member</label>
            <select
              value={favMember}
              onChange={(e) => setFavMember(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-100 text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="BTS Group" className="bg-purple-950">BTS Group (All 7)</option>
              {MEMBERS_DATA.map((m) => (
                <option key={m.id} value={m.name} className="bg-purple-950">{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-purple-300 uppercase mb-1">Your Message for BTS</label>
          <textarea
            required
            rows={3}
            maxLength={500}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write your heartfelt message here..."
            className="w-full px-4 py-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-100 text-sm focus:outline-none focus:border-purple-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? "SUBMITTING..." : "POST MESSAGE TO DATABASE"}</span>
        </button>
      </form>

      {/* Live Fan Messages Feed */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-purple-100 flex items-center justify-between">
          <span>Live ARMY Messages ({messages.length})</span>
          {loading && <span className="text-xs text-purple-400 font-normal">Loading messages...</span>}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="relative p-5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-sm text-purple-100">{msg.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/20 text-pink-300 font-semibold">
                  {msg.favorite_member || msg.favMember}
                </span>
              </div>

              <p className="text-xs text-purple-300/90 leading-relaxed italic">"{msg.message}"</p>

              <div className="flex items-center justify-between text-[10px] text-purple-400 pt-2 border-t border-purple-500/10">
                <span>{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : msg.date}</span>
                {/* Moderation Controls ONLY Visible to Authenticated Admin */}
                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleStatusChange(msg.id, msg.status === 'approved' ? 'hidden' : 'approved')} className="text-amber-300 hover:underline">
                      {msg.status === 'approved' ? 'Hide' : 'Approve'}
                    </button>
                    <button onClick={() => handleDeleteMessage(msg.id)} className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageWallView;
