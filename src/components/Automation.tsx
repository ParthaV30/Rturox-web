"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useCases = [
    { emoji: '💬', title: 'WhatsApp Auto-Reply Bot', desc: 'Automatically reply to customer enquiries on WhatsApp 24/7. Never miss a lead.' },
    { emoji: '📅', title: 'Appointment Booking System', desc: 'Let customers book appointments online. Auto-confirm via WhatsApp or SMS.' },
    { emoji: '🎯', title: 'Lead Capture + CRM', desc: 'Capture leads from your website, auto-save to a sheet, and auto-send a WhatsApp follow-up.' },
    { emoji: '💳', title: 'Payment + Invoice Automation', desc: 'Auto-generate invoices, send payment links, and follow up on pending payments.' },
]

export default function Automation() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.auto-card', { opacity: 0, y: 40, stagger: 0.1, duration: 0.5, ease: 'cubic-bezier(0.4,0,0.2,1)', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="automation" className="py-14 sm:py-24 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        Automate Your <span className="gradient-text">Business.</span>
                    </motion.h2>
                    <motion.p className="body-md text-[#737373] max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                        Stop doing repetitive tasks manually. Let smart systems handle it while you focus on growing.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {useCases.map((item, index) => (
                        <div key={index} className="auto-card glass-card-sm p-5 flex flex-row sm:flex-col gap-4 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.1)' }}>
                                {item.emoji}
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <h3 className="text-white font-medium text-sm sm:text-base">{item.title}</h3>
                                <p className="body-md text-[#737373] flex-1">{item.desc}</p>
                                <a href="https://wa.me/6381169124" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">Get This →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
