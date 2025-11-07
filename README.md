# Personal Portfolio Website

A modern personal portfolio website built with Next.js 16, React 19, and TypeScript. Features a bio section, blog functionality, Twitter feed integration, and contact links.

## 🚀 Features

- **Personal Bio**: Dynamic bio section with profile image and description
- **Blog**: Markdown-based blog posts with syntax highlighting
- **Twitter Integration**: Displays recent tweets from Twitter API
- **Contact Links**: Social media and professional links (LinkedIn, Twitter, Facebook, GitHub)
- **Privacy Policy**: Dedicated privacy policy page
- **Analytics**: Integrated with Google Analytics, Vercel Analytics, and Speed Insights
- **Performance**: Optimized images, code splitting, and production source maps

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Styling**: SCSS (Sass)
- **Markdown**: react-markdown with remark-gfm
- **Syntax Highlighting**: react-syntax-highlighter
- **Twitter**: react-tweet and Twitter API v2
- **Analytics**: 
  - Google Analytics (via @next/third-parties)
  - Vercel Analytics
  - Vercel Speed Insights

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── blog/[id]/         # Dynamic blog post pages
│   ├── privacy-policy/    # Privacy policy page
│   ├── layout.tsx         # Root layout with analytics
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── bio/               # Bio section component
│   ├── blog-list/         # Blog list component
│   ├── body/              # Main body wrapper
│   ├── contacts/          # Contact links component
│   ├── footer/            # Footer component
│   ├── header/            # Header component
│   ├── main/              # Main App component
│   └── twitter/           # Twitter feed component
└── domain/                # Domain logic and data fetching
    ├── blog.ts            # Blog post fetching
    ├── contacts.ts        # Contact links data
    └── twitter.ts         # Twitter API integration

public/
├── assets/
│   ├── fonts/             # Custom fonts (Myriad Set Pro)
│   └── img/               # Images (profile photos)
├── posts/                 # Blog post markdown files
├── bio.json               # Bio data
└── posts.json             # Blog posts metadata
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version compatible with Next.js 16)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cra
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_V4=your_google_analytics_id
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production bundle:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Code Formatting

Format code using Prettier:
```bash
npm run prettier
```

### Bundle Analysis

Analyze bundle size:
```bash
npm run analyze
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prettier` - Format code with Prettier
- `npm run analyze` - Analyze bundle size with source-map-explorer

## 🔧 Configuration

### Next.js Configuration

The project uses `next.config.js` with:
- Production browser source maps enabled
- Image optimization for Twitter CDN domains (pbs.twimg.com, abs.twimg.com)

### TypeScript Configuration

TypeScript is configured with:
- Strict mode disabled (for flexibility)
- ES5 target with modern libs
- React JSX transform
- Path resolution with baseUrl

## 🌐 Environment Variables

- `NEXT_PUBLIC_GOOGLE_ANALYTICS_V4` - Google Analytics 4 tracking ID
- `TWITTER_BEARER_TOKEN` - Twitter API v2 Bearer Token for fetching tweets

## 📦 Dependencies

### Production
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `react-markdown` - Markdown rendering
- `react-syntax-highlighter` - Code syntax highlighting
- `react-tweet` - Twitter embed component
- `remark-gfm` - GitHub Flavored Markdown support
- `@next/third-parties` - Third-party integrations
- `@vercel/analytics` - Vercel Analytics
- `@vercel/speed-insights` - Performance monitoring

### Development
- `typescript` - TypeScript compiler
- `sass` - SCSS preprocessor
- `prettier` - Code formatter
- `source-map-explorer` - Bundle analyzer

## 🎨 Styling

The project uses SCSS modules for component styling:
- Component-specific styles in `*.module.scss` files
- Global styles in `index.scss`
- Custom fonts (Myriad Set Pro) in `public/assets/fonts/`

## 📱 Browser Support

The project targets modern browsers:
- >0.2% market share
- Not dead browsers
- Not IE <= 11
- Not Opera Mini

## 🚢 Deployment

The project is configured for deployment on Vercel (recommended) or any Node.js hosting platform that supports Next.js.

### Vercel Deployment

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The project includes Vercel Analytics and Speed Insights for production monitoring.

## 📄 License

Private project - All rights reserved.

## 👤 Author

**Rostyslav Belmeha**
- LinkedIn: [rostyslav-belmega-8b540643](https://www.linkedin.com/in/rostyslav-belmega-8b540643)
- Twitter: [@izzz0](https://twitter.com/izzz0)
- GitHub: [rbelmega](https://github.com/rbelmega)
- Website: [belmeha.com](https://www.belmeha.com)
