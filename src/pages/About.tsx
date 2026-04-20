
import MainLayout from '../components/layouts/MainLayout';
import { Building, Target, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpandableText from '../components/common/ExpandableText';

const About = () => {
  const pageTitle = "About Us - JEET Asia | Infrastructure & Construction Experts";
  const pageDescription = "Learn about JEET Asia's journey, values, and expertise in infrastructure and construction. Discover our commitment to quality and innovation in every project.";
  const pageKeywords = "about JEET Asia, construction company India, infrastructure experts, our story, company history, construction management, civil engineering";
  const canonicalUrl = "https://jeetasia.com/about";
  const ogImage = "/images/og-about.jpg";
  const stats = [
    { icon: Building, value: '7+', label: 'Projects Completed' },
    { icon: Target, value: '14+', label: 'Years of Experience' },
    { icon: Award, value: '1+', label: 'Awards Won' },
    { icon: Users, value: '650+', label: 'Team Members' }
  ];

  return (
    <MainLayout
      title={pageTitle}
      description={pageDescription}
      keywords={pageKeywords}
      canonical={canonicalUrl}
      ogImage={ogImage}
    >
      {/* Hero Section */}
      <section className="relative text-white py-40 md:py-56 overflow-hidden" itemScope itemType="https://schema.org/AboutPage">
        <div className="absolute inset-0 z-0">
          <img 
            src="/jeetasia-uploads/about-hero.webp"
            alt="Infrastructure Development"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-jeet-blue/40 backdrop-brightness-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-jeet-blue/90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            >
              <span className="text-sm font-bold tracking-widest uppercase">OUR STORY</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
              itemProp="headline"
            >
              Building The <span className="text-blue-300">Future</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed"
              itemProp="description"
            >
              From ambitious sketches to monumental landscapes, we define the next generation of infrastructure.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section with floating effect */}
      <section className="relative z-20 -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="premium-card bg-white p-8 group hover:bg-jeet-blue transition-all duration-500"
              >
                <stat.icon className="w-8 h-8 text-jeet-blue group-hover:text-white mb-4 transition-colors duration-500" />
                <div className="text-3xl md:text-4xl font-black mb-1 group-hover:text-white transition-colors duration-500 tracking-tight">{stat.value}</div>
                <div className="text-gray-500 group-hover:text-white/70 transition-colors duration-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section refined */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h6 className="text-jeet-blue font-bold tracking-widest uppercase mb-4 text-xs">LEGACY OF EXCELLENCE</h6>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">Evolving Through <span className="text-gradient">Time</span></h2>
              
              <div className="space-y-10 relative">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 rounded-full ml-4"></div>
                 
                 {[
                   { year: '2004', title: 'The Genesis', desc: 'Established as JEET Buildcon Pvt. Ltd., focusing on regional development.' },
                   { year: '2014', title: 'The Transformation', desc: 'Rebranded to JEET Asia Private Limited, expanding horizons and technology.' },
                   { year: 'Today', title: 'The Pinnacle', desc: 'A leading infrastructure giant with nationwide presence and world-class expertise.' }
                 ].map((milestone, idx) => (
                   <div key={idx} className="relative pl-14 group">
                      <div className="absolute left-0 top-1 w-9 h-9 bg-white border-4 border-jeet-blue rounded-full z-10 group-hover:scale-125 transition-transform duration-300"></div>
                      <div className="text-jeet-blue font-black text-lg mb-1">{milestone.year}</div>
                      <h4 className="text-xl font-bold mb-3">{milestone.title}</h4>
                      <p className="text-gray-600 text-base leading-relaxed">{milestone.desc}</p>
                   </div>
                 ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="absolute -inset-4 bg-gradient-to-tr from-jeet-blue/20 to-transparent rounded-[3rem] -rotate-3"></div>
               <img 
                 src="/jeetasia-uploads/about-legacy.webp" 
                 alt="Highway Construction Progress" 
                 className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
               />
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-jeet-blue/10 backdrop-blur-3xl rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section with modern cards */}
      <section className="py-20 md:py-28 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h6 className="text-jeet-blue font-bold tracking-widest uppercase mb-4 text-xs">CORE VALUES</h6>
            <h2 className="text-2xl md:text-3xl font-black mb-8">What Defines <span className="text-gradient">Us</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { emoji: '🚀', title: 'Innovation', desc: 'Pushing boundaries with cutting-edge technology and smart engineering solutions.' },
              { emoji: '⚖️', title: 'Integrity', desc: 'Transparent operations and unwavering ethical standards in every contract.' },
              { emoji: '💎', title: 'Excellence', desc: 'Uncompromising quality and precision in every kilometer of road we build.' }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="premium-card bg-white p-12 text-center"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-500">{v.emoji}</div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section Redesigned */}
      <section className="py-20 md:py-28 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Engineering Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Sophisticated Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-jeet-blue/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-[100px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
             {/* Vision Card */}
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               viewport={{ once: true }}
               className="group relative"
             >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full bg-[#1e293b]/50 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-[3rem] flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-48 h-48 rotate-12" />
                  </div>
                  
                  <div>
                    <div className="w-20 h-20 bg-blue-600/20 rounded-[2rem] border border-blue-500/30 flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-500">
                      <Target className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mb-4">Strategic Forecast</h3>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter uppercase">Our <span className="text-gradient">Vision</span></h2>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                      To revolutionize India's architectural landscape by becoming the <span className="text-white">gold standard for infrastructure development</span>, merging sustainability with world-class engineering precision.
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-blue-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Defining New Benchmarks</span>
                  </div>
                </div>
             </motion.div>
             
             {/* Mission Card */}
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
               viewport={{ once: true }}
               className="group relative"
             >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full bg-[#1e293b]/50 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-[3rem] flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Building className="w-48 h-48 -rotate-12" />
                  </div>

                  <div>
                    <div className="w-20 h-20 bg-blue-500/20 rounded-[2rem] border border-blue-400/30 flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-500">
                      <Building className="w-10 h-10 text-blue-300 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-[0.5em] mb-4">Core Deployment</h3>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter uppercase">Our <span className="text-gradient">Mission</span></h2>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                      To execute complex infrastructure projects with <span className="text-white">unmatched precision</span>, ensuring safety, durability, and a positive socio-economic impact in every territory we serve.
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-blue-400"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Uncompromising Integrity</span>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default About;
