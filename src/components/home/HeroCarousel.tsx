import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { SliderImage } from '@/types/slider';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSlides: SliderImage[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
    title: "Engineering The Nation's Future",
    description: "Defining excellence in infrastructure and heavy construction across India since 2014.",
    cta_text: "Explore Mission",
    cta_link: "/about",
    display_order: 1,
    active: true
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1503387762-592dee581106?q=80&w=2670&auto=format&fit=crop",
    title: "Precision In Every Kilometer",
    description: "Leveraging cutting-edge technology to build roads that connect dreams and industries.",
    cta_text: "Our Strategy",
    cta_link: "/about",
    display_order: 2,
    active: true
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop",
    title: "Monumental Scale, Surgical Precision",
    description: "Transforming complex blueprints into monumental landscapes through world-class engineering.",
    cta_text: "Contact Control",
    cta_link: "/contact",
    display_order: 3,
    active: true
  }
];

const HeroCarousel = () => {
  const [slides, setSlides] = useState<SliderImage[]>(defaultSlides);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const { data, error } = await supabase
          .from('slider_images')
          .select('*')
          .eq('active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setSlides(data as SliderImage[]);
        }
      } catch (error) {
        console.error('Error fetching slider images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0a0f1d]">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping"></div>
          <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === activeSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              {/* Ken Burns Background */}
              <motion.div 
                initial={{ scale: 1.2, rotate: 1 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              
              {/* Cinematic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              
              {/* Technical Blueprint Overlay */}
              <div className="absolute inset-0 opacity-[0.05] z-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              
              {/* Mesh Glows */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] z-10"></div>

              <div className="relative z-20 h-full flex items-center container mx-auto px-6 md:px-16 pt-20">
                <div className="max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <div className="h-[2px] w-12 bg-blue-500"></div>
                    <span className="text-sm font-black text-blue-400 uppercase tracking-[0.5em]">Commanding Excellence</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tight"
                  >
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i % 2 === 1 ? 'text-gradient' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-medium leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-wrap gap-6"
                  >
                    <Button asChild size="lg" className="h-20 px-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20 group transition-all duration-500 border-none overflow-hidden relative">
                      <Link to={slide.cta_link} className="relative z-10 flex items-center">
                        {slide.cta_text}
                        <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="h-20 px-12 border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white hover:text-black rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-500 group">
                      <Link to="/projects" className="flex items-center">
                        <Play className="mr-3 h-5 w-5 fill-white group-hover:fill-black" />
                        View Operations
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Slide Indicators - Precision Progress Bars */}
      <div className="absolute bottom-16 right-16 z-30 flex flex-col gap-8 hidden md:flex">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className="group relative flex items-center justify-end gap-6"
          >
            <span className={`text-xs font-black transition-all duration-500 ${activeSlide === index ? 'text-blue-500 scale-125' : 'text-white/30 group-hover:text-white'}`}>
              0{index + 1}
            </span>
            <div className="relative w-32 h-[2px] bg-white/10 overflow-hidden">
              {activeSlide === index && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="absolute inset-0 bg-blue-500"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Decorative Bottom Mesh */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default HeroCarousel;
