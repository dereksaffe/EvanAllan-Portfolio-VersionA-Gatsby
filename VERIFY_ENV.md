# Verify Environment Variables in Netlify

## Quick Check

1. **Go to Netlify Dashboard**
   - https://app.netlify.com

2. **Select your Gatsby site**

3. **Go to: Site Settings → Environment Variables**

4. **Verify these variables exist:**

   ```
   GATSBY_SANITY_PROJECT_ID = tyru08of
   GATSBY_SANITY_DATASET = production
   NODE_ENV = production
   NODE_VERSION = 18
   NPM_VERSION = 9
   GATSBY_TELEMETRY_DISABLED = 1
   ```

5. **Check the build logs:**
   - Go to: **Deploys** → Click on latest deploy → **Build log**
   - Look for any errors about environment variables
   - Check if Gatsby can connect to Sanity

## Common Issues

### Issue 1: Variables Not Set
**Symptom:** Build fails with "undefined" errors

**Fix:**
- Add all variables listed above in Netlify Dashboard
- Make sure variable names match EXACTLY (case-sensitive)
- Click "Save" after adding each variable
- Trigger a new deploy

### Issue 2: Wrong Context
**Symptom:** Variables set but not being used

**Fix:**
- Make sure variables are set for "All contexts" or "Production"
- Check if you have branch-specific contexts that override production

### Issue 3: dotenv Error
**Symptom:** Error about dotenv not being found

**Fix:**
- ✅ This is now fixed in the code (dotenv is optional)
- The code will work without dotenv in production
- If you still see errors, make sure you've pulled the latest code

## Testing Locally

To test if your environment variables work:

1. **Create `.env.development` in `web/` folder:**
   ```
   GATSBY_SANITY_PROJECT_ID=tyru08of
   GATSBY_SANITY_DATASET=production
   NODE_ENV=development
   ```

2. **Run build locally:**
   ```bash
   cd web
   npm run build
   ```

3. **If local build works but Netlify fails:**
   - The issue is with Netlify environment variables
   - Double-check all variables are set in Netlify Dashboard

## What Changed

✅ **gatsby-config.js** now:
- Wraps dotenv in try-catch (won't fail if dotenv is missing)
- Only loads .env files if they exist
- Works without dotenv in production

✅ **client-config.js** has:
- Default values for projectId and dataset
- Will use Netlify env vars if set, otherwise defaults

✅ **netlify.toml** has:
- Default environment variables set
- These are fallbacks if not set in Dashboard

## Next Steps

1. **Verify variables in Netlify Dashboard** (most important!)
2. **Trigger a new deploy** after setting variables
3. **Check build logs** for any remaining errors
4. **If still failing**, share the exact error message from build logs


