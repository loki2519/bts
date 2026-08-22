-- BTS WORLD: paste this entire script into Supabase Dashboard > SQL Editor > New query.
-- It is safe to run once on a new project. Run it before testing Fan Zone or Favorites.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.fan_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'ARMY Fan',
  favorite_member TEXT,
  favorite_song TEXT,
  favorite_album TEXT,
  favorite_era TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.fan_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('member', 'song', 'album', 'era')),
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fan_favorites_user_item_unique UNIQUE (user_id, item_type, item_id)
);

CREATE TABLE IF NOT EXISTS public.fan_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  item_id TEXT,
  item_name TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.fan_zone_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'dark',
  favorite_content_type TEXT,
  show_activity BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.fan_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  favorite_member TEXT,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fan_activity_user_created ON public.fan_activity (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fan_messages_status_created ON public.fan_messages (status, created_at DESC);

ALTER TABLE public.fan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_zone_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own fan profile" ON public.fan_profiles;
CREATE POLICY "Users manage own fan profile" ON public.fan_profiles FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own favorites" ON public.fan_favorites;
CREATE POLICY "Users manage own favorites" ON public.fan_favorites FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own activity" ON public.fan_activity;
CREATE POLICY "Users manage own activity" ON public.fan_activity FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own preferences" ON public.fan_zone_preferences;
CREATE POLICY "Users manage own preferences" ON public.fan_zone_preferences FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view approved messages" ON public.fan_messages;
CREATE POLICY "Public can view approved messages" ON public.fan_messages FOR SELECT
  USING (status = 'approved');

DROP POLICY IF EXISTS "Signed-in users can submit messages" ON public.fan_messages;
CREATE POLICY "Signed-in users can submit messages" ON public.fan_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.fan_profiles REPLICA IDENTITY FULL;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.fan_profiles;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
