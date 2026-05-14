"use client"

import { motion } from 'framer-motion'

const steps = [
    { emoji: '📞', title: 'You call / WhatsApp us', desc: 'Tell us your business and what you need.' },
    { emoji: '🎨', title: 'We show you a demo', desc: 'We already have a live demo in your industry.' },
    { emoji: '🚀', title: 'We go live in 7 days', desc: 'Your website is live, fast, and ready to convert.' },
]

export default function SevenDays() {
    return (
        <section className="py-14 sm:py-24 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="max-w-4xl mx-auto text-center">
                <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    
                </motion.div>
                <motion.h2 className="display-lg text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                    Your Business Deserves a <span className="gradient-text">Website That Works.</span>
                </motion.h2>
                <motion.p className="body-md text-[#737373] mb-10 sm:mb-14 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                    We&apos;ve already built demos for 25+ industries. Your website could be live in 7 days — starting at ₹15,000.
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 sm:mb-14">
                    {steps.map((step, index) => (
                        <motion.div key={index} className="gradient-shell"
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-40px' }}>
                            <div className="gradient-shell-inner p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:items-center gap-4 text-left sm:text-center">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                    style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.12)' }}>
                                    {step.emoji}
                                </div>
                                <div className="flex flex-col gap-1 sm:items-center">
                                    <div className="label-md text-[#A855F7]">Step {index + 1}</div>
                                    <h3 className="text-white font-medium text-sm sm:text-base">{step.title}</h3>
                                    <p className="body-md text-[#737373]">{step.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                    <a href="#work" className="btn-primary w-full sm:w-auto px-8">See Your Industry Demo →</a>
                    <a href="https://wa.me/6381169124" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto justify-center">
                        WhatsApp Us Now →
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
