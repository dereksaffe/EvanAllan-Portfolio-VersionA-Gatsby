# Git Commit Guide

## Pre-Commit Steps

### 1. Deploy GraphQL Schema (CRITICAL)
```bash
cd studio
npm run deploy-graphql
```

**Why:** Your schema changes (like `homepageOrder`) need to be deployed to Sanity's GraphQL API before Gatsby can use them.

### 2. Test Everything Locally
```bash
# Test Gatsby
cd web
npm run build

# Test Studio
cd ../studio
npm run build
```

### 3. Check What Will Be Committed
```bash
git status
git diff
```

## Recommended Commit Message

```bash
git add .
git commit -m "feat: Update to Gatsby 5 and Sanity v3

- Migrate from Gatsby 2 to Gatsby 5
- Migrate from Sanity v1 to Sanity v3
- Update all dependencies to latest compatible versions
- Fix mobile layout and scrolling issues
- Optimize image loading with LQIP and responsive images
- Add homepage project shuffle functionality
- Improve text reveal animations
- Fix about page viewport fitting
- Optimize awards section spacing
- Remove blue hover colors
- Make mobile project names always visible
- Add homepageOrder field to projects schema"
```

## Files Changed Summary

### Configuration Files:
- `package.json` (root, web, studio)
- `netlify.toml` (root, studio)
- `gatsby-config.js`
- `sanity.config.ts`
- `gatsby-node.js`

### Components:
- All component files updated for Gatsby 5
- CSS modules updated to use namespace imports
- Image components optimized

### Schemas:
- All schemas migrated to Sanity v3 format
- Added `homepageOrder` field

### New Files:
- `DEPLOYMENT_CHECKLIST.md`
- `QUICK_DEPLOY.md`
- `PRE_DEPLOYMENT.md`
- `context/shuffle-context.js`
- `studio/sanity.config.ts`
- `studio/schemas/index.ts`
- `studio/deskStructure.ts`

### Removed Files:
- `lerna.json`
- `studio/sanity.json`
- `studio/schemas/schema.js`
- `studio/deskStructure.js`
- Old config files

## After Committing

1. **Push to repository:**
   ```bash
   git push origin main
   ```

2. **Netlify will auto-deploy** both sites

3. **Verify deployment:**
   - Check Gatsby site loads correctly
   - Check Studio loads correctly
   - Test all functionality

4. **If build fails:**
   - Check Netlify build logs
   - Verify environment variables are set
   - Ensure GraphQL schema is deployed

