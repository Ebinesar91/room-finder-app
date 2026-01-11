# 🚀 Quick Supabase Setup - Follow These Steps

Your Supabase URL: `https://dfjsmztjazjgcnzgrwqe.supabase.co`

---

## STEP 1: Get Your API Key 🔑

1. **Open this link in your browser:**
   ```
   https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/settings/api
   ```

2. You'll see a section called **"Project API keys"**

3. Look for the key labeled **`anon` `public`**

4. Click the **📋 Copy** icon next to it

5. **Keep this key safe** - we'll use it in the next step!

---

## STEP 2: Run the Database Setup 📊

1. **Open this link:**
   ```
   https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/sql/new
   ```

2. You'll see an empty SQL editor

3. **Open the file** `supabase-setup.sql` in VS Code (it's in your my-app folder)

4. **Select ALL the code** (Ctrl+A) and **Copy** (Ctrl+C)

5. **Go back to Supabase** and **Paste** (Ctrl+V) into the SQL editor

6. Click the **▶ RUN** button (or press Ctrl+Enter)

7. ✅ You should see: **"Success. No rows returned"** - This is GOOD!

---

## STEP 3: Create Storage for Images 📸

1. **Open this link:**
   ```
   https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/storage/buckets
   ```

2. Click **"New bucket"** button

3. Fill in:
   - **Name:** `room-images` (must be EXACTLY this!)
   - **Toggle ON** the "Public bucket" switch
   - Leave everything else as default

4. Click **"Create bucket"**

5. ✅ You should see `room-images` in your buckets list!

---

## STEP 4: Configure Your App ⚙️

Now I need your **anon key** from Step 1 to complete this!

**Please paste your anon key here** (it looks like `eyJhbGc...` a very long string)

Once you give me that, I'll automatically:
- Create your `.env` file
- Add both your URL and key
- Get your app ready to run!

---

## After You Give Me the Key:

I'll run:
```bash
npm run dev
```

And your app will be **LIVE** at `http://localhost:5173`! 🎉

---

**So, what's your anon key?** Just paste it in the chat! 👇
