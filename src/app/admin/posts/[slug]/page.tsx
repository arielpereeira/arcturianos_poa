import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PostForm } from '@/components/admin/PostForm'
import type { Artigo } from '@/lib/types'

export const metadata = { title: 'Admin — Editar Post' }

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('artigos')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!data) notFound()

  const post = data as Artigo

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-black text-white">
        Editar <span className="bg-grad-gold bg-clip-text text-transparent">Post</span>
      </h1>
      <p className="mb-8 text-xs text-gold-pale/40 font-mono">/{post.slug}</p>
      <PostForm
        mode="edit"
        originalSlug={post.slug}
        defaultValues={{
          slug:       post.slug,
          titulo:     post.titulo,
          resumo:     post.resumo,
          conteudo:   post.conteudo ?? '',
          categoria:  post.categoria as 'arcturianos' | 'vibracao' | 'despertar' | 'meditacao',
          imagem_url: post.imagem_url ?? '',
          publicado:  post.publicado ?? false,
        }}
      />
    </div>
  )
}
