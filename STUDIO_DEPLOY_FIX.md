# Sanity Studio Netlify Deployment Fix

## Issue
The Sanity Studio Netlify deployment is showing as "failed" in the Sanity dashboard.

## Fixes Applied

✅ **Updated `studio/netlify.toml`:**
- Added `base = "studio/"` directory
- Changed command to `npm install && npm run build` (ensures dependencies are installed)
- Updated Node version to 22 (to match your local setup)
- Updated npm version to 10
- Added production context

## Common Causes of Studio Deployment Failures

### 1. Missing Dependencies
**Symptom:** Build fails with "Cannot find module" errors

**Fix:** The updated `netlify.toml` now includes `npm install` before build

### 2. Node Version Mismatch
**Symptom:** Build fails with engine errors

**Fix:** Updated to Node 22 to match your local setup. If you prefer Node 18 for better compatibility, change it back.

### 3. Base Directory Not Set
**Symptom:** Build can't find package.json or files

**Fix:** Added `base = "studio/"` to netlify.toml

### 4. Build Command Issues
**Symptom:** Build command fails

**Fix:** Changed to `npm install && npm run build` to ensure dependencies are installed

## Next Steps

1. **Commit the fix:**
   ```bash
   git add studio/netlify.toml
   git commit -m "fix: Update Sanity Studio Netlify configuration"
   git push origin production
   ```

2. **Verify Netlify Settings:**
   - Go to Netlify Dashboard → Your Studio Site
   - Site Settings → Build & deploy
   - Verify:
     - **Base directory:** `studio` (or leave empty if using netlify.toml)
     - **Build command:** `npm install && npm run build` (or leave empty to use netlify.toml)
     - **Publish directory:** `dist` (or leave empty to use netlify.toml)

3. **Check Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Verify:
     ```
     NODE_VERSION=22
     NPM_VERSION=10
     NODE_ENV=production
     ```

4. **Trigger a New Deploy:**
   - In Netlify Dashboard → Deploys → Trigger deploy
   - Or push a new commit

5. **Check Build Logs:**
   - Go to Deploys → Click on the latest deploy → Build log
   - Look for any specific error messages

## Alternative: Use Node 18 for Better Compatibility

If Node 22 causes issues, you can switch back to Node 18:

1. **Update `studio/netlify.toml`:**
   ```toml
   NODE_VERSION = "18"
   NPM_VERSION = "9"
   ```

2. **Update in Netlify Dashboard:**
   - Set `NODE_VERSION=18` in environment variables

## Testing Locally

Before deploying, test the build locally:

```bash
cd studio
npm install
npm run build
```

If this works locally, the Netlify build should work too.

## If It Still Fails

1. **Check the exact error in Netlify build logs**
2. **Verify the base directory is correct** in Netlify Dashboard
3. **Clear Netlify cache:** Site Settings → Build & deploy → Clear cache
4. **Try Node 18** if Node 22 has compatibility issues
5. **Check that `studio/dist` folder is generated** after local build

## Important Notes

- The studio site is separate from the Gatsby site
- Each needs its own Netlify site configuration
- The studio builds to `studio/dist` directory
- Make sure `dist` is in `.gitignore` (it will be generated during build)

