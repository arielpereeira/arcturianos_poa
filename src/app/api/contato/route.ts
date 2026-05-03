import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  nome:     z.string().min(2).max(100),
  email:    z.string().email(),
  assunto:  z.string().min(3).max(120),
  mensagem: z.string().min(10).max(2000),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos.', issues: parsed.error.flatten() }, { status: 422 })
  }

  const { nome, email, assunto, mensagem } = parsed.data
  const to   = process.env.RESEND_TO_EMAIL   ?? 'contato@projetopatriarca.com'
  const from = process.env.RESEND_FROM_EMAIL ?? 'Projeto Patriarca <noreply@projetopatriarca.com>'

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from,
    to,
    reply_to: email,
    subject: `[Contato Site] ${assunto}`,
    text: `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`,
    html: `
      <h2 style="color:#c9952a;font-family:serif">Mensagem do site — Projeto Patriarca</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <hr style="border-color:#c9952a30"/>
      <p style="white-space:pre-line">${mensagem}</p>
    `,
  })

  if (error) {
    console.error('[contato] Resend error:', error)
    return NextResponse.json({ error: 'Falha ao enviar e-mail.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
