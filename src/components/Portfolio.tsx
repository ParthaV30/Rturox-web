"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const industries = [
    { emoji: '👗', name: 'Clothes & Fashion', desc: 'Modern clothing store with catalog', link: 'https://boudiq123.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '🏥', name: 'Clinic (1)', desc: 'Clean clinic site with appointment booking', link: 'https://clinics123.vercel.app/', category: 'Health & Wellness' },
    { emoji: '🏥', name: 'Clinic (2)', desc: 'Doctor profile and services page', link: 'https://clinic26.vercel.app/', category: 'Health & Wellness' },
    { emoji: '☕', name: 'Cafe', desc: 'Cafe menu and ambience showcase', link: 'https://cafe12-kappa.vercel.app/', category: 'Food & Hospitality' },
    { emoji: '✈️', name: 'Travel Agency', desc: 'Tour packages and booking page', link: 'https://travel-agency12.vercel.app/', category: 'Business & Services' },
    { emoji: '🏗️', name: 'Stall Fabrication', desc: 'B2B fabrication company site', link: 'https://jay-ganga-associates-uluf.vercel.app/', category: 'Business & Services' },
    { emoji: '🎓', name: 'Tech Courses', desc: 'Course listing and enrollment', link: 'https://rturoxtechtraining.vercel.app/', category: 'Education' },
    { emoji: '🏠', name: 'Real Estate', desc: 'Property listing and inquiry', link: 'https://dreamkeyproperties.netlify.app/', category: 'Real Estate & Construction' },
    { emoji: '🎉', name: 'Event Management', desc: 'Events company full site', link: 'https://powerhouse.org.in/', category: 'Business & Services' },
    { emoji: '🏥', name: 'Hospital', desc: 'Full hospital showcase', link: 'https://showcase-hospital-sivamathavans-projects.vercel.app', category: 'Health & Wellness' },
    { emoji: '🏫', name: 'School', desc: 'School admission and info site', link: 'https://showcase-school-sivamathavans-projects.vercel.app', category: 'Education' },
    { emoji: '🎓', name: 'College', desc: 'College website showcase', link: 'https://showcase-college-sivamathavans-projects.vercel.app', category: 'Education' },
    { emoji: '🧵', name: 'Textile', desc: 'Textile business showcase', link: 'https://showcase-textile-sivamathavans-projects.vercel.app', category: 'Retail & Shopping' },
    { emoji: '🏨', name: 'Hotel', desc: 'Hotel booking and rooms page', link: 'https://showcase-hotel-sivamathavans-projects.vercel.app', category: 'Food & Hospitality' },
    { emoji: '💰', name: 'Finance', desc: 'Finance services page', link: 'https://showcase-finance-sivamathavans-projects.vercel.app', category: 'Business & Services' },
    { emoji: '🚛', name: 'Logistics', desc: 'Logistics and cargo tracking', link: 'https://showcase-logistics-sivamathavans-projects.vercel.app', category: 'Business & Services' },
    { emoji: '💈', name: 'Salon & Beauty', desc: 'Salon services and booking', link: 'https://salon-beauty-clinic.vercel.app/', category: 'Health & Wellness' },
    { emoji: '💍', name: 'Wedding', desc: 'Wedding planning services', link: 'https://wedding-industry.vercel.app/', category: 'Business & Services' },
    { emoji: '💎', name: 'Jewellery', desc: 'Jewellery store catalog', link: 'https://jewelry-store-two-eta.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '💪', name: 'Gym & Fitness', desc: 'Gym membership and schedules', link: 'https://gym-fitness-center-tau.vercel.app/', category: 'Health & Wellness' },
    { emoji: '🚗', name: 'Automobile', desc: 'Auto accessories store', link: 'https://automobile-accessories.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '🛋️', name: 'Furniture', desc: 'Furniture store and catalog', link: 'https://furniture-store-eight-delta.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '⚖️', name: 'Legal Services', desc: 'Law firm / professional services', link: 'https://legal-professional-services.vercel.app/', category: 'Business & Services' },
    { emoji: '📱', name: 'Electronics', desc: 'Electronics and mobile shop', link: 'https://electronics-mobile-shop.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '🛒', name: 'Supermarket', desc: 'Grocery and supermarket site', link: 'https://supermarket-grocery.vercel.app/', category: 'Retail & Shopping' },
    { emoji: '🏭', name: 'Manufacturing', desc: 'Manufacturing exporter site', link: 'https://manufacturing-exporter.vercel.app/', category: 'Business & Services' },
    { emoji: '🍕', name: 'Franchise', desc: 'Franchise business page', link: 'https://franchise-business-beta.vercel.app/', category: 'Food & Hospitality' },
    { emoji: '🌾', name: 'Agriculture', desc: 'Agri-tech company site', link: 'https://agriculture-agritech.vercel.app/', category: 'Business & Services' },
    { emoji: '🔩', name: 'Builders & Hardware', desc: 'Hardware store and products', link: 'https://builders-hardware.vercel.app/', category: 'Real Estate & Construction' },
    { emoji: '🕌', name: 'Spiritual Tourism', desc: 'Religious and spiritual travel', link: 'https://spiritual-tourism.vercel.app/', category: 'Business & Services' },
]

const filters = ['All', 'Retail & Shopping', 'Health & Wellness', 'Education', 'Food & Hospitality', 'Business & Services', 'Real Estate & Construction']

export default function Portfolio() {
    const [active, setActive] = useState('All')
    const [showAll, setShowAll] = useState(false)

    const filtered = active === 'All' ? industries : industries.filter(i => i.category === active)
    const visible = showAll ? filtered : filtered.slice(0, 6)

    return (
        <section id="work" className="py-14 sm:py-24 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        Built for <span className="gradient-text">Every Business.</span>
                    </motion.h2>
                    <motion.p className="body-md text-[#737373] max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                        Live demos across 30+ industries — click any card to see a real site we built.
                    </motion.p>
                </div>

                {/* Filters */}
                <motion.div className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
                    style={{ scrollbarWidth: 'none' }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: true }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => { setActive(f); setShowAll(false) }}
                            className="px-3 sm:px-4 py-2 label-md transition-all duration-150 whitespace-nowrap shrink-0"
                            style={{
                                background: active === f ? 'rgba(168,85,247,0.12)' : 'rgba(23,23,23,0.6)',
                                color: active === f ? '#A855F7' : '#737373',
                                border: active === f ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                            }}>
                            {f}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {visible.map((item, index) => (
                        <motion.div key={item.name} className="glass-card-sm p-3.5 sm:p-5 flex flex-col gap-2 sm:gap-3 group"
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-40px' }}>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium text-xs sm:text-sm leading-snug truncate">{item.name}</h3>
                                    <span className="label-md text-[#404040]" style={{ fontSize: '10px' }}>{item.category}</span>
                                </div>
                            </div>
                            <p className="body-md text-[#737373] hidden sm:block">{item.desc}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-secondary text-[10px] sm:text-xs">
                                View Demo →
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Show more */}
                {filtered.length > 6 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn-primary px-8"
                        >
                            {showAll ? 'Show Less ↑' : `More... (${filtered.length - 6} more)`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
