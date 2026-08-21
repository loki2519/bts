import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://iwnxfvhzblrapyodduhk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || '';

// Fallback in-memory / persistent mock store if Supabase key is pending setup
let memoryDB = [
  { id: "1", name: "Sarah (USA ARMY)", message: "Thank you BTS for teaching me how to love myself. Spring Day always brings tears of joy to my eyes!", favorite_member: "RM", status: "approved", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "2", name: "Minh (Vietnam ARMY)", message: "Borahae from Vietnam! Waiting patiently for your full 7-member grand reunion tour!", favorite_member: "Jimin", status: "approved", created_at: new Date(Date.now() - 43200000).toISOString() },
  { id: "3", name: "Elena (Spain ARMY)", message: "Your music got me through medical school. You are my forever hope!", favorite_member: "j-hope", status: "approved", created_at: new Date().toISOString() }
];

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-pin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
  const adminPin = req.headers['x-admin-pin'] || req.query.pin;
  const isAdmin = adminPin === '130613' || adminPin === 'bts';

  try {
    // 1. GET /api/messages (Public vs Admin)
    if (req.method === 'GET') {
      const mode = req.query.mode;

      if (mode === 'admin') {
        if (!isAdmin) {
          return res.status(401).json({ error: 'Unauthorized. Admin PIN required.' });
        }
        if (client) {
          const { data, error } = await client
            .from('fan_messages')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) return res.status(200).json(data);
        }
        return res.status(200).json(memoryDB);
      }

      // Public Approved Messages Only
      if (client) {
        const { data, error } = await client
          .from('fan_messages')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        if (!error && data) return res.status(200).json(data);
      }
      return res.status(200).json(memoryDB.filter(m => m.status === 'approved'));
    }

    // 2. POST /api/messages (Submit new fan message)
    if (req.method === 'POST') {
      const body = req.body || {};
      const rawName = body.name || '';
      const rawMessage = body.message || '';
      const rawFav = body.favorite_member || 'BTS Group';

      // Validation
      if (!rawName.trim() || !rawMessage.trim()) {
        return res.status(400).json({ error: 'Name and message are required.' });
      }

      if (rawName.length > 50 || rawMessage.length > 500) {
        return res.status(400).json({ error: 'Name must be <= 50 chars and message <= 500 chars.' });
      }

      const cleanName = sanitize(rawName);
      const cleanMessage = sanitize(rawMessage);
      const cleanFav = sanitize(rawFav);

      const newRecord = {
        name: cleanName,
        message: cleanMessage,
        favorite_member: cleanFav,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (client) {
        const { data, error } = await client
          .from('fan_messages')
          .insert([newRecord])
          .select();

        if (!error && data && data.length > 0) {
          return res.status(201).json(data[0]);
        }
      }

      // Fallback in-memory
      const localObj = { id: String(Date.now()), ...newRecord };
      memoryDB.unshift(localObj);
      return res.status(201).json(localObj);
    }

    // 3. PATCH /api/messages (Admin Update Status)
    if (req.method === 'PATCH') {
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }
      const { id, status } = req.body || req.query || {};
      if (!id || !status) {
        return res.status(400).json({ error: 'Missing id or status.' });
      }

      if (client) {
        const { data, error } = await client
          .from('fan_messages')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select();
        if (!error && data) return res.status(200).json(data[0]);
      }

      memoryDB = memoryDB.map(m => m.id === String(id) ? { ...m, status } : m);
      return res.status(200).json({ success: true, id, status });
    }

    // 4. DELETE /api/messages (Admin Delete)
    if (req.method === 'DELETE') {
      if (!isAdmin) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }
      const { id } = req.query || req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'Missing message id.' });
      }

      if (client) {
        const { error } = await client
          .from('fan_messages')
          .delete()
          .eq('id', id);
        if (!error) return res.status(200).json({ success: true, deletedId: id });
      }

      memoryDB = memoryDB.filter(m => m.id !== String(id));
      return res.status(200).json({ success: true, deletedId: id });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    console.error("Messages API Error:", e);
    return res.status(500).json({ error: 'Server error processing message' });
  }
}
