import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { supabase } from '@/lib/supabase';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  og_image?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title,
  description,
  keywords,
  canonical,
  ogImage
}) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [seoData, setSeoData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);

  // Set client-side values after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Fetch SEO data when component mounts or path changes
  useEffect(() => {
    const fetchSeoData = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from('page_seo')
          .select('title, description, keywords, og_image')
          .eq('page_path', currentPath)
          .maybeSingle();

        if (data) {
          setSeoData(data);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPath) {
      fetchSeoData();
    }
  }, [currentPath]);

  // Use SEO data from the database if available, otherwise fall back to props or defaults
  const finalTitle = seoData?.title || title || "JEET Asia Private Limited - Infrastructure & Construction";
  const finalDescription = seoData?.description || description || "Leading infrastructure and construction company, specializing in road projects across India since 2014. Quality, safety, and innovation in every project.";
  const finalKeywords = seoData?.keywords || keywords || "infrastructure, construction, road projects, India, JEET Asia, civil engineering, construction management, infrastructure development";
  const finalOgImage = seoData?.og_image || ogImage || "https://jeetasia.com/images/og-default.jpg";
  
  // Generate structured data for the website
  const generateStructuredData = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jeetasia.com';
    
    const websiteStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "JEET Asia Private Limited",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://www.linkedin.com/company/jeet-asia",
        "https://twitter.com/jeetasia"
      ]
    };

    const organizationStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JEET Asia Private Limited",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`,
      "description": "Leading infrastructure and construction company specializing in road projects across India since 2014.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "City",
        "postalCode": "123456",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "email": "info@jeetasia.com"
      }
    };

    return [websiteStructuredData, organizationStructuredData];
  };
  
  // Generate breadcrumb structured data
  const generateBreadcrumbData = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jeetasia.com';
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        ...pathSegments.map((segment, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
          "item": `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`
        }))
      ]
    };
    
    return breadcrumbList;
  };

  // Show loading state while fetching SEO data
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jeet-blue"></div>
        </div>
      </div>
    );
  }
  
  const [websiteData, organizationData] = generateStructuredData();
  const breadcrumbData = generateBreadcrumbData();
  
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords} />
        <link rel="canonical" href={canonical || currentUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical || currentUrl} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:site_name" content="JEET Asia Private Limited" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonical || currentUrl} />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(websiteData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
