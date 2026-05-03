// Logo SVG do Projeto Patriarca — Triângulo com esferas conectadas
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 44 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 60 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={size}
      height={Math.round(size * 68 / 60)}
      className={cn('text-gold-main', className)}
    >
      {/* Triângulo principal */}
      <polygon
        points="30,2 58,56 2,56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Esfera central */}
      <circle cx="30" cy="36" r="5"   fill="none" stroke="currentColor" strokeWidth="1.4" />
      {/* Esfera ápice */}
      <circle cx="30" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {/* Esfera inferior-esquerda */}
      <circle cx="14" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {/* Esfera inferior-direita */}
      <circle cx="46" cy="48" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {/* Conectores */}
      <line x1="30"   y1="16.5" x2="30"   y2="31"   stroke="currentColor" strokeWidth="1.2" />
      <line x1="26.4" y1="39.5" x2="16.8" y2="45.2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="33.6" y1="39.5" x2="43.2" y2="45.2" stroke="currentColor" strokeWidth="1.2" />
      {/* Pontos internos decorativos */}
      <circle cx="30" cy="18" r="1.8" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="43" r="1.8" fill="currentColor" opacity="0.6" />
      <circle cx="40" cy="43" r="1.8" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
