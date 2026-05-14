"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        // Skip on mobile — saves battery, not visible anyway
        if (window.innerWidth < 768) return
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const canvas = canvasRef.current
        if (!canvas) return

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -2, window.innerWidth / 2,
            window.innerHeight / 2, window.innerHeight / -2, 1, 1000
        )
        camera.position.z = 10

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(1) // Always 1 for background canvas — no need for high DPR

        const spacing = 56 // Wider spacing = fewer particles
        const buildGrid = () => {
            const cols = Math.ceil(window.innerWidth / spacing) + 1
            const rows = Math.ceil(window.innerHeight / spacing) + 1
            const count = cols * rows
            const pos = new Float32Array(count * 3)
            const base = new Float32Array(count * 3)
            const phase = new Float32Array(count)
            let i = 0
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * spacing - window.innerWidth / 2
                    const y = r * spacing - window.innerHeight / 2
                    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = 0
                    base[i * 3] = x; base[i * 3 + 1] = y; base[i * 3 + 2] = 0
                    phase[i] = Math.random() * Math.PI * 2
                    i++
                }
            }
            return { pos, base, phase, count }
        }

        let grid = buildGrid()
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(grid.pos, 3))

        const material = new THREE.PointsMaterial({
            color: 0xffffff, size: 1, transparent: true, opacity: 0.07, sizeAttenuation: false,
        })
        scene.add(new THREE.Points(geometry, material))

        const pointer = { x: 0, y: 0 }
        const onMove = (e: MouseEvent) => {
            pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
            pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', onMove, { passive: true })

        let resizeTimer: ReturnType<typeof setTimeout>
        const onResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                renderer.setSize(window.innerWidth, window.innerHeight)
                camera.left = window.innerWidth / -2; camera.right = window.innerWidth / 2
                camera.top = window.innerHeight / 2; camera.bottom = window.innerHeight / -2
                camera.updateProjectionMatrix()
                grid = buildGrid()
                geometry.setAttribute('position', new THREE.BufferAttribute(grid.pos, 3))
            }, 200)
        }
        window.addEventListener('resize', onResize, { passive: true })

        const startTime = performance.now()
        const getTime = () => (performance.now() - startTime) / 1000
        let animId: number
        let frame = 0

        const animate = () => {
            animId = requestAnimationFrame(animate)
            frame++
            // Only update particles every 2nd frame — halves CPU cost
            if (frame % 2 !== 0) { renderer.render(scene, camera); return }

            const t = getTime()
            const arr = geometry.attributes.position.array as Float32Array
            const { base, phase, count } = grid

            for (let j = 0; j < count; j++) {
                const pulse = Math.sin(t * 0.35 + phase[j]) * 1.5
                arr[j * 3] += (base[j * 3] + pointer.x * 5 - arr[j * 3]) * 0.018
                arr[j * 3 + 1] += (base[j * 3 + 1] + pulse + pointer.y * 5 - arr[j * 3 + 1]) * 0.018
            }
            geometry.attributes.position.needsUpdate = true
            material.opacity = 0.05 + Math.sin(t * 0.25) * 0.025
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(animId)
            clearTimeout(resizeTimer)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('resize', onResize)
            geometry.dispose(); material.dispose(); renderer.dispose()
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />
    )
}
