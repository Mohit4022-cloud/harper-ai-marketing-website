import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  if (import.meta.env.PUBLIC_SITE_URL) return import.meta.env.PUBLIC_SITE_URL;
  return 'http://localhost:4321';
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Mark a performance timestamp
  mark(name: string) {
    if ('performance' in window) {
      performance.mark(name);
    }
  },
  
  // Measure between two marks
  measure(name: string, startMark: string, endMark: string) {
    if ('performance' in window) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        return measure ? measure.duration : null;
      } catch (e) {
        console.warn('Performance measurement failed:', e);
        return null;
      }
    }
    return null;
  },
  
  // Get Core Web Vitals
  getCoreWebVitals() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        // First Contentful Paint
        fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null,
        // Largest Contentful Paint (requires PerformanceObserver)
        lcp: null, // Will be set by observer
        // Time to Interactive
        tti: navigation ? navigation.loadEventEnd - navigation.fetchStart : null,
        // Total Blocking Time (simplified)
        tbt: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : null,
      };
    }
    return null;
  },
  
  // Initialize performance observers
  initObservers(callback?: (metric: any) => void) {
    if ('PerformanceObserver' in window) {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (callback) {
          callback({ name: 'LCP', value: lastEntry.startTime });
        }
      });
      
      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported
      }
      
      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (callback) {
            callback({ name: 'FID', value: entry.processingStart - entry.startTime });
          }
        });
      });
      
      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // FID not supported
      }
      
      // Observe Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            if (callback) {
              callback({ name: 'CLS', value: clsValue });
            }
          }
        });
      });
      
      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // CLS not supported
      }
    }
  }
};

// Utility to prefetch critical resources
export function prefetchCriticalResources(resources: string[]) {
  if ('link' in document.createElement('link')) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      link.as = resource.endsWith('.js') ? 'script' : 
                resource.endsWith('.css') ? 'style' : 
                resource.match(/\.(jpg|jpeg|png|webp|avif)$/) ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  }
}

// Utility for lazy loading components
export function lazyLoadComponent(componentPath: string, rootMargin = '100px') {
  return new Promise((resolve) => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            import(componentPath).then(resolve);
            observer.disconnect();
          }
        });
      }, { rootMargin });
      
      // Start observing when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          const target = document.querySelector('[data-lazy-component]');
          if (target) observer.observe(target);
        });
      } else {
        const target = document.querySelector('[data-lazy-component]');
        if (target) observer.observe(target);
      }
    } else {
      // Fallback: load immediately
      import(componentPath).then(resolve);
    }
  });
}