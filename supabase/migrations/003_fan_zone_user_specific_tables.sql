-- Migration 003: User-Specific Fan Zone Tables with Row Level Security (RLS)

-- 1. fan_profiles
CREATE TABLE IF NOT EXISTS public.fan_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  favorite_member TEXT,
  favorite_song TEXT,
  favorite_album TEXT,
  favorite_era TEXT,
  fan_since DATE DEFAULT CURRENT_DATE,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fan_profiles_user_id_key UNIQUE(user_id)
);

-- 2. fan_favorites
CREATE TABLE IF NOT EXISTS public.fan_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. fan_activity
CREATE TABLE IF NOT EXISTS public.fan_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  item_id TEXT,
  item_name TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. fan_zone_preferences
CREATE TABLE IF NOT EXISTS public.fan_zone_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark',
  favorite_member TEXT,
  favorite_content_type TEXT,
  show_activity BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fan_zone_preferences_user_id_key UNIQUE(user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.fan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_zone_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for fan_profiles
CREATE POLICY "Users can view own profile" ON public.fan_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.fan_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.fan_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for fan_favorites
CREATE POLICY "Users can view own favorites" ON public.fan_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.fan_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.fan_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for fan_activity
CREATE POLICY "Users can view own activity" ON public.fan_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON public.fan_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for fan_zone_preferences
CREATE POLICY "Users can view own preferences" ON public.fan_zone_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.fan_zone_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.fan_zone_preferences
  FOR UPDATE USING (auth.uid() = user_id);
