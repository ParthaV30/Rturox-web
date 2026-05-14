"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'

const SERVICES = [
    { icon: '🌐', title: 'Web Development', desc: 'React, Next.js, fast & responsive.' },
    { icon: '📱', title: 'Mobile Apps', desc: 'iOS & Android with React Native.' },
    { icon: '🎨', title: 'UI/UX Design', desc: 'Figma-first, pixel-perfect interfaces.' },
    { icon: '📈', title: 'Digital Marketing', desc: 'SEO & campaigns that convert.' },
    { icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS, CI/CD, scalable infra.' },
    { icon: '🔒', title: 'Maintenance', desc: 'Security, updates & monitoring.' },
    { icon: '🤖', title: 'Automation', desc: 'WhatsApp bots, CRM & lead flows.' },
]

interface Popup { x: number; y: number; serviceIndex: number }

export default function GlobeAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [popup, setPopup] = useState<Popup | null>(null)
    const [ready, setReady] = useState(false)
    const popupTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastPopupTime = useRef(0)

    // Throttled popup — only update every 120ms to avoid React re-render storm
    const triggerPopup = useCallback((cx: number, cy: number, nx: number, ny: number) => {
        const now = Date.now()
        if (now - lastPopupTime.current < 120) return
        lastPopupTime.current = now
        const angle = Math.atan2(ny, nx)
        const normalized = (angle + Math.PI) / (Math.PI * 2)
        const idx = Math.floor(normalized * SERVICES.length) % SERVICES.length
        setPopup({ x: cx, y: cy, serviceIndex: idx })
        if (popupTimer.current) clearTimeout(popupTimer.current)
        popupTimer.current = setTimeout(() => setPopup(null), 1400)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        let animId: number
        let mounted = true
        let cleanupFn: (() => void) | null = null

        const tryInit = () => {
            if (!mounted) return
            const W = container.offsetWidth
            const H = container.offsetHeight
            if (W === 0 || H === 0) { requestAnimationFrame(tryInit); return }
            initScene(W, H)
        }

        const initScene = (W: number, H: number) => {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
            camera.position.z = 3.2

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
            renderer.setSize(W, H)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setClearColor(0x000000, 0)

            // Reduce particle count for smoother performance
            const count = 1200
            const radius = 1.1
            const basePos = new Float32Array(count * 3)
            const curPos = new Float32Array(count * 3)

            for (let i = 0; i < count; i++) {
                const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
                const theta = Math.PI * (1 + Math.sqrt(5)) * i
                const x = radius * Math.sin(phi) * Math.cos(theta)
                const y = radius * Math.cos(phi)
                const z = radius * Math.sin(phi) * Math.sin(theta)
                basePos[i * 3] = x; basePos[i * 3 + 1] = y; basePos[i * 3 + 2] = z
                curPos[i * 3] = x; curPos[i * 3 + 1] = y; curPos[i * 3 + 2] = z
            }

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(curPos, 3))

            const material = new THREE.PointsMaterial({
                color: 0xA855F7, size: 2, transparent: true, opacity: 0.6, sizeAttenuation: false,
            })

            const globe = new THREE.Points(geometry, material)
            scene.add(globe)

            // Rings
            const ringMat = new THREE.LineBasicMaterial({ color: 0xA855F7, transparent: true, opacity: 0.08 })
            const rings: THREE.Line[] = []
            ;[-50, 0, 50].forEach(lat => {
                const latRad = (lat * Math.PI) / 180
                const r = radius * Math.cos(latRad)
                const y = radius * Math.sin(latRad)
                const pts: THREE.Vector3[] = []
                for (let i = 0; i <= 48; i++) {
                    const a = (i / 48) * Math.PI * 2
                    pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)))
                }
                const geo = new THREE.BufferGeometry().setFromPoints(pts)
                const line = new THREE.Line(geo, ringMat)
                scene.add(line); rings.push(line)
            })

            // Pointer — plain object, no React state, no re-renders
            const ptr = { nx: 0, ny: 0, cx: 0, cy: 0, over: false }
            const tilt = { x: 0, y: 0, tx: 0, ty: 0 }
            let ripple = 0

            const onMouseMove = (e: MouseEvent) => {
                const rect = container.getBoundingClientRect()
                ptr.cx = e.clientX - rect.left
                ptr.cy = e.clientY - rect.top
                ptr.nx = (ptr.cx / rect.width) * 2 - 1
                ptr.ny = -((ptr.cy / rect.height) * 2 - 1)
                tilt.tx = ptr.nx * 1.0
                tilt.ty = ptr.ny * 0.5
                triggerPopup(ptr.cx, ptr.cy, ptr.nx, ptr.ny)
            }
            const onMouseEnter = () => { ptr.over = true }
            const onMouseLeave = () => {
                ptr.over = false
                tilt.tx = 0; tilt.ty = 0
                setPopup(null)
                if (popupTimer.current) clearTimeout(popupTimer.current)
            }
            const onClick = () => { ripple = 0.3 }

            container.addEventListener('mousemove', onMouseMove, { passive: true })
            container.addEventListener('mouseenter', onMouseEnter)
            container.addEventListener('mouseleave', onMouseLeave)
            container.addEventListener('click', onClick)

            const onResize = () => {
                const w = container.offsetWidth, h = container.offsetHeight
                if (!w || !h) return
                renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix()
            }
            window.addEventListener('resize', onResize, { passive: true })

            const clock = { start: performance.now() }
            const getTime = () => (performance.now() - clock.start) / 1000
            setReady(true)

            const animate = () => {
                animId = requestAnimationFrame(animate)
                const t = getTime()

                // Smooth tilt
                tilt.x += (tilt.tx - tilt.x) * 0.06
                tilt.y += (tilt.ty - tilt.y) * 0.06

                globe.rotation.y = t * 0.08 + tilt.x
                globe.rotation.x = tilt.y * 0.35
                rings.forEach(r => { r.rotation.y = t * 0.08 + tilt.x; r.rotation.x = tilt.y * 0.35 })

                const pos = geometry.attributes.position.array as Float32Array

                // Simple 2D repel — project cursor to sphere surface using globe rotation
                // Much cheaper than raycaster + matrix invert every frame
                const repelR = ptr.over ? 0.4 : 0
                const repelF = ptr.over ? 0.16 : 0

                // Convert 2D cursor to approximate 3D point on sphere front face
                const cx3 = ptr.nx * radius * 0.8
                const cy3 = ptr.ny * radius * 0.8

                for (let i = 0; i < count; i++) {
                    const bx = basePos[i * 3], by = basePos[i * 3 + 1], bz = basePos[i * 3 + 2]
                    let tx = bx, ty = by, tz = bz

                    if (ptr.over && repelR > 0) {
                        // Use x,y distance only (front-face approximation — no matrix invert needed)
                        const dx = bx - cx3
                        const dy = by - cy3
                        const dist2D = Math.sqrt(dx * dx + dy * dy)
                        if (dist2D < repelR && dist2D > 0.001) {
                            const force = (1 - dist2D / repelR) * repelF
                            tx = bx + (dx / dist2D) * force
                            ty = by + (dy / dist2D) * force
                        }
                    }

                    if (ripple > 0) {
                        tx += (bx / radius) * ripple
                        ty += (by / radius) * ripple
                        tz += (bz / radius) * ripple
                    }

                    // Faster lerp = snappier response, less lag
                    pos[i * 3] += (tx - pos[i * 3]) * 0.15
                    pos[i * 3 + 1] += (ty - pos[i * 3 + 1]) * 0.15
                    pos[i * 3 + 2] += (tz - pos[i * 3 + 2]) * 0.15
                }

                if (ripple > 0) ripple -= 0.012
                geometry.attributes.position.needsUpdate = true

                material.size = ptr.over ? 2.6 : 2
                material.opacity = (ptr.over ? 0.85 : 0.55) + Math.sin(t * 0.5) * 0.07
                const ringOpacity = ptr.over ? 0.22 : 0.08
                rings.forEach(r => { (r.material as THREE.LineBasicMaterial).opacity = ringOpacity })

                renderer.render(scene, camera)
            }
            animate()

            cleanupFn = () => {
                cancelAnimationFrame(animId)
                container.removeEventListener('mousemove', onMouseMove)
                container.removeEventListener('mouseenter', onMouseEnter)
                container.removeEventListener('mouseleave', onMouseLeave)
                container.removeEventListener('click', onClick)
                window.removeEventListener('resize', onResize)
                // Dispose all GPU resources
                geometry.dispose()
                material.dispose()
                rings.forEach(r => { r.geometry.dispose(); (r.material as THREE.LineBasicMaterial).dispose() })
                ringMat.dispose()
                scene.clear()
                renderer.dispose()
                if (popupTimer.current) clearTimeout(popupTimer.current)
            }
        }

        tryInit()
        return () => { mounted = false; cleanupFn?.() }
    }, [triggerPopup])

    const service = popup ? SERVICES[popup.serviceIndex] : null

    return (
        <div ref={containerRef} className="w-full h-full relative select-none" style={{ cursor: 'crosshair' }}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block', opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
            />

            {/* Static glow — no state, no re-render */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div style={{
                    width: '280px', height: '280px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
                }} />
            </div>

            {/* Smooth popup — stays fixed position, only content changes */}
            <AnimatePresence mode="wait">
                {popup && service && (
                    <motion.div
                        key={popup.serviceIndex}
                        className="absolute pointer-events-none"
                        style={{
                            left: Math.min(popup.x + 18, (containerRef.current?.offsetWidth ?? 400) - 215),
                            top: Math.max(popup.y - 95, 8),
                        }}
                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div style={{
                            background: 'rgba(8,8,8,0.96)',
                            border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '12px',
                            padding: '11px 15px',
                            backdropFilter: 'blur(16px)',
                            boxShadow: 'rgba(168,85,247,0.18) 0px 0px 20px 0px, rgba(0,0,0,0.6) 0px 8px 24px 0px',
                            minWidth: '180px', maxWidth: '200px',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                                background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)',
                            }} />
                            <div className="flex items-center gap-2 mb-1">
                                <span style={{ fontSize: '14px' }}>{service.icon}</span>
                                <span style={{ color: '#C084FC', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 400, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                                    {service.title}
                                </span>
                            </div>
                            <p style={{ color: '#737373', fontSize: '11px', fontWeight: 300, lineHeight: '17px', fontFamily: 'Inter, sans-serif' }}>
                                {service.desc}
                            </p>
                            <div className="flex gap-1 mt-2">
                                {SERVICES.map((_, i) => (
                                    <div key={i} style={{
                                        flex: i === popup.serviceIndex ? 2 : 1, height: '2px',
                                        borderRadius: '9999px',
                                        background: i === popup.serviceIndex ? '#A855F7' : 'rgba(255,255,255,0.08)',
                                        transition: 'flex 0.2s ease',
                                    }} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
