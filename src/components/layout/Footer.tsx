'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'

const FOOTER_LINKS = {
  Navegação: [
    { href: '/',          label: 'Início'           },
    { href: '/sobre',     label: 'Sobre'            },
    { href: '/conteudos', label: 'Conteúdos'        },
    { href: '/contato',   label: 'Contato'          },
    { href: '/membros',   label: 'Área de Membros'  },
  ],
  Temas: [
    { href: '/conteudos?cat=arcturianos', label: 'Arcturianos'        },
    { href: '/conteudos?cat=despertar',   label: 'Despertar Espiritual'},
    { href: '/conteudos?cat=vibracao',    label: 'Frequência Vibracional'},
    { href: '/conteudos?cat=meditacao',   label: 'Meditação'          },
  ],
  Legal: [
    { href: '#', label: 'Política de Privacidade' },
    { href: '#', label: 'Termos de Uso'            },
    { href: '#', label: 'Cookies'                  },
  ],
}

const SOCIAL = [
  { label: '📸 Instagram',   href: '#' },
  { label: '▶ YouTube',     href: '#' },
  { label: '✈ Telegram',    href: '#' },
  { label: '♪ Spotify',     href: '#' },
]

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="relative bg-bg-secondary border-t border-gold-main/12 pt-16 pb-8 overflow-hidden">
      {/* Glow top */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-[600px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse at top, rgba(201,149,42,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-4 flex items-center gap-2.5 font-heading text-[0.72rem] font-bold tracking-[0.15em] text-gold-pale uppercase"
            >
              <Logo size={32} />
              PROJETO PATRIARCA
            </Link>
            <p className="text-[0.88rem] text-gold-pale/50 leading-7 mb-5">
              Expandindo a consciência humana através da sabedoria arcturiana e da conexão
              com a inteligência cósmica universal.
            </p>
            <nav aria-label="Redes sociais" className="flex flex-wrap gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="px-3 py-1.5 rounded-md text-[0.8rem] text-gold-pale/55 border border-gold-main/18 bg-gold-main/6 hover:border-gold-main hover:text-gold-light hover:bg-gold-main/15 transition-all"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-heading text-[0.68rem] font-bold tracking-[0.2em] uppercase text-gold-pale">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((l, li) => (
                  <li key={`${title}-${li}`}>
                    <Link
                      href={l.href}
                      className="text-[0.88rem] text-gold-pale/50 hover:text-gold-light hover:pl-1 transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 border-t border-white/6 text-[0.8rem] text-gold-pale/35">
          <p>© {new Date().getFullYear()} Projeto Patriarca. Todos os direitos reservados.</p>
          <p>Feito com <span aria-label="estrela">✦</span> e consciência cósmica</p>
        </div>
      </div>
    </footer>
  )
}
