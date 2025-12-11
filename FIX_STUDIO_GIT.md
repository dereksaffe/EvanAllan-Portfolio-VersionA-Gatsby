# Fix Studio Files Not in Git & Netlify Build Issues

## Problem
- Studio works locally ✅
- Netlify build is failing ❌
- Studio files aren't in GitHub ❌

## Solution Steps

### Step 1: Check What Studio Files Need to Be Committed

The studio folder should have these files committed to git:

**Required files:**
- `studio/package.json`
- `studio/sanity.config.ts`
- `studio/tsconfig.json`
- `studio/netlify.toml`
- `studio/deskStructure.ts`
- `studio/schemas/` (all schema files)
- `studio/static/` (if you have custom assets)

**Should NOT be committed:**
- `studio/node_modules/` (ignored)
- `studio/dist/` (ignored - build output)
- `studio/.sanity/` (ignored - Sanity cache)

### Step 2: Add Studio Files to Git

Run these commands from your project root:

```bash
# Check what's not tracked
git status studio/

# Add all studio source files
git add studio/package.json
git add studio/sanity.config.ts
git add studio/tsconfig.json
git add studio/netlify.toml
git add studio/deskStructure.ts
git add studio/schemas/
git add studio/static/

# Or add everything in studio (gitignore will exclude node_modules, dist, etc.)
git add studio/

# Check what will be committed
git status

# Commit
git commit -m "feat: Add Sanity Studio files for Netlify deployment"

# Push to GitHub
git push origin main
```

### Step 3: Common Netlify Build Errors & Fixes

#### Error: "Cannot find module" or "package.json not found"
**Cause:** Base directory not set correctly or files not in git

**Fix:**
1. Verify base directory is `studio` in Netlify Dashboard
2. Make sure `studio/package.json` is committed to git
3. Clear Netlify cache and redeploy

#### Error: "Command failed: npm install"
**Cause:** Node version mismatch or dependency issues

**Fix:**
1. Set `NODE_VERSION=18` in Netlify environment variables
2. Set `NPM_VERSION=9` in Netlify environment variables
3. Or update `studio/netlify.toml` to use Node 18:
   ```toml
   NODE_VERSION = "18"
   NPM_VERSION = "9"
   ```

#### Error: "Build command failed"
**Cause:** Build command is wrong or missing dependencies

**Fix:**
1. Clear the build command in Netlify Dashboard (let `netlify.toml` handle it)
2. Or set it to: `npm install && npm run build`
3. Make sure `studio/package.json` has the `build` script

#### Error: "Publish directory not found"
**Cause:** Build didn't create `dist` folder or path is wrong

**Fix:**
1. Test build locally first:
   ```bash
   cd studio
   npm install
   npm run build
   ```
   This should create a `studio/dist` folder
2. If local build works, the issue is Netlify settings
3. Verify publish directory is `studio/dist` (or `dist` if base is `studio`)

### Step 4: Verify Files Are in Git

After committing, check that files are tracked:

```bash
# See if studio files are tracked
git ls-files studio/ | head -20

# Should show files like:
# studio/package.json
# studio/sanity.config.ts
# studio/netlify.toml
# studio/schemas/index.ts
# etc.
```

### Step 5: Test Netlify Build After Committing

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Check Netlify:**
   - Go to Netlify Dashboard → Your Studio Site
   - Should see a new deploy triggered automatically
   - Watch the build log for errors

3. **If build still fails:**
   - Copy the exact error message from build log
   - Check which step failed (install, build, or deploy)
   - Compare with local build output

### Step 6: Quick Verification Checklist

Before pushing, verify:

- [ ] `studio/package.json` exists and has `build` script
- [ ] `studio/sanity.config.ts` exists
- [ ] `studio/netlify.toml` exists
- [ ] `studio/schemas/` folder has all schema files
- [ ] Local build works: `cd studio && npm run build`
- [ ] `studio/dist/` folder is created after local build
- [ ] `studio/dist/` is in `.gitignore` (should NOT be committed)
- [ ] All source files are added to git: `git status studio/`

## Still Having Issues?

If Netlify build still fails after committing files:

1. **Share the exact error** from Netlify build log
2. **Verify local build works:**
   ```bash
   cd studio
   npm install
   npm run build
   ```
3. **Check Netlify settings match:**
   - Base directory: `studio`
   - Build command: (empty) or `npm install && npm run build`
   - Publish directory: `studio/dist`
   - Node version: 18

4. **Clear Netlify cache:**
   - Site settings → Build & deploy → Clear cache
   - Trigger new deploy

