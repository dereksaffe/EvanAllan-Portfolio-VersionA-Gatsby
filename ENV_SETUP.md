# Environment Variables Setup

## The Problem

`dotenv` tries to load `.env.production` file which doesn't exist in Netlify. Environment variables should come from Netlify's dashboard, not from files.

## Solution Applied

✅ Updated `gatsby-config.js` to:
- Check if `.env` file exists before loading
- Only load dotenv in local development
- Use Netlify environment variables in production

✅ Added default values in `netlify.toml`:
- `GATSBY_SANITY_PROJECT_ID=tyru08of`
- `GATSBY_SANITY_DATASET=production`
- `NODE_ENV=production`

## Still Required: Set in Netlify Dashboard

Even though defaults are in `netlify.toml`, you should also set them in Netlify Dashboard for clarity and to override if needed.

### Gatsby Site → Environment Variables:

```
GATSBY_SANITY_PROJECT_ID=tyru08of
GATSBY_SANITY_DATASET=production
NODE_VERSION=18
NPM_VERSION=9
GATSBY_TELEMETRY_DISABLED=1
NODE_ENV=production
```

### Studio Site → Environment Variables:

```
NODE_VERSION=18
NPM_VERSION=9
NODE_ENV=production
```

## How It Works Now

1. **Local Development**: 
   - Loads `.env.development` if it exists
   - Falls back to defaults in `client-config.js`

2. **Netlify Production**:
   - Uses environment variables from Netlify Dashboard
   - Falls back to defaults in `netlify.toml` and `client-config.js`
   - No `.env` file needed

## Verification

After deployment, check build logs:
- Should see: "Environment variables loaded"
- No errors about missing `.env` files
- Gatsby connects to Sanity successfully



