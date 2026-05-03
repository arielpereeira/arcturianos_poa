import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Artigo } from '@/lib/types'

export const metadata = { title: 'Admin — Dashboard' }

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: artigos } = await supabase
    .from('artigos')
    .select('id, slug, titulo, categoria, publicado, publicado_em, criado_em')
    .order('criado_em', { ascending: false })

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const posts = (artigos ?? []) as Artigo[]
  const publishedCount = posts.filter(p => p.publicado).length

  return (
    <div>
      <h1 className="mb-8 font-heading text-2xl font-black text-white">
        Dashboard <span className="bg-grad-gold bg-clip-text text-transparent">Admin</span>
      </h1>

      {/* Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total de posts', value: posts.length },
          { label: 'Posts publicados', value: publishedCount },
          { label: 'Usuários cadastrados', value: totalUsers ?? 0 },
        ].map(({ label, value }) => (
          <div key={label} className="card p-5">
            <p className="mb-1 font-heading text-[0.65rem] tracking-widest text-gold-pale/50 uppercase">{label}</p>
            <p className="font-heading text-3xl font-black text-gold-light">{value}</p>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-sm font-semibold tracking-widest text-gold-pale/70 uppercase">Posts</h2>
        <Link href="/admin/posts/novo" className="btn-primary py-2 px-5 text-xs">
          + Novo post
        </Link>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-main/15">
              <th className="px-5 py-3 text-left font-heading text-[0.65rem] tracking-widest text-gold-pale/50 uppercase">Título</th>
              <th className="px-5 py-3 text-left font-heading text-[0.65rem] tracking-widest text-gold-pale/50 uppercase hidden sm:table-cell">Categoria</th>
              <th className="px-5 py-3 text-left font-heading text-[0.65rem] tracking-widest text-gold-pale/50 uppercase hidden md:table-cell">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gold-pale/40 text-xs">
                  Nenhum post ainda. <Link href="/admin/posts/novo" className="text-gold-main underline">Criar o primeiro</Link>
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gold-main/10 hover:bg-gold-main/5 transition-colors">
                <td className="px-5 py-3 text-gold-pale/80 max-w-[260px] truncate">{post.titulo}</td>
                <td className="px-5 py-3 hidden sm:table-cell">
                  <span className="rounded-full border border-gold-main/30 px-2.5 py-0.5 font-heading text-[0.6rem] tracking-wider text-gold-light uppercase">
                    {post.categoria}
                  </span>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className={`rounded-full px-2.5 py-0.5 font-heading text-[0.6rem] tracking-wider uppercase ${
                    post.publicado
                      ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/40'
                      : 'bg-gold-main/10 text-gold-pale/50 border border-gold-main/20'
                  }`}>
                    {post.publicado ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="font-heading text-[0.65rem] tracking-widest text-gold-main uppercase hover:text-gold-light transition-colors"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
