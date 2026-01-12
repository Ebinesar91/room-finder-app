# 🔐 Enable OTP for Supabase Email Authentication

## Problem
You're receiving **magic links** in your email instead of **OTP codes**.

## Solution
Change Supabase settings to enable Email OTP.

---

## Method 1: Enable Email OTP (Recommended - Takes 30 seconds)

### Step 1: Open Supabase Authentication Settings

Click this direct link to open the right page:
```
https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/providers
```

### Step 2: Configure Email Provider

1. Find the **"Email"** provider in the list
2. Click on it to expand settings
3. Scroll down to find **"Email OTP"** or **"Enable email OTP"** option
4. **Toggle it ON** ✅
5. Click **"Save"** at the bottom

### Step 3: Test It

1. Go to your app: https://room-finder-app1.vercel.app/register
2. Enter a NEW email address (use a different email than before)
3. Click "Continue"
4. **Check your email** - you should now receive a **6-digit OTP code** instead of a link!

---

## Method 2: Modify Email Template (If Method 1 doesn't work)

### Step 1: Go to Email Templates

```
https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/templates
```

### Step 2: Edit Magic Link Template

1. Select **"Magic Link"** template
2. Look for this line in the email HTML:
   ```html
   <a href="{{ .ConfirmationURL }}">Confirm your email</a>
   ```

3. **Replace it with**:
   ```html
   <p>Your verification code is: <strong>{{ .Token }}</strong></p>
   ```

4. Click **"Save"**

---

## Why This Happens

- **Supabase Default**: By default, Supabase sends "magic links" for email authentication
- **Your Code**: Your React app is correctly set up to handle OTP codes
- **The Gap**: You just need to enable OTP mode in Supabase settings

---

## How to Verify It's Working

After enabling OTP, you should receive an email like this:

```
Subject: Confirm Your Email

Your verification code is: 123456

This code expires in 1 hour.
```

Instead of:

```
Subject: Confirm Your Email

Click here to confirm your email:
https://xxxxx.supabase.co/auth/confirm?token=...
```

---

## Alternative: Use Magic Link in Your Code (Not Recommended)

If you prefer to use magic links instead of OTP, you would need to change your `authService.js`:

```javascript
// Instead of signInWithOtp
async sendMagicLink(email) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: 'https://room-finder-app1.vercel.app',
        },
    });
    if (error) throw error;
    return data;
}
```

**But this is NOT recommended** because:
- Your UI is designed for OTP input
- Magic links are less user-friendly
- You'd need to rewrite your Login and Register components

---

## ✅ Recommended Action

**Just enable Email OTP in Supabase settings** (Method 1 above) - it's the easiest fix and matches your current code! 🎉

---

## Need More Help?

If you still see magic links after following Method 1:

1. Try **logging out of Supabase dashboard** and logging back in
2. Wait 1-2 minutes for settings to propagate
3. Try with a **completely new email** (not one you've used before)
4. Check **spam folder** - sometimes OTP emails go there

If it still doesn't work, let me know and we'll try Method 2 (editing the email template directly).
