import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  const effectiveDate = "May 1, 2024";
  
  return (
    <MainLayout>
      <div className="section-padding bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto premium-card p-12 md:p-20 bg-white"
          >
            <h1 className="text-4xl md:text-6xl font-black text-jeet-blue uppercase tracking-tighter mb-4">Service <span className="text-gradient">Charter</span></h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-12">Effective Jurisdiction: {effectiveDate}</p>
            
            <div className="space-y-16">
              <section>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  These terms represent the structural foundation of our digital engagement. By interacting with JEET Asia, you enter into a framework of professional standards and mutual respect.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  1. Authorized Use
                </h2>
                <div className="prose prose-slate max-w-none text-slate-500 font-medium text-lg leading-relaxed">
                   All intelligence, media, and architectural renderings presented on this platform are for informational purposes only. Unauthorized extraction or exploitation of data is prohibited under corporate security protocols.
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  2. Intellectual Assets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {["Brand Identity", "Project Schematics", "Technical Whitepapers", "Original Media"].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 font-bold text-slate-600 uppercase tracking-widest text-xs">
                         {item}
                      </div>
                   ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  3. Legal Governance
                </h2>
                <div className="prose prose-slate max-w-none text-slate-500 font-medium text-lg leading-relaxed">
                   JEET Asia Private Limited operates under the regulatory frameworks of the Republic of India. Any arbitration or inquiry shall be conducted within the jurisdiction of our corporate headquarters.
                </div>
              </section>

              <div className="pt-12 border-t border-slate-100">
                 <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-4">Direct Legal Line:</p>
                 <a href="mailto:legal@jeetasia.com" className="text-2xl font-black text-jeet-blue hover:text-blue-600 transition-colors tracking-tighter">legal@jeetasia.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>

  );
};

export default TermsConditions;
