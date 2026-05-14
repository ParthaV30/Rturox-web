"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, BarChart2, Megaphone, Settings2, Check } from 'lucide-react'

interface Preferences {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    functional: boolean
}

const STORAGE_KEY = 'rturox_cookie_consent'

const defaultPrefs: Preferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
}

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
    return (
        <button
            role="switch"
            aria-checked={enabled}
            disabled={disabled}
            onClick={() => !disabled && onChange(!enabled)}
            className="relative shrink-0 w-10 h-5 rounded-full transition-all duration-300 focus:outline-none"
            style={{
                background: enabled ? '#A855F7' : 'rgba(255,255,255,0.08)',
                border: enabled ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.1)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                boxShadow: enabled ? 'rgba(168,85,247,0.4) 0px 0px 10px 0px' : 'none',
            }}
        >
            <motion.span
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                animate={{ left: enabled ? '20px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </button>
    )
}

function PreferencesModal({
    prefs,
    onChange,
    onSave,
    onClose,
}: {
    prefs: Preferences
    onChange: (p: Preferences) => void
    onSave: () => void
    onClose: () => void
}) {
    const items = [
        { key: 'necessary' as const, icon: Shield, label: 'Necessary', desc: 'Required for the site to function. Cannot be disabled.', disabled: true },
        { key: 'analytics' as const, icon: BarChart2, label: 'Analytics', desc: 'Help us understand how visitors interact with our site.' },
        { key: 'marketing' as const, icon: Megaphone, label: 'Marketing', desc: 'Used to deliver relevant ads and track campaign performance.' },
        { key: 'functional' as const, icon: Settings2, label: 'Functional', desc: 'Enable enhanced features like live chat and personalisation.' },
    ]

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                className="w-full max-w-md"
                style={{
                    background: 'rgba(10,10,10,0.96)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    borderRadius: '16px',
                    boxShadow: 'rgba(168,85,247,0.12) 0px 0px 40px 0px, rgba(0,0,0,0.8) 0px 24px 48px 0px',
                }}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Top accent */}
                <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)', borderRadius: '16px 16px 0 0' }} />

                <div className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                                <Cookie className="w-4 h-4 text-[#A855F7]" />
                            </div>
                            <h2 className="text-white font-semibold text-base">Cookie Preferences</h2>
                        </div>
                        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-white transition-colors"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-3 mb-5">
                        {items.map(({ key, icon: Icon, label, desc, disabled }) => (
                            <div key={key} className="flex items-start gap-3 p-3 rounded-xl"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.12)' }}>
                                    <Icon className="w-3.5 h-3.5 text-[#A855F7]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-white font-medium text-sm">{label}</p>
                                        <Toggle enabled={prefs[key]} onChange={(v) => onChange({ ...prefs, [key]: v })} disabled={disabled} />
                                    </div>
                                    <p className="body-md text-[#737373] mt-0.5 text-xs leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mb-5">
                        <a href="/privacy" className="label-md text-[#737373] hover:text-[#A855F7] transition-colors duration-150" style={{ fontSize: '10px' }}>Privacy Policy</a>
                        <a href="/terms" className="label-md text-[#737373] hover:text-[#A855F7] transition-colors duration-150" style={{ fontSize: '10px' }}>Terms & Conditions</a>
                    </div>

                    {/* Save */}
                    <button onClick={onSave} className="btn-primary w-full">
                        Save Preferences →
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function Toast({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const t = setTimeout(onDone, 2500)
        return () => clearTimeout(t)
    }, [onDone])

    return (
        <motion.div
            className="fixed bottom-24 right-6 z-[300] flex items-center gap-2.5 px-4 py-3"
            style={{
                background: 'rgba(10,10,10,0.95)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '10px',
                backdropFilter: 'blur(16px)',
                boxShadow: 'rgba(168,85,247,0.2) 0px 0px 20px 0px',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.15)' }}>
                <Check className="w-3 h-3 text-[#A855F7]" />
            </div>
            <span className="label-md text-white" style={{ fontSize: '11px' }}>Preferences saved</span>
        </motion.div>
    )
}

export default function CookieConsent() {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showSettingsBtn, setShowSettingsBtn] = useState(false)
    const [prefs, setPrefs] = useState<Preferences>(defaultPrefs)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setPrefs(JSON.parse(stored))
                setShowSettingsBtn(true)
            } catch {
                localStorage.removeItem(STORAGE_KEY)
                const t = setTimeout(() => setShow(true), 1200)
                return () => clearTimeout(t)
            }
        } else {
            // Delay banner slightly so page loads first
            const t = setTimeout(() => setShow(true), 1200)
            return () => clearTimeout(t)
        }
    }, [])

    const savePrefs = (p: Preferences) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
        setPrefs(p)
        setShow(false)
        setShowModal(false)
        setShowSettingsBtn(true)
        setShowToast(true)
    }

    const acceptAll = () => savePrefs({ necessary: true, analytics: true, marketing: true, functional: true })
    const rejectAll = () => savePrefs({ necessary: true, analytics: false, marketing: false, functional: false })

    return (
        <>
            {/* Banner */}
            <AnimatePresence>
                {show && !showModal && (
                    <motion.div
                        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[150] sm:max-w-sm"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div style={{
                            background: 'rgba(10,10,10,0.95)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '14px',
                            backdropFilter: 'blur(20px)',
                            boxShadow: 'rgba(168,85,247,0.1) 0px 0px 30px 0px, rgba(0,0,0,0.7) 0px 16px 40px 0px',
                            overflow: 'hidden',
                        }}>
                            {/* Top accent line */}
                            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)' }} />

                            <div className="p-4 sm:p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Cookie className="w-4 h-4 text-[#A855F7] shrink-0" />
                                    <p className="text-white font-medium text-sm">We use cookies</p>
                                </div>
                                <p className="body-md text-[#737373] mb-4 text-xs leading-relaxed">
                                    We use cookies to enhance your experience, analyse traffic, and personalise content. You can manage your preferences anytime.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <button onClick={acceptAll} className="btn-primary w-full" style={{ padding: '8px 16px' }}>
                                        Accept All
                                    </button>
                                    <div className="flex gap-2">
                                        <button onClick={rejectAll} className="flex-1 label-md text-[#737373] hover:text-white transition-colors duration-150 py-2"
                                            style={{ fontSize: '10px' }}>
                                            Reject Non-Essential
                                        </button>
                                        <button onClick={() => setShowModal(true)} className="flex-1 label-md text-[#A855F7] hover:text-[#C084FC] transition-colors duration-150 py-2"
                                            style={{ fontSize: '10px' }}>
                                            Manage Preferences
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <a href="/privacy" className="label-md text-[#404040] hover:text-[#737373] transition-colors" style={{ fontSize: '10px' }}>Privacy Policy</a>
                                    <a href="/terms" className="label-md text-[#404040] hover:text-[#737373] transition-colors" style={{ fontSize: '10px' }}>Terms & Conditions</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preferences Modal */}
            <AnimatePresence>
                {showModal && (
                    <PreferencesModal
                        prefs={prefs}
                        onChange={setPrefs}
                        onSave={() => savePrefs(prefs)}
                        onClose={() => { setShowModal(false) }}
                    />
                )}
            </AnimatePresence>

            {/* Floating settings button — shown after consent */}
            <AnimatePresence>
                {showSettingsBtn && !showModal && (
                    <motion.button
                        onClick={() => setShowModal(true)}
                        className="fixed bottom-6 left-6 z-[150] w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'rgba(10,10,10,0.8)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            backdropFilter: 'blur(12px)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, borderColor: 'rgba(168,85,247,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        title="Cookie Settings"
                    >
                        <Cookie className="w-4 h-4 text-[#A855F7]" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {showToast && <Toast onDone={() => setShowToast(false)} />}
            </AnimatePresence>
        </>
    )
}
