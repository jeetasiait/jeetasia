
import MainLayout from '../components/layouts/MainLayout';
import { HardHat, Building, Ruler, Construction, Activity, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const pageTitle = "Our Services | JEET Asia - Infrastructure & Construction";
  const pageDescription = "Comprehensive construction and infrastructure services including road construction, civil engineering, and project management across India.";
  const pageKeywords = "construction services, infrastructure development, road construction, civil engineering, project management, India";
  const canonicalUrl = "https://jeetasia.com/services";
  const ogImage = "/images/og-services.jpg";
  
  // Schema.org Service data
  const servicesSchema = [{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Construction Services",
    "provider": {
      "@type": "Organization",
      "name": "JEET Asia Private Limited"
    },
    "offers": []
  }];

  // Services data
  const services = [
    {
      icon: HardHat,
      title: "Road Construction",
      description: "We specialize in the construction and development of highways, expressways, rural roads, and urban street networks. Our road projects are designed with a focus on durability, safety, and environmental impact.",
      capabilities: [
        "Highway and expressway construction",
        "Rural road development",
        "Urban street networks",
        "Rehabilitation and maintenance",
        "Road safety implementation"
      ]
    },
    {
      icon: Building,
      title: "Infrastructure Development",
      description: "Our comprehensive infrastructure solutions cover everything from initial planning and design to execution and maintenance. We work on a variety of infrastructure projects that contribute to the development of communities and regions.",
      capabilities: [
        "Public infrastructure projects",
        "Transportation infrastructure",
        "Bridges and flyovers",
        "Urban development projects",
        "Industrial infrastructure"
      ]
    },
    {
      icon: Ruler,
      title: "Civil Engineering",
      description: "Our team of expert civil engineers provides innovative and practical solutions for both public and private sector projects. We apply engineering principles to design, build, and maintain infrastructure with precision and quality.",
      capabilities: [
        "Structural engineering",
        "Geotechnical engineering",
        "Transportation engineering",
        "Environmental engineering",
        "Construction engineering"
      ]
    },
    {
      icon: Construction,
      title: "Construction Management",
      description: "We offer end-to-end project management services to ensure the on-time, within-budget completion of construction projects. Our construction management approach focuses on efficiency, quality control, and risk management.",
      capabilities: [
        "Project planning and scheduling",
        "Cost estimation and control",
        "Quality assurance and control",
        "Risk management",
        "Contract administration"
      ]
    }
  ];

  // Complete the services schema
  servicesSchema[0].offers = services.map(service => ({
    "@type": "Offer",
    "name": service.title,
    "description": service.description,
    "itemOffered": {
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "serviceOutput": service.capabilities.join(', ')
    }
  }));

  // Generate schema.org data
  const schemaData = {
    ...servicesSchema[0],
    name: "Construction Services",
    description: pageDescription,
    provider: {
      "@type": "Organization",
      "name": "JEET Asia Private Limited",
      "url": "https://jeetasia.com"
    },
    offers: services.map(service => ({
      "@type": "Offer",
      "name": service.title,
      "description": service.description,
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.description
      }
    }))
  };

  return (
    <MainLayout
      title={pageTitle}
      description={pageDescription}
      keywords={pageKeywords}
      canonical={canonicalUrl}
      ogImage={ogImage}
    >
      {/* Add Service schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      {/* Hero Section */}
      <section className="relative text-white py-40 md:py-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/jeetasia-uploads/services-hero.webp"
            alt="Indian Road Construction Services"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-jeet-blue/40 backdrop-brightness-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-jeet-blue/90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="text-sm font-bold tracking-widest uppercase">WHAT WE DO</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
            itemProp="name"
          >
            Our <span className="text-blue-300">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive infrastructure and construction solutions designed for longevity and impact.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section-padding bg-slate-50 overflow-hidden" itemScope itemType="https://schema.org/Service">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-jeet-blue/10 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                    <div className="relative z-10 p-10 md:p-14 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 h-full">
                       <div className="w-16 h-16 bg-jeet-blue rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 text-jeet-blue">{service.title}</h3>
                      <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">{service.description}</p>
                      <button className="text-jeet-blue font-black flex items-center gap-2 group/btn">
                        LEARN MORE <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="bg-[#1e293b] text-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden h-full">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                     <h3 className="text-xl font-bold mb-8 flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-blue-400 rounded-full"></div>
                        Core Capabilities
                     </h3>
                     <ul className="space-y-4">
                        {service.capabilities.map((capability, idx) => (
                          <motion.li 
                            key={idx} 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-base md:text-lg font-medium text-slate-300 group/item"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 group-hover/item:bg-blue-500 transition-colors">
                               <CheckCircle className="h-4 w-4 text-blue-400 group-hover/item:text-white transition-colors" />
                            </div>
                            {capability}
                          </motion.li>
                        ))}
                      </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Transformed */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h6 className="text-jeet-blue font-black tracking-widest uppercase mb-4 text-xs">OUR STRENGTHS</h6>
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">Engineered for <span className="text-gradient">Legacy</span></h2>
            <div className="w-32 h-2 bg-jeet-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Activity, title: "Experience", desc: "Decades of collective wisdom in complex site management." },
              { icon: Clock, title: "Reliability", desc: "Obsessive commitment to deadlines and rigorous milestones." },
              { icon: CheckCircle, title: "Quality", desc: "Zero-compromise protocols and state-of-the-art materials." },
              { icon: Users, title: "Client First", desc: "Collaborative partnership model for tailored execution." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="premium-card p-10 text-center flex flex-col items-center justify-center"
              >
                <div className="mb-6 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center shadow-inner group-hover:bg-jeet-blue transition-colors duration-500">
                  <item.icon className="text-jeet-blue group-hover:text-white h-8 w-8 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-jeet-blue transition-colors duration-500">{item.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default Services;
