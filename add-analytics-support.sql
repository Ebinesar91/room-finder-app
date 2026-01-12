-- Add analytics support to rooms table
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Create inquiries table for tracking visitor inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  finder_id UUID REFERENCES profiles(id),
  message TEXT,
  contact_info TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for inquiries
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inquiries
CREATE POLICY "Users can view their own inquiries"
ON inquiries FOR SELECT
USING (
  auth.uid() = finder_id OR 
  auth.uid() IN (SELECT owner_id FROM rooms WHERE id = room_id)
);

CREATE POLICY "Finders can create inquiries"
ON inquiries FOR INSERT
WITH CHECK (auth.uid() = finder_id);

CREATE POLICY "Owners can update inquiry status"
ON inquiries FOR UPDATE
USING (auth.uid() IN (SELECT owner_id FROM rooms WHERE id = room_id));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_views ON rooms(views DESC);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_room_id ON inquiries(room_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_finder_id ON inquiries(finder_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
