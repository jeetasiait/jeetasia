-- Supabase Storage RLS Policies for slider-images bucket
-- Run this SQL in your Supabase SQL Editor

-- First, ensure the bucket exists (this is just a check, bucket should be created from the app)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('slider-images', 'slider-images', true, false, 10485760, '{image/png,image/jpeg,image/jpg,image/gif,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- 1. Allow anonymous users to read from the bucket (public access)
CREATE POLICY "Public Read Access for slider-images" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'slider-images');

-- 2. Allow authenticated users to insert into the bucket
CREATE POLICY "Authenticated Insert Access for slider-images" 
ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'slider-images');

-- 3. Allow authenticated users to update files in the bucket
CREATE POLICY "Authenticated Update Access for slider-images" 
ON storage.objects
FOR UPDATE 
TO authenticated
USING (bucket_id = 'slider-images');

-- 4. Allow authenticated users to delete files from the bucket
CREATE POLICY "Authenticated Delete Access for slider-images" 
ON storage.objects
FOR DELETE 
TO authenticated
USING (bucket_id = 'slider-images');

-- Confirm policies were created
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
