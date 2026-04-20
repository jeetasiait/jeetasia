
import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import HeroSection from '../components/home/HeroSection';
import ModernContent from '../components/home/ModernContent';

const Index = () => {
  return (
    <MainLayout
      title="JEET Asia - Leading Infrastructure & Construction Company"
      description="JEET Asia is a premier infrastructure and construction company specializing in road projects across India. With years of experience, we deliver quality and innovation in every project."
      keywords="JEET Asia, infrastructure company, construction, road projects, civil engineering, India, construction management"
      ogImage="/images/og-home.jpg"
    >
      <HeroSection />
      <ModernContent />
    </MainLayout>
  );
};

export default Index;
