import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Initialize Supabase client
const supabaseUrl = 'https://plgvpeacweofdkazyvln.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You need to set this in your .env file

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUser(email: string, password: string) {
  try {
    // Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: { role: 'admin' },
    });

    if (signUpError) throw signUpError;

    console.log('Admin user created successfully:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    return authData.user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

// Get email and password from command line arguments or use defaults
const email = process.argv[2] || 'admin@example.com';
const password = process.argv[3] || 'admin@123';

// Run the setup
createAdminUser(email, password)
  .then(() => {
    console.log('Admin setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Admin setup failed:', error);
    process.exit(1);
  });
