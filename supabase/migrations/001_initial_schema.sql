-- Create migrations table
CREATE TABLE IF NOT EXISTS public.migrations (
  id SERIAL PRIMARY KEY,
  migration_id VARCHAR(255) NOT NULL UNIQUE,
  run_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create initial schema function
CREATE OR REPLACE FUNCTION public.create_initial_schema()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create careers table
  CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    location TEXT,
    type TEXT NOT NULL,
    department TEXT,
    description TEXT,
    requirements TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create projects table
  CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create team_members table
  CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT,
    bio TEXT,
    image_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create gallery table
  CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create news table
  CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create job_applications table
  CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.careers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT NOT NULL,
    cover_letter TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Enable RLS on all tables
  ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies
  -- Public read access
  CREATE POLICY "Enable read access for all users" 
  ON public.careers
  FOR SELECT USING (true);

  CREATE POLICY "Enable read access for all users" 
  ON public.projects
  FOR SELECT USING (status = 'published');

  CREATE POLICY "Enable read access for all users" 
  ON public.team_members
  FOR SELECT USING (true);

  CREATE POLICY "Enable read access for all users" 
  ON public.gallery
  FOR SELECT USING (true);

  CREATE POLICY "Enable read access for all users" 
  ON public.news
  FOR SELECT USING (status = 'published');

  -- Admin full access
  CREATE POLICY "Enable all for admin users" 
  ON ALL TABLES
  USING (auth.role() = 'authenticated');

  -- Create indexes
  CREATE INDEX IF NOT EXISTS idx_careers_status ON public.careers(status);
  CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
  CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
  CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
  CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
END;
$$;
