"use client"

import { useScroll, motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[1px] z-[200] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #A855F7, #7C3AED)',
                boxShadow: '0 0 8px rgba(168,85,247,0.8)',
            }}
        />
    )
}
