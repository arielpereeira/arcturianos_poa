'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/',           label: 'Início'    },
  { href: '/sobre',      label: 'Sobre'     },
  { href: '/conteudos',  label: 'Conteúdos' },
  { href: '/contato',    label: 'Contato'   },
]

export function Navbar() {
  const pathname        = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [user, setUser]         = useState<User | null>(null)

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Get current user
  useEffect(() => {
    if (!isSupabaseConfigured()) return
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (pathname.startsWith('/admin')) return null

  async function handleSignOut() {
    if (!isSupabaseConfigured()) return
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-300',
        scrolled && 'bg-bg-primary/90 backdrop-blur-xl shadow-[0_1px_0_rgba(201,149,42,0.15)]'
      )}
    >
      <nav
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-10"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-[0.72rem] font-bold tracking-[0.15em] text-gold-pale uppercase hover:text-gold-light transition-colors"
          aria-label="Projeto Patriarca — Início"
        >
          <Logo size={38} className="drop-shadow-[0_0_6px_rgba(201,149,42,0.7)] animate-blink" />
          <span className="hidden sm:inline">PROJETO PATRIARCA</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'px-3.5 py-2 rounded-md font-body text-[0.8rem] font-medium tracking-wide uppercase transition-colors',
                  pathname === href
                    ? 'text-gold-light bg-gold-main/10'
                    : 'text-gold-pale/60 hover:text-gold-light hover:bg-gold-main/8'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/membros"
                  className="px-4 py-2 rounded-md font-heading text-[0.72rem] font-semibold tracking-wider text-gold-light border border-gold-main/40 bg-gold-main/10 hover:bg-gold-main/18 hover:border-gold-main transition-all uppercase"
                >
                  Minha Área
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md font-body text-[0.8rem] text-gold-pale/50 hover:text-gold-main transition-colors uppercase tracking-wide"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-md font-heading text-[0.72rem] font-semibold tracking-wider text-gold-light border border-gold-main/40 bg-gold-main/10 hover:bg-gold-main/18 hover:border-gold-main transition-all uppercase"
              >
                Área de Membros
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="flex md:hidden flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-md border border-gold-main/25 bg-gold-main/8"
        >
          <span className={cn('block w-5 h-px bg-gold-main transition-transform duration-300', open && 'translate-y-[6.5px] rotate-45')} />
          <span className={cn('block w-5 h-px bg-gold-main transition-opacity duration-300',  open && 'opacity-0')} />
          <span className={cn('block w-5 h-px bg-gold-main transition-transform duration-300', open && '-translate-y-[6.5px] -rotate-45')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute inset-x-0 top-[72px] bg-bg-primary/97 backdrop-blur-xl border-t border-gold-main/10 transition-all duration-300 overflow-hidden',
          open ? 'max-h-screen py-4' : 'max-h-0'
        )}
      >
        <ul className="flex flex-col px-4 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'block px-4 py-3 rounded-md font-body text-sm font-medium tracking-wide uppercase border-b border-white/5 transition-colors',
                  pathname === href
                    ? 'text-gold-light bg-gold-main/10'
                    : 'text-gold-pale/60 hover:text-gold-light'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            {user ? (
              <>
                <Link href="/membros" className="block px-4 py-3 rounded-md text-gold-light font-heading text-sm tracking-wider uppercase text-center border border-gold-main/40 bg-gold-main/10 mb-2">
                  Minha Área
                </Link>
                <button onClick={handleSignOut} className="block w-full px-4 py-2 text-gold-pale/50 text-sm text-center">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block px-4 py-3 rounded-md text-gold-light font-heading text-sm tracking-wider uppercase text-center border border-gold-main/40 bg-gold-main/10">
                Área de Membros
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}
