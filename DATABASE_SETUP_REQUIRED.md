# Database Setup Instructions

## You need to run the SQL migration to enable analytics features

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard/project/dfjsmztjazjgcnzgrwqe
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Open the file `add-analytics-support.sql` from your project folder
5. **Copy ALL the SQL code** from that file
6. **Paste** it into the Supabase SQL Editor
7. Click **"RUN"** (or press Ctrl+Enter)
8. ✅ You should see "Success" messages

### What This Migration Adds:

- **views** column to track how many times each room is viewed
- **status** column to mark rooms as active/inactive
- **inquiries** table to store messages from room finders to owners
- **RLS policies** for secure access to inquiries
- **indexes** for better performance

### Verify It Worked:

After running the SQL:
1. Go to **Database** → **Tables** in Supabase
2. You should see a new **inquiries** table
3. Check the **rooms** table - it should have **views** and **status** columns

---

## Then Test Your App!

After running the migration:
1. Your app should already be running (`npm run dev`)
2. Open http://localhost:5173
3. Login or register
4. You'll be redirected to your role-specific dashboard!

### As Room Finder:
- Blue-themed dashboard with search focus
- Save rooms using the bookmark button
- View saved rooms in your dashboard

### As Room Owner:
- Purple/green themed dashboard with analytics
- See stats: listings, views, inquiries, revenue
- Manage your listings
- Track performance

---

**That's it!** Your professional room finder app with role-based interfaces is ready! 🎉
