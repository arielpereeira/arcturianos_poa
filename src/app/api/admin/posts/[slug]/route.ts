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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await requireAdmin()
  if (!supabase) return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })

  const updateData: Record<string, unknown> = {
    ...parsed.data,
    imagem_url: parsed.data.imagem_url || null,
  }

  // Set publicado_em only when publishing for the first time
  if (parsed.data.publicado) {
    const { data: existing } = await supabase
      .from('artigos')
      .select('publicado_em, publicado')
      .eq('slug', slug)
      .single()
    if (!existing?.publicado) {
      updateData.publicado_em = new Date().toISOString()
    }
  }

  const { error } = await supabase
    .from('artigos')
    .update(updateData)
    .eq('slug', slug)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await requireAdmin()
  if (!supabase) return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })

  const { error } = await supabase.from('artigos').delete().eq('slug', slug)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
