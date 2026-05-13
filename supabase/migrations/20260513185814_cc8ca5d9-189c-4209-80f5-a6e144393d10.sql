
-- =========== ROLES ===========
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Auto-assign admin to the first user, 'user' to everyone after.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========== updated_at helper ===========
create or replace function public.update_updated_at_column()
returns trigger language plpgsql
set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

-- =========== PROJECTS ===========
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text not null default '',
  category text not null default 'Web App',
  tags text[] not null default '{}',
  image_url text,
  live_url text,
  github_url text,
  display_order int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;

create policy "Projects are viewable by everyone"
on public.projects for select using (true);

create policy "Admins manage projects"
on public.projects for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create trigger projects_updated_at
before update on public.projects
for each row execute function public.update_updated_at_column();

-- =========== SKILLS ===========
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Frontend',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.skills enable row level security;

create policy "Skills are viewable by everyone"
on public.skills for select using (true);

create policy "Admins manage skills"
on public.skills for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- =========== CONTACT MESSAGES ===========
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;

create policy "Anyone can submit a message"
on public.contact_messages for insert
with check (
  length(name) between 1 and 100
  and length(email) between 3 and 255
  and length(message) between 1 and 2000
);

create policy "Admins read messages"
on public.contact_messages for select to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins update messages"
on public.contact_messages for update to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete messages"
on public.contact_messages for delete to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- =========== SITE CONTENT ===========
create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

create policy "Site content is viewable by everyone"
on public.site_content for select using (true);

create policy "Admins manage site content"
on public.site_content for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.update_updated_at_column();

-- =========== STORAGE ===========
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true);

create policy "Project images are publicly accessible"
on storage.objects for select
using (bucket_id = 'project-images');

create policy "Admins upload project images"
on storage.objects for insert to authenticated
with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins update project images"
on storage.objects for update to authenticated
using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins delete project images"
on storage.objects for delete to authenticated
using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

-- =========== SEED ===========
insert into public.skills (name, category, display_order) values
  ('HTML','Frontend',1),('CSS','Frontend',2),('JavaScript','Frontend',3),
  ('TypeScript','Frontend',4),('React','Frontend',5),('Bootstrap','Frontend',6),
  ('Tailwind','Frontend',7),('Sass','Frontend',8),('jQuery','Frontend',9),
  ('PHP','Backend',1),('Node.js','Backend',2),('Express','Backend',3),
  ('Laravel','Backend',4),('REST APIs','Backend',5),
  ('MySQL','Database',1),('MongoDB','Database',2),
  ('Git','Tools',1),('Vite','Tools',2),('Webpack','Tools',3),
  ('Figma','Tools',4),('VS Code','Tools',5);

insert into public.site_content (key, value) values
  ('hero_eyebrow','Available for work'),
  ('hero_title','Hi, I''m Galib'),
  ('hero_subtitle','a Web Developer'),
  ('hero_description','I build fast, accessible, and beautiful web experiences from front-end pixels to back-end logic.'),
  ('about_p1','I''m Galib, a full stack web developer who loves turning ideas into real, working products. I work across the stack — from crafting polished interfaces in React to designing solid databases in MySQL.'),
  ('about_p2','For me, great software is a balance: fast and accessible on the outside, clean and maintainable on the inside. I care about details, performance, and shipping things people enjoy using.'),
  ('about_p3','When I''m not coding, I''m usually exploring new tools, contributing to small side projects, or learning something completely new.'),
  ('contact_email','info.galib845@gmail.com'),
  ('contact_phone','01725085863');

insert into public.projects (title, description, category, tags, image_url, display_order) values
  ('Luxe Apparel — Shopify Store','Custom Shopify storefront for a fashion brand. Tailored Dawn theme, Liquid sections, mega-menu, predictive search, and a fast product page with variant swatches and sticky add-to-cart.','Shopify',ARRAY['Shopify','Liquid','Dawn Theme','JavaScript'],'/src/assets/projects/shopify-fashion.jpg',1),
  ('GadgetHub — Shopify Plus Migration','Migrated an electronics retailer from WooCommerce to Shopify Plus. Imported 4k+ SKUs, set up metafields, custom bundles, Shopify Markets for multi-currency, and Klaviyo abandoned-cart flows.','Shopify',ARRAY['Shopify Plus','Liquid','Klaviyo','Metafields'],'/src/assets/projects/shopify-electronics.jpg',2),
  ('BrewCraft Coffee — Subscription Store','Headless Shopify store with a React storefront using the Storefront API. Recharge-powered coffee subscriptions, build-a-box flow, and one-page checkout customizations.','Shopify',ARRAY['Shopify','Storefront API','React','Recharge'],'/src/assets/projects/shopify-coffee.jpg',3),
  ('PetParadise — Custom Shopify Theme','Pet supplies store built from scratch on Shopify. Custom Liquid sections, AJAX cart drawer, product reviews, upsell modals, and Google Merchant feed integration.','Shopify',ARRAY['Shopify','Liquid','SCSS','Alpine.js'],'/src/assets/projects/shopify-pet.jpg',4),
  ('GlowSkin — Shopify Beauty Store','Skincare and beauty Shopify store with custom landing pages, ingredient highlights, quiz-based product recommendations, Judge.me reviews, and a loyalty rewards program via Smile.io.','Shopify',ARRAY['Shopify','Liquid','Smile.io','Judge.me'],'/src/assets/projects/shopify-beauty.jpg',5),
  ('Fashionly — WooCommerce Store','Full WooCommerce store for a clothing brand with custom PHP plugins, size-guide popups, wishlist, Stripe + SSLCommerz checkout, and bKash payment gateway.','E-commerce',ARRAY['WordPress','WooCommerce','PHP','Stripe'],'/src/assets/projects/woo-fashion.jpg',6),
  ('ShopKart — MERN E-commerce','Full-stack e-commerce app with React, Node.js, Express and MongoDB. JWT auth, admin dashboard, order management, Stripe payments, and product search with filters.','E-commerce',ARRAY['React','Node.js','MongoDB','Stripe'],'/src/assets/projects/mern-shop.jpg',7),
  ('Commerce Dashboard','Admin dashboard for tracking sales, inventory and customers — built with React and a PHP + MySQL backend with charts and CSV export.','Web App',ARRAY['React','PHP','MySQL'],'/src/assets/projects/dashboard.jpg',8),
  ('Booking Platform','End-to-end booking system with calendar sync, Stripe deposits and email notifications.','Web App',ARRAY['PHP','Laravel','MySQL'],'/src/assets/projects/booking.jpg',9);
