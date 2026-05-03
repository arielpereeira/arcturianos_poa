import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CATEGORIAS = {
  arcturianos: 'Arcturianos',
  vibracao:    'Vibração',
  despertar:   'Despertar',
  meditacao:   'Meditação',
} as const
