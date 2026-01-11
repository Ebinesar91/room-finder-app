-- ====================================================
-- STEP 1: Drop all existing policies first
-- Run this FIRST, then run Step 2
-- ====================================================

-- Drop RLS policies for rooms
DROP POLICY IF EXISTS "Rooms are viewable by everyone" ON rooms;
DROP POLICY IF EXISTS "Owners can insert own rooms" ON rooms;
DROP POLICY IF EXISTS "Owners can update own rooms" ON rooms;
DROP POLICY IF EXISTS "Owners can delete own rooms" ON rooms;

-- Drop RLS policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Drop RLS policies for bookmarks
DROP POLICY IF EXISTS "Users can view own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can create own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON bookmarks;

-- Success! Now run step-2-create-tables.sql
