import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Artigo } from '@/lib/types'
import { CATEGORIAS } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('artigos')
    .select('titulo, resumo')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()

  if (!data) return { title: 'Post não encontrado' }
  return {
    title: data.titulo,
    description: data.resumo,
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('artigos')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()

  if (!data) notFound()

  const artigo = data as Artigo

  const dataFormatada = new Date(artigo.publicado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[42vh] flex items-end pb-14 pt-36 bg-bg-secondary overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,149,42,0.12) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 w-full">
          <div className="mb-4 flex items-center gap-3">
            <Link
              href="/conteudos"
              className="font-heading text-[0.6rem] tracking-widest text-gold-pale/40 uppercase hover:text-gold-pale/70 transition-colors"
            >
              ← Conteúdos
            </Link>
            <span className="text-gold-main/30">·</span>
            <span className="rounded-full border border-gold-main/35 bg-bg-primary/70 px-3 py-1 font-heading text-[0.55rem] tracking-widest text-gold-light uppercase">
              {CATEGORIAS[artigo.categoria ?? 'arcturianos']}
            </span>
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-black text-white leading-tight mb-4">
            {artigo.titulo}
          </h1>
          <p className="text-gold-pale/55 text-sm md:text-base leading-7 max-w-2xl">
            {artigo.resumo}
          </p>
          <p className="mt-4 font-heading text-[0.6rem] tracking-widest text-gold-pale/30 uppercase">
            {dataFormatada}
          </p>
        </div>
      </div>

      {/* Separador */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-main/30 to-transparent" />

      {/* Conteúdo */}
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <div className="prose-artigo">
          {artigo.conteudo?.split('\n').filter(Boolean).map((paragrafo, i) => (
            <p key={i} className="mb-6 text-gold-pale/70 leading-8 text-[0.97rem] md:text-base">
              {paragrafo}
            </p>
          ))}
        </div>

        {/* Rodapé do artigo */}
        <div className="mt-16 pt-8 border-t border-gold-main/15 flex items-center justify-between flex-wrap gap-4">
          <span className="rounded-full border border-gold-main/35 bg-bg-card px-4 py-1.5 font-heading text-[0.55rem] tracking-widest text-gold-light uppercase">
            {CATEGORIAS[artigo.categoria ?? 'arcturianos']}
          </span>
          <Link
            href="/conteudos"
            className="font-heading text-[0.65rem] tracking-widest text-gold-main uppercase hover:text-gold-light transition-colors"
          >
            ← Ver todos os conteúdos
          </Link>
        </div>
      </article>
    </>
  )
}
