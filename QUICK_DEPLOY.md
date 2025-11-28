# Quick Deployment Guide

## Before First Deployment

1. **Deploy Sanity GraphQL Schema:**
   ```bash
   cd studio
   npm install
   npm run deploy-graphql
   ```

## Netlify Setup

### Site 1: Gatsby Website

**Build Settings:**
- Base directory: `web`
- Build command: `npm install && npm run build`
- Publish directory: `web/public`
- Node version: `18`

**Environment Variables:**
```
GATSBY_SANITY_PROJECT_ID=tyru08of
GATSBY_SANITY_DATASET=production
NODE_VERSION=18
```

### Site 2: Sanity Studio

**Build Settings:**
- Base directory: `studio`
- Build command: `npm install && npm run build`
- Publish directory: `studio/dist`
- Node version: `18`

## After Publishing in Sanity

1. Publish content in Sanity Studio
2. Click "Deploy" in Netlify widget (if configured)
3. Or manually trigger build hook

## Test Locally First

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

See `DEPLOYMENT_CHECKLIST.md` for full details.

