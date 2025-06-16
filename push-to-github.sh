#!/bin/bash

echo "Harper AI V3 - GitHub Push Script"
echo "================================="
echo ""
echo "This script will push your website to GitHub."
echo ""
echo "FIRST: Create a new repository on GitHub.com:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: harper-ai-website-v3"
echo "3. Set to Public"
echo "4. DO NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter once you've created the repository..."

# Set the remote URL
git remote set-url origin https://github.com/Mohit4022-cloud/harper-ai-website-v3.git

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Your website is now on GitHub."
echo ""
echo "Next steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Create a new Static Site"
echo "3. Connect your GitHub repository"
echo "4. Deploy!"