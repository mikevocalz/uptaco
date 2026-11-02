import type { Metadata } from 'next';
import '@fontsource-variable/fredoka/wght.css';
import '@fontsource-variable/bricolage-grotesque/wght.css';
import './globals.css';
import './brand.css';
import './experience.css';
import './forms.css';
import './product-media.css';
import './responsive-fixes.css';
import './soft-rise.css';
import './design-study.css';
import { SiteHeader } from '@acme/app/components/SiteHeader';
import { SiteFooter } from '@acme/app/components/SiteFooter';
import { MobileTabBar } from '@acme/app/components/MobileTabBar.web';
import { BagPill } from '@acme/app/components/BagPill';
import { BagMotionCoordinator } from '@acme/app/components/BagMotionCoordinator';
import { Link as SemanticLink } from '@acme/ui/html';
export const metadata:Metadata={
  title:{default:'Uptaco | Breakfast tacos in NYC',template:'%s | Uptaco'},
  description:'Hand-pressed breakfast tacos, burritos and good mornings in Harlem and Midtown. Explore the menu, build your bag and discover catering.',
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL??'https://www.uptaco.nyc'),
  robots:process.env.NEXT_PUBLIC_SITE_URL?undefined:{index:false,follow:false}
};
/** Framework document boundary. Product screens only use semantic @acme/ui/html. */
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body className="uptaco-site">
    <SemanticLink className="skip-link" href="#main-content">Skip to content</SemanticLink>
    <SiteHeader/>
    {children}
    <SiteFooter/>
    <BagPill variant="mobile"/>
    <MobileTabBar/>
    <BagMotionCoordinator/>
  </body></html>;
}
