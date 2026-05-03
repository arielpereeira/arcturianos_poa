'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  base: number; phase: number; speed: number; color: string
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number
  len: number; life: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let stars: Star[] = []
    let shooters: ShootingStar[] = []

    const COLORS = ['#ffffff', '#ffffff', '#f5e4b0', '#e8c96a', '#ffe8a0']

    function buildStars() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      const count = Math.min(Math.floor((canvas!.width * canvas!.height) / 2800), 340)
      stars = Array.from({ length: count }, () => ({
        x:     Math.random() * canvas!.width,
        y:     Math.random() * canvas!.height,
        r:     Math.random() * 1.4 + 0.3,
        base:  Math.random() * 0.65 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.018 + 0.004,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    function spawnShooter() {
      if (shooters.length >= 2 && Math.random() > 0.003) return
      const speed = 9 + Math.random() * 7
      const angle = Math.PI / 5 + (Math.random() - 0.5) * 0.4
      shooters.push({
        x: Math.random() * canvas!.width * 0.7,
        y: Math.random() * canvas!.height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 70 + Math.random() * 60,
        life: 1,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const time = performance.now() * 0.001

      // Stars
      for (const s of stars) {
        const alpha = s.base * (0.75 + 0.25 * Math.sin(time * s.speed * 12 + s.phase))
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = s.color
        ctx!.globalAlpha = Math.max(0, alpha)
        ctx!.fill()
      }

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const ss = shooters[i]
        const tailX = ss.x - ss.vx * (ss.len / 12)
        const tailY = ss.y - ss.vy * (ss.len / 12)
        const g = ctx!.createLinearGradient(ss.x, ss.y, tailX, tailY)
        g.addColorStop(0,   `rgba(232,201,106,${ss.life * 0.9})`)
        g.addColorStop(0.3, `rgba(201,149,42,${ss.life * 0.4})`)
        g.addColorStop(1,   'rgba(201,149,42,0)')
        ctx!.beginPath()
        ctx!.moveTo(ss.x, ss.y)
        ctx!.lineTo(tailX, tailY)
        ctx!.strokeStyle = g
        ctx!.lineWidth = 1.5
        ctx!.globalAlpha = ss.life
        ctx!.stroke()
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.018
        if (ss.life <= 0) shooters.splice(i, 1)
      }

      ctx!.globalAlpha = 1
      spawnShooter()
      rafId = requestAnimationFrame(draw)
    }

    buildStars()
    draw()

    const onResize = () => { buildStars() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
