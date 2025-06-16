# Harper AI Website Deployment Guide

## Overview

This guide covers deployment options for the Harper AI website built with Astro.

## Prerequisites

- Node.js 20+ installed
- Docker (for Docker deployment)
- Access to deployment platform (Render, Vercel, etc.)

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Run production build
npm run build:prod

# Or use the build script
npm run build:script
```

### Docker Build

```bash
# Build Docker image
npm run docker:build

# Run locally
npm run docker:run

# Or use docker-compose
npm run docker:compose
```

## Deployment Options

### 1. Render (Recommended)

1. Connect your GitHub repository to Render
2. The `render.yaml` file will automatically configure the deployment
3. Set environment variables in Render dashboard:
   - `SITE_URL`: Your production URL

### 2. Docker Deployment

Deploy the Docker image to any container hosting service:

```bash
# Build and tag image
docker build -t harper-ai-website:latest .

# Push to registry
docker tag harper-ai-website:latest your-registry/harper-ai-website:latest
docker push your-registry/harper-ai-website:latest
```

### 3. Static Hosting (Netlify, Vercel, etc.)

1. Build the site: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing if needed

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `SITE_URL`: Production URL (required for sitemap)
- Additional variables as needed

## Health Checks

Run health checks after build:

```bash
npm run healthcheck
```

## Monitoring

- Check `/health` endpoint for Docker deployments
- Monitor build logs in your deployment platform
- Set up uptime monitoring for production URL

## Troubleshooting

### Build Failures

1. Check type errors: `npm run type-check`
2. Fix formatting: `npm run format`
3. Clear cache: `npm run clean`

### Docker Issues

1. Ensure Docker daemon is running
2. Check port conflicts (8080 for local testing)
3. Verify environment variables are set

### Deployment Issues

1. Check deployment platform logs
2. Verify all environment variables are set
3. Ensure build command matches platform requirements

## Performance Optimization

The build is optimized for production with:

- Code splitting for better caching
- Compressed HTML output
- Optimized asset loading
- Proper cache headers (via nginx)

## Security

- Security headers configured in nginx
- HTTPS enforced in production
- Environment variables for sensitive data
- Regular dependency updates recommended