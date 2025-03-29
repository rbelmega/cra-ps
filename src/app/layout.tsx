import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import '../index.scss';

interface IRootLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Rostyslav Belmeha',
  description:
    'Experienced Web Developer | Expertise in UI Frameworks and Business Intelligence',
};

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <head>
        <title>Rostyslav Belmeha</title>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4} />
      </head>
      <SpeedInsights />
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
