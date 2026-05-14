"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
    { number: '01', name: 'Discover', desc: 'We learn your goals, audience, and constraints to map a clear path forward.' },
    { number: '02', name: 'Design', desc: 'We prototype and present the vision before a line of code is written.' },
    { number: '03', name: 'Build', desc: 'We develop, test, and iterate in tight 1-week sprints.' },
    { number: '04', name: 'Launch', desc: 'We deploy, monitor, and hand over with full documentation.' },
]

export default function HowWeWork() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.step-card', { opacity: 0, x: -30, stagger: 0.12, duration: 0.5, ease: 'cubic-bezier(0.4,0,0.2,1)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-14 sm:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        Brief to Launch — <span className="gradient-text">Our Process.</span>
                    </motion.h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card gradient-shell group">
                            <div className="gradient-shell-inner p-4 sm:p-6 flex flex-col gap-3 relative overflow-hidden h-full">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center label-md text-[#A855F7]"
                                    style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.12)' }}>
                                    {step.number}
                                </div>
                                <h3 className="text-white font-medium text-sm sm:text-base">{step.name}</h3>
                                <p className="body-md text-[#737373]">{step.desc}</p>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'linear-gradient(to right, transparent, #A855F7, transparent)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
