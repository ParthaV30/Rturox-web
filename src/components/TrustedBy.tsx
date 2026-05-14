"use client"

import { motion } from 'framer-motion'

const clients = [
    { name: 'VedhasKitchen' }, { name: 'PowerHouse Events' }, { name: 'PH Crackers' },
    { name: 'FitZone Gym' }, { name: 'Skyline Constructions' }, { name: 'BrightPath Coaching' },
    { name: 'SpiceRoute Restaurant' }, { name: 'TechNest Solutions' }, { name: 'GreenLeaf Organics' },
    { name: 'Nova Interiors' }, { name: 'SwiftCargo Logistics' }, { name: 'MediCare Clinic' },
    { name: 'StarCraft Jewellers' }, { name: 'UrbanEdge Realty' }, { name: 'BlueWave Travels' },
]

export default function TrustedBy() {
    const doubled = [...clients, ...clients]
    return (
        <section className="py-12 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(23,23,23,0.4)' }}>
            <p className="label-md text-center text-[#404040] mb-6">Trusted by growing businesses across India</p>
            <div className="relative flex">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />
                <motion.div className="flex shrink-0 gap-10 pr-10" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>
                    {doubled.map((client, index) => (
                        <span key={index} className="whitespace-nowrap label-md text-[#404040] hover:text-[#A855F7] transition-colors duration-150 flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-[#A855F7] inline-block opacity-50" />
                            {client.name}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
