import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types
interface MigrationResult {
  success: boolean;
  error?: string;
}

// Initialize Supabase client
export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or service role key');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function runMigrations(): Promise<MigrationResult> {
  const supabase = getSupabaseClient();
  
  try {
    console.log('Starting database migrations...');
    
    // First, ensure migrations table exists
    const { error: tableError } = await supabase.rpc('create_migrations_table');
    if (tableError) {
      console.error('Error creating migrations table:', tableError);
      throw tableError;
    }

    // Get list of migration files (sorted by name)
    const migrationFiles = [
      '000_initial_functions',
      '001_initial_schema'
      // Add more migrations here as they are created
    ].sort();

    // Run each migration
    for (const migration of migrationFiles) {
      const migrationId = migration.split('.')[0];
      
      try {
        // Check if migration has already been run
        const { data: exists, error: checkError } = await supabase
          .rpc('migration_exists', { migration_id: migrationId });
        
        if (checkError) throw checkError;
        if (exists) {
          console.log(`Skipping already run migration: ${migrationId}`);
          continue;
        }

        console.log(`Running migration: ${migrationId}`);
        
        // Determine which function to call based on migration ID
        const functionName = migrationId === '001_initial_schema' 
          ? 'create_initial_schema' 
          : migrationId;
        
        // Run the migration
        const { error: migrationError } = await supabase.rpc(functionName);
        
        if (migrationError) throw migrationError;
        
        // Record the migration
        const { error: recordError } = await supabase
          .rpc('record_migration', { migration_id: migrationId });
        
        if (recordError) throw recordError;
        
        console.log(`✅ Completed migration: ${migrationId}`);
      } catch (error) {
        console.error(`❌ Error in migration ${migrationId}:`, error);
        throw error; // Re-throw to be caught by the outer try-catch
      }
    }
    
    console.log('✨ All migrations completed successfully!');
    return { success: true };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Migration error:', errorMessage);
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

// Export the Supabase client for other parts of the application
export const supabase = getSupabaseClient();
