"use client"

import { motion } from 'framer-motion'

const industries = [
    '👗 Fashion', '🏥 Clinics', '☕ Cafes', '✈️ Travel', '🎓 Education',
    '🏥 Hospitals', '🏠 Real Estate', '💍 Jewellery', '💪 Gyms', '🚛 Logistics',
    '🎉 Events', '⚖️ Legal', '💈 Salons', '🚗 Automobile', '🛋️ Furniture',
    '📱 Electronics', '🛒 Supermarkets', '🏭 Manufacturing', '🍕 Franchise',
    '🌾 Agriculture', '🔩 Hardware', '🕌 Spiritual Tourism', '💰 Finance',
    '🧵 Textile', '🏨 Hotels', '💎 Jewellery Stores',
]

export default function IndustriesStrip() {
    const doubled = [...industries, ...industries]
    return (
        <section className="py-10 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.3)' }}>
            <p className="label-md text-center text-[#404040] mb-6">We&apos;ve built for 30+ industries — is yours here?</p>
            <div className="relative flex">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />
                <motion.div className="flex shrink-0 gap-8 pr-8" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
                    {doubled.map((industry, index) => (
                        <span key={index} className="whitespace-nowrap label-md text-[#404040] hover:text-[#A855F7] transition-colors duration-150 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#A855F7] inline-block opacity-40 shrink-0" />
                            {industry}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
