# Deploy Harper AI Marketing Website to Render

This guide will help you deploy the Harper AI marketing website to Render using the new repository.

## Prerequisites

- GitHub repository: https://github.com/Mohit4022-cloud/harper-ai-marketing-website
- Render account: https://dashboard.render.com

## Step 1: Push Code to New Repository

```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/Mohit4022-cloud/harper-ai-marketing-website.git

# Push to new repository
git push -u origin main
```

## Step 2: Deploy to Render

### Option A: Automatic Detection (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select `harper-ai-marketing-website`
5. Render should automatically detect the `render.yaml` file
6. Click **"Create Web Service"**

### Option B: Manual Configuration

If Render doesn't detect the configuration:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect to `harper-ai-marketing-website` repository
4. Configure as follows:

**Service Settings:**
- **Name**: `harper-ai-marketing-website`
- **Environment**: `Docker`
- **Branch**: `main`
- **Root Directory**: `.` (leave blank or put a dot)
- **Dockerfile Path**: `./Dockerfile`
- **Docker Build Context Directory**: `.`

**Environment Variables:**
- **PORT**: `10000` (Render will override this automatically)

**Advanced Settings:**
- **Health Check Path**: `/`
- **Auto-Deploy**: `Yes`

5. Click **"Create Web Service"**

## Step 3: Verify Deployment

After deployment starts:

1. Check the build logs in Render dashboard
2. Wait for "Live" status (usually 3-5 minutes)
3. Visit your site at: `https://harper-ai-marketing-website.onrender.com`

## Troubleshooting

### Build Fails

If the build fails, check:

1. **Package.json exists**: The Dockerfile expects npm packages
2. **Build command works locally**:
   ```bash
   npm install
   npm run build
   ```

### 404 Errors

If you get 404 errors:
- Check that the build output is in `dist/` directory
- Verify nginx configuration in Dockerfile

### Port Issues

If the site doesn't load:
- Render automatically sets the PORT environment variable
- Our Dockerfile handles this with the entrypoint script

## Local Testing

Test the Docker build locally:

```bash
# Build the image
docker build -t harper-ai-marketing .

# Run with port mapping
docker run -p 8080:80 -e PORT=80 harper-ai-marketing

# Visit http://localhost:8080
```

## Next Steps

Once deployed:

1. **Custom Domain**: Add your domain in Render settings
2. **SSL Certificate**: Automatically provisioned by Render
3. **CDN**: Consider enabling Cloudflare for better performance
4. **Monitoring**: Set up uptime monitoring

## Support

If you encounter issues:
1. Check Render build logs
2. Verify all files are committed to git
3. Ensure Docker builds locally
4. Contact Render support if needed

---

Your site should be live in a few minutes! 🚀