import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building, Award, Users, ArrowRight, ArrowLeft, Briefcase, CheckCircle, Lightbulb, Leaf, Calendar, MapPin, Construction } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Highlight {
  icon: any;
  title: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface Bank {
  logo: string;
  name: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  timeline: string;
  status: string;
  category: string;
  image: string;
  description: string;
}

interface Client {
  logo: string;
  name: string;
  description: string;
}

const ModernContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  const leaders: Leader[] = [
    {
      name: "Mr. Krishan Singh",
      role: "Managing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bio: "With over 15 years of experience in the infrastructure sector, Mr. Singh has been instrumental in the growth and expansion of JEET Asia Private Limited."
    },
    {
      name: "Mr. Ramphal",
      role: "Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bio: "Mr. Ramphal brings technical expertise and strategic vision to the company, overseeing project execution and quality standards across all our infrastructure developments."
    }
  ];

  const highlights: Highlight[] = [
    {
      icon: Building,
      title: "7+ Projects",
      description: "Completed with excellence"
    },
    {
      icon: Award,
      title: "14+ Years",
      description: "Of industry experience"
    },
    {
      icon: Users,
      title: "650+ Team",
      description: "Dedicated professionals"
    }
  ];

  const services: Service[] = [
    {
      title: "Infrastructure Development",
      description: "Design and construction of world-class infrastructure projects",
      icon: "/jeetasia-uploads/infrastructure-new.png"
    },
    {
      title: "Project Development",
      description: "End-to-end project oversight and execution",
      icon: "/jeetasia-uploads/management-new.png"
    },
    {
      title: "Quality Assurance",
      description: "Stringent quality control measures",
      icon: "/jeetasia-uploads/quality-new.png"
    },
  ];

  const banks: Bank[] = [
    {
      logo: "/jeetasia-uploads/banks/hdfc.jfif",
      name: "HDFC Bank",
    },
    {
      logo: "/jeetasia-uploads/banks/Axis.jpg",
      name: "Axis Bank",
    },
    {
      logo: "/jeetasia-uploads/banks/ICICI.jpg",
      name: "ICICI Bank",
    },
    {
      logo: "/jeetasia-uploads/banks/Indusind-Bank.webp",
      name: "Indusind Bank",
    }
  ];

  const clients: Client[] = [
    {
      logo: "/jeetasia-uploads/clients/NHAI.jfif",
      name: "NHAI",
      description: "National Highway Authority of India"
    },
    {
      logo: "/jeetasia-uploads/clients/NHIDCL.jfif",
      name: "NHIDCL",
      description: "National Highway & Infrastructure Development Corporation Limited"
    },
    {
      logo: "/jeetasia-uploads/clients/MSV.jfif",
      name: "MSV International INC.",
      description: "Global infrastructure solutions provider"
    },
    {
      logo: "/jeetasia-uploads/clients/bharatmala.jfif",
      name: "Bharatmala",
      description: "Bharatmala road to prosperity"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          const typedData = data.map(item => ({
            id: item.id,
            title: item.title,
            location: item.location || '',
            timeline: item.timeline || '',
            status: item.status || 'ongoing',
            category: item.category || '',
            image: item.image || '',
            description: item.description || ''
          })) as Project[];
          setProjects(typedData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Auto-slide for projects carousel
  useEffect(() => {
    if (projects.length === 0 || loading) return;

    const interval = setInterval(() => {
      if (projectsContainerRef.current) {
        const nextIndex = (currentIndex + 1) % projects.length;
        setCurrentIndex(nextIndex);

        const cardWidth = 320; // approximate width of each card including gap
        projectsContainerRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, projects, loading]);

  return (
    <div className="overflow-hidden">
      {/* Leadership Section */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-jeet-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h6 className="text-jeet-blue font-bold tracking-widest uppercase mb-3">LEADERSHIP</h6>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Meet Our <span className="text-gradient">Visionaries</span></h2>
            <div className="w-24 h-1.5 bg-jeet-blue mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="premium-card p-1 group"
              >
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-jeet-blue rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover relative z-10 shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2 text-jeet-blue group-hover:text-blue-600 transition-colors">{leader.name}</h3>
                    <p className="text-lg font-semibold text-jeet-blue/70 mb-4">{leader.role}</p>
                    <p className="text-gray-600 leading-relaxed italic">"{leader.bio}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights Section - Redesigned for High Impact */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative group p-12 text-center rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700"
              >
                <div className="mb-10 relative inline-block">
                  <div className="absolute inset-0 bg-blue-600/10 rounded-3xl rotate-12 scale-125 group-hover:rotate-0 group-hover:scale-150 group-hover:bg-blue-600/5 transition-all duration-700"></div>
                  <highlight.icon className="w-16 h-16 mx-auto text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-6xl md:text-7xl font-black mb-4 text-slate-900 tracking-tightest group-hover:text-blue-600 transition-colors">{highlight.title}</h3>
                <p className="text-xl text-slate-400 font-bold uppercase tracking-widest">{highlight.description}</p>

                {/* Decorative Number */}
                <div className="absolute top-8 right-12 text-8xl font-black text-slate-200/20 select-none group-hover:text-blue-500/10 transition-colors">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Immersive Cinematic Carousel */}
      <section className="py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
        {/* Technical Blueprint Background */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="max-w-3xl"
            >
              <h6 className="text-blue-500 font-black tracking-[0.4em] uppercase mb-6 text-xs flex items-center gap-4">
                <div className="w-12 h-[1px] bg-blue-500/50"></div>
                Project Portfolio
              </h6>
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest uppercase leading-[0.85] mb-8">
                Engineering <span className="text-blue-600">Mastery</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                A showcase of nationwide infrastructure transformations executed with surgical precision and visionary scale.
              </p>
            </motion.div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (projectsContainerRef.current) {
                    const newIndex = Math.max(0, currentIndex - 1);
                    setCurrentIndex(newIndex);
                    projectsContainerRef.current.scrollTo({ left: newIndex * 480, behavior: 'smooth' });
                  }
                }}
                className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all active:scale-90"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => {
                  if (projectsContainerRef.current) {
                    const newIndex = (currentIndex + 1) % projects.length;
                    setCurrentIndex(newIndex);
                    projectsContainerRef.current.scrollTo({ left: newIndex * 480, behavior: 'smooth' });
                  }
                }}
                className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 active:scale-90"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          <div
            ref={projectsContainerRef}
            className="flex gap-10 overflow-x-auto scroll-smooth pb-20 hide-scrollbar snap-x"
          >
            {loading ? (
              <div className="flex gap-10 w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="min-w-[450px] h-[600px] bg-white/5 rounded-[3rem] animate-pulse"></div>
                ))}
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="min-w-[340px] md:min-w-[450px] snap-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="relative h-[600px] rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-blue-500/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>

                    <div className="absolute top-10 left-10">
                      <div className="px-5 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{project.status}</span>
                      </div>
                    </div>

                    <div className="absolute inset-x-10 bottom-10">
                      <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Strategic Mission</p>
                      <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>

                      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-bold text-slate-300">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-bold text-slate-300">{project.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Services Section - Compact Technical Modules */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h6
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-600 font-black tracking-[0.4em] uppercase text-[10px] mb-4"
            >
              Operational Core
            </motion.h6>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tightest uppercase"
            >
              Strategic <span className="text-blue-600">Capabilities</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-500 text-center flex flex-col items-center"
              >
                {/* Icon Container */}
                <div className="mb-8 w-20 h-20 flex items-center justify-center relative">
                  <motion.div
                    whileHover={{ 
                      y: [0, -8, 0],
                      scale: 1.1,
                    }}
                    transition={{ 
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      scale: {
                        duration: 0.3
                      }
                    }}
                    className="relative z-10"
                  >
                    <img
                      src={service.icon}
                      alt=""
                      className="w-16 h-16 object-contain"
                      style={{ 
                        filter: 'invert(52%) sepia(45%) saturate(634%) hue-rotate(162deg) brightness(93%) contrast(91%)' 
                      }}
                    />
                  </motion.div>
                  {/* Subtle Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-[#2b92d0]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="w-full">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-tight px-4">
                    {service.title}
                  </h3>

                  {/* Subtle Separator Line */}
                  <div className="w-full h-[1px] bg-slate-100 mb-6"></div>

                  <p className="text-slate-500 font-medium leading-relaxed px-2 text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Precision Machinery & Fleet - New Section */}
      <section className="py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h6 className="text-blue-500 font-black tracking-[0.4em] uppercase text-xs mb-6">Core Equipment</h6>
              <h2 className="text-5xl md:text-7xl font-black tracking-tightest uppercase leading-[0.9] mb-10">
                The Heavy <span className="text-blue-600">Engine</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                We own and operate a massive fleet of high-precision machinery, ensuring 100% control over project timelines and engineering quality.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-16">
                {[
                  { label: 'Equipment Units', value: '150+' },
                  { label: 'Tech Grade', value: 'High-Precision' }
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-blue-600 pl-6">
                    <div className="text-4xl font-black text-white mb-2">{item.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-600/20 rounded-[4rem] blur-3xl opacity-30"></div>
              <img
                src="/jeetasia-uploads/excavator-premium.webp"
                alt="Heavy Engineering Excavator"
                className="relative z-10 rounded-[3rem] border border-white/10 shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-blue-600 p-8 rounded-3xl z-20 shadow-2xl hidden md:block">
                <Construction className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Excavators', count: '45+', icon: '/jeetasia-uploads/excavator-icon.png' },
              { name: 'Road Pavers', count: '12+', icon: '/jeetasia-uploads/paver-icon.png' },
              { name: 'Soil Compactors', count: '28+', icon: '/jeetasia-uploads/roller-icon.png' },
              { name: 'Transit Mixers', count: '30+', icon: '/jeetasia-uploads/mixer-icon.png' }
            ].map((unit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-500 group"
              >
                <div className="h-16 w-16 mb-6 relative">
                  <motion.div
                    whileHover={{ 
                      y: [0, -5, 0],
                      scale: 1.1,
                    }}
                    transition={{ 
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="relative z-10 w-full h-full"
                  >
                    <img
                      src={unit.icon}
                      alt={unit.name}
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'invert(52%) sepia(45%) saturate(634%) hue-rotate(162deg) brightness(93%) contrast(91%)'
                      }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-[#2b92d0]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-2">{unit.name}</h4>
                <p className="text-blue-500 font-black text-sm">{unit.count} Units In Action</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients - Premium Grid */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h6 className="text-blue-600 font-black tracking-[0.4em] uppercase text-xs mb-6">Strategic Alliances</h6>
            <h2 className="text-5xl md:text-7xl font-black tracking-tightest uppercase">Elite <span className="text-blue-600">Network</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-50 p-14 rounded-[4rem] text-center transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-4 border border-slate-100"
              >
                <div className="h-28 flex items-center justify-center mb-10 overflow-hidden rounded-xl">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full object-contain mix-blend-multiply contrast-125 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-3 leading-none">{client.name}</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{client.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernContent;

