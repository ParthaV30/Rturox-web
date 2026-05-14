import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import IndustriesStrip from '@/components/IndustriesStrip'
import Services from '@/components/Services'

// Lazy load everything below the fold
const Automation = dynamic(() => import('@/components/Automation'))
const HowWeWork = dynamic(() => import('@/components/HowWeWork'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const TrustedBy = dynamic(() => import('@/components/TrustedBy'))
const SevenDays = dynamic(() => import('@/components/SevenDays'))
const Results = dynamic(() => import('@/components/Results'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const Pricing = dynamic(() => import('@/components/Pricing'))
const FAQ = dynamic(() => import('@/components/FAQ'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <IndustriesStrip />
            <Services />
            <Automation />
            <HowWeWork />
            <Portfolio />
            <TrustedBy />
            <SevenDays />
            <Results />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
            <Footer />
        </main>
    )
}
