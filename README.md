# Evan Allan Portfolio

A modern portfolio website built with Gatsby 5 and Sanity v3, featuring optimized image loading, responsive design, and seamless content management.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run Gatsby development server
npm run dev

# Run Sanity Studio
npm run dev:studio
```

### Deployment

```bash
# 1. Deploy GraphQL schema (REQUIRED)
npm run deploy:graphql

# 2. Run pre-deployment checks
npm run pre-deploy

# 3. Commit and push
git add .
git commit -m "Your commit message"
git push origin main
```

## 📁 Project Structure

```
├── web/              # Gatsby frontend
├── studio/           # Sanity Studio CMS
├── netlify.toml      # Netlify configuration
└── scripts/          # Deployment scripts
```

## 🛠️ Tech Stack

- **Gatsby 5** - Static site generator
- **Sanity v3** - Headless CMS
- **React 18** - UI framework
- **Styled Components** - CSS-in-JS
- **Netlify** - Hosting & deployment

## 📚 Documentation

- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Complete deployment guide
- [Quick Deploy](./QUICK_DEPLOY.md) - Quick reference
- [Pre-Deployment](./PRE_DEPLOYMENT.md) - Pre-commit checklist
- [Git Commit Guide](./GIT_COMMIT_GUIDE.md) - Git workflow

## 🌐 Deployment

The project is configured for deployment on Netlify with two sites:
1. **Gatsby Website** - Main portfolio site
2. **Sanity Studio** - Content management interface

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed setup instructions.

## 🔧 Available Scripts

- `npm run dev` - Start Gatsby dev server
- `npm run dev:studio` - Start Sanity Studio
- `npm run build` - Build Gatsby site
- `npm run build:studio` - Build Sanity Studio
- `npm run deploy:graphql` - Deploy Sanity GraphQL schema
- `npm run pre-deploy` - Run pre-deployment checks

## 📝 License

Private project - All rights reserved
