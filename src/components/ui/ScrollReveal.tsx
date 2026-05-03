'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'section' | 'article' | 'aside'

interface Props {
  children: React.ReactNode
  className?: string
  /** Extra delay in ms before the reveal animation starts */
  delay?: number
  as?: Tag
}

export function ScrollReveal({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already visible (e.g. above the fold on first load)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.style.transitionDelay = `${delay}ms`
      el.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.dataset.visible = 'true'
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-visible="false" className={cn('scroll-reveal', className)}>
      {children}
    </Tag>
  )
}
