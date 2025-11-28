#!/bin/bash

# Pre-deployment script
# This script prepares the project for deployment

echo "🚀 Pre-deployment checklist..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from project root"
  exit 1
fi

# Step 1: Deploy GraphQL schema
echo ""
echo "📊 Step 1: Deploying Sanity GraphQL schema..."
cd studio
if [ ! -d "node_modules" ]; then
  echo "📦 Installing studio dependencies..."
  npm install
fi

echo "🔧 Deploying GraphQL schema..."
npm run deploy-graphql

if [ $? -ne 0 ]; then
  echo "❌ GraphQL deployment failed!"
  exit 1
fi

echo "✅ GraphQL schema deployed successfully"

# Step 2: Test builds
echo ""
echo "🏗️  Step 2: Testing builds..."

cd ../web
if [ ! -d "node_modules" ]; then
  echo "📦 Installing web dependencies..."
  npm install
fi

echo "🔨 Testing Gatsby build..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Gatsby build failed!"
  exit 1
fi

echo "✅ Gatsby build successful"

cd ../studio
echo "🔨 Testing Studio build..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Studio build failed!"
  exit 1
fi

echo "✅ Studio build successful"

cd ..

echo ""
echo "✅ All pre-deployment checks passed!"
echo ""
echo "📝 Next steps:"
echo "   1. Review changes: git status"
echo "   2. Add files: git add ."
echo "   3. Commit: git commit -m 'Your message'"
echo "   4. Push: git push origin main"
echo ""
echo "🌐 Netlify will auto-deploy after push"

