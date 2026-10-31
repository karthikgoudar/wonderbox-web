import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wonderboxai.com'),
  title: {
    default: 'Wonder Box | Screen-Free AI Storytelling & Physical Play',
    template: '%s | Wonder Box',
  },
  description:
    'Wonder Box transforms spoken voice prompts in English, Hinglish, and Kanglish into interactive audio adventures and instant physical thermal coloring stickers. Zero screens. Infinite imagination. Operated by Mindfield Private Limited.',
  keywords: [
    'Wonder Box',
    'screen-free AI toy',
    'AI storytelling for kids',
    'multilingual children hardware',
    'Hinglish voice stories',
    'Kanglish kids stories',
    'thermal coloring sticker toy',
    'Mindfield Private Limited',
    'educational AI hardware India',
  ],
  authors: [{ name: 'Karthik S Goudar' }],
  creator: 'Mindfield Private Limited',
  publisher: 'Mindfield Private Limited',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wonder Box: Zero Screens. Infinite Imagination.',
    description:
      'The screen-free AI hardware companion that turns speech into audio stories and instant physical prints.',
    url: 'https://wonderboxai.com',
    siteName: 'Wonder Box',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mindfield Private Limited',
    alternateName: 'Wonder Box',
    url: 'https://wonderboxai.com',
    logo: 'https://wonderboxai.com/wonderbox_device.png',
    founder: {
      '@type': 'Person',
      name: 'Karthik S Goudar',
      jobTitle: 'Founder & CEO',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shimoga',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9886-965-964',
      contactType: 'customer support',
      email: 'contact@wonderboxai.com',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'WonderBox Screen-Free AI Storytelling Device',
    image: 'https://wonderboxai.com/wonderbox_device.png',
    description:
      'A dedicated screen-free physical AI companion for children ages 3-12 that listens to speech in English, Hinglish, and Kanglish, narrates immersive audio adventures, and prints instant black-and-white thermal coloring sheets.',
    brand: {
      '@type': 'Brand',
      name: 'WonderBox',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Mindfield Private Limited',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/PreOrder',
      url: 'https://wonderboxai.com/#waitlist-top',
    },
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: '3',
      suggestedMaxAge: '12',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
