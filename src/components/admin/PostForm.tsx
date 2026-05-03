'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CATEGORIAS = ['arcturianos', 'vibracao', 'despertar', 'meditacao'] as const

const schema = z.object({
  slug:       z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífen'),
  titulo:     z.string().min(3),
  resumo:     z.string().min(10),
  conteudo:   z.string().min(20),
  categoria:  z.enum(CATEGORIAS),
  imagem_url: z.string().url('URL inválida').or(z.literal('')).optional(),
  publicado:  z.boolean(),
})

export type PostFormValues = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<PostFormValues>
  /** 'create' calls POST /api/admin/posts, 'edit' calls PUT /api/admin/posts/:slug */
  mode: 'create' | 'edit'
  originalSlug?: string
}

export function PostForm({ defaultValues, mode, originalSlug }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoria:  'arcturianos',
      publicado:  false,
      ...defaultValues,
    },
  })

  async function onSubmit(values: PostFormValues) {
    setServerError('')
    const url    = mode === 'create' ? '/api/admin/posts' : `/api/admin/posts/${originalSlug}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setServerError(body.error ?? 'Erro ao salvar post.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/posts/${originalSlug}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const body = await res.json().catch(() => ({}))
      setServerError(body.error ?? 'Erro ao excluir post.')
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {serverError && (
        <p className="rounded-lg border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {serverError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label">Título</label>
          <input {...register('titulo')} className="form-input" placeholder="Título do post" />
          {errors.titulo && <p className="mt-1 text-xs text-red-400">{errors.titulo.message}</p>}
        </div>
        <div>
          <label className="form-label">Slug (URL)</label>
          <input {...register('slug')} className="form-input" placeholder="meu-post-aqui" />
          {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Resumo</label>
        <textarea {...register('resumo')} rows={3} className="form-input resize-none" placeholder="Breve descrição exibida nos cards..." />
        {errors.resumo && <p className="mt-1 text-xs text-red-400">{errors.resumo.message}</p>}
      </div>

      <div>
        <label className="form-label">Conteúdo</label>
        <textarea {...register('conteudo')} rows={12} className="form-input resize-y font-mono text-sm" placeholder="Conteúdo completo do post..." />
        {errors.conteudo && <p className="mt-1 text-xs text-red-400">{errors.conteudo.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label">Categoria</label>
          <select {...register('categoria')} className="form-input">
            {CATEGORIAS.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">URL da imagem (opcional)</label>
          <input {...register('imagem_url')} className="form-input" placeholder="https://..." />
          {errors.imagem_url && <p className="mt-1 text-xs text-red-400">{errors.imagem_url.message}</p>}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" {...register('publicado')} className="h-4 w-4 accent-yellow-500" />
          <span className="text-sm text-gold-pale/70">Publicar agora</span>
        </label>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
          {isSubmitting ? 'Salvando…' : mode === 'create' ? 'Criar post' : 'Salvar alterações'}
        </button>
        <button type="button" onClick={() => router.push('/admin')}
          className="font-heading text-xs tracking-widest text-gold-pale/40 uppercase hover:text-gold-pale/70 transition-colors">
          Cancelar
        </button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} disabled={deleting}
            className="ml-auto font-heading text-xs tracking-widest text-red-500/70 uppercase hover:text-red-400 transition-colors disabled:opacity-50">
            {deleting ? 'Excluindo…' : '🗑 Excluir post'}
          </button>
        )}
      </div>
    </form>
  )
}
