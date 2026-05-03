'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

const schema = z.object({
  nome:  z.string().min(2, 'Informe seu nome').max(100),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
  confirma: z.string(),
}).refine(d => d.senha === d.confirma, {
  message: 'As senhas não coincidem',
  path: ['confirma'],
})

type FormData = z.infer<typeof schema>

export default function CadastroPage() {
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit({ nome, email, senha }: FormData) {
    setServerError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome }, emailRedirectTo: `${location.origin}/api/auth/callback` },
    })
    if (error) {
      setServerError(error.message)
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-bg-primary px-4 py-16 pt-24 text-center">
        <Logo size={44} className="mb-6 animate-float" />
        <h1 className="font-heading text-2xl font-bold text-white mb-3">Verifique seu e-mail</h1>
        <p className="text-gold-pale/60 max-w-sm leading-7 mb-6">
          Enviamos um link de confirmação para o seu e-mail. Clique no link para ativar sua conta e
          acessar a área de membros.
        </p>
        <Link href="/auth/login" className="btn-outline inline-flex">Ir para o login</Link>
      </main>
    )
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-bg-primary px-4 py-16 pt-24">
      <div className="mb-8 flex flex-col items-center gap-3">
        <Logo size={44} className="animate-float" />
        <span className="font-heading text-[0.62rem] font-bold tracking-[0.25em] text-gold-pale uppercase">
          Projeto Patriarca
        </span>
      </div>

      <div className="card w-full max-w-sm p-6 md:p-8">
        <h1 className="font-heading text-lg font-bold text-white text-center mb-1">
          Criar Conta
        </h1>
        <p className="text-center text-[0.85rem] text-gold-pale/50 mb-7">
          Junte-se à família Patriarca e comece sua jornada cósmica.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-label="Formulário de cadastro">
          <div>
            <label className="form-label" htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              className={cn('form-input', errors.nome && 'border-red-400/70')}
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
              className={cn('form-input', errors.email && 'border-red-400/70')}
              {...register('email')}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              className={cn('form-input', errors.senha && 'border-red-400/70')}
              {...register('senha')}
            />
            {errors.senha && <p className="mt-1.5 text-xs text-red-400">{errors.senha.message}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="confirma">Confirmar senha</label>
            <input
              id="confirma"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              className={cn('form-input', errors.confirma && 'border-red-400/70')}
              {...register('confirma')}
            />
            {errors.confirma && <p className="mt-1.5 text-xs text-red-400">{errors.confirma.message}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-400 text-center" role="alert">{serverError}</p>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-1">
            {isSubmitting ? 'Criando conta…' : 'Criar conta ✦'}
          </button>
        </form>

        <p className="mt-5 text-center text-[0.82rem] text-gold-pale/40">
          Já tem conta?{' '}
          <Link href="/auth/login" className="text-gold-light hover:text-gold-main transition-colors">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}
