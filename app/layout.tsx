import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://impulso-nutrition-hn.vuxoqwlhbdgkfeds.chatgpt.site'),
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
      url: 'https://impulso-nutrition-hn.vuxoqwlhbdgkfeds.chatgpt.site/og.png',
      width: 1729,
      height: 910,
      alt: 'Elite Performance Nutrition — Elevá tu rendimiento. Superá tus límites.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Performance Nutrition',
    description: 'Elevá tu rendimiento. Superá tus límites.',
    images: ['https://impulso-nutrition-hn.vuxoqwlhbdgkfeds.chatgpt.site/og.png'],
  },
  icons: {
    icon: '/elite-logo.png',
    apple: '/elite-logo.png',
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

