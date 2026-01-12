# 🔐 Fix Supabase to Send OTP Instead of Magic Links

## The Problem
You're receiving **email with a login link** instead of a **6-digit OTP code**.

## The Solution (Takes 2 Minutes)

### Step 1: Open Supabase Auth Settings

**Click this link** (opens the exact page you need):
```
https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/providers
```

---

### Step 2: Find Email Provider Settings

1. You'll see a list of authentication providers
2. Look for **"Email"** in the list
3. Click on **"Email"** to expand its settings

---

### Step 3: Change the OTP Setting

Scroll down in the Email provider settings until you find:

**Look for one of these options:**
- ✅ "Enable Email OTP"
- ✅ "Use Email OTP instead of Magic Link"
- ✅ "Secure Email Change Enabled"

**Turn it ON** (toggle should be blue/green when enabled)

---

### Step 4: Save Changes

1. Scroll to the bottom of the Email provider settings
2. Click **"Save"** button
3. Wait for the confirmation message

---

### Step 5: Test It!

1. Go to your app: http://localhost:5173/register
2. **Use a DIFFERENT email** (not one you've used before)
3. Enter your details
4. Click "Continue"
5. **Check your email inbox**
6. You should now receive a **6-digit OTP code** like: `123456`
7. Enter the code in your app
8. ✅ You should be logged in!

---

## Alternative: If You Can't Find the OTP Setting

If you don't see an "Email OTP" option, try this:

### Option A: Check Authentication Settings

1. Go to: `https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/url-configuration`
2. Look for **"Mailer settings"** or **"Email templates"**
3. Check if there's an OTP-related setting there

### Option B: Modify Email Template

1. Go to: `https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/auth/templates`
2. Click on **"Magic Link"** email template
3. You'll see the email HTML
4. Look for the line with: `{{ .ConfirmationURL }}`
5. **Replace it with**: `{{ .Token }}`
6. The email should now show the 6-digit code instead of a link
7. Click **"Save"**

---

## Why This Happens

**Supabase's default behavior:**
- Sends magic links (clickable URLs)
- This is easier for users but less secure

**Your app expects:**
- OTP codes (6-digit numbers)
- More secure, but requires manual entry

**The fix:**
- Tell Supabase to send OTP codes instead

---

## Verification Checklist

After making changes, verify:

- [ ] Email provider settings show OTP enabled
- [ ] Test with a NEW email address
- [ ] Check spam/junk folder if email doesn't arrive
- [ ] Email should contain a 6-digit code like `123456`
- [ ] Code should work when entered in the app

---

## Common Issues

### Issue: Still receiving magic links
**Solution**: 
- Clear your browser cache
- Use a completely new email address for testing
- Wait 1-2 minutes for Supabase settings to propagate
- Try logging out of Supabase dashboard and back in

### Issue: Email not arriving
**Solution**:
- Check spam/junk folder
- Verify the email address is correct
- Check Supabase Dashboard → Authentication → Users to see if user was created

### Issue: OTP setting not visible
**Solution**:
- Your Supabase version might be older
- Use Option B (Modify Email Template) instead
- Or contact Supabase support to enable OTP feature

---

## Need More Help?

If it still doesn't work after following these steps:

1. Take a screenshot of your Email provider settings
2. Take a screenshot of the email you receive
3. Check the Supabase logs: `https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe/logs/auth-logs`
4. Let me know what you see!

---

## ✅ Success Looks Like This

**Before (Magic Link email):**
```
Subject: Confirm your signup

Click the link below to confirm your account:
https://dfjsmztjazjgcnzgrwqe.supabase.co/auth/v1/verify?token=...

[Confirm Email Button]
```

**After (OTP email):**
```
Subject: Confirm your signup

Your verification code is: 123456

This code will expire in 60 minutes.
```

---

**That's it!** Once you see a 6-digit code in your email, you're all set! 🎉
