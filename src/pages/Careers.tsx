
import { useState, useEffect } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import CareersHeader from '../components/careers/CareersHeader';
import BenefitsSection from '../components/careers/BenefitsSection';
import JobListings from '../components/careers/JobListings';
import JobDetails from '../components/careers/JobDetails';
import { AnimatePresence } from 'framer-motion';
import type { JobPosting } from '../types/careers';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log('Career data from Supabase:', data);
      
      // Transform the Supabase data to match JobPosting interface
      const formattedJobs: JobPosting[] = data.map(job => ({
        id: job.id, // Use UUID as string
        title: job.title,
        location: job.location || 'Remote',
        type: job.type as 'Full-time' | 'Part-time' | 'Contract',
        department: job.department || 'General',
        description: job.description || '',
        requirements: job.requirements ? job.requirements.split('\n') : [],
        posted: new Date(job.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }));
      
      console.log('Formatted jobs:', formattedJobs);
      setJobPostings(formattedJobs);
    } catch (error: any) {
      console.error('Error fetching job listings:', error);
      toast({
        title: "Error loading job listings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <MainLayout>
      <CareersHeader />
      <BenefitsSection />
      <section className="section-padding bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">Current <span className="text-gradient">Openings</span></h2>
            <div className="w-24 h-1.5 bg-jeet-blue mx-auto rounded-full"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-jeet-blue" />
            </div>
          ) : jobPostings.length === 0 ? (
            <div className="max-w-2xl mx-auto premium-card p-12 text-center bg-white">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Loader2 className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-xl text-slate-500 font-bold leading-relaxed mb-4">
                No active missions at this moment.
              </p>
              <p className="text-slate-400 font-medium">
                Our team is currently at full capacity. Check back soon for new opportunities to build the future.
              </p>
            </div>
          ) : (
            <div className="w-full">
              <JobListings
                jobs={jobPostings}
                onSelectJob={setSelectedJob}
              />
              
              <AnimatePresence>
                {selectedJob && (
                  <JobDetails
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                    onApply={() => {}}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Careers;
