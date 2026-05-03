'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIAS } from '@/lib/utils'
import type { Artigo } from '@/lib/types'

interface Props {
  artigos: Artigo[]
}

export function ArtigosGrid({ artigos }: Props) {
  const [cat, setCat] = useState<string>('todos')

  const filtered = cat === 'todos' ? artigos : artigos.filter(a => a.categoria === cat)

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center" role="group" aria-label="Filtrar por categoria">
        <button
          onClick={() => setCat('todos')}
          className={`px-4 py-2 rounded-full font-heading text-[0.68rem] tracking-wider uppercase transition-all border ${cat === 'todos' ? 'border-gold-main bg-gold-main/15 text-gold-light' : 'border-gold-main/25 text-gold-pale/50 hover:border-gold-main/50 hover:text-gold-pale'}`}
        >
          Todos
        </button>
        {Object.entries(CATEGORIAS).map(([slug, nome]) => (
          <button
            key={slug}
            onClick={() => setCat(slug)}
            className={`px-4 py-2 rounded-full font-heading text-[0.68rem] tracking-wider uppercase transition-all border ${cat === slug ? 'border-gold-main bg-gold-main/15 text-gold-light' : 'border-gold-main/25 text-gold-pale/50 hover:border-gold-main/50 hover:text-gold-pale'}`}
          >
            {nome}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gold-pale/40 py-16">
          Nenhum conteúdo encontrado nesta categoria ainda.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(a => (
          <Link
            key={a.id}
            href={`/conteudos/${a.slug}`}
            className="card group flex flex-col overflow-hidden"
          >
            <div
              className="h-44 w-full flex-shrink-0 relative"
              style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(201,149,42,0.2) 0%, transparent 60%), linear-gradient(135deg, #100c02 0%, #1c1205 100%)' }}
              role="img"
              aria-label={a.titulo}
            >
              <span className="m-3 inline-flex items-center rounded-full border border-gold-main/35 bg-bg-primary/70 px-3 py-1 font-heading text-[0.58rem] tracking-widest text-gold-light uppercase backdrop-blur-sm">
                {CATEGORIAS[a.categoria ?? 'arcturianos']}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="mb-2 font-heading text-[0.85rem] font-semibold leading-snug text-white group-hover:text-gold-light transition-colors">
                {a.titulo}
              </h2>
              <p className="mb-4 flex-1 text-[0.87rem] text-gold-pale/50 leading-6 line-clamp-3">{a.resumo}</p>
              <span className="font-heading text-[0.68rem] font-semibold tracking-widest text-gold-main uppercase group-hover:text-gold-light transition-colors">
                Ler artigo →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
