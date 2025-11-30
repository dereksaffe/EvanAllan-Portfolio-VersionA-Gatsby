# Default Values Explained

## What Are The Defaults?

The code has **fallback defaults** that are used if environment variables aren't set. These are defined in two places:

### 1. `web/client-config.js`
```javascript
projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'tyru08of'
dataset: process.env.GATSBY_SANITY_DATASET || 'production'
```

**Defaults:**
- `GATSBY_SANITY_PROJECT_ID` → `'tyru08of'` (your Sanity project ID)
- `GATSBY_SANITY_DATASET` → `'production'` (your Sanity dataset name)

### 2. `netlify.toml`
```toml
GATSBY_SANITY_PROJECT_ID = "tyru08of"
GATSBY_SANITY_DATASET = "production"
NODE_VERSION = "22"
NPM_VERSION = "10"
NODE_ENV = "production"
```

## How They Work

1. **First Priority**: Environment variables set in Netlify Dashboard
2. **Second Priority**: Values in `netlify.toml` 
3. **Third Priority**: Defaults in `client-config.js`

## Node Version Issue

**The Problem:**
- Your `netlify.toml` had `NODE_VERSION = "18"`
- But you set `NODE_VERSION = "22"` in Netlify Dashboard
- This mismatch can cause build issues

**The Fix:**
- ✅ Updated `netlify.toml` to use Node 22 to match your setup
- ✅ Updated npm version to 10 (matches Node 22)

## Should You Use Node 18 or 22?

### Node 18 (Recommended for Stability)
- ✅ More tested with Gatsby 5
- ✅ Better compatibility with all packages
- ✅ Netlify's default

### Node 22 (If You Need It)
- ✅ Latest features
- ⚠️ May have compatibility issues with some packages
- ⚠️ Less tested with Gatsby 5

**Recommendation:** If you're having build issues, try switching to Node 18 in Netlify Dashboard to see if that helps.

## Current Setup

Based on your setup, you're using:
- **Node 22** (what you installed with)
- **npm 10** (comes with Node 22)

The `netlify.toml` has been updated to match this.

## Verifying Your Setup

1. **Check Netlify Dashboard:**
   - Go to: Site Settings → Environment Variables
   - Verify `NODE_VERSION = 22` (or change to 18 if you want)

2. **Check Build Logs:**
   - Look for: "Using Node version 22.x.x"
   - If you see errors about package compatibility, consider switching to Node 18

3. **Test Locally:**
   ```bash
   node --version  # Should show v22.x.x
   npm --version   # Should show 10.x.x
   ```

## If Build Still Fails

If you're still getting errors with Node 22:

1. **Try Node 18:**
   - Set `NODE_VERSION = 18` in Netlify Dashboard
   - This is more stable for Gatsby builds

2. **Check for Compatibility Issues:**
   - Some packages may not support Node 22 yet
   - Check build logs for specific package errors

3. **Use .nvmrc:**
   - The `.nvmrc` file specifies Node 18
   - You can use `nvm use` locally to match


