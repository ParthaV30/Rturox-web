"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const testimonials = [
    { quote: 'Rturox transformed our restaurant operations. The system they built increased our efficiency by 40% — delivered on time, no drama.', author: 'Vedha Krishnan', role: 'Owner · VedhasKitchen', initials: 'VK' },
    { quote: 'Our student enquiries went up 3x after Rturox built our new website. Clean design, fast delivery, and they understood exactly what we needed.', author: 'Priya Menon', role: 'Director · BrightPath Coaching', initials: 'PM' },
    { quote: 'The member portal they built for us handles attendance, renewals, and payments automatically. Saved us hours every week.', author: 'Karthik Raja', role: 'Manager · FitZone Gym', initials: 'KR' },
    { quote: 'Professional team, modern design. Our clients can now track their shipments live. Rturox delivered exactly what we asked for.', author: 'Anbu Selvam', role: 'Owner · SwiftCargo Logistics', initials: 'AS' },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 4500)
        return () => clearInterval(interval)
    }, [])
    const t = testimonials[current]

    return (
        <section className="py-14 sm:py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-14">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        What Our <span className="gradient-text">Clients Say.</span>
                    </motion.h2>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={current} className="gradient-shell max-w-3xl mx-auto mb-6"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                        <div className="gradient-shell-inner p-6 sm:p-10">
                            <div className="flex justify-center gap-1 mb-5">
                                {[...Array(5)].map((_, i) => <span key={i} className="text-[#A855F7] text-base">★</span>)}
                            </div>
                            <blockquote className="body-md text-white leading-relaxed mb-6 italic text-center sm:text-lg">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center label-md text-[#A855F7]"
                                    style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}>
                                    {t.initials}
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-medium text-sm">{t.author}</p>
                                    <p className="label-md text-[#404040]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-2 mb-8 sm:mb-12">
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-300 rounded-full"
                            style={{ width: i === current ? '24px' : '8px', height: '8px', background: i === current ? '#A855F7' : 'rgba(255,255,255,0.1)' }}
                            aria-label={`Go to testimonial ${i + 1}`} />
                    ))}
                </div>

                <div className="hidden sm:grid grid-cols-2 gap-4">
                    {testimonials.map((item, index) => (
                        <motion.div key={index} className="glass-card-sm p-5 flex flex-col gap-3"
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-40px' }}>
                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-[#A855F7] text-sm">★</span>)}</div>
                            <p className="body-md text-[#737373] italic flex-1">&ldquo;{item.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center label-md text-[#A855F7] shrink-0"
                                    style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.12)', fontSize: '10px' }}>
                                    {item.initials}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{item.author}</p>
                                    <p className="label-md text-[#404040]">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
