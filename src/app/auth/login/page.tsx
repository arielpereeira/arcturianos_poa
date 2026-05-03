'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit({ email, senha }: FormData) {
    setServerError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setServerError('E-mail ou senha inválidos. Verifique os dados e tente novamente.')
      return
    }
    router.push('/membros')
    router.refresh()
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
          Área de Membros
        </h1>
        <p className="text-center text-[0.85rem] text-gold-pale/50 mb-7">
          Entre com sua conta para acessar conteúdos exclusivos.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-label="Formulário de login">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="form-label mb-0" htmlFor="senha">Senha</label>
              <Link href="#" className="text-[0.7rem] text-gold-pale/40 hover:text-gold-main transition-colors">
                Esqueci minha senha
              </Link>
            </div>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={cn('form-input', errors.senha && 'border-red-400/70')}
              {...register('senha')}
            />
            {errors.senha && <p className="mt-1.5 text-xs text-red-400">{errors.senha.message}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-400 text-center" role="alert">{serverError}</p>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-1">
            {isSubmitting ? 'Entrando…' : 'Entrar ✦'}
          </button>
        </form>

        <p className="mt-5 text-center text-[0.82rem] text-gold-pale/40">
          Não tem conta?{' '}
          <Link href="/auth/cadastro" className="text-gold-light hover:text-gold-main transition-colors">
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </main>
  )
}
