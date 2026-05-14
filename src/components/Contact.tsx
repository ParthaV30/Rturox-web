"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Mail, MessageCircle } from 'lucide-react'

const inputClass = "w-full bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3.5 text-white placeholder-[#404040] text-sm focus:border-[rgba(168,85,247,0.4)] focus:outline-none focus:bg-[rgba(168,85,247,0.03)] transition-all duration-150"

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            if (response.ok) {
                setSubmitted(true)
                const msg = `Hi, I'm ${form.name}. Service: ${form.service}. Message: ${form.message}. Email: ${form.email}. Phone: ${form.phone}`
                window.open(`https://wa.me/6381169124?text=${encodeURIComponent(msg)}`, '_blank')
            } else {
                const data = await response.json().catch(() => ({}))
                setError(data.error || 'Failed to send. Please try WhatsApp instead.')
            }
        } catch {
            setError('Network error. Please try WhatsApp instead.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="py-14 sm:py-24 px-4 sm:px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.div className="flex justify-center mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                        
                    </motion.div>
                    <motion.h2 className="display-lg text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                        Ready to Build <span className="gradient-text">Something Great?</span>
                    </motion.h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
                    <motion.div className="lg:col-span-2 flex flex-col gap-6" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} viewport={{ once: true }}>
                        <p className="body-md text-[#737373]">Drop us a message and we&apos;ll get back within 24 hours. Or reach out directly on WhatsApp for faster replies.</p>
                        <div className="flex flex-col gap-4">
                            {[
                                { icon: MapPin, text: 'Vadavalli, Coimbatore 641046', href: null },
                                { icon: Mail, text: 'rturoxtechnology@gmail.com', href: 'mailto:rturoxtechnology@gmail.com' },
                                { icon: MessageCircle, text: 'WhatsApp — quick reply', href: 'https://wa.me/6381169124' },
                            ].map(({ icon: Icon, text, href }, i) => {
                                const content = (
                                    <div className="flex items-center gap-3 body-md text-[#737373] hover:text-[#A855F7] transition-colors duration-150">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.1)' }}>
                                            <Icon className="w-4 h-4 text-[#A855F7]" />
                                        </div>
                                        {text}
                                    </div>
                                )
                                return href ? <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a> : <div key={i}>{content}</div>
                            })}
                        </div>
                        <div className="gradient-shell">
                            <div className="gradient-shell-inner p-5 flex items-center gap-4">
                                <div className="text-3xl font-black" style={{ color: '#A855F7' }}>24h</div>
                                <p className="body-md text-[#737373]">Average response time for new enquiries</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }} viewport={{ once: true }}>
                        {submitted ? (
                            <motion.div className="gradient-shell" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                                <div className="gradient-shell-inner p-10 text-center flex flex-col items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-[#A855F7]" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>✓</div>
                                    <h3 className="text-white font-medium text-xl">Message received!</h3>
                                    <p className="body-md text-[#737373]">We&apos;ll reply within 24 hours.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="gradient-shell">
                                <div className="gradient-shell-inner p-6 sm:p-7">
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Your name" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                                            <input type="email" placeholder="Email address" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                                        </div>
                                        <input type="tel" placeholder="Phone number" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                                        <select className={inputClass} style={{ background: 'rgba(0,0,0,0.4)' }} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} required>
                                            <option value="" style={{ background: '#0a0a0a' }}>Select a service</option>
                                            {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'Cloud & DevOps', 'Business Automation'].map(s => (
                                                <option key={s} value={s} style={{ background: '#0a0a0a' }}>{s}</option>
                                            ))}
                                        </select>
                                        <textarea placeholder="Tell us about your project..." rows={4} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                                        {error && (
                                            <p className="body-md text-red-400 text-xs">{error}</p>
                                        )}
                                        <button type="submit" className="btn-primary w-full" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
                                            {loading ? 'Sending...' : 'Send Message →'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
