import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import type { JobPosting } from '@/types/careers';
import { motion } from 'framer-motion';

interface JobListingsProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
}


const JobListings = ({ jobs, onSelectJob }: JobListingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {jobs.map((job, idx) => (
        <motion.div 
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="premium-card bg-white p-0 overflow-hidden flex flex-col group hover:-translate-y-2"
        >
          <div className="p-10 flex-grow">
            <div className="flex justify-between items-start mb-8">
               <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg font-black text-xs uppercase tracking-widest">{job.department}</span>
               <span className="text-slate-400 font-bold text-sm tracking-tighter uppercase">{job.posted}</span>
            </div>
            
            <h3 className="text-3xl font-black mb-6 text-jeet-blue uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{job.title}</h3>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <span className="flex items-center text-slate-500 font-bold text-sm gap-2 uppercase tracking-widest">
                <MapPin className="h-4 w-4 text-blue-500" /> {job.location}
              </span>
              <span className="flex items-center text-slate-500 font-bold text-sm gap-2 uppercase tracking-widest">
                <Clock className="h-4 w-4 text-blue-500" /> {job.type}
              </span>
            </div>
            
            <p className="text-slate-500 font-medium text-lg line-clamp-2 leading-relaxed mb-8">{job.description}</p>
          </div>
          
          <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
            <Button 
              variant="ghost" 
              className="p-0 h-auto text-jeet-blue font-black tracking-widest uppercase flex items-center gap-2 hover:bg-transparent group/btn"
              onClick={() => onSelectJob(job)}
            >
              EXPLORE ROLE <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
               <Briefcase className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


export default JobListings;
