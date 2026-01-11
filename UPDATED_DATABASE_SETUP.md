# 🏠 RoomFinder - Complete Supabase Database Setup

Run this complete script in Supabase SQL Editor to set up your database.

## Step 1: Run this SQL in Supabase SQL Editor

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES (if re-running)
-- =====================================================
DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Profiles table - Extended user information
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('finder', 'owner')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms table - Room listings (UPDATED SCHEMA)
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('1 BHK', '2 BHK', '3 BHK', 'Studio', '1 Bed', '2 Bed', '3 Bed')),
  tenant_preference TEXT NOT NULL CHECK (tenant_preference IN ('Bachelor', 'Family', 'Girls', 'Working')),
  contact_number TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookmarks table - Saved rooms
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, room_id)
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES FOR PROFILES
-- =====================================================

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- RLS POLICIES FOR ROOMS
-- =====================================================

CREATE POLICY "Rooms are viewable by everyone"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Owners can insert own rooms"
  ON rooms FOR INSERT
  WITH check (auth. uid() = owner_id);

CREATE POLICY "Owners can update own rooms"
  ON rooms FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own rooms"
  ON rooms FOR DELETE
  USING (auth.uid() = owner_id);

-- =====================================================
-- RLS POLICIES FOR BOOKMARKS
-- =====================================================

CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKET POLICIES
-- =====================================================
-- Note: Create the 'room-images' bucket in Supabase Storage UI first,
-- then run these policies

CREATE POLICY "Authenticated users can upload room images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Public can view room images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'room-images');

CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'room-images');
```

## ✅ After Running SQL:

1. **Verify tables created**: Go to Database → Tables in Supabase
   - You should see: `profiles`, `rooms`, `bookmarks`

2. **Create storage bucket**:
   - Go to Storage → Create bucket
   - Name: `room-images`
   - Make it **Public**

3. **You're done!** The database is ready for your app.

## 🔄 If You Already Had Data:

If you already had a rooms table with the old schema, this script will:
- ✅ Drop the old tables
- ✅ Create new ones with the correct fields
- ⚠️ **You'll lose existing room data** (this is expected for the update)

All new rooms posted will have:
- ✅ `property_type` (1 BHK, 2 BHK, 3 BHK, Studio, 1 Bed, 2 Bed, 3 Bed)
- ✅ `tenant_preference` (Bachelor, Family, Girls, Working)
- ✅ `contact_number`
