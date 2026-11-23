create table if not exists public.site_state (
  id text primary key,
  categories jsonb not null default '[]'::jsonb,
  products jsonb not null default '[]'::jsonb,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.site_state enable row level security;

create policy "Public can read site state"
  on public.site_state
  for select
  to anon, authenticated
  using (true);

create policy "Anonymous CMS can publish site state"
  on public.site_state
  for all
  to anon, authenticated
  using (true)
  with check (true);
