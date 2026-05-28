import type { Metadata } from "next";
import { Geist_Mono, Tomorrow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-tomorrow",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    shortcut: "/icon.png",
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180"
      }
    ]
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${tomorrow.variable} ${geistMono.variable}`}>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PMT8RLKEZN" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PMT8RLKEZN');
          `}
        </Script>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.domain,
            description: siteConfig.description,
            publisher: {
              "@type": "Organization",
              name: siteConfig.shortName,
              url: siteConfig.domain
            },
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.domain}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }}
        />
        <div className="paper-shell">
          <SiteHeader />
          {children}
          <footer className="container py-12">
            <div className="flex flex-col gap-4 border-t border-graphite pt-7 md:flex-row md:items-center md:justify-between">
              <p className="text-[14px] font-medium text-silver-text">{siteConfig.disclaimer}</p>
              <p className="text-[14px] font-medium text-silver-text">
                Updated for pre-launch research and Early Access verification.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
