# RoomFinder - Find Your Perfect Room

A modern web application for finding and listing rental rooms, built with React, Vite, and Supabase.

## Features

- 🔐 **Secure Authentication** - Email/OTP passwordless login
- 👥 **User Roles** - Separate interfaces for Room Finders and Room Owners
- 🔍 **Advanced Search** - Search by location with powerful filtering
- 🏠 **Room Listings** - Browse, post, and manage room listings
- 📷 **Image Upload** - Multiple image support via Supabase Storage
- 💼 **User Dashboard** - Manage your profile and listings
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Dark mode with glassmorphism effects

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (Database, Auth, Storage)
- **Routing**: React Router v6
- **Styling**: Vanilla CSS with modern design system
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

## Local Setup

### 1. Clone and Install

```bash
cd my-app
npm install
```

### 2. Supabase Setup

#### Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

#### Create Database Tables

Go to SQL Editor in Supabase Dashboard and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('finder', 'owner')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  price NUMERIC NOT NULL,
  room_type TEXT NOT NULL CHECK (room_type IN ('private', 'shared', 'studio')),
  amenities JSONB DEFAULT '{}'::jsonb,
  available_from DATE,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookmarks table (optional)
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, room_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for Rooms
CREATE POLICY "Rooms are viewable by everyone"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Owners can insert own rooms"
  ON rooms FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own rooms"
  ON rooms FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own rooms"
  ON rooms FOR DELETE
  USING (auth.uid() = owner_id);

-- RLS Policies for Bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);
```

#### Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Create a new bucket called `room-images`
3. Set it to **Public**
4. Add this policy for authenticated uploads:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload room images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'room-images');

-- Allow public read access
CREATE POLICY "Public can view room images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'room-images');

-- Allow owners to delete their images
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'room-images');
```

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Find these values in Supabase Dashboard → Settings → API

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Usage

### For Room Finders

1. **Sign Up** - Register with email and select "Room Finder" role
2. **Browse** - Explore available rooms on the Explore page
3. **Search & Filter** - Use location search and filters (price, type, amenities)
4. **View Details** - Click on room cards to see full details

### For Room Owners

1. **Sign Up** - Register with email and select "Room Owner" role
2. **Post Room** - Click "Post Room" and fill in the details
3. **Upload Images** - Add up to 5 images of your room
4. **Manage** - View and edit your listings from the Dashboard

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

### Manual Deployment

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Deploy!

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── auth/         # Login, Register, Protected Routes
│   │   ├── layout/       # Navbar, Footer
│   │   ├── rooms/        # RoomCard, RoomList
│   │   └── search/       # SearchBar, FilterPanel
│   ├── pages/
│   │   ├── Home.jsx      # Landing page
│   │   ├── Explore.jsx   # Browse rooms
│   │   ├── Dashboard.jsx # User dashboard
│   │   └── PostRoom.jsx  # Create listing
│   ├── services/
│   │   ├── supabase.js   # Supabase client
│   │   ├── authService.js
│   │   ├── profileService.js
│   │   └── roomService.js
│   ├── hooks/
│   │   └── useAuth.js    # Auth state hook
│   ├── App.jsx           # Main app & routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (not in repo)
├── .env.example          # Template for environment variables
├── vercel.json           # Vercel configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Roadmap

- [ ] Room details page with image carousel
- [ ] Bookmark/favorite rooms
- [ ] In-app messaging between users
- [ ] Reviews and ratings
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced map integration

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React and Supabase
