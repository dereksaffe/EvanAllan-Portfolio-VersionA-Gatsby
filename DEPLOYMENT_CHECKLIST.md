# Deployment Checklist - Sanity Studio to Netlify

This guide will help you set up deployment from Sanity Studio to Netlify.

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ npm 9+ installed
- ✅ Netlify account
- ✅ Sanity account with project `tyru08of`

## Step 1: Deploy Sanity GraphQL Schema

Before deploying the Gatsby site, you need to deploy your Sanity GraphQL schema:

```bash
cd studio
npm install
npm run deploy-graphql
```

This will make your schema changes (like `homepageOrder`) available to Gatsby.

## Step 2: Set Up Netlify Sites

You'll need **two separate Netlify sites**:

### Site 1: Gatsby Website (Main Portfolio)

1. **Go to Netlify Dashboard** → Add new site → Import from Git
2. **Connect your repository**
3. **Build settings:**
   - **Base directory:** `web`
   - **Build command:** `npm run build`
   - **Publish directory:** `web/public`
   - **Node version:** `18`

4. **Environment Variables** (Site settings → Environment variables):
   ```
   GATSBY_SANITY_PROJECT_ID=tyru08of
   GATSBY_SANITY_DATASET=production
   NODE_VERSION=18
   NPM_VERSION=9
   GATSBY_TELEMETRY_DISABLED=1
   ```
   
   **Optional** (for draft previews):
   ```
   SANITY_READ_TOKEN=your_read_token_here
   ```
   Get this from: https://www.sanity.io/manage/project/tyru08of/api

### Site 2: Sanity Studio

1. **Go to Netlify Dashboard** → Add new site → Import from Git
2. **Connect the same repository**
3. **Build settings:**
   - **Base directory:** `studio`
   - **Build command:** `npm run build`
   - **Publish directory:** `studio/dist`
   - **Node version:** `18`

4. **Environment Variables:**
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   ```

## Step 3: Configure Build Hooks

### For Gatsby Site (Trigger rebuilds from Sanity)

1. In Netlify Dashboard → Your Gatsby site → Site settings → Build & deploy → Build hooks
2. Click "Add build hook"
3. Name it: "Sanity Webhook"
4. Copy the build hook URL

5. **In Sanity Studio:**
   - Go to your studio dashboard
   - The Netlify widget should already be configured with your build hooks
   - If not, you can manually trigger builds using the build hook URL

### Build Hook IDs (from your dashboard config):
- Studio: `5f4db6170dca7246d56813f8`
- Web: `5f4db61767e48b3bc578431a`

## Step 4: Test Local Build

Before deploying, test that everything builds correctly:

```bash
# From root directory
npm install

# Test Gatsby build
cd web
npm install
npm run build

# Test Studio build
cd ../studio
npm install
npm run build
```

## Step 5: Deploy

### Initial Deployment

1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Netlify will automatically detect and deploy** both sites
3. **Check build logs** for any errors

### After Publishing Content in Sanity

1. **Publish your content** in Sanity Studio
2. **Click "Deploy" in the Netlify widget** (if configured)
3. Or **manually trigger** using the build hook URL
4. The Gatsby site will rebuild with new content

## Step 6: Verify Deployment

### Check Gatsby Site:
- ✅ Homepage loads correctly
- ✅ Projects display properly
- ✅ Images load without layout shift
- ✅ Navigation works
- ✅ Mobile responsive

### Check Sanity Studio:
- ✅ Studio loads at your Netlify URL
- ✅ You can log in and edit content
- ✅ Changes save correctly

## Troubleshooting

### Build Fails

1. **Check Node version** - Must be 18+
2. **Check environment variables** - All required vars must be set
3. **Check build logs** - Look for specific error messages
4. **Clear Netlify cache** - Site settings → Build & deploy → Clear cache

### GraphQL Errors

If you see GraphQL errors:
```bash
cd studio
npm run deploy-graphql
```

### Images Not Loading

1. Verify `GATSBY_SANITY_PROJECT_ID` is set correctly
2. Check that images are published in Sanity (not drafts)
3. Verify Sanity CDN is accessible

### Layout Shift Issues

- Ensure images have proper dimensions
- Check that `aspectRatio` is being used correctly
- Verify placeholder images are loading

## Quick Reference

### Deploy GraphQL Schema
```bash
cd studio && npm run deploy-graphql
```

### Local Development
```bash
# Gatsby site
cd web && npm run dev

# Sanity Studio
cd studio && npm run dev
```

### Production Build Test
```bash
cd web && npm run build && npm run serve
```

## Environment Variables Summary

### Gatsby Site (Required):
- `GATSBY_SANITY_PROJECT_ID=tyru08of`
- `GATSBY_SANITY_DATASET=production`
- `NODE_VERSION=18`

### Gatsby Site (Optional):
- `SANITY_READ_TOKEN` - For draft previews

### Studio Site:
- `NODE_VERSION=18`

## Next Steps After Deployment

1. ✅ Set up custom domains (if needed)
2. ✅ Configure SSL certificates (automatic with Netlify)
3. ✅ Set up form handling (if needed)
4. ✅ Configure analytics (if needed)
5. ✅ Test all pages and functionality

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure GraphQL schema is deployed
5. Check Sanity project settings

