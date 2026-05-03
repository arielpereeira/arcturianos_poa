import { Hero } from '@/components/home/Hero'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Artigo } from '@/lib/types'
import { CATEGORIAS } from '@/lib/utils'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

// Seção de artigos recentes (server component — busca dados diretamente)
async function RecentArticles() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('artigos')
    .select('id, slug, titulo, resumo, categoria, publicado_em')
    .eq('publicado', true)
    .order('publicado_em', { ascending: false })
    .limit(3)
  const list = (data ?? []) as Artigo[]

  if (list.length === 0) return null

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a, i) => (
        <Link
          key={i}
          href={`/conteudos/${a.slug}`}
          className="card group flex flex-col overflow-hidden"
        >
          {/* Fake image with cosmic bg */}
          <div
            className="h-44 w-full flex-shrink-0"
            style={{ background: `radial-gradient(ellipse at ${30 + i * 20}% 40%, rgba(201,149,42,${0.22 + i * 0.05}) 0%, transparent 60%), linear-gradient(135deg, #100c02 0%, #1c1205 100%)` }}
            role="img"
            aria-label={a.titulo}
          >
            <span className="m-3 inline-flex items-center rounded-full border border-gold-main/35 bg-bg-primary/70 px-3 py-1 font-heading text-[0.58rem] tracking-widest text-gold-light uppercase backdrop-blur-sm">
              {CATEGORIAS[a.categoria ?? 'arcturianos']}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 font-heading text-[0.85rem] font-semibold leading-snug text-white group-hover:text-gold-light transition-colors">
              {a.titulo}
            </h3>
            <p className="mb-4 flex-1 text-[0.87rem] text-gold-pale/50 leading-6 line-clamp-3">{a.resumo}</p>
            <span className="font-heading text-[0.68rem] font-semibold tracking-widest text-gold-main uppercase group-hover:text-gold-light transition-colors">
              Ler artigo →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About preview */}
      <section className="py-24 md:min-h-screen md:flex md:items-center bg-bg-secondary" aria-labelledby="about-preview-heading">
        <ScrollReveal className="w-full mx-auto max-w-6xl px-4 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Texto */}
            <div>
              <span className="section-tag">Nossa Missão</span>
              <h2 id="about-preview-heading" className="section-title mb-5">
                O que é o{' '}
                <span className="bg-grad-gold bg-clip-text text-transparent">Projeto Patriarca?</span>
              </h2>
              <p className="text-gold-pale/60 leading-7 mb-4">
                Somos um coletivo de pesquisadores, médiuns e estudiosos dedicados a traduzir e
                compartilhar mensagens de alta frequência vibracional, conectando o mundo físico
                com dimensões superiores de existência.
              </p>
              <p className="text-gold-pale/60 leading-7 mb-8">
                Por meio dos ensinamentos dos <strong className="text-gold-light">Arcturianos</strong> —
                seres de alta consciência da constelação de Boötes — guiamos buscadores espirituais
                no processo de despertar e expansão da consciência.
              </p>
              <Link href="/sobre" className="btn-primary inline-flex">
                Conhecer a organização
              </Link>
            </div>

            {/* Geometria sagrada decorativa */}
            <div className="flex items-center justify-center" aria-hidden="true">
              <div className="relative h-64 w-64">
                <div className="absolute inset-0 rounded-full border border-gold-main/30 animate-ring-rotate" />
                <div className="absolute inset-[15%] rounded-full border border-gold-light/25 animate-ring-reverse" />
                <div className="absolute inset-[30%] rounded-full border border-gold-main/20 animate-ring-rotate [animation-duration:10s]" />
                <svg
                  className="absolute inset-0 m-auto w-1/2 h-1/2 text-gold-main animate-float"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(201,149,42,0.6))' }}
                  viewBox="0 0 60 68" fill="none"
                >
                  <polygon points="30,2 58,56 2,56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="30" cy="36" r="5"   fill="none" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="30" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="14" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="46" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
                  <line x1="30"   y1="16.5" x2="30"   y2="31"   stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="26.4" y1="39.5" x2="16.8" y2="45.2" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="33.6" y1="39.5" x2="43.2" y2="45.2" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Recent articles */}
      <section className="py-24 md:min-h-screen md:flex md:items-center bg-bg-primary" aria-labelledby="articles-preview-heading">
        <ScrollReveal className="w-full mx-auto max-w-6xl px-4 md:px-10">
          <div className="mb-12 text-center">
            <span className="section-tag">Conhecimento Cósmico</span>
            <h2 id="articles-preview-heading" className="section-title">
              Conteúdos em{' '}
              <span className="bg-grad-gold bg-clip-text text-transparent">Destaque</span>
            </h2>
          </div>
          <RecentArticles />
          <div className="mt-10 text-center">
            <Link href="/conteudos" className="btn-outline inline-flex">
              Ver todos os conteúdos
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA membros */}
      <section className="py-20 md:min-h-screen md:flex md:items-center bg-bg-secondary">
        <ScrollReveal className="w-full mx-auto max-w-2xl px-4 text-center">
          <span className="section-tag">Comunidade Exclusiva</span>
          <h2 className="section-title mb-4">
            Faça parte da{' '}
            <span className="bg-grad-gold bg-clip-text text-transparent">Família Patriarca</span>
          </h2>
          <p className="section-subtitle mb-8">
            Acesse canalizações inéditas, meditações exclusivas e faça parte de uma
            comunidade de buscadores espirituais comprometidos com a evolução.
          </p>
          <Link href="/auth/cadastro" className="btn-primary inline-flex">
            Quero ser membro ✦
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
