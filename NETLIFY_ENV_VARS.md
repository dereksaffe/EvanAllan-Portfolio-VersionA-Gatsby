# Netlify Environment Variables Setup

## Required Environment Variables

### For Gatsby Website Site:

Go to: **Netlify Dashboard → Your Gatsby Site → Site Settings → Environment Variables**

Add these variables:

```
GATSBY_SANITY_PROJECT_ID=tyru08of
GATSBY_SANITY_DATASET=production
NODE_VERSION=18
NPM_VERSION=9
GATSBY_TELEMETRY_DISABLED=1
NODE_ENV=production
```

**Optional** (for draft previews in development):
```
SANITY_READ_TOKEN=your_read_token_here
```

### For Sanity Studio Site:

Go to: **Netlify Dashboard → Your Studio Site → Site Settings → Environment Variables**

Add these variables:

```
NODE_VERSION=18
NPM_VERSION=9
NODE_ENV=production
```

## Important Notes

1. **GATSBY_ prefix**: Variables that start with `GATSBY_` are available in the browser. Use this for public config like project ID.

2. **No GATSBY_ prefix**: Variables without `GATSBY_` are only available server-side during build.

3. **NODE_ENV**: Should be set to `production` for production builds.

4. **After adding variables**: You may need to trigger a new deploy for changes to take effect.

## How to Set Environment Variables

1. Go to Netlify Dashboard
2. Select your site
3. Go to **Site Settings** → **Environment Variables**
4. Click **Add a variable**
5. Enter the variable name and value
6. Click **Save**
7. Trigger a new deploy (or wait for next git push)

## Verification

After setting variables, check build logs to ensure they're being read:
- Look for "Environment variables" section in build logs
- Verify no "undefined" values in build output
- Check that Gatsby can connect to Sanity

## Troubleshooting

**Build fails with "undefined" errors:**
- Verify all required variables are set
- Check variable names match exactly (case-sensitive)
- Ensure `GATSBY_` prefix is used for browser-accessible vars

**Can't connect to Sanity:**
- Verify `GATSBY_SANITY_PROJECT_ID` is set correctly
- Check `GATSBY_SANITY_DATASET` matches your dataset name
- Verify project ID is correct: `tyru08of`

