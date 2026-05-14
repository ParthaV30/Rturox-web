"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    { q: 'How long does a typical project take?', a: "A basic website takes 1–2 weeks. Complex web apps take 3–6 weeks depending on features. We'll give you an exact timeline after the discovery call." },
    { q: 'Do you handle hosting and deployment?', a: 'Yes. We deploy on AWS, Vercel, or your preferred platform — fully configured, secured, and monitored.' },
    { q: 'Can you redesign my existing website?', a: 'Absolutely. We audit your current site, propose improvements, and migrate with zero downtime.' },
    { q: 'Do you work with clients outside Coimbatore?', a: 'Yes. We work with clients across India and internationally — 100% remote-friendly with async updates.' },
    { q: 'What happens after launch?', a: 'We offer 1-month free bug support post-launch, and flexible maintenance retainers after that.' },
]

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section className="py-14 sm:py-24 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10 sm:mb-14">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        Questions We <span className="gradient-text">Get Asked.</span>
                    </motion.h2>
                </div>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <motion.div key={index} className="glass-card-sm overflow-hidden"
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-40px' }}>
                            <button className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 group"
                                onClick={() => setOpen(open === index ? null : index)}>
                                <span className="text-white font-medium text-sm sm:text-base leading-snug group-hover:text-[#A855F7] transition-colors duration-150">{faq.q}</span>
                                <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                                    style={{ background: open === index ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.04)', border: open === index ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.06)' }}>
                                    {open === index ? <Minus className="w-3.5 h-3.5 text-[#A855F7]" /> : <Plus className="w-3.5 h-3.5 text-[#737373]" />}
                                </span>
                            </button>
                            <AnimatePresence initial={false}>
                                {open === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                                        <p className="px-5 pb-5 body-md text-[#737373]">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
