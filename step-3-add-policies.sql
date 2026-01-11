-- ====================================================
-- STEP 3: Add RLS policies
-- Run this LAST, after step 2
-- ====================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Rooms policies
CREATE POLICY "Rooms are viewable by everyone"
  ON rooms FOR SELECT USING (true);

CREATE POLICY "Owners can insert own rooms"
  ON rooms FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own rooms"
  ON rooms FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own rooms"
  ON rooms FOR DELETE USING (auth.uid() = owner_id);

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- ALL DONE! Database is ready!
