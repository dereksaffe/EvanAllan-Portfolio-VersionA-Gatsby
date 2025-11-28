# Git Push Guide

## Your Branch

You're on the **`production`** branch, not `main`. Use:

```bash
git push origin production
```

## If You Get Authentication Errors

### Option 1: Use HTTPS (Recommended)
The remote has been switched to HTTPS. You may be prompted for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your GitHub password)

To create a token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use this token as your password

### Option 2: Set Up SSH Keys
If you prefer SSH:
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub
# Then add to GitHub → Settings → SSH and GPG keys
```

## Quick Commands

```bash
# Check current branch
git branch

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your commit message"

# Push to production branch
git push origin production
```

## After Push

Netlify will automatically detect the push and deploy both sites:
- Gatsby website
- Sanity Studio

Monitor deployments in Netlify Dashboard.

