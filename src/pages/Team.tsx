import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Linkedin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/types/team';
import { motion } from 'framer-motion';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('id');

        if (error) {
          console.error('Error fetching team members:', error);
          return;
        }
        
        setTeamMembers(data as TeamMember[] || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);


  return (
    <MainLayout>
      {/* Page Header */}
      <section className="relative text-white py-32 md:py-48 overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 z-0">
           <img 
             src="/jeetasia-uploads/team-hero.webp"
             alt="JEET Asia Leadership"
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">THE ARCHITECTS</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            Our <span className="text-gradient">Visionaries</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            A collective of specialists committed to rewriting the rules of Indian infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-80 gap-6">
              <Loader2 className="h-16 w-16 animate-spin text-jeet-blue stroke-[3px]" />
              <p className="text-xl font-black text-gray-300 uppercase tracking-tighter">assembling leadership...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamMembers.map((member, idx) => (
                <motion.div 
                  key={member.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="premium-card p-0 overflow-hidden group hover:-translate-y-4 shadow-2xl"
                >
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-jeet-blue/90 via-jeet-blue/40 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{member.name}</h3>
                       <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-2">{member.designation}</p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-slate-500 font-medium text-base leading-relaxed mb-6">{member.bio}</p>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl hover:bg-jeet-blue hover:text-white transition-all duration-300 group/link"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 group-hover/link:text-white" />
                        <span className="font-black text-xs uppercase tracking-widest">CONNECT PROFESSIONALLY</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
               <p className="text-gray-300 text-3xl font-black uppercase tracking-tighter">Strategic leadership information incoming.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Team;

