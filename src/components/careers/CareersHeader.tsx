import { motion } from 'framer-motion';

const CareersHeader = () => {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#0f172a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
         <img 
           src="/jeetasia-uploads/team-hero.webp" 
           alt="Career Opportunities" 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Hiring the Future</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter"
          >
            Build More Than <br/>
            <span className="text-gradient">Infrastructure</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Join a legacy of precision and innovation. We're looking for visionaries to redefine the Indian landscape.
          </motion.p>
        </div>
      </div>
    </section>
  );
};


export default CareersHeader;
