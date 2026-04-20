-- Create function to check if migration has been run
CREATE OR REPLACE FUNCTION public.migration_exists(migration_id TEXT)
RETURNS BOOLEAN
LANGUAGE sql
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.migrations 
    WHERE migration_id = $1
  );
$$;

-- Create function to record a migration
CREATE OR REPLACE FUNCTION public.record_migration(migration_id TEXT)
RETURNS void
LANGUAGE sql
AS $$
  INSERT INTO public.migrations (migration_id) VALUES ($1);
$$;

-- Create function to create migrations table
CREATE OR REPLACE FUNCTION public.create_migrations_table()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.migrations (
    id SERIAL PRIMARY KEY,
    migration_id VARCHAR(255) NOT NULL UNIQUE,
    run_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Create index on migration_id for faster lookups
  CREATE INDEX IF NOT EXISTS idx_migrations_migration_id 
  ON public.migrations(migration_id);
  
  -- Grant necessary permissions
  GRANTANT SELECT, INSERT ON public.migrations TO anon, authenticated;
  GRANTANT USAGE, SELECT ON SEQUENCE public.migrations_id_seq TO anon, authenticated;
END;
$$;
