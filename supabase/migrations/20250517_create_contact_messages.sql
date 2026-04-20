-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  status TEXT DEFAULT 'unread' NOT NULL,
  notes TEXT
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to insert new messages
CREATE POLICY "Allow anonymous message submission" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all messages
CREATE POLICY "Allow authenticated users to read messages" ON public.contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update messages
CREATE POLICY "Allow authenticated users to update messages" ON public.contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Comments
COMMENT ON TABLE public.contact_messages IS 'Table to store contact form submissions from website visitors';
