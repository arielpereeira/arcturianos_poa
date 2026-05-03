export interface Profile {
  id: string
  email: string
  nome: string | null
  is_admin: boolean
  criado_em: string
}

export type CategoriaArtigo = 'arcturianos' | 'vibracao' | 'despertar' | 'meditacao'

export interface Artigo {
  id: string
  slug: string
  titulo: string
  resumo: string | null
  conteudo: string | null
  categoria: CategoriaArtigo | null
  imagem_url: string | null
  publicado: boolean
  publicado_em: string
  criado_em: string
}
