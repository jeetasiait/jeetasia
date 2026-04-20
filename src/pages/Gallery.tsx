
import { useState, useEffect } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { ImageIcon, Video, Loader2, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { GalleryItem } from '@/types/gallery';
import { getYouTubeId, getYouTubeThumbnail, isYouTubeUrl } from '@/utils/youtubeUtils';

// Define image categories
type GalleryCategory = 'all' | 'projects' | 'construction' | 'team' | 'equipment';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery items
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('year', { ascending: false });

        if (error) {
          console.error('Error fetching gallery items:', error);
          return;
        }
        
        setGalleryItems(data as GalleryItem[] || []);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter gallery items based on selected category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Open lightbox with selected item
  const openLightbox = (item: GalleryItem) => {
    // If it's a YouTube URL, ensure we have the embed URL
    if (isYouTubeUrl(item.src)) {
      const videoId = getYouTubeId(item.src);
      if (videoId) {
        setSelectedImage({
          ...item,
          src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        });
      } else {
        setSelectedImage(item);
      }
    } else {
      setSelectedImage(item);
    }
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="relative text-white py-40 md:py-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/jeetasia-uploads/gallery-hero.webp"
            alt="Infrastructure Evolution Gallery"
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
            <span className="text-sm font-bold tracking-widest uppercase">VISUAL PORTFOLIO</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            Our <span className="text-blue-300">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Capturing the precision and scale of India's infrastructure evolution.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4">
          
          {/* Category Filters - Modern Pill Slider Style */}
          <div className="flex justify-center mb-24 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 bg-slate-50 p-2 rounded-[2rem] border border-slate-100 shadow-inner">
               {['all', 'projects', 'construction', 'team', 'equipment'].map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCategory(cat as any)}
                   className={`px-10 py-4 rounded-[1.5rem] font-black text-lg transition-all duration-500 uppercase tracking-widest whitespace-nowrap ${
                     activeCategory === cat 
                       ? 'bg-jeet-blue text-white shadow-xl shadow-blue-500/20' 
                       : 'text-gray-400 hover:text-jeet-blue'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          {/* Gallery Grid - Masonry style feel */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-80 gap-6">
              <Loader2 className="h-16 w-16 animate-spin text-jeet-blue" />
              <p className="text-xl font-black text-gray-300 uppercase tracking-tighter">Syncing Visuals...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredItems.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative cursor-pointer" 
                  onClick={() => openLightbox(item)}
                >
                  <div className="premium-card p-0 overflow-hidden relative aspect-[4/5]">
                    {isYouTubeUrl(item.src) ? (
                      <>
                        <img 
                          src={getYouTubeThumbnail(getYouTubeId(item.src) || '')} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
                              <Youtube className="h-10 w-10 text-red-500 fill-red-500" />
                           </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <img 
                          src={item.type === 'image' ? item.src : item.thumbnail || ''} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
                              {item.type === 'image' ? <ImageIcon className="h-10 w-10 text-jeet-blue" /> : <Video className="h-10 w-10 text-jeet-blue fill-jeet-blue" />}
                           </div>
                        </div>
                      </>
                    )}
                    
                    {/* Floating Data Badge */}
                    <div className="absolute top-6 right-6 z-10">
                       <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-jeet-blue font-black shadow-lg">
                          {item.year}
                       </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                       <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter mb-2">{item.title}</h3>
                       <p className="text-white/60 font-bold tracking-widest text-xs uppercase">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-gray-300 text-3xl font-black uppercase tracking-tighter">Visual archives are currently empty for this sector.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modern Lightbox with blur backdrop */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 md:p-12"
        >
          <button 
            className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white transition-colors hover:text-jeet-blue z-[110]"
            onClick={closeLightbox}
          >
            <span className="text-3xl font-black">✕</span>
          </button>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="max-w-6xl w-full relative"
          >
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl">
              {isYouTubeUrl(selectedImage.src) ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={selectedImage.src}
                    title={selectedImage.title}
                    allowFullScreen
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : selectedImage.type === 'image' ? (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full max-h-[70vh] object-cover" 
                />
              ) : (
                <div className="aspect-video bg-black">
                  <video 
                    src={selectedImage.src} 
                    controls 
                    className="w-full h-full"
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              
              <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                   <h3 className="text-3xl md:text-5xl font-black text-jeet-blue uppercase tracking-tighter mb-4">{selectedImage.title}</h3>
                   <div className="flex gap-4">
                      <span className="bg-slate-100 px-4 py-2 rounded-xl text-gray-500 font-bold uppercase tracking-widest text-xs">{selectedImage.category}</span>
                      <span className="bg-jeet-blue/10 px-4 py-2 rounded-xl text-jeet-blue font-bold uppercase tracking-widest text-xs">{selectedImage.year}</span>
                   </div>
                </div>
                <button 
                  className="bg-jeet-blue text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                  onClick={closeLightbox}
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </MainLayout>

  );
};

export default Gallery;
