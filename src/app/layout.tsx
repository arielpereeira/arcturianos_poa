import type { Metadata } from 'next'
import { Cinzel, Raleway } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/ui/PageTransition'
import { ReadingProgress } from '@/components/ui/ReadingProgress'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Projeto Patriarca | Consciência Cósmica',
    template: '%s | Projeto Patriarca',
  },
  description:
    'Portal de conhecimento cósmico que une espiritualidade, ciência e a sabedoria dos Arcturianos para guiar a humanidade em sua jornada de evolução.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Projeto Patriarca',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${raleway.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-[-60px] left-4 z-[9999] rounded bg-gold-main px-4 py-2 text-sm font-bold text-bg-primary focus:top-3 transition-all"
        >
          Ir para conteúdo principal
        </a>
        <ReadingProgress />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
