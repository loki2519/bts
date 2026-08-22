-- Keep a single canonical favorite record per user, type, and item.
-- Required by the Fan Zone upsert used by the application.
DO $$
BEGIN
  ALTER TABLE public.fan_favorites
    ADD CONSTRAINT fan_favorites_user_item_unique UNIQUE (user_id, item_type, item_id);
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- Refresh the Favorites screen when Fan Zone data changes in another session.
ALTER TABLE public.fan_profiles REPLICA IDENTITY FULL;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.fan_profiles;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;
