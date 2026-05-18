-- Run this in your Supabase SQL Editor

create table requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  project_description text default '',
  budget text default '',
  lead_status text default 'pending' check (lead_status in ('pending', 'good', 'bad')),
  created_at timestamp with time zone default now()
);

-- Allow anyone to insert (public form submissions)
alter table requests enable row level security;

create policy "Anyone can insert requests"
  on requests for insert
  with check (true);

-- Only authenticated users (admin) can read and update
create policy "Authenticated users can read"
  on requests for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update"
  on requests for update
  using (auth.role() = 'authenticated');
