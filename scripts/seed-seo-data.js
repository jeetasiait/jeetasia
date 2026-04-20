import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Anon Key in environment variables');
  console.log('Please make sure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);



// Default SEO data for pages
const defaultSeoData = [
  {
    page_path: '/',
    title: 'JEET Asia - Leading Infrastructure & Construction Company',
    description: 'JEET Asia is a premier infrastructure and construction company specializing in road projects across India. With years of experience, we deliver quality and innovation in every project.',
    keywords: 'JEET Asia, infrastructure company, construction, road projects, civil engineering, India, construction management',
    og_image: '/images/og/og-home.png'
  },
  {
    page_path: '/about',
    title: 'About Us - JEET Asia | Infrastructure & Construction Experts',
    description: 'Learn about JEET Asia\'s journey, values, and expertise in infrastructure and construction. Discover our commitment to quality and innovation in every project.',
    keywords: 'about JEET Asia, construction company India, infrastructure experts, our story, company history, construction management, civil engineering',
    og_image: '/images/og/og-about.png'
  },
  {
    page_path: '/services',
    title: 'Our Services | JEET Asia - Infrastructure & Construction',
    description: 'Comprehensive construction and infrastructure services including road construction, civil engineering, and project management across India.',
    keywords: 'construction services, infrastructure development, road construction, civil engineering, project management, India',
    og_image: '/images/og/og-services.png'
  },
  {
    page_path: '/projects',
    title: 'Our Projects | JEET Asia - Infrastructure & Construction',
    description: 'Explore our portfolio of successful infrastructure and construction projects across India. See how we deliver excellence in every project.',
    keywords: 'construction projects, infrastructure projects, completed projects, JEET Asia portfolio, construction gallery',
    og_image: '/images/og/og-projects.png'
  },
  {
    page_path: '/contact',
    title: 'Contact Us | JEET Asia - Get in Touch',
    description: 'Get in touch with JEET Asia for your infrastructure and construction needs. Our team is ready to assist you with your project requirements.',
    keywords: 'contact JEET Asia, construction company contact, get a quote, project inquiry, customer support',
    og_image: '/images/og/og-contact.png'
  }
];

async function seedSeoData() {
  try {
    console.log('Starting SEO data seeding...');
    
    // Upsert each SEO data entry
    for (const data of defaultSeoData) {
      const { page_path } = data;
      
      // Check if the entry already exists
      const { data: existingData, error: fetchError } = await supabase
        .from('page_seo')
        .select('id')
        .eq('page_path', page_path)
        .maybeSingle();
      
      if (fetchError) {
        console.error(`Error checking for existing entry ${page_path}:`, fetchError);
        continue;
      }
      
      if (existingData) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from('page_seo')
          .update(data)
          .eq('page_path', page_path);
        
        if (updateError) {
          console.error(`Error updating ${page_path}:`, updateError);
        } else {
          console.log(`Updated SEO data for ${page_path}`);
        }
      } else {
        // Insert new entry
        const { error: insertError } = await supabase
          .from('page_seo')
          .insert([data]);
        
        if (insertError) {
          console.error(`Error inserting ${page_path}:`, insertError);
        } else {
          console.log(`Inserted SEO data for ${page_path}`);
        }
      }
    }
    
    console.log('SEO data seeding completed successfully!');
  } catch (error) {
    console.error('Error during SEO data seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedSeoData()
  .then(() => {
    console.log('SEO data seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during SEO data seeding:', error);
    process.exit(1);
  });
