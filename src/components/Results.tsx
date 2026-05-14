"use client"

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
    { number: 25, suffix: '+', label: 'Projects Delivered' },
    { number: 20, suffix: '+', label: 'Happy Clients' },
    { number: 100, suffix: '%', label: 'On-Time Delivery' },
    { number: 2023, suffix: '', label: 'Est. Coimbatore, India' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    useEffect(() => {
        if (!inView) return
        const steps = 60
        const stepTime = 1500 / steps
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(current))
        }, stepTime)
        return () => clearInterval(timer)
    }, [inView, target])

    return (
        <span ref={ref} className="text-4xl sm:text-5xl font-black leading-none" style={{ color: '#A855F7' }}>
            {count}{suffix}
        </span>
    )
}

export default function Results() {
    return (
        <section className="py-14 sm:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div className="flex justify-center mb-10 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div key={index} className="gradient-shell"
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                            viewport={{ once: true, margin: '-60px' }}>
                            <div className="gradient-shell-inner p-4 sm:p-8 text-center flex flex-col items-center gap-2 sm:gap-3">
                                <Counter target={stat.number} suffix={stat.suffix} />
                                <p className="label-md text-[#404040]">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
