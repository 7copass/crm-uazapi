-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: Chats (Conversations)
create table if not exists public.chats (
  id uuid default uuid_generate_v4() primary key,
  uazapi_id text not null unique, -- The JID from WhatsApp (e.g., 5511999999999@s.whatsapp.net)
  lead_name text,
  lead_phone text,
  lead_avatar text,
  last_message text,
  last_message_at timestamptz default now(),
  unread_count int default 0,
  status text default 'open',
  funnel_stage text default 'Leads de entrada',
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: Messages
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references public.chats(id) on delete cascade,
  uazapi_message_id text, -- ID from WhatsApp
  sender_id text not null, -- 'me' or the contact's phone
  content text,
  type text default 'text', -- text, image, audio, etc.
  status text default 'sent', -- sent, delivered, read
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_chats_uazapi_id on public.chats(uazapi_id);
create index if not exists idx_messages_chat_id on public.messages(chat_id);
create index if not exists idx_messages_created_at on public.messages(created_at);

-- Enable Row Level Security (RLS)
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- Policies (Public for now, can be restricted later)
create policy "Allow public access to chats" on public.chats for all using (true);
create policy "Allow public access to messages" on public.messages for all using (true);
