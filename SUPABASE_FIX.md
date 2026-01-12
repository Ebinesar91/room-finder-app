# 🔧 Supabase Configuration Fix
## Copy-Paste Ready Instructions

### Step 1: Open Supabase Settings

Click this link (it will open the exact page you need):
```
https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/url-configuration
```

---

### Step 2: Update Site URL

Find the box labeled **"Site URL"**

**Delete** the current value and **paste this**:
```
https://room-finder-app1.vercel.app
```

---

### Step 3: Add Redirect URLs

Scroll down to **"Redirect URLs"** section

**Add these URLs** (one per line):
```
https://room-finder-app1.vercel.app/**
https://room-finder-app1.vercel.app
http://localhost:5173/**
http://localhost:5173
```

**Copy the block above and paste all 4 lines** into the Redirect URLs box.

---

### Step 4: Save

Click the **"Save"** button at the bottom of the page.

---

## ✅ After Saving:

1. Go to your app: https://room-finder-app1.vercel.app
2. Try to register with a NEW email
3. Check your email for OTP
4. Enter the OTP
5. You should be logged in! 🎉

---

## 🔍 What This Fixes:

- **Before**: Supabase was redirecting to `localhost:5173` (not accessible from Vercel)
- **After**: Supabase redirects to your Vercel URL (works everywhere!)

---

## ⏱️ This Should Take 1 Minute:

1. Click the link above ← Opens Supabase settings
2. Paste Site URL ← From "Step 2" above  
3. Paste Redirect URLs ← From "Step 3" above
4. Click Save ← Done!

Then test your app at: https://room-finder-app1.vercel.app
