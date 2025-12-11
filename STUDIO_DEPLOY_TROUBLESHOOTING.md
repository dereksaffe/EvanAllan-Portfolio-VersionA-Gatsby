# Sanity Studio Netlify Deployment Troubleshooting

## Quick Diagnosis Checklist

To help diagnose the issue, please check the following:

1. **What error are you seeing?**
   - [ ] Build fails in Netlify
   - [ ] Build succeeds but site doesn't load
   - [ ] Studio shows "deployment failed" in Sanity dashboard
   - [ ] Other: _______________

2. **Can you share the Netlify build log?**
   - Go to Netlify Dashboard → Your Studio Site → Deploys → Latest deploy → Build log
   - Copy the error messages

## Step-by-Step Fix

### Step 1: Verify Netlify Site Configuration

1. Go to **Netlify Dashboard** → Your Studio Site
2. Click **Site settings** → **Build & deploy**
3. Under **Build settings**, verify:

   **Base directory:** `studio`
   - ⚠️ This is CRITICAL - must be exactly `studio` (not `studio/` or empty)
   
   **Build command:** Leave EMPTY (the `netlify.toml` will handle it)
   - OR set to: `npm install && npm run build`
   
   **Publish directory:** `dist`
   - ⚠️ Must be `dist` (relative to base directory, so it becomes `studio/dist`)

### Step 2: Check Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Verify these are set:
   ```
   NODE_VERSION=22
   NPM_VERSION=10
   NODE_ENV=production
   ```
   
   **OR** if you prefer Node 18 (more compatible):
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   NODE_ENV=production
   ```

### Step 3: Test Local Build First

Before deploying, test that the build works locally:

```bash
cd studio
npm install
npm run build
```

**Expected result:** A `dist` folder should be created with built files.

**If this fails locally:**
- Check for TypeScript/JavaScript errors
- Verify all dependencies are installed
- Check Node version: `node --version` (should be 18+)

### Step 4: Clear Netlify Cache

1. Go to **Site settings** → **Build & deploy**
2. Scroll to **Build settings**
3. Click **Clear cache and retry deploy**

### Step 5: Trigger Manual Deploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Watch the build log for errors

### Step 6: Check Build Logs

Look for these common errors:

**Error: "Cannot find module"**
- **Fix:** Make sure `npm install` runs before build
- Verify base directory is `studio`

**Error: "Command failed"**
- **Fix:** Check the exact command that failed
- Verify Node version matches your local setup

**Error: "Base directory not found"**
- **Fix:** Verify base directory is exactly `studio` (case-sensitive)

**Error: "Publish directory not found"**
- **Fix:** Verify publish directory is `dist`
- Make sure build actually created the `dist` folder

## Alternative: Use Node 18

If Node 22 is causing issues, switch to Node 18:

1. **Update `studio/netlify.toml`:**
   ```toml
   NODE_VERSION = "18"
   NPM_VERSION = "9"
   ```

2. **Update Netlify Dashboard:**
   - Set `NODE_VERSION=18` in environment variables
   - Set `NPM_VERSION=9` in environment variables

3. **Commit and push:**
   ```bash
   git add studio/netlify.toml
   git commit -m "fix: Use Node 18 for Studio deployment"
   git push
   ```

## Verify Studio Site is Separate

Make sure you have **TWO separate Netlify sites**:

1. **Gatsby Site** (main portfolio)
   - Base directory: `web`
   - Publish directory: `web/public`

2. **Studio Site** (CMS)
   - Base directory: `studio`
   - Publish directory: `dist`

They should be completely separate sites in your Netlify dashboard.

## Common Issues & Solutions

### Issue: "Studio deployment failed" in Sanity Dashboard

**Cause:** Netlify build is failing or site isn't configured

**Solution:**
1. Check Netlify build logs
2. Verify base directory is `studio`
3. Clear cache and redeploy

### Issue: Build succeeds but site shows 404

**Cause:** Publish directory is wrong or SPA routing not configured

**Solution:**
1. Verify publish directory is `dist`
2. Check that `netlify.toml` has the SPA redirect rule:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Issue: Can't log in to Studio

**Cause:** Studio isn't properly deployed or Sanity project ID is wrong

**Solution:**
1. Verify `sanity.config.ts` has correct `projectId: 'tyru08of'`
2. Check that Studio URL is accessible
3. Try logging in with your Sanity credentials

## Still Not Working?

Please provide:
1. **Exact error message** from Netlify build log
2. **Screenshot** of Netlify build settings
3. **Result of local build** (`cd studio && npm run build`)
4. **Node version** you're using locally (`node --version`)

This will help diagnose the specific issue.

