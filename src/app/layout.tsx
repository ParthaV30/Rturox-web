import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import FloatingCTA from '@/components/FloatingCTA'
import ParticleField from '@/components/ParticleField'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
    weight: ['400', '500'],
})

export const metadata: Metadata = {
    title: 'Rturox — Tech Studio · Coimbatore',
    description: 'Rturox is a Coimbatore-based tech studio. We design, build, and launch websites, apps, and automation for businesses that want to grow. Starting at ₹15,000.',
    keywords: ['web development coimbatore', 'mobile app development coimbatore', 'tech studio coimbatore', 'website design coimbatore', 'rturox'],
    authors: [{ name: 'Rturox', url: 'https://rturox.vercel.app' }],
    creator: 'Rturox',
    icons: { icon: '/logo.png', apple: '/logo.png' },
    metadataBase: new URL('https://rturox.vercel.app'),
    openGraph: {
        title: 'Rturox — Tech Studio · Coimbatore',
        description: 'We design, build, and launch websites, apps, and automation for businesses that want to grow. Starting at ₹15,000.',
        type: 'website',
        url: 'https://rturox.vercel.app',
        siteName: 'Rturox',
        images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Rturox Tech Studio' }],
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rturox — Tech Studio · Coimbatore',
        description: 'We design, build, and launch websites, apps, and automation for businesses that want to grow.',
        images: ['/logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: {
        canonical: 'https://rturox.vercel.app',
    },
}

// LocalBusiness JSON-LD structured data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rturox',
    description: 'Coimbatore-based tech studio building websites, apps, and automation for businesses.',
    url: 'https://rturox.vercel.app',
    telephone: '+916381169124',
    email: 'rturoxtechnology@gmail.com',
    foundingDate: '2023',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vadavalli',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        postalCode: '641046',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.0168,
        longitude: 76.9558,
    },
    openingHours: 'Mo-Sa 09:00-19:00',
    priceRange: '₹₹',
    sameAs: [
        'https://www.instagram.com/rturox_tech',
        'https://github.com/sivamathavan',
        'https://wa.me/6381169124',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Automation' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
        ],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-body" style={{ background: '#0a0a0a' }}>
                <ParticleField />
                <ScrollProgress />
                <CursorGlow />
                <div className="relative z-10">
                    {children}
                </div>
                <FloatingCTA />
                <CookieConsent />
            </body>
        </html>
    )
}
