import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@acme/app/components/SiteHeader';
import { SiteFooter } from '@acme/app/components/SiteFooter';

export const metadata: Metadata = {
  title: {default: 'Uptaco | Breakfast tacos in NYC', template: '%s | Uptaco'},
  description: 'Hand-pressed breakfast tacos, burritos, coffee and more at Uptaco Harlem and Midtown. Order pickup, explore catering and discover our café partners.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.uptaco.nyc'),
  robots: process.env.NEXT_PUBLIC_SITE_URL ? undefined : {index:false,follow:false}
};

/** Framework document boundary only. Product screens use semantic @acme/ui/html. */
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className="uptaco-site">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
