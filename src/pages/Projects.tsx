import { useState, useEffect } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Construction } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  location: string | null;
  timeline: string | null;
  status: string;
  category: string | null;
  image: string | null;
  description: string | null;
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*');
        
        if (error) {
          console.error('Error fetching projects:', error);
          return;
        }
        
        if (data) {
          // Ensure we handle potentially null fields
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

  // Images for hero carousel
  const heroImages = [
    {
      url: "/jeetasia-uploads/projects-hero.webp",
      caption: "Building Infrastructure Excellence"
    },
    {
      url: "/jeetasia-uploads/services-hero.webp",
      caption: "Highway Development Projects"
    },
    {
      url: "/jeetasia-uploads/gallery-hero.webp",
      caption: "Urban Infrastructure Solutions"
    },
    {
      url: "/jeetasia-uploads/about-hero.webp",
      caption: "Rural Road Development"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);
  
  return (
    <MainLayout>
      {/* Hero Section with Enhanced Carousel */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#0f172a]">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full p-0">
                <div className="relative w-full h-[60vh] md:h-[70vh]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-110 hover:scale-100" 
                    style={{ backgroundImage: `url(${image.url})` }}
                  >
                    <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-brightness-75"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                  </div>
                  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4 max-w-5xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">{image.caption}</h1>
                      <p className="text-lg md:text-2xl font-medium text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Precision engineering meets architectural vision. Explore our nationwide footprint.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute z-20 bottom-12 left-1/2 -translate-x-1/2 flex gap-6">
            <CarouselPrevious className="relative left-0 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-jeet-blue border-white/20 transition-all duration-300 transform scale-125" />
            <CarouselNext className="relative right-0 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-jeet-blue border-white/20 transition-all duration-300 transform scale-125" />
          </div>
        </Carousel>
      </section>

      {/* Projects Filter and Grid */}
      <section className="section-padding bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-24">
             <h6 className="text-jeet-blue font-black tracking-widest uppercase mb-4 text-xs">OUR PORTFOLIO</h6>
             <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">Architecting India's <span className="text-gradient">Growth</span></h2>
             
             {/* Modern Filter Pills */}
             <div className="flex flex-wrap gap-4 justify-center bg-white p-3 rounded-[2rem] shadow-xl border border-slate-100">
                {['all', 'completed', 'ongoing'].map((filter) => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={`px-8 py-3 rounded-[1.2rem] font-black text-base transition-all duration-500 uppercase tracking-widest ${
                      activeFilter === filter 
                        ? 'bg-jeet-blue text-white shadow-lg shadow-blue-500/20' 
                        : 'text-gray-400 hover:text-jeet-blue hover:bg-slate-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
             </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col justify-center items-center h-80 gap-6">
              <Loader2 className="h-16 w-16 animate-spin text-jeet-blue stroke-[3px]" />
              <p className="text-xl font-black text-gray-300 tracking-tighter uppercase">Initializing Portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                    viewport={{ once: true }}
                    className="premium-card bg-white p-0 overflow-hidden flex flex-col h-full border-none shadow-2xl hover:-translate-y-4"
                  >
                    <div className="relative h-72 overflow-hidden group/img">
                      <img 
                        src={project.image || '/placeholder.svg'} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-6 right-6">
                        <span className={`px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest bg-white ${project.status === 'completed' ? 'text-green-600' : 'text-amber-600 shadow-xl'}`}>
                          {project.status === 'completed' ? 'COMPLETED' : 'ONGOING'}
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                         <div className="flex items-center text-white/80 font-bold tracking-widest text-xs uppercase gap-3">
                            <span className="bg-blue-600 px-3 py-1 rounded-md text-white font-black">{project.category}</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-black mb-4 text-jeet-blue leading-tight uppercase tracking-tighter">{project.title}</h3>
                      <p className="text-slate-500 font-medium text-base leading-relaxed mb-8 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
                         <div className="flex items-center gap-4 text-slate-400 group/data">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover/data:bg-jeet-blue transition-colors">
                               <MapPin className="h-5 w-5 group-hover/data:text-white" />
                            </div>
                            <span className="font-bold text-gray-700">{project.location}</span>
                         </div>
                         <div className="flex items-center gap-4 text-slate-400 group/data">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover/data:bg-jeet-blue transition-colors">
                               <Calendar className="h-5 w-5 group-hover/data:text-white" />
                            </div>
                            <span className="font-bold text-gray-700">{project.timeline}</span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-gray-300 text-3xl font-black uppercase tracking-tighter">No active projects found in this sector.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Projects;

