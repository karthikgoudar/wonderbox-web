import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wonder Box — Screen-Free AI Storytelling & Physical Play',
  description: 'Wonder Box transforms spoken voice prompts into interactive audio adventures and instant physical thermal coloring sheets. Operated by Mindfield Private Limited.',
  openGraph: {
    title: 'Wonder Box — Zero Screens. Infinite Imagination.',
    description: 'The screen-free AI hardware companion that turns speech into audio stories and instant physical prints.',
    url: 'https://wonderboxai.com',
    siteName: 'Wonder Box',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
