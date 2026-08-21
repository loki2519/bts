-- BTS WORLD Supabase Initial Database Schema
-- Migration 001: fan_messages table and RLS policies

CREATE TABLE IF NOT EXISTS fan_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  favorite_member TEXT,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'hidden'))
);

-- Index for fast status querying
CREATE INDEX IF NOT EXISTS idx_fan_messages_status_created ON fan_messages (status, created_at DESC);

-- Enable Row Level Security
ALTER TABLE fan_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view approved messages" ON fan_messages;
DROP POLICY IF EXISTS "Public can submit fan messages" ON fan_messages;

-- Policy 1: Public can read approved messages
CREATE POLICY "Public can view approved messages"
  ON fan_messages
  FOR SELECT
  USING (status = 'approved');

-- Policy 2: Public can insert new messages (defaults to approved/pending)
CREATE POLICY "Public can submit fan messages"
  ON fan_messages
  FOR INSERT
  WITH CHECK (true);
