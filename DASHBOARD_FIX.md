# ✅ Dashboard Loading Fixed + SQL Instructions

## Problem Fixed
The dashboard was stuck loading because analytics tables don't exist yet. I added error handling so it works even without those tables.

## ✅ Dashboard Works Now!
- Refresh your browser
- Dashboard should load properly
- You'll see your listings
- Stats will show 0 until you run the SQL

---

## 🔧 To Enable Full Analytics (Optional but Recommended)

### Run This SQL in Supabase:

1. **Go to**: https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/sql

2. **Click "New query"**

3. **Copy and paste this SQL**:

```sql
-- Add analytics columns (skip if already done)
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  finder_id UUID REFERENCES profiles(id),
  message TEXT,
  contact_info TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view their own inquiries" ON inquiries;
CREATE POLICY "Users can view their own inquiries"
ON inquiries FOR SELECT
USING (
  auth.uid() = finder_id OR 
  auth.uid() IN (SELECT owner_id FROM rooms WHERE id = room_id)
);

DROP POLICY IF EXISTS "Finders can create inquiries" ON inquiries;
CREATE POLICY "Finders can create inquiries"
ON inquiries FOR INSERT
WITH CHECK (auth.uid() = finder_id);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('room-images', 'room-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Anyone can view room images" ON storage.objects;
CREATE POLICY "Anyone can view room images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'room-images' );

DROP POLICY IF EXISTS "Authenticated users can upload room images" ON storage.objects;
CREATE POLICY "Authenticated users can upload room images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'room-images' );
```

4. **Click "RUN"**

5. **Refresh your app** - you'll see real analytics!

---

## ✅ What This Gives You:

- 📊 View counts on rooms
- 💬 Inquiry tracking
- 📈 Real statistics
- 📸 Image uploads working

---

**Your app works now WITHOUT running this SQL!** But running it gives you the full analytics experience.
