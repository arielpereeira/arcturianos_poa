import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function MembrosLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      redirect('/auth/login?redirect=/membros')
    }
  } catch (e: unknown) {
    // Se o erro for um redirect do Next.js, propaga normalmente
    if (e && typeof e === 'object' && 'digest' in e) throw e
    // Supabase não configurado — redireciona para login
    redirect('/auth/login?redirect=/membros')
  }

  return <>{children}</>
}
