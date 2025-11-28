# Final Pre-Deployment Checklist

## ✅ Before You Commit

### Step 1: Deploy GraphQL Schema (CRITICAL)
```bash
npm run deploy:graphql
```
**Why:** Your schema changes need to be live before Gatsby can query them.

### Step 2: Test Everything
```bash
# Test builds
npm run pre-deploy
```

### Step 3: Verify Netlify Settings

**Gatsby Site Settings:**
- Base directory: `web`
- Build command: `npm install && npm run build`
- Publish directory: `web/public`
- Node version: `18`

**Environment Variables (Gatsby Site):**
- `GATSBY_SANITY_PROJECT_ID=tyru08of`
- `GATSBY_SANITY_DATASET=production`
- `NODE_VERSION=18`

**Studio Site Settings:**
- Base directory: `studio`
- Build command: `npm install && npm run build`
- Publish directory: `studio/dist`
- Node version: `18`

### Step 4: Git Commit
```bash
git status                    # Review changes
git add .                     # Add all files
git commit -m "feat: Update to Gatsby 5 and Sanity v3 with optimizations"
git push origin main          # Push to repository
```

## 🎯 After Deployment

### Verify Both Sites:
1. ✅ Gatsby site loads at your Netlify URL
2. ✅ Studio loads at your Netlify URL
3. ✅ Can log into studio
4. ✅ Can publish content
5. ✅ Changes trigger rebuilds

### Test Functionality:
- [ ] Homepage displays projects
- [ ] Clicking "Evan Allan" shuffles images
- [ ] Project pages load correctly
- [ ] About page fits viewport
- [ ] Mobile navigation works
- [ ] Images load smoothly
- [ ] No layout shift

## 🔄 Deploying from Studio

After publishing content in Sanity Studio:

1. **Option 1: Use Netlify Widget** (if configured)
   - Widget should appear in studio dashboard
   - Click "Deploy" button

2. **Option 2: Manual Build Hook**
   - Go to Netlify Dashboard
   - Site Settings → Build & deploy → Build hooks
   - Copy build hook URL
   - Trigger manually or via webhook

3. **Option 3: Git Push**
   - Any push to main branch triggers auto-deploy

## 📋 What's Ready

✅ All code updated and tested
✅ Dependencies updated
✅ Configuration files ready
✅ Build scripts configured
✅ Documentation complete
✅ .gitignore updated
✅ Netlify configs ready

## 🚨 Common Issues

**Build fails:**
- Check Node version is 18
- Verify environment variables
- Check build logs for errors

**GraphQL errors:**
- Run `npm run deploy:graphql`
- Wait a few minutes for propagation

**Images not loading:**
- Verify project ID is correct
- Check images are published (not drafts)
- Verify Sanity CDN access

## 📞 Next Steps

1. Run `npm run deploy:graphql`
2. Run `npm run pre-deploy`
3. Review `git status`
4. Commit and push
5. Monitor Netlify deployments
6. Test live sites

You're ready to deploy! 🚀

