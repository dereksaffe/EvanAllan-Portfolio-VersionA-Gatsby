# Deployment Guide - Evan Allan Portfolio

This project has been updated to use:
- **Gatsby 5** (previously Gatsby 2)
- **Sanity Studio v3** (previously v1)
- **Node.js 18+** (required)
- **npm workspaces** (replaces Lerna)

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Project Structure

```
├── web/           # Gatsby frontend website
├── studio/        # Sanity Studio CMS
├── netlify.toml   # Netlify build configuration
└── package.json   # Root workspace configuration
```

## Local Development

### 1. Install Dependencies

From the root directory:

```bash
npm install
```

This will install dependencies for both the web and studio packages.

### 2. Set Up Environment Variables

For the **web** folder, create a `.env.development` file:

```bash
cd web
cp .env.development.example .env.development
# Edit .env.development with your values
```

Required environment variables:
- `GATSBY_SANITY_PROJECT_ID` - Your Sanity project ID (default: tyru08of)
- `GATSBY_SANITY_DATASET` - Your Sanity dataset (default: production)
- `SANITY_READ_TOKEN` - (Optional) For draft previews in development

### 3. Run Development Servers

**Gatsby Website:**
```bash
npm run dev
# or
cd web && npm run dev
```
Website runs at: http://localhost:8000

**Sanity Studio:**
```bash
npm run dev:studio
# or
cd studio && npm run dev
```
Studio runs at: http://localhost:3333

## Netlify Deployment

### Web (Gatsby Site)

The `netlify.toml` in the root is configured for the web build:

1. **Build Settings in Netlify Dashboard:**
   - Base directory: `web`
   - Build command: `npm run build`
   - Publish directory: `web/public`

2. **Environment Variables (set in Netlify Dashboard):**
   - `GATSBY_SANITY_PROJECT_ID`: `tyru08of`
   - `GATSBY_SANITY_DATASET`: `production`
   - `SANITY_READ_TOKEN`: (optional, for draft content)
   - `NODE_VERSION`: `18`

### Studio (Sanity v3)

The studio has its own `netlify.toml` in the `studio/` folder:

1. **Create a separate Netlify site** for the studio
2. **Build Settings:**
   - Base directory: `studio`
   - Build command: `npm run build`
   - Publish directory: `studio/dist`

3. **Environment Variables:**
   - `NODE_VERSION`: `18`

## Deploying GraphQL API

After making schema changes in Sanity Studio, deploy the GraphQL API:

```bash
cd studio
npm run deploy-graphql
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build Gatsby website |
| `npm run build:studio` | Build Sanity Studio |
| `npm run dev` | Run Gatsby development server |
| `npm run dev:studio` | Run Sanity Studio development server |
| `npm run clean` | Clean Gatsby cache |

## Triggering Builds from Sanity Studio

The Netlify build hooks are already configured in the Sanity dashboard widget. When you publish content in Sanity Studio, you can trigger a rebuild of the Gatsby site.

Build hook IDs (already configured):
- Studio: `5f4db6170dca7246d56813f8`
- Web: `5f4db61767e48b3bc578431a`

## Troubleshooting

### "Cannot find module" errors
Run `npm install` from the root directory to ensure all dependencies are installed.

### GraphQL errors
Make sure to deploy the Sanity GraphQL API after schema changes:
```bash
cd studio && npm run deploy-graphql
```

### Build fails on Netlify
1. Ensure Node.js version is set to 18 in Netlify environment variables
2. Clear build cache in Netlify dashboard
3. Check that all environment variables are set correctly

### Images not loading
Ensure the Sanity project ID and dataset are correct in your environment variables.

## Sanity Studio Login

Visit your deployed studio URL and log in with your Sanity credentials to manage content.

## Links

- **Live Site:** https://evanallan-portfolio-versiona-gatsby.netlify.app
- **Sanity Project:** https://www.sanity.io/manage/project/tyru08of
- **GitHub:** https://github.com/dereksaffe/EvanAllan-Portfolio-VersionA-Gatsby

