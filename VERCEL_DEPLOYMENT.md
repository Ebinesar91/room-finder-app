# 🚀 Deploy Room Finder to Vercel

## Method 1: Deploy via Vercel Website (Recommended - Easiest)

### Step 1: Push to GitHub

1. **Commit your code**:
   ```bash
   git init
   git add .
   git commit -m "Room Finder app ready for deployment"
   ```

2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `room-finder-app`
   - Make it Public
   - DON'T initialize with README
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/room-finder-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" (use GitHub to sign in)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Find your `room-finder-app` repository
   - Click "Import"

3. **Configure Build Settings**:
   - Framework Preset: **Vite** (auto-detected ✅)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables** (CRITICAL!):
   
   Click "Environment Variables" tab and add these:
   
   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://dfjsmztjazjgcnzgrwqe.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `sb_publishable_dJHnTfBRP0uP_mDv4uncnQ_Uy51JQhZ` |

5. **Deploy**:
   - Click "Deploy" button
   - Wait 2-3 minutes ⏳
   - Done! 🎉

6. **Your Live URL**:
   - Vercel will give you a URL like: `https://room-finder-app.vercel.app`
   - Click it to see your live app!

---

## Method 2: Deploy via Vercel CLI (Alternative)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
cd c:\Users\ebine\my-app
vercel
```

Follow the prompts:
- Link to existing project? **N**
- Project name? **room-finder-app**
- Directory? **./  (press Enter)**
- Want to override settings? **N**

### Step 4: Add Environment Variables
```bash
vercel env add VITE_SUPABASE_URL
# Paste: https://dfjsmztjazjgcnzgrwqe.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: sb_publishable_dJHnTfBRP0uP_mDv4uncnQ_Uy51JQhZ
```

### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## ✅ After Deployment

### Test Your Live App:

1. **Visit your Vercel URL**
2. **Test Registration**:
   - Sign up with your email
   - Verify OTP
   - Check if login works

3. **Test Room Posting**:
   - Post a room as owner
   - Upload images
   - Verify it appears in Explore

4. **Test Filters**:
   - Try property type filter
   - Try tenant preference filter
   - Try price range

### If Something Doesn't Work:

**Check Environment Variables**:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Make sure both variables are set correctly
5. Redeploy if you changed them

**Check Build Logs**:
1. Go to Vercel Dashboard
2. Click on your deployment
3. Check "Building" logs for errors

---

## 🎯 Your Deployed App Features

✅ Live on the internet with custom URL  
✅ Automatic HTTPS (secure)  
✅ Fast CDN delivery  
✅ Auto-deploys when you push to GitHub  
✅ Free hosting on Vercel  

---

## 📝 For Your Internship Submission

Include this in your README:

```markdown
## 🌐 Live Demo

**Deployed URL**: https://your-app-name.vercel.app

## 📋 Features
- Search rooms by location
- Filter by property type (1 BHK, 2 BHK, 3 BHK, Studio, Beds)
- Filter by tenant preference (Bachelor, Family, Girls, Working)
- Filter by price range
- User authentication with Supabase (Email/OTP)
- Image upload for room listings
- Role-based access (Room Finder vs Room Owner)

## 🛠️ Tech Stack
- Frontend: React + Vite
- Backend: Supabase (Database, Auth, Storage)
- Deployment: Vercel
- Styling: Custom CSS with modern design
```

---

**Which method do you want to use?** 
- **Method 1** (Website) is easier for first-time users
- **Method 2** (CLI) is faster if you're comfortable with terminal
