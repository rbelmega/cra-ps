import Script from 'next/script';
import '../index.scss';
import { Metadata } from 'next';

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
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_V4}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
