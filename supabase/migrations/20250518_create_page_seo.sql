-- Create page_seo table for storing SEO metadata
create table if not exists public.page_seo (
  id uuid not null default uuid_generate_v4(),
  page_path text not null,
  title text not null,
  description text not null,
  keywords text,
  og_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint page_seo_pkey primary key (id),
  constraint page_seo_page_path_key unique (page_path)
) tablespace pg_default;

-- Enable RLS
alter table public.page_seo enable row level security;

-- Create policies for page_seo
create policy "Enable read access for all users" on public.page_seo
  for select using (true);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updated_at
create or replace trigger handle_page_seo_updated_at
  before update on public.page_seo
  for each row
  execute function public.handle_updated_at();

-- Insert default SEO data for main pages
insert into public.page_seo (page_path, title, description, keywords, og_image)
values 
  ('/', 'JEET Asia - Leading Infrastructure & Construction Company', 'JEET Asia is a premier infrastructure and construction company specializing in road projects across India. With years of experience, we deliver quality and innovation in every project.', 'JEET Asia, infrastructure company, construction, road projects, civil engineering, India, construction management', '/images/og-home.jpg'),
  ('/about', 'About Us - JEET Asia | Infrastructure & Construction Experts', 'Learn about JEET Asia''s journey, values, and expertise in infrastructure and construction. Discover our commitment to quality and innovation in every project.', 'about JEET Asia, construction company India, infrastructure experts, our story, company history, construction management, civil engineering', '/images/og-about.jpg'),
  ('/services', 'Our Services | JEET Asia - Infrastructure & Construction', 'Comprehensive construction and infrastructure services including road construction, civil engineering, and project management across India.', 'construction services, infrastructure development, road construction, civil engineering, project management, India', '/images/og-services.jpg'),
  ('/projects', 'Our Projects | JEET Asia - Infrastructure & Construction', 'Explore our portfolio of successful infrastructure and construction projects across India. See how we deliver excellence in every project.', 'construction projects, infrastructure projects, completed projects, JEET Asia portfolio, construction gallery', '/images/og-projects.jpg'),
  ('/contact', 'Contact Us | JEET Asia - Get in Touch', 'Get in touch with JEET Asia for your infrastructure and construction needs. Our team is ready to assist you with your project requirements.', 'contact JEET Asia, construction company contact, get a quote, project inquiry, customer support', '/images/og-contact.jpg')
on conflict (page_path) do nothing;
