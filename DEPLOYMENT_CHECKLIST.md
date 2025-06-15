# Harper AI Website Deployment Checklist

Use this checklist before deploying to production to ensure a smooth and successful deployment.

## Pre-Deployment Checks

### Code Quality
- [ ] All TypeScript files pass type checking (`npm run type-check`)
- [ ] Code is properly formatted (`npm run format`)
- [ ] No console.log statements in production code
- [ ] All TODO comments have been addressed
- [ ] Code has been reviewed by at least one team member

### Build Verification
- [ ] Production build completes successfully (`npm run build:prod`)
- [ ] Health checks pass (`npm run healthcheck`)
- [ ] Build size is within acceptable limits (< 5MB total)
- [ ] All assets are properly optimized

### Testing
- [ ] All pages load without JavaScript errors
- [ ] Forms submit correctly (demo request, trial signup)
- [ ] Navigation works on all devices
- [ ] Interactive components function properly (ROI calculator)
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing completed

### SEO & Accessibility
- [ ] All images have appropriate alt text
- [ ] Meta tags are present on all pages
- [ ] Sitemap is generated and valid
- [ ] robots.txt is properly configured
- [ ] All links are working (no 404s)
- [ ] Accessibility audit passes (WCAG 2.1 AA)
- [ ] Structured data is valid (test with Google's tool)

### Performance
- [ ] Lighthouse scores meet targets (90+ on all metrics)
- [ ] Core Web Vitals pass:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Images are optimized and using appropriate formats
- [ ] JavaScript bundle size is acceptable
- [ ] Critical CSS is inlined

### Security
- [ ] No sensitive data in code or environment variables
- [ ] Security headers are configured (CSP, HSTS, etc.)
- [ ] Dependencies are up to date (`npm audit`)
- [ ] HTTPS is enforced
- [ ] API keys are properly secured

### Content
- [ ] All copy has been reviewed and approved
- [ ] Legal pages are up to date (privacy policy, terms)
- [ ] Contact information is correct
- [ ] Pricing information is accurate
- [ ] Case studies have been approved by customers

## Deployment Process

### 1. Pre-deployment (15 minutes)
- [ ] Create a backup of current production
- [ ] Notify team of upcoming deployment
- [ ] Ensure rollback plan is ready
- [ ] Verify all environment variables are set

### 2. Deployment (10 minutes)
- [ ] Push to main branch (triggers automatic deployment)
- [ ] Monitor GitHub Actions workflow
- [ ] Watch deployment logs on hosting platform
- [ ] Verify deployment completed successfully

### 3. Post-deployment Verification (20 minutes)
- [ ] Production site loads correctly
- [ ] Run quick smoke tests:
  - [ ] Homepage loads
  - [ ] Navigation works
  - [ ] Forms can be submitted
  - [ ] No console errors
- [ ] Check key user flows:
  - [ ] Demo request flow
  - [ ] Trial signup flow
  - [ ] Content pages load
- [ ] Verify analytics tracking is working
- [ ] Check error monitoring for any issues

### 4. Performance Verification (10 minutes)
- [ ] Run Lighthouse audit on production
- [ ] Check Core Web Vitals in production
- [ ] Verify CDN is serving assets
- [ ] Test page load times from different locations

### 5. Monitoring Setup (5 minutes)
- [ ] Uptime monitoring is active
- [ ] Error tracking is configured
- [ ] Analytics is collecting data
- [ ] Set up alerts for critical issues

## Rollback Procedure

If issues are discovered:

1. **Immediate Rollback** (< 5 minutes)
   - [ ] Revert to previous Docker image
   - [ ] Or redeploy previous commit
   - [ ] Verify rollback successful

2. **Communication**
   - [ ] Notify team of rollback
   - [ ] Document issues encountered
   - [ ] Create action items for fixes

3. **Root Cause Analysis**
   - [ ] Identify what went wrong
   - [ ] Update deployment checklist
   - [ ] Plan fixes for next deployment

## Post-Deployment Tasks

### Within 1 Hour
- [ ] Monitor error logs
- [ ] Check user feedback channels
- [ ] Verify all integrations working
- [ ] Review performance metrics

### Within 24 Hours
- [ ] Review analytics for anomalies
- [ ] Check search console for issues
- [ ] Gather team feedback
- [ ] Document lessons learned

### Within 1 Week
- [ ] Full accessibility audit
- [ ] SEO performance review
- [ ] User experience feedback
- [ ] Performance trend analysis

## Emergency Contacts

- **DevOps Lead**: [Contact Info]
- **Engineering Manager**: [Contact Info]
- **On-call Engineer**: [Contact Info]
- **Hosting Support**: [Contact Info]

## Useful Commands

```bash
# Build and verify
npm run build:prod
npm run healthcheck

# Docker operations
npm run docker:build
npm run docker:run

# Quick checks
npm run type-check
npm run lint

# View logs
docker logs [container-id]

# Rollback
git revert --no-edit HEAD
git push origin main
```

## References

- [Deployment Guide](./DEPLOYMENT.md)
- [README](./README.md)
- [GitHub Actions Workflow](./.github/workflows/deploy.yml)
- [Render Dashboard](https://dashboard.render.com)
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

Last updated: 2025-01-15
Version: 1.0.0