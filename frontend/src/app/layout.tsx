import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  metadataBase: new URL('https://gharbazaar.in'),
  title: {
    default: 'GharBazaar - India\'s Premier Property Platform',
    template: '%s | GharBazaar'
  },
  description: 'Find your dream home with GharBazaar - India\'s most trusted real estate platform. Zero broker fees, verified properties, and expert guidance.',
  keywords: ['real estate', 'property', 'India', 'buy', 'sell', 'rent', 'plots', 'homes', 'apartments', 'GharBazaar'],
  authors: [{ name: 'GharBazaar Team' }],
  creator: 'GharBazaar',
  publisher: 'GharBazaar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/logo.jpeg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/logo.jpeg', sizes: '512x512', type: 'image/jpeg' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
      { url: '/logo.jpeg', sizes: '152x152', type: 'image/jpeg' },
      { url: '/logo.jpeg', sizes: '144x144', type: 'image/jpeg' }
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gharbazaar.in',
    siteName: 'GharBazaar',
    title: 'GharBazaar - India\'s Premier Property Platform',
    description: 'Find your dream home with GharBazaar - India\'s most trusted real estate platform. Zero broker fees, verified properties, and expert guidance.',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'GharBazaar - India\'s Premier Property Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GharBazaar - India\'s Premier Property Platform',
    description: 'Find your dream home with GharBazaar - India\'s most trusted real estate platform. Zero broker fees, verified properties, and expert guidance.',
    images: ['/logo.jpeg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo.jpeg" sizes="180x180" />
        <link rel="apple-touch-icon" href="/logo.jpeg" sizes="152x152" />
        <link rel="apple-touch-icon" href="/logo.jpeg" sizes="144x144" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <meta name="msapplication-TileImage" content="/logo.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
