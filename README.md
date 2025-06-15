# Harper AI Marketing Website

A high-performance, modern marketing website built with Astro 4.x, TypeScript, and Tailwind CSS. This website showcases Harper AI's revenue intelligence platform with a focus on performance, accessibility, and conversion optimization.

## Overview

Harper AI's marketing website is designed to deliver exceptional user experience while maintaining blazing-fast performance. Built with modern web technologies and best practices, it achieves perfect Core Web Vitals scores and provides a seamless experience across all devices.

### Key Features

- **Revenue Intelligence Platform Showcase**: Comprehensive product information and demos
- **Interactive ROI Calculator**: Help prospects understand the value Harper AI delivers
- **Case Studies**: Real-world success stories from customers
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Sub-second load times with optimized assets
- **SEO Ready**: Server-side rendering with structured data
- **Accessibility First**: WCAG 2.1 AA compliant
- **Type-Safe**: Full TypeScript support throughout the codebase
- **Component Library**: Reusable UI components with Shadcn/UI
- **Analytics Ready**: Integration points for tracking and analytics

## Tech Stack

### Core Technologies

- **[Astro](https://astro.build)** (v4.16.18) - Static site generator with partial hydration
- **[TypeScript](https://www.typescriptlang.org)** (v5.7.2) - Type-safe JavaScript
- **[React](https://react.dev)** (v18.3.1) - For interactive components
- **[Tailwind CSS](https://tailwindcss.com)** (v3.4.17) - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com)** - Accessible component library

### Supporting Libraries

- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, consistent icons
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Intelligent class merging

### Development Tools

- **Prettier** - Code formatting with Astro plugin
- **Docker** - Containerization for consistent deployments
- **Nginx** - Production web server with optimized configuration

## Project Structure

```
harper-ai-website-v3/
├── public/
│   ├── images/         # Optimized images
│   ├── icons/          # SVG icons and favicons
│   ├── avatars/        # User avatars for testimonials
│   └── logos/          # Company and partner logos
├── src/
│   ├── components/
│   │   ├── ui/         # Base UI components (Button, Card, etc.)
│   │   ├── layout/     # Layout components (Navigation, Footer)
│   │   ├── sections/   # Page sections (Hero, Features, etc.)
│   │   ├── content/    # Content components (testimonials, etc.)
│   │   └── home/       # Homepage-specific components
│   ├── content/
│   │   └── case-studies/  # Markdown case study content
│   ├── layouts/        # Astro layout templates
│   ├── lib/            # Utility functions and helpers
│   ├── pages/          # Route pages
│   └── styles/         # Global styles and CSS
├── scripts/            # Build and deployment scripts
├── docker files        # Docker configuration
└── configuration       # Various config files
```

## Installation

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/harper-ai/harper-ai-website-v3.git
cd harper-ai-website-v3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Development Guide

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 4321 |
| `npm run build` | Build for production with type checking |
| `npm run build:prod` | Full production build with cleanup and health checks |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Check code formatting |
| `npm run format` | Auto-format code with Prettier |
| `npm run clean` | Remove build artifacts |
| `npm run healthcheck` | Verify build integrity |

### Development Workflow

1. **Feature Development**
   - Create feature branch from `main`
   - Develop using `npm run dev`
   - Ensure type safety with `npm run type-check`
   - Format code with `npm run format`

2. **Component Development**
   - UI components go in `src/components/ui/`
   - Follow existing patterns for consistency
   - Include TypeScript types for all props
   - Add accessibility attributes

3. **Adding Pages**
   - Create `.astro` files in `src/pages/`
   - Use appropriate layout from `src/layouts/`
   - Include SEO component with metadata
   - Follow URL naming conventions

4. **Styling Guidelines**
   - Use Tailwind utility classes
   - Custom styles in component files only
   - Follow design system tokens in `global.css`
   - Maintain responsive breakpoints

### Code Quality Standards

- **TypeScript**: Strict mode enabled, no any types
- **Components**: Single responsibility, fully typed props
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Lazy load images, minimize JavaScript
- **SEO**: Proper meta tags, structured data, sitemap

## Deployment

### Production Build

```bash
# Standard production build
npm run build:prod

# Or use the build script
npm run build:script
```

### Deployment Options

#### 1. Render (Recommended)

The project includes a `render.yaml` for automatic deployment:

1. Connect GitHub repository to Render
2. Render will auto-detect configuration
3. Set environment variables:
   - `SITE_URL`: Your production URL

#### 2. Docker Deployment

```bash
# Build Docker image
npm run docker:build

# Run locally for testing
npm run docker:run

# Or use docker-compose
npm run docker:compose
```

Deploy to any container service (AWS ECS, Google Cloud Run, etc.)

#### 3. Static Hosting

Deploy the `dist/` folder to:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

### Environment Variables

Create a `.env` file for local development:

```env
SITE_URL=https://harper-ai.com
# Add other environment variables as needed
```

### Performance Metrics

The website is optimized to achieve:

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.0s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 200KB (excluding images)

## Testing

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works on all devices
- [ ] Forms submit correctly
- [ ] Images have proper alt text
- [ ] Links are not broken
- [ ] Responsive design works properly
- [ ] Accessibility tools pass

### Automated Checks

```bash
# Type checking
npm run type-check

# Build verification
npm run healthcheck

# Format checking
npm run lint
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Run `npm run clean` then rebuild
   - Check for TypeScript errors: `npm run type-check`
   - Verify Node.js version is 20+

2. **Development Server Issues**
   - Clear port 4321 if in use
   - Delete `node_modules` and reinstall
   - Check for syntax errors in `.astro` files

3. **Docker Build Issues**
   - Ensure Docker daemon is running
   - Check available disk space
   - Verify environment variables

## Contributing

### Guidelines

1. **Code Style**
   - Follow existing patterns
   - Use Prettier formatting
   - Write meaningful commit messages

2. **Pull Requests**
   - Create feature branch from `main`
   - Include description of changes
   - Ensure all checks pass
   - Request review from team

3. **Issues**
   - Use issue templates
   - Provide reproduction steps
   - Include environment details

### Development Setup

1. Fork the repository
2. Clone your fork
3. Create feature branch
4. Make changes
5. Run tests and checks
6. Submit pull request

## Security

- Regular dependency updates via Dependabot
- Security headers configured in Nginx
- Environment variables for sensitive data
- HTTPS enforced in production
- Content Security Policy implemented

## License

Copyright © 2025 Harper AI. All rights reserved.

This is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

## Support

For support, please contact:
- Technical Issues: engineering@harper-ai.com
- General Inquiries: support@harper-ai.com
- Security: security@harper-ai.com

## Acknowledgments

Built with modern open-source technologies. Special thanks to the Astro, React, and Tailwind CSS communities for their excellent tools and documentation.