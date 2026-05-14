"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GlobeAnimation = dynamic(() => import('./GlobeAnimation'), { ssr: false })

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.hero-fade-out', {
                opacity: 0, y: -30,
                ease: 'cubic-bezier(0.4,0,0.2,1)',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative flex items-center overflow-hidden"
            style={{ minHeight: '100dvh', paddingTop: '60px' }}
        >
            {/* Subtle glow behind globe */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)' }} />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />

            <div className="hero-fade-out relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* Left — text */}
                    <div className="flex flex-col items-start">
                        <motion.h1
                            className="display-lg text-white mb-5"
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        >
                            We Build{' '}
                            <span className="gradient-text">Digital</span>
                            <br />Products That Work.
                        </motion.h1>

                        <motion.p
                            className="body-md text-[#737373] max-w-md mb-8"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        >
                            Rturox is a Coimbatore-based tech studio. We design, build, and launch
                            websites, apps, and digital experiences for businesses that want to grow.
                        </motion.p>

                        <motion.div
                            className="flex flex-row items-center gap-3 mb-8 w-full sm:w-auto"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <button onClick={scrollToContact} className="btn-primary px-6 sm:px-8">
                                Start a Project →
                            </button>
                            <a href="#work" className="btn-secondary">
                                Explore →
                            </a>
                        </motion.div>

                        <motion.p
                            className="label-md text-[#333333] w-full text-center sm:text-left"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            or scroll to explore ↓
                        </motion.p>
                    </div>

                    {/* Right — globe */}
                    <motion.div
                        className="relative w-full hidden lg:flex items-center justify-center"
                        style={{ height: '480px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    >
                        <GlobeAnimation />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
