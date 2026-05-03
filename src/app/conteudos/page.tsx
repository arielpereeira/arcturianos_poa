import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Artigo } from '@/lib/types'
import { ArtigosGrid } from '@/components/conteudos/ArtigosGrid'

export const metadata: Metadata = {
  title: 'Conteúdos',
  description: 'Artigos, canalizações e ensinamentos sobre a consciência arcturiana.',
}

export default async function ConteudosPage() {
  let artigos: Artigo[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('artigos')
      .select('id, slug, titulo, resumo, categoria, publicado_em')
      .eq('publicado', true)
      .order('publicado_em', { ascending: false })
    artigos = (data ?? []) as Artigo[]
  } catch {
    // Supabase não configurado
  }

  return (
    <>
      {/* Hero strip */}
      <div className="relative min-h-[35vh] flex items-end pb-16 pt-36 bg-bg-secondary overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,149,42,0.1) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="section-tag">Biblioteca Cósmica</span>
          <h1 className="section-title text-4xl md:text-5xl mb-3">
            Conteúdos{' '}
            <span className="bg-grad-gold bg-clip-text text-transparent">Arcturianos</span>
          </h1>
          <p className="section-subtitle">
            Artigos, canalizações e ensinamentos para expandir sua consciência.
            <span className="text-gold-pale/40 text-xs">Filtre por categoria acima.</span>
          </p>
        </div>
      </div>

      <section className="py-16 bg-bg-primary">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <ArtigosGrid artigos={artigos} />
        </div>
      </section>
    </>
  )
}
