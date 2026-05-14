"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = ['Home', 'Services', 'Work', 'Pricing', 'Contact']

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            className="fixed top-0 w-full z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Desktop */}
            <div className="mx-auto mt-4 max-w-6xl px-4 hidden md:block">
                <div
                    className="flex justify-between items-center px-6 py-3 transition-all duration-300"
                    style={{
                        background: isScrolled ? 'rgba(10,10,10,0.92)' : 'rgba(23,23,23,0.6)',
                        backdropFilter: 'blur(24px)',
                        borderRadius: '12px',
                        border: isScrolled ? '1px solid rgba(168,85,247,0.15)' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isScrolled ? 'rgba(168,85,247,0.08) 0px 0px 20px 0px' : 'none',
                    }}
                >
                    <a href="#">
                        <span className="text-xl font-black tracking-tight gradient-text">RTUROX</span>
                    </a>
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="label-md text-[#737373] hover:text-[#A855F7] transition-colors duration-150">
                                {link}
                            </a>
                        ))}
                    </div>
                    <a href="#contact" className="btn-primary">Start a Project →</a>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <div className={`flex justify-between items-center px-5 py-4 transition-all duration-300 ${isScrolled ? 'border-b border-[rgba(168,85,247,0.1)]' : ''}`}
                    style={{ background: isScrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.6)', backdropFilter: 'blur(24px)' }}>
                    <a href="#">
                        <span className="text-lg font-black tracking-tight gradient-text">RTUROX</span>
                    </a>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#A855F7] p-2" aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(168,85,247,0.1)', overflow: 'hidden' }}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="px-5 pb-6 pt-3 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a key={link}
                                        href={`#${link.toLowerCase()}`}
                                        className="block px-4 py-3 label-md text-[#737373] hover:text-[#A855F7] transition-colors duration-150"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsMobileMenuOpen(false)
                                            setTimeout(() => {
                                                document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                                            }, 300)
                                        }}>
                                        {link}
                                    </a>
                                ))}
                                <a href="#contact"
                                    className="btn-primary text-center mt-3"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsMobileMenuOpen(false)
                                        setTimeout(() => {
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                        }, 300)
                                    }}>
                                    Start a Project
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
