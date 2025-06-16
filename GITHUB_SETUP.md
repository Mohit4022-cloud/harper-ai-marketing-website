# GitHub Setup Instructions

## Option 1: Using GitHub CLI (Recommended)

1. **Authenticate GitHub CLI**:
   ```bash
   gh auth login
   ```
   - Choose: GitHub.com
   - Choose: HTTPS
   - Choose: Login with a web browser (or paste token)
   - Follow the prompts to authenticate

2. **Create and push the repository**:
   ```bash
   cd "/Users/mohit/Documents/Harper AI/harper-ai-website-v3"
   gh repo create harper-ai-website-v3 --public --source=. --remote=origin --push
   ```

## Option 2: Manual GitHub Creation

1. **Go to GitHub.com**
   - Log in to your account
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it: `harper-ai-website-v3`
   - Make it public
   - DON'T initialize with README (we already have one)
   - Click "Create repository"

2. **Push the code**:
   ```bash
   cd "/Users/mohit/Documents/Harper AI/harper-ai-website-v3"
   git push -u origin main
   ```

## Option 3: Push to Existing Repository

If you want to push this as a new branch to your existing harper-ai-website repo:

```bash
cd "/Users/mohit/Documents/Harper AI/harper-ai-website-v3"
git remote set-url origin https://github.com/Mohit4022-cloud/harper-ai-website.git
git checkout -b v3
git push -u origin v3
```

## After Pushing

Once the code is on GitHub:

1. **Deploy to Render**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Render will detect the `render.yaml` automatically
   - Click "Create Static Site"

2. **Or use GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Add custom domain if needed

The repository is ready and waiting to be pushed! 🚀