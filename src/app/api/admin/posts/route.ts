import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const schema = z.object({
  slug:       z.string().min(2).regex(/^[a-z0-9-]+$/),
  titulo:     z.string().min(3),
  resumo:     z.string().min(10),
  conteudo:   z.string().min(20),
  categoria:  z.enum(['arcturianos', 'vibracao', 'despertar', 'meditacao']),
  imagem_url: z.string().url().or(z.literal('')).optional(),
  publicado:  z.boolean(),
})

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin && profile?.is_admin !== 'true') return null
  return supabase
}

export async function POST(req: NextRequest) {
  const supabase = await requireAdmin()
  if (!supabase) return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })

  const { data, error } = await supabase.from('artigos').insert({
    ...parsed.data,
    imagem_url:  parsed.data.imagem_url || null,
    publicado_em: parsed.data.publicado ? new Date().toISOString() : null,
  }).select('slug').single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ slug: data.slug }, { status: 201 })
}
