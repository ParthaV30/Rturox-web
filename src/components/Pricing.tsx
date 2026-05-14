"use client"

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
    { name: 'Starter', price: '₹15,000', period: 'per project', desc: 'Best for: Landing pages, portfolios, small business sites', features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO', '1 revision round', 'Delivered in 1–2 weeks'], cta: 'Get Started', popular: false },
    { name: 'Growth', price: '₹45,000', period: 'per project', desc: 'Best for: Web apps, e-commerce, booking systems', features: ['Everything in Starter', 'Custom web app', 'Database integration', 'Admin panel', '3 revision rounds', '1 month support', 'Delivered in 3–5 weeks'], cta: 'Start a Project', popular: true },
    { name: 'Enterprise', price: 'Custom', period: 'tailored quote', desc: 'Best for: SaaS, mobile apps, full digital transformation', features: ['Everything in Growth', 'Mobile app', 'Cloud infrastructure', 'Dedicated project manager', 'Ongoing retainer available', 'Custom timeline'], cta: "Let's Talk", popular: false },
]

function PlanCard({ plan, onContact, compact = false }: { plan: typeof plans[0]; onContact: () => void; compact?: boolean }) {
    return (
        <div className={plan.popular ? 'gradient-shell h-full' : 'h-full'} style={plan.popular ? { marginTop: '14px' } : {}}>
            <div
                className={`relative flex flex-col h-full ${plan.popular ? 'gradient-shell-inner' : 'glass-card-sm'} ${compact ? 'p-5' : 'p-6 sm:p-7'}`}
                style={plan.popular ? { boxShadow: 'rgba(168,85,247,0.15) 0px 0px 24px 0px' } : {}}
            >
                {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="px-3 py-1 label-md text-[#0a0a0a]" style={{ background: '#A855F7', borderRadius: '9999px', fontSize: '10px' }}>Most Popular</span>
                    </div>
                )}
                <p className="label-md text-[#404040] mb-3">{plan.name}</p>
                <div className="mb-1">
                    <span className={`font-black ${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'}`} style={{ color: plan.popular ? '#A855F7' : '#FFFFFF' }}>{plan.price}</span>
                </div>
                <p className="label-md text-[#404040] mb-2">{plan.period}</p>
                <p className="body-md text-[#737373] mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{plan.desc}</p>
                <ul className="flex-1 space-y-2.5 mb-6">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 body-md text-[#737373]">
                            <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#A855F7]" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <button onClick={onContact} className="btn-primary w-full">{plan.cta} →</button>
            </div>
        </div>
    )
}

export default function Pricing() {
    const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="pricing" className="py-14 sm:py-24 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.h2 className="display-lg text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        Simple, <span className="gradient-text">Transparent Pricing.</span>
                    </motion.h2>
                    <motion.p className="body-md text-[#737373] max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        No surprises. Pick a starting point and we&apos;ll tailor it to your needs.
                    </motion.p>
                </div>

                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-3 gap-5">
                    {plans.map((plan, index) => (
                        <motion.div key={index} className="h-full"
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-60px' }}>
                            <PlanCard plan={plan} onContact={scrollToContact} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile horizontal scroll */}
                <div className="flex md:hidden gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className="shrink-0"
                            style={{ width: '78vw', maxWidth: '290px', marginTop: plan.popular ? '14px' : '0' }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <PlanCard plan={plan} onContact={scrollToContact} compact />
                        </motion.div>
                    ))}
                </div>

                <p className="text-center label-md text-[#404040] mt-8">All prices are starting points. Final quote after free consultation. GST applicable.</p>
            </div>
        </section>
    )
}
