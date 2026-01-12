# Super Simple OTP Fix - Do This Now!

## Problem: You get an email with a LINK. You need a CODE instead.

---

## Step 1: Click This Link

**Copy and paste this into your browser:**
```
https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/providers
```

---

## Step 2: Find "Email"

You'll see a page with providers.

Look for **Email** and click on it.

---

## Step 3: Look for This Setting

Scroll down and find **ONE** of these:
- "Enable email OTP"
- "Secure email change"
- "Email OTP"

**Turn it ON** (make sure it's blue/green)

---

## Step 4: Click Save

Bottom of the page → Click **Save**

---

## Step 5: Test

1. Go to: http://localhost:5173/register
2. Use a **NEW** email (different from before!)
3. Check your email
4. You should get a **6-digit number** like: 123456

---

## Still Getting a Link?

If you STILL get a link email, do this instead:

### Plan B - Change Email Template

1. Go to: https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/templates
2. Click **"Confirm signup"** 
3. You'll see email code
4. Find this line: `{{ .ConfirmationURL }}`
5. Change it to: `{{ .Token }}`
6. Click Save

---

## Need Me to Do It?

If this is too confusing, you can:

1. **Share your screen** with me (if you're on a call)
2. **OR** Send me a screenshot of what you see at:
   https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/providers

And I'll tell you exactly what to click!

---

## Question: What are you seeing?

Please tell me:
1. Are you IN the Supabase dashboard?
2. What page are you on?
3. What do you see?

Then I can help you step by step! 😊
