import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Artigo, Profile } from '@/lib/types'
import { CATEGORIAS } from '@/lib/utils'

export const metadata: Metadata = { title: 'Minha Área' }

export default async function MembrosPage() {
  const supabase = await createClient()

  const [{ data: { user } }, { data: artigosData }, { data: profileData }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('artigos')
      .select('id, slug, titulo, resumo, categoria, publicado_em')
      .eq('publicado', true)
      .order('publicado_em', { ascending: false })
      .limit(6),
    supabase.from('profiles').select('*').eq('id', (await supabase.auth.getUser()).data.user?.id ?? '').single(),
  ])

  const artigos = (artigosData ?? []) as Artigo[]
  const profile = profileData as Profile | null
  const nome = profile?.nome ?? user?.user_metadata?.nome ?? user?.email?.split('@')[0] ?? 'Membro'

  return (
    <>
      {/* Header */}
      <div className="relative min-h-[32vh] flex items-end pb-12 pt-32 bg-bg-secondary overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(201,149,42,0.09) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 w-full">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center bg-gold-main/20 border border-gold-main/40 font-heading text-xl font-bold text-gold-light select-none"
              aria-hidden="true"
            >
              {nome.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-heading text-[0.6rem] tracking-[0.22em] text-gold-pale/45 uppercase mb-0.5">Bem-vindo de volta</p>
              <h1 className="font-heading text-2xl font-bold text-white">{nome}</h1>
            </div>
            {(profile?.is_admin === true || profile?.is_admin === 'true') && (
              <div className="ml-auto flex items-center gap-3">
                <Link
                  href="/admin"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  Painel Admin
                </Link>
                <span className="rounded-full border border-gold-main/40 bg-gold-main/12 px-4 py-1.5 font-heading text-[0.6rem] tracking-widest text-gold-light uppercase">
                  ✦ Administrador
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="py-16 bg-bg-primary">
        <div className="mx-auto max-w-5xl px-4 md:px-10">
          <div className="mb-10">
            <h2 className="section-title mb-1">
              <span className="bg-grad-gold bg-clip-text text-transparent">Conteúdos</span> para você
            </h2>
          </div>

          {artigos.length === 0 ? (
            <p className="text-center text-gold-pale/40 py-12">
              Nenhum conteúdo publicado ainda. Volte em breve!
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {artigos.map(a => (
                <Link
                  key={a.id}
                  href={`/conteudos/${a.slug}`}
                  className="card group flex flex-col overflow-hidden"
                >
                  <div
                    className="h-36 w-full flex-shrink-0"
                    style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(201,149,42,0.18) 0%, transparent 60%), linear-gradient(135deg, #100c02 0%, #1c1205 100%)' }}
                    role="img"
                    aria-label={a.titulo}
                  >
                    <span className="m-3 inline-flex items-center rounded-full border border-gold-main/35 bg-bg-primary/70 px-3 py-1 font-heading text-[0.55rem] tracking-widest text-gold-light uppercase backdrop-blur-sm">
                      {CATEGORIAS[a.categoria ?? 'arcturianos']}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-heading text-[0.82rem] font-semibold leading-snug text-white group-hover:text-gold-light transition-colors line-clamp-2">
                      {a.titulo}
                    </h3>
                    <p className="flex-1 text-[0.84rem] text-gold-pale/50 leading-6 line-clamp-2">{a.resumo}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
