-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT,
    department TEXT,
    type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract')),
    description TEXT,
    requirements TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to view active jobs
CREATE POLICY "Users can view active jobs"
    ON careers FOR SELECT
    USING (auth.role() = 'authenticated' AND status = 'active');

-- Policy for admin users to manage jobs
CREATE POLICY "Admin can manage jobs"
    ON careers FOR ALL
    USING (auth.role() = 'authenticated' AND exists (
        select 1 from auth.users where id = auth.uid() and role = 'admin'
    ));

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_careers_updated_at
    BEFORE UPDATE ON careers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
