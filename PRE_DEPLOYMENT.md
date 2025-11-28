# Pre-Deployment Checklist

## Before Committing to Git

### 1. Deploy Sanity GraphQL Schema
**IMPORTANT:** Deploy your schema changes before pushing to git:

```bash
cd studio
npm install
npm run deploy-graphql
```

This ensures your `homepageOrder` field and any other schema changes are available to Gatsby.

### 2. Test Local Builds

```bash
# Test Gatsby build
cd web
npm install
npm run build

# Test Studio build
cd ../studio
npm install
npm run build
```

### 3. Verify Environment Variables

Make sure these are set in Netlify Dashboard:

**Gatsby Site:**
- `GATSBY_SANITY_PROJECT_ID=tyru08of`
- `GATSBY_SANITY_DATASET=production`
- `NODE_VERSION=18`

**Studio Site:**
- `NODE_VERSION=18`

### 4. Git Commit Checklist

Before committing, ensure:
- ✅ All code changes are complete
- ✅ No console errors in development
- ✅ Images load correctly
- ✅ Mobile layout works
- ✅ All pages render correctly
- ✅ GraphQL schema is deployed

### 5. Files to Commit

**DO commit:**
- All source code files
- Configuration files (gatsby-config.js, sanity.config.ts, etc.)
- Package.json files
- netlify.toml files
- CSS and component files
- Schema files

**DON'T commit:**
- node_modules/
- .cache/
- public/
- dist/
- .env files
- Build artifacts

## Deployment Workflow

### Initial Deployment

1. **Deploy GraphQL Schema:**
   ```bash
   cd studio && npm run deploy-graphql
   ```

2. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Update portfolio: Gatsby 5, Sanity v3, mobile optimizations"
   git push origin main
   ```

3. **Netlify will auto-deploy** both sites

### After Publishing in Sanity Studio

1. **Publish content** in Sanity Studio
2. **Trigger rebuild** using Netlify widget in studio dashboard
3. Or manually trigger build hook from Netlify dashboard

## Build Hooks

Your build hooks are configured in the studio dashboard:
- **Studio Build Hook:** `5f4db6170dca7246d56813f8`
- **Web Build Hook:** `5f4db61767e48b3bc578431a`

## Recent Changes Summary

### Major Updates:
- ✅ Migrated from Gatsby 2 to Gatsby 5
- ✅ Migrated from Sanity v1 to Sanity v3
- ✅ Updated all dependencies
- ✅ Fixed mobile layout and scrolling
- ✅ Optimized image loading (LQIP, responsive images)
- ✅ Added homepage project shuffle on "Evan Allan" click
- ✅ Improved text reveal animations
- ✅ Fixed about page viewport fitting
- ✅ Optimized awards section spacing
- ✅ Removed blue hover colors
- ✅ Mobile project names always visible

### Schema Changes:
- ✅ Added `homepageOrder` field (requires GraphQL deployment)
- ✅ Updated all schemas to Sanity v3 format

## Quick Commands

```bash
# Deploy GraphQL schema
cd studio && npm run deploy-graphql

# Test builds
cd web && npm run build
cd ../studio && npm run build

# Development
cd web && npm run dev
cd ../studio && npm run dev
```

