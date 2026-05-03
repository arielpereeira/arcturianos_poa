'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const schema = z.object({
  nome:     z.string().min(2, 'Informe seu nome').max(100),
  email:    z.string().email('E-mail inválido'),
  assunto:  z.string().min(3, 'Informe o assunto').max(120),
  mensagem: z.string().min(10, 'Mensagem muito curta').max(2000),
})

type FormData = z.infer<typeof schema>

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
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
          <span className="section-tag">Fale Conosco</span>
          <h1 className="section-title text-4xl md:text-5xl mb-3">
            Entre em{' '}
            <span className="bg-grad-gold bg-clip-text text-transparent">Contato</span>
          </h1>
          <p className="section-subtitle">
            Tem perguntas, quer colaborar ou deseja compartilhar suas experiências espirituais?
            Estamos aqui.
          </p>
        </div>
      </div>

      <section className="py-16 bg-bg-primary">
        <div className="mx-auto max-w-xl px-4">
          {status === 'success' ? (
            <div className="rounded-2xl border border-gold-main/40 bg-bg-card p-8 text-center" role="alert">
              <span className="text-3xl mb-4 block" aria-hidden="true">✦</span>
              <h2 className="font-heading text-xl font-bold text-white mb-2">Mensagem Enviada!</h2>
              <p className="text-gold-pale/60 mb-6">
                Agradecemos pelo contato. Retornaremos em breve, em harmonia e gratidão.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-outline">
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card p-6 md:p-8 space-y-5"
              noValidate
              aria-label="Formulário de contato"
            >
              <div>
                <label className="form-label" htmlFor="nome">Nome completo</label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  className={cn('form-input', errors.nome && 'border-red-400/70 focus:border-red-400')}
                  {...register('nome')}
                />
                {errors.nome && <p className="mt-1.5 text-xs text-red-400">{errors.nome.message}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className={cn('form-input', errors.email && 'border-red-400/70 focus:border-red-400')}
                  {...register('email')}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="assunto">Assunto</label>
                <input
                  id="assunto"
                  type="text"
                  placeholder="Sobre o que gostaria de falar?"
                  className={cn('form-input', errors.assunto && 'border-red-400/70 focus:border-red-400')}
                  {...register('assunto')}
                />
                {errors.assunto && <p className="mt-1.5 text-xs text-red-400">{errors.assunto.message}</p>}
              </div>

              <div>
                <label className="form-label" htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Sua mensagem..."
                  className={cn('form-input resize-none', errors.mensagem && 'border-red-400/70 focus:border-red-400')}
                  {...register('mensagem')}
                />
                {errors.mensagem && <p className="mt-1.5 text-xs text-red-400">{errors.mensagem.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 text-center" role="alert">
                  Ocorreu um erro ao enviar. Tente novamente em instantes.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
              >
                {status === 'loading' ? 'Enviando…' : 'Enviar Mensagem ✦'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
