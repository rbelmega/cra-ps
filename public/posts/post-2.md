Achieving a high performance score in Google PageSpeed Insights is crucial for modern web development. Not only does it improve user experience, but it also impacts SEO rankings and conversion rates. In this article, I'll share the best practices I've learned from optimizing numerous websites to reach 90+ scores.

## Understanding PageSpeed Insights Metrics

PageSpeed Insights evaluates your site based on several Core Web Vitals and performance metrics:

- **Largest Contentful Paint (LCP)**: Measures loading performance (target: < 2.5s)
- **Interaction to Next Paint (INP)**: Measures interactivity and responsiveness (target: < 200ms)
- **Cumulative Layout Shift (CLS)**: Measures visual stability (target: < 0.1)
- **First Contentful Paint (FCP)**: Measures initial rendering (target: < 1.8s)
- **Speed Index**: Measures how quickly content is visually displayed
- **Time to Interactive (TTI)**: Measures when page becomes fully interactive

> **Note**: INP replaced First Input Delay (FID) as a Core Web Vital in March 2024. INP provides a more comprehensive measure of interactivity by considering all user interactions, not just the first one.

## Image Optimization

Images are often the largest assets on a page. Here's how to optimize them:

### Use Modern Image Formats

```javascript
// Use WebP or AVIF formats with fallbacks
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

### Implement Lazy Loading

```javascript
// Native lazy loading
<img src="image.jpg" loading="lazy" alt="Description">

// Or with Intersection Observer for more control
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
```

### Responsive Images

```html
<img 
  srcset="image-320w.jpg 320w,
          image-640w.jpg 640w,
          image-1024w.jpg 1024w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="image-640w.jpg"
  alt="Description">
```

## JavaScript Optimization

### Code Splitting and Lazy Loading

```javascript
// Dynamic imports for route-based code splitting
const Component = lazy(() => import('./Component'));

// Or for specific features
const loadFeature = async () => {
  const module = await import('./feature');
  module.init();
};
```

### Minimize JavaScript Execution Time

```javascript
// Defer non-critical JavaScript
<script defer src="non-critical.js"></script>

// Or use async for independent scripts
<script async src="analytics.js"></script>

// Remove unused code
// Use tree-shaking and dead code elimination
```

### Reduce Third-Party Script Impact

```javascript
// Load third-party scripts asynchronously
// Use resource hints
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">

// Defer analytics and tracking scripts
window.addEventListener('load', () => {
  // Load analytics after page load
  loadAnalytics();
});
```

## CSS Optimization

### Critical CSS Inlining

```html
<!-- Inline critical CSS -->
<style>
  /* Critical above-the-fold styles */
  .header { ... }
  .hero { ... }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Remove Unused CSS

```javascript
// Use tools like PurgeCSS
// purgecss.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  css: ['./src/styles.css']
};
```

### Avoid Render-Blocking CSS

```html
<!-- Use media queries to load CSS conditionally -->
<link rel="stylesheet" href="print.css" media="print">
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">
```

## Font Optimization

### Font Loading Strategy

```html
<!-- Preload critical fonts -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap -->
<style>
  @font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2');
    font-display: swap;
  }
</style>
```

### Subset Fonts

```css
/* Only include characters you need */
@font-face {
  font-family: 'CustomFont';
  src: url('font-subset.woff2') format('woff2');
  unicode-range: U+0020-007F; /* Latin characters only */
}
```

## Caching Strategies

### HTTP Caching Headers

```javascript
// Server configuration example (Node.js/Express)
app.use(express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Or with service worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

### Browser Caching

```html
<!-- Cache-Control headers -->
<!-- For static assets: max-age=31536000, immutable -->
<!-- For HTML: max-age=0, must-revalidate -->
```

## Server-Side Optimizations

### Enable Compression

```javascript
// Gzip/Brotli compression
const compression = require('compression');
app.use(compression({
  level: 6,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
```

### Use CDN

```html
<!-- Serve static assets from CDN -->
<link rel="stylesheet" href="https://cdn.example.com/styles.css">
<script src="https://cdn.example.com/script.js"></script>
```

### HTTP/2 and HTTP/3

```nginx
# Enable HTTP/2
listen 443 ssl http2;

# Enable HTTP/3 (QUIC)
listen 443 quic reuseport;
```

## Next.js Specific Optimizations

### Image Component

```javascript
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
  priority={false} // Use true for above-the-fold images
  loading="lazy"
  placeholder="blur"
/>
```

### Font Optimization

```javascript
// next.config.js
module.exports = {
  optimizeFonts: true,
  // Automatically optimizes Google Fonts
};
```

### Script Optimization

```javascript
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload" // or "afterInteractive", "beforeInteractive"
/>
```

## Monitoring and Testing

### Regular Performance Audits

```javascript
// Use Lighthouse CI
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://example.com'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}]
      }
    }
  }
};
```

### Real User Monitoring (RUM)

```javascript
// Track Core Web Vitals
import {onCLS, onINP, onLCP} from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
```

## Common Pitfalls to Avoid

1. **Blocking JavaScript**: Always defer or async non-critical scripts
2. **Large Bundle Sizes**: Use code splitting and tree shaking
3. **Unoptimized Images**: Always compress and use modern formats
4. **Render-Blocking CSS**: Inline critical CSS, defer the rest
5. **Too Many HTTP Requests**: Combine files, use sprites, implement HTTP/2
6. **No Caching**: Implement proper cache headers
7. **Third-Party Scripts**: Load them asynchronously or defer them

## Quick Checklist

- [ ] Optimize and compress all images
- [ ] Implement lazy loading for images and components
- [ ] Minimize and bundle JavaScript
- [ ] Inline critical CSS
- [ ] Use modern font loading strategies
- [ ] Enable compression (Gzip/Brotli)
- [ ] Set proper cache headers
- [ ] Minimize render-blocking resources
- [ ] Reduce server response time
- [ ] Use CDN for static assets
- [ ] Monitor Core Web Vitals regularly

## Conclusion

Achieving a high PageSpeed Insights score requires a holistic approach. Focus on:

1. **Optimizing assets** (images, fonts, CSS, JS)
2. **Reducing render-blocking resources**
3. **Implementing proper caching**
4. **Minimizing JavaScript execution time**
5. **Monitoring and continuous improvement**

Remember, performance is not a one-time task but an ongoing process. Regular audits and optimizations will help maintain high scores as your site evolves.

Start with the biggest wins first - usually image optimization and JavaScript bundling - then work your way through the other optimizations. Your users (and Google) will thank you!

