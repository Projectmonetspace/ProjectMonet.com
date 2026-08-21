import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import AnalyticsEvents from "./components/analytics-events";
import AuditModalProvider from "./components/audit-modal";
import CookieConsent from "./components/cookie-consent";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const canonicalOrigin = "https://www.projectmonet.com";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: { default: "Project Monet — Creator-Led Instagram Growth", template: "%s | Project Monet" },
  description: "Creator-led Instagram strategy, content and distribution built to turn attention into authority, growth and demand.",
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: "/", siteName: "Project Monet",
    title: "Elevate your Instagram presence to new heights",
    description: "Creator-led Instagram strategy, content and distribution.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Project Monet — Creator-led Instagram growth" }],
  },
  twitter: { card: "summary_large_image", title: "Elevate your Instagram presence to new heights", description: "Creator-led Instagram strategy, content and distribution.", images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-black-orange.png", type: "image/png", sizes: "1024x1024", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-offwhite-black.png", type: "image/png", sizes: "1024x1024", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-orange-black.png", type: "image/png", sizes: "1024x1024" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization", name: "Project Monet", url: canonicalOrigin,
  logo: `${canonicalOrigin}/android-chrome-512x512.png`, email: "contact@projectmonet.com",
  description: "Creator-led Instagram strategy, content, page optimization, management and measurement.",
  sameAs: ["https://www.instagram.com/projectmonet/"],
};
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "Project Monet", url: canonicalOrigin };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag;
          var storedConsent = null; try { storedConsent = window.localStorage.getItem('pm_com_analytics_consent'); } catch (error) {}
          gtag('consent', 'default', { analytics_storage: storedConsent === 'granted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
          gtag('set', 'ads_data_redaction', true);
        `}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={inter.variable}>
        <AuditModalProvider>{children}<AnalyticsEvents /><CookieConsent /></AuditModalProvider>
      </body>
    </html>
  );
}
