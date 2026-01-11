# Supabase Setup Guide - Step by Step

This guide will walk you through setting up Supabase for your RoomFinder app in **5 minutes**.

## Step 1: Create Supabase Account (2 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with **GitHub** (recommended) or email
4. You'll be taken to your dashboard

## Step 2: Create New Project (1 minute)

1. Click **"New Project"** button
2. Fill in:
   - **Name**: `roomfinder` (or any name you like)
   - **Database Password**: Choose a strong password (save it somewhere!)
   - **Region**: Choose closest to you (e.g., `Southeast Asia (Singapore)` for India)
   - **Pricing Plan**: Select **Free** (includes 500MB database, 1GB file storage)
3. Click **"Create new project"**
4. ⏳ Wait 1-2 minutes while Supabase sets up your database

## Step 3: Run Database Setup (1 minute)

1. Once your project is ready, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase-setup.sql` in your code editor
4. **Copy all the SQL code** from that file
5. **Paste it** into the Supabase SQL Editor
6. Click **"RUN"** (or press Ctrl+Enter)
7. ✅ You should see "Success. No rows returned" - this is good!

## Step 4: Create Storage Bucket (30 seconds)

1. Click **"Storage"** in the left sidebar
2. Click **"Create a new bucket"**
3. Name it exactly: `room-images` (must match this exactly!)
4. Toggle **"Public bucket"** to ON
5. Click **"Create bucket"**

## Step 5: Get Your API Keys (30 seconds)

1. Click the **Settings** icon (⚙️) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 6: Configure Your App (1 minute)

1. In your project folder, find the file `.env.example`
2. **Copy it** and rename the copy to `.env`
3. Open `.env` in your code editor
4. Replace the values:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
   ```
5. **Save the file**

## Step 7: Start the App! 🚀

1. Open your terminal in the `my-app` folder
2. Run:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser
4. **You're done!** 🎉

## Test Your Setup

### Register as a Room Owner:
1. Click **"Sign Up"**
2. Enter your email
3. Select **"Room Owner"** role
4. Check your email for the OTP code
5. Enter the code
6. You should be logged in!

### Post Your First Room:
1. Click **"Post Room"** in the navbar
2. Fill in the form
3. Upload some images (you can use any photos for testing)
4. Click **"Post Room"**
5. Check your Dashboard - your room should appear!

### Browse as a Finder:
1. Log out
2. Register a new account as **"Room Finder"**
3. Go to **Explore**
4. You should see your posted room!

## Troubleshooting

### "Missing Supabase environment variables" error
- Check that your `.env` file exists (not `.env.example`)
- Make sure the values don't have quotes around them
- Restart the dev server after changing `.env`

### "Failed to send OTP" error
- In Supabase Dashboard → Authentication → Email Templates
- Make sure email is configured (default settings work for development)

### Images not uploading
- Check that the storage bucket is named exactly `room-images`
- Make sure it's set to **Public**

### Can't see posted rooms
- Make sure you ran the SQL setup script completely
- Check Supabase → Database → Tables - you should see `profiles`, `rooms`, `bookmarks`

## Need More Help?

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Video Tutorial**: Search YouTube for "Supabase getting started"
- Check the main `README.md` in your project

---

**That's it!** Following these steps, your RoomFinder app will be fully functional with authentication, database, and file storage - all for free! 🎉
