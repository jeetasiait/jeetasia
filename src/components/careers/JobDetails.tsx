import { MapPin, Clock, Briefcase, ArrowLeft, Send, Share2, Linkedin, MessageCircle, Link2, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import type { JobPosting } from '@/types/careers';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface JobDetailsProps {
  job: JobPosting;
  onClose: () => void;
  onApply: () => void;
}

const JobDetails = ({ job, onClose }: JobDetailsProps) => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Join the JEET Asia team as a ${job.title}`;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "The job link has been copied to your clipboard.",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-slate-50 overflow-y-auto"
    >
      {/* Immersive Header */}
      <div className="relative min-h-[60vh] bg-[#0f172a] flex items-end overflow-hidden pt-32">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-jeet-blue/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 pb-20 relative z-10">
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-all mb-12"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold uppercase tracking-[0.2em] text-[11px]">Return to Careers</span>
          </button>

          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/20 backdrop-blur-xl mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
              <span className="text-blue-400 font-black text-[11px] uppercase tracking-[0.2em]">{job.department} Division</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-9xl font-black text-white leading-none tracking-tightest uppercase mb-10"
            >
              {job.title}
            </motion.h1>

            <div className="flex flex-wrap gap-10">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 transition-colors">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Location</p>
                  <p className="text-white font-bold text-lg uppercase tracking-tighter">{job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 transition-colors">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Engagement</p>
                  <p className="text-white font-bold text-lg uppercase tracking-tighter">{job.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 transition-colors">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">ID Reference</p>
                  <p className="text-white font-bold text-lg uppercase tracking-tighter">#{job.id.toString().substring(0, 6).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-24">
            <section className="relative">
              <div className="absolute -left-10 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-transparent rounded-full opacity-30 hidden md:block"></div>
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-12">The Mission</h2>
              <p className="text-3xl md:text-4xl text-slate-800 font-bold leading-[1.3] tracking-tight">
                {job.description}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-12">Required Credentials</h2>
              <div className="space-y-6">
                {job.requirements.map((req, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-xl text-slate-600 font-bold leading-snug">{req}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 space-y-8">
              {/* Application Card */}
              <div className="bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">Apply for this Position</h3>
                  <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
                    Ready to join our legacy? Send your professional CV and portfolio directly to our recruitment office.
                  </p>

                  <div className="space-y-6 mb-12">
                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-600/20">
                        <Mail className="w-6 h-6" />
                      </div>
                      <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">Primary Recruitment Channel</p>
                      <a href="mailto:hr@jeetasia.com" className="text-2xl md:text-3xl font-black text-blue-600 hover:text-slate-900 transition-colors break-all">
                        hr@jeetasia.com
                      </a>
                    </div>
                  </div>

                  <a 
                    href={`mailto:hr@jeetasia.com?subject=Strategic Application: ${job.title}`}
                    className="flex items-center justify-center gap-4 w-full py-7 bg-slate-900 hover:bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 group/btn"
                  >
                    Send Application <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Share & Social */}
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center gap-8">
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Circulate Opportunity</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all"
                  >
                    <Linkedin className="w-7 h-7" />
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-all"
                  >
                    <MessageCircle className="w-7 h-7" />
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                  >
                    <Link2 className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
