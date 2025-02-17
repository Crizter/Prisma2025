import { Crimson_Text } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'

const crimsonText = Crimson_Text({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'Prisma 2025 | SRM University Delhi-NCR | Techno-Cultural Fest',
  description: 'Official website for SRM University Delhi-NCR\'s Prisma 2025 -Techno-cultural fest from February 28 to March 1. Featuring competitions, performances & technical events.',
  keywords: [
    'Prisma',
    'Prisma-SRMUH',
    'Prisma 2025',
    'SRM Delhi-NCR fest',
    'College fest Haryana',
    'College fest Delhi-NCR',
    'College fest NCR',
    'College fest Delhi',
    'Technical events Sonepat',
    'Horror theme festival',
    'SRM University cultural fest'
  ],
  openGraph: {
    type: 'website',
    url: 'https://prsimasrm.in',
    images: [
      {
        url: 'https://prsimasrm.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prisma Presenta 2025 Official Banner',
      }
    ],
    siteName: 'Prisma SRM',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PrismaSRM',
    creator: '@PrismaSRM',
    images: 'https://prsimasrm.in/twitter-og.jpg'
  },
  metadataBase: new URL('https://prsimasrm.in'),
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={crimsonText.variable}>
      <head>
        <link
          rel="icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
          sizes="any"
        />
        <link
          rel="icon"
          href="/favicon/favicon.svg"
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="/favicon/site.webmanifest"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <script
          // type="application/ld+json"
          // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
