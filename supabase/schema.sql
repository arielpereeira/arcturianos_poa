-- ============================================================
-- Projeto Patriarca — Supabase Schema
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── Profiles ─────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  nome       text not null default '',
  is_admin   boolean not null default false,
  criado_em  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Qualquer usuário autenticado pode ver o próprio perfil
create policy "Usuário vê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

-- Usuário pode atualizar o próprio perfil (exceto is_admin)
create policy "Usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin pode ver todos
create policy "Admin vê todos os perfis"
  on public.profiles for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ── Auto-create profile on sign-up ───────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, nome)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Artigos ──────────────────────────────────────────────────
create table if not exists public.artigos (
  id           bigserial primary key,
  slug         text not null unique,
  titulo       text not null,
  resumo       text not null default '',
  conteudo     text not null default '',
  categoria    text not null default 'arcturianos'
                 check (categoria in ('arcturianos', 'vibracao', 'despertar', 'meditacao')),
  imagem_url   text,
  publicado    boolean not null default false,
  publicado_em timestamptz,
  criado_em    timestamptz not null default now()
);

alter table public.artigos enable row level security;

-- Público pode ler artigos publicados
create policy "Público lê artigos"
  on public.artigos for select
  using (publicado = true);

-- Usuários autenticados também lêem todos os artigos publicados
create policy "Usuários lêem artigos"
  on public.artigos for select
  using (publicado = true and auth.uid() is not null);

-- Admin gerencia todos
create policy "Admin gerencia artigos"
  on public.artigos for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ── Seed de exemplo ──────────────────────────────────────────
insert into public.artigos (slug, titulo, resumo, conteudo, categoria, publicado, publicado_em)
values
(
  'quem-sao-os-arcturianos',
  'Quem São os Arcturianos e Qual é Sua Missão na Terra?',
  'Descubra a origem, as características e a profunda missão espiritual desta civilização interdimensional que guia a humanidade há milênios.',
  'Os Arcturianos são seres multidimensionais que habitam a 5ª à 9ª dimensão de existência...',
  'arcturianos', true, now() - interval '3 days'
),
(
  'frequencia-vibracional',
  'Frequência Vibracional: Como Elevar Sua Energia',
  'A frequência vibracional é a linguagem universal do cosmos. Aprenda a alinhar sua energia com as frequências mais elevadas.',
  'Cada pensamento, emoção e ação emite uma frequência específica...',
  'vibracao', true, now() - interval '7 days'
),
(
  'sinais-do-despertar',
  'Os 12 Sinais do Despertar Espiritual',
  'O despertar espiritual é um processo profundo de transformação. Conheça os principais sinais que indicam que sua alma está expandindo.',
  'O despertar espiritual raramente acontece de forma abrupta...',
  'despertar', true, now() - interval '14 days'
),
(
  'meditacao-arcturiana',
  'Meditação Arcturiana: Canal de Luz Cósmica',
  'Uma meditação guiada canalizada diretamente pelos Arcturianos para ativar seu DNA espiritual.',
  'Esta meditação foi transmitida em sessão especial...',
  'meditacao', true, now() - interval '1 day'
)
on conflict (slug) do nothing;
