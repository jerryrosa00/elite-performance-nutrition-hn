import type { Metadata } from 'next';
import './globals.css';

const defaultSiteUrl = 'https://impulso-nutrition-hn.vuxoqwlhbdgkfeds.chatgpt.site';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Elite Performance Nutrition | Suplementos en Honduras',
    template: '%s | Elite Performance Nutrition',
  },
  description: 'Proteína, creatina, pre-entrenos y suplementos originales con envíos a toda Honduras.',
  keywords: ['suplementos Honduras', 'proteína', 'creatina', 'pre-workout', 'nutrición deportiva'],
  openGraph: {
    title: 'Elite Performance Nutrition',
    description: 'Elevá tu rendimiento. Superá tus límites. Suplementos deportivos con envíos a toda Honduras.',
    type: 'website',
    locale: 'es_HN',
    siteName: 'Elite Performance Nutrition',
    images: [{
      url: `${siteUrl}/og.png`,
      width: 1729,
      height: 910,
      alt: 'Elite Performance Nutrition — Elevá tu rendimiento. Superá tus límites.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Performance Nutrition',
    description: 'Elevá tu rendimiento. Superá tus límites.',
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: `${assetBasePath}/elite-logo.png`,
    apple: `${assetBasePath}/elite-logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

