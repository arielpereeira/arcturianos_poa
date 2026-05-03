import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let isAdmin = false
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('[admin] user:', user?.id ?? null, 'authError:', authError?.message ?? null)
    if (!user) redirect('/auth/login?redirect=/admin')

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    console.log('[admin] profile:', profile, 'profileError:', profileError?.message ?? null)
    isAdmin = profile?.is_admin === true || profile?.is_admin === 'true'
    console.log('[admin] isAdmin:', isAdmin)
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'digest' in e) throw e
    redirect('/auth/login?redirect=/admin')
  }

  if (!isAdmin) {
    redirect('/membros')
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Admin top bar */}
      <div className="sticky top-0 z-50 border-b border-gold-main/20 bg-bg-secondary/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-gold-main uppercase">
              ✦ Painel Admin
            </span>
            <nav className="flex items-center gap-4">
              <Link href="/admin" className="font-heading text-[0.72rem] tracking-wider text-gold-pale/60 uppercase hover:text-gold-light transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/posts/novo" className="font-heading text-[0.72rem] tracking-wider text-gold-pale/60 uppercase hover:text-gold-light transition-colors">
                Novo Post
              </Link>
            </nav>
          </div>
          <Link href="/membros" className="font-heading text-[0.65rem] tracking-widest text-gold-pale/40 uppercase hover:text-gold-pale/70 transition-colors">
            ← Área de membros
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {children}
      </main>
    </div>
  )
}
