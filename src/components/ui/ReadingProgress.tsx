'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ReadingProgress() {
  const pathname = usePathname()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const update = () => {
      const scrolled = window.scrollY
      const total    = document.body.scrollHeight - window.innerHeight
      setPct(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left"
      style={{
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #8a6010 0%, #c9952a 50%, #e8c96a 100%)',
        boxShadow: '0 0 6px rgba(201,149,42,0.6)',
        transition: 'width 80ms linear',
      }}
    />
  )
}
