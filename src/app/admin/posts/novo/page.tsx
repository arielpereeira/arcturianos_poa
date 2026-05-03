import { PostForm } from '@/components/admin/PostForm'

export const metadata = { title: 'Admin — Novo Post' }

export default function NovoPostPage() {
  return (
    <div>
      <h1 className="mb-8 font-heading text-2xl font-black text-white">
        Novo <span className="bg-grad-gold bg-clip-text text-transparent">Post</span>
      </h1>
      <PostForm mode="create" />
    </div>
  )
}
