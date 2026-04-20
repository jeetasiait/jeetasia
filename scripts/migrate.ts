import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🚀 Starting database migrations...');

  try {
    // Create migration tracking table if it doesn't exist
    const { error: createTableError } = await supabase.rpc('create_migrations_table');
    if (createTableError) throw createTableError;
    
    // Run each migration
    const migrations = [
      {
        id: '001_initial_schema',
        run: async () => {
          console.log('🔄 Running migration: 001_initial_schema');
          const { error } = await supabase.rpc('create_initial_schema');
          if (error) throw error;
        }
      },
      // Add more migrations here
    ];

    // Get completed migrations
    const { data: completedMigrations, error: fetchError } = await supabase
      .from('migrations')
      .select('migration_id');
    
    if (fetchError) throw fetchError;
    
    const completedIds = new Set(completedMigrations?.map(m => m.migration_id) || []);
    
    // Run pending migrations
    for (const migration of migrations) {
      if (!completedIds.has(migration.id)) {
        console.log(`🔄 Running migration: ${migration.id}`);
        await migration.run();
        
        // Record migration as completed
        const { error: recordError } = await supabase
          .from('migrations')
          .insert([{ migration_id: migration.id }]);
          
        if (recordError) throw recordError;
        
        console.log(`✅ Completed migration: ${migration.id}`);
      }
    }
    
    console.log('✨ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
