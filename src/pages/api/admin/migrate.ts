import { createClient } from '@supabase/supabase-js';
import { runMigrations } from '@/lib/db-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify admin access
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Authentication error:', sessionError);
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized: Please log in as an admin' 
      });
    }

    // Run migrations
    const result = await runMigrations();
    
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Migrations completed successfully' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error || 'Failed to run migrations' 
      });
    }
  } catch (error) {
    console.error('Migration API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
}
