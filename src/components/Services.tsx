"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Smartphone, Palette, TrendingUp, Cloud, Shield, Bot, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
    {
        icon: Globe,
        title: 'Web Development',
        desc: 'Fast, responsive websites and web apps built with React, Next.js, and modern tech.',
        full: {
            intro: 'We build lightning-fast, modern websites and web applications tailored for performance, scalability, and user experience. Using technologies like React, Next.js, Node.js, and modern APIs, we create platforms that not only look premium but also convert visitors into customers. From business websites to custom dashboards and SaaS platforms, every project is optimized for speed, SEO, responsiveness, and future growth.',
            offers: ['Custom business websites', 'Full-stack web applications', 'E-commerce platforms', 'Admin dashboards & portals', 'API integrations', 'SEO & performance optimization', 'Responsive mobile-first development'],
        },
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        desc: 'iOS and Android apps that users love — built with React Native or Flutter.',
        full: {
            intro: 'We design and develop high-performance mobile applications for both iOS and Android. Whether you need a startup MVP, business app, booking platform, or customer engagement app, we create smooth, scalable mobile experiences users enjoy using daily. Built with React Native or Flutter for faster deployment and consistent performance across devices.',
            offers: ['Android & iOS app development', 'Cross-platform apps', 'Booking & service apps', 'Business management apps', 'Push notifications & analytics', 'App Store & Play Store deployment', 'Real-time features & API integrations'],
        },
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        desc: 'Interfaces designed for clarity and conversion. Figma-first, pixel-perfect.',
        full: {
            intro: 'Great design creates trust. We craft premium, user-focused interfaces that combine modern aesthetics with conversion-driven experiences. Every screen is carefully designed in Figma with attention to usability, branding, accessibility, and customer behavior — ensuring your product looks professional and feels intuitive.',
            offers: ['Wireframing & prototyping', 'Figma UI design systems', 'Landing page design', 'Mobile app UI/UX', 'Dashboard & SaaS interfaces', 'User journey optimization', 'Conversion-focused layouts'],
        },
    },
    {
        icon: TrendingUp,
        title: 'Digital Marketing',
        desc: 'SEO, social media, and performance campaigns that drive real results.',
        full: {
            intro: 'Your online presence should generate real business — not just impressions. We help brands grow through SEO, social media marketing, paid advertising, and performance campaigns that increase traffic, leads, and conversions. Our strategies are data-driven and focused on measurable growth.',
            offers: ['Search Engine Optimization (SEO)', 'Google Ads & Meta Ads', 'Social media management', 'Content marketing', 'Brand growth strategies', 'Lead generation campaigns', 'Analytics & conversion tracking'],
        },
    },
    {
        icon: Cloud,
        title: 'Cloud & DevOps',
        desc: 'AWS deployments, CI/CD pipelines, and infrastructure that scales.',
        full: {
            intro: 'We help businesses deploy, manage, and scale applications reliably in the cloud. From AWS infrastructure setup to automated CI/CD pipelines, our DevOps solutions ensure your applications remain secure, fast, and highly available even under heavy traffic.',
            offers: ['AWS & cloud deployment', 'CI/CD pipeline setup', 'Docker & containerization', 'VPS & server management', 'Database optimization', 'Monitoring & backups', 'Scalable cloud architecture'],
        },
    },
    {
        icon: Shield,
        title: 'Maintenance & Security',
        desc: 'Ongoing support, updates, and security monitoring post-launch.',
        full: {
            intro: 'Launching your project is only the beginning. We provide ongoing maintenance, updates, bug fixes, and security monitoring to keep your website or application running smoothly. Our support ensures your business stays protected, updated, and optimized long after deployment.',
            offers: ['Website maintenance', 'Security monitoring', 'Regular backups', 'Bug fixing & updates', 'Performance optimization', 'SSL & server security', 'Technical support'],
        },
    },
    {
        icon: Bot,
        title: 'Business Automation',
        desc: "WhatsApp bots, auto-reply systems, lead capture automation, and CRM integrations — so your business runs even when you're offline.",
        full: {
            intro: 'Automate repetitive work and save valuable time with smart business automation systems. From WhatsApp bots and lead capture systems to CRM integrations and workflow automation, we help businesses operate efficiently — even outside working hours.',
            offers: ['WhatsApp automation', 'AI chatbots', 'Auto-reply systems', 'CRM integrations', 'Lead capture workflows', 'Email & SMS automation', 'Business process automation'],
        },
    },
]

type Service = typeof services[0]

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
    // Close on backdrop click
    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose()
    }

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdrop}
        >
            <motion.div
                className="w-full max-w-lg max-h-[85vh] overflow-y-auto"
                style={{
                    background: 'rgba(12,12,12,0.98)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '16px',
                    boxShadow: 'rgba(168,85,247,0.15) 0px 0px 40px 0px, rgba(0,0,0,0.8) 0px 24px 48px 0px',
                }}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Top accent */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)',
                    borderRadius: '16px 16px 0 0',
                }} />

                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                                <service.icon className="w-5 h-5 text-[#A855F7]" />
                            </div>
                            <h2 className="text-white font-semibold text-lg sm:text-xl">{service.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#737373] hover:text-white transition-colors shrink-0"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Intro */}
                    <p className="body-md text-[#737373] leading-relaxed mb-6">{service.full.intro}</p>

                    {/* What we offer */}
                    <div>
                        <p className="label-md text-[#A855F7] mb-4">What we offer</p>
                        <ul className="flex flex-col gap-2.5">
                            {service.full.offers.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 body-md text-[#737373]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shrink-0 mt-1.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <a
                            href="#contact"
                            onClick={onClose}
                            className="btn-primary w-full"
                        >
                            Start a Project →
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null)
    const [selected, setSelected] = useState<Service | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.service-card', {
                opacity: 0, y: 40, stagger: 0.08, duration: 0.5,
                ease: 'cubic-bezier(0.4,0,0.2,1)',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <>
            <section ref={sectionRef} id="services" className="py-14 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <motion.h2 className="display-lg text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                            Everything to <span className="gradient-text">Go Digital.</span>
                        </motion.h2>
                        <motion.p className="body-md text-[#737373] max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                            From a landing page to a full SaaS platform — we handle every layer of your digital presence.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 hidden sm:grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card gradient-shell group cursor-pointer" onClick={() => setSelected(service)}>
                                <div className="gradient-shell-inner p-4 sm:p-5 h-full flex flex-col gap-3">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.12)' }}>
                                        <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7]" />
                                    </div>
                                    <h3 className="text-white font-medium text-sm sm:text-base">{service.title}</h3>
                                    <p className="body-md text-[#737373] flex-1">{service.desc}</p>
                                    <span className="btn-secondary text-xs">Learn more →</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile horizontal scroll */}
                    <div className="flex sm:hidden gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="gradient-shell shrink-0 cursor-pointer"
                                style={{ width: '72vw', maxWidth: '260px' }}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelected(service)}
                            >
                                <div className="gradient-shell-inner p-4 flex flex-col gap-3 h-full">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.12)' }}>
                                        <service.icon className="w-4 h-4 text-[#A855F7]" />
                                    </div>
                                    <h3 className="text-white font-medium text-sm">{service.title}</h3>
                                    <p className="body-md text-[#737373] flex-1">{service.desc}</p>
                                    <span className="btn-secondary text-xs">Learn more →</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selected && (
                    <ServiceModal service={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </>
    )
}
