import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a história, a missão e os valores do Projeto Patriarca.',
}

const VALUES = [
  { icon: '✦', title: 'Expansão da Consciência', desc: 'Cada ensinamento tem como propósito ampliar a percepção de realidade e despertar o potencial adormecido em cada ser.' },
  { icon: '◈', title: 'Verdade Vibracional',    desc: 'Prezamos pela autenticidade das mensagens recebidas, sempre discernindo e validando o conteúdo com responsabilidade.' },
  { icon: '⬡', title: 'Serviço ao Coletivo',    desc: 'Nossa missão transcende o indivíduo — buscamos contribuir para a elevação coletiva e a transição para uma nova Era.' },
  { icon: '◎', title: 'Ciência e Espiritualidade', desc: 'Integramos conhecimentos científicos com práticas espirituais, reconhecendo que ambos são faces da mesma realidade.' },
]

const ARCTURIANOS = [
  { num: '5ª – 9ª', label: 'Dimensão de existência' },
  { num: '36,7',    label: 'Anos-luz de distância' },
  { num: 'Boötes',  label: 'Constelação de origem' },
  { num: '+ 4.000', label: 'Anos de contato com a Terra' },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[50vh] flex items-end pb-16 pt-36 bg-bg-secondary overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,149,42,0.1) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <span className="section-tag">Quem Somos</span>
          <h1 className="section-title text-4xl md:text-5xl mb-4">
            O{' '}
            <span className="bg-grad-gold bg-clip-text text-transparent">Projeto Patriarca</span>
          </h1>
          <p className="section-subtitle">
            Uma jornada de expansão e serviço à luz, guiada por ensinamentos ancestrais e transmissões de alta frequência.
          </p>
        </div>
      </div>

      {/* História */}
      <section className="py-20 bg-bg-primary" aria-labelledby="historia-heading">
        <ScrollReveal className="mx-auto max-w-3xl px-4">
          <span className="section-tag">Nossa História</span>
          <h2 id="historia-heading" className="section-title mb-6">Como Tudo Começou</h2>
          <div className="space-y-5 text-gold-pale/60 leading-7">
            <p>
              O Projeto Patriarca nasceu de uma série de experiências mediúnicas profundas, nas quais
              contatos com seres de alta consciência — identificados como os <strong className="text-gold-light">Arcturianos</strong> —
              trouxeram ensinamentos sobre a natureza da realidade, o propósito da existência humana e
              o papel da Terra no cosmos.
            </p>
            <p>
              Com o crescimento das transmissões e o interesse de buscadores espirituais ao redor do Brasil,
              formou-se uma comunidade dedicada a estudar, validar e compartilhar esses ensinamentos de forma
              responsável e acessível.
            </p>
            <p>
              Hoje, o Projeto Patriarca é um portal de conhecimento que integra canalizações, estudos de
              metafísica, práticas de meditação e uma comunidade viva de consciências em expansão.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Arcturianos */}
      <section className="py-20 bg-bg-secondary" aria-labelledby="arcturianos-heading">
        <ScrollReveal className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Eles que guiam</span>
            <h2 id="arcturianos-heading" className="section-title">
              Quem São os{' '}
              <span className="bg-grad-gold bg-clip-text text-transparent">Arcturianos?</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 items-center mb-10">
            <div className="space-y-5 text-gold-pale/60 leading-7">
              <p>
                Os Arcturianos são seres multidimensionais que habitam a 5ª à 9ª dimensão de existência, na
                constelação de Boötes, a apenas 36,7 anos-luz da Terra. São considerados uns dos seres mais
                avançados espiritualmente em nossa galáxia.
              </p>
              <p>
                Sua missão com a humanidade é de <strong className="text-gold-light">tutoria cósmica</strong> —
                auxiliar no processo de ascensão planetária, transmitir conhecimentos sobre saúde energética,
                geometria sagrada e a natureza multidimensional da consciência.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4" aria-label="Dados sobre os Arcturianos">
              {ARCTURIANOS.map(a => (
                <div key={a.label} className="card p-5 text-center">
                  <div className="font-heading text-xl font-bold text-gold-light mb-1">{a.num}</div>
                  <div className="text-[0.8rem] text-gold-pale/50">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-primary" aria-labelledby="values-heading">
        <ScrollReveal className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Princípios</span>
            <h2 id="values-heading" className="section-title">Nossos Valores</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="card flex gap-4 p-6">
                <span className="text-2xl text-gold-main flex-shrink-0 mt-0.5" aria-hidden="true">{v.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-[0.9rem] text-white mb-2">{v.title}</h3>
                  <p className="text-[0.87rem] text-gold-pale/55 leading-6">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg-secondary text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="section-title mb-4">Pronto para expandir sua consciência?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/conteudos" className="btn-primary inline-flex">Explorar Conteúdos</Link>
            <Link href="/auth/cadastro" className="btn-outline inline-flex">Tornar-se Membro</Link>
          </div>
        </div>
      </section>
    </>
  )
}
