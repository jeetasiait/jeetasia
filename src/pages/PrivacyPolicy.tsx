import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl md:text-6xl font-black text-jeet-blue uppercase tracking-tighter mb-4">Legal <span className="text-gradient">Integrity</span></h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-12">Publication Date: {effectiveDate}</p>
            
            <div className="space-y-16">
              <section>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  At JEET Asia Private Limited, we treat your data with the same precision and security we apply to our infrastructure projects. 
                  This charter outlines our unwavering commitment to your privacy.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  1. Data Acquisition
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Name & Corporate Identity", "Secure Communications", "Technical Telemetry", "Project Specifications"].map((item, i) => (
                    <li key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold text-slate-600 flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                       {item}
                    </li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  2. Operational Utilization
                </h2>
                <div className="prose prose-slate max-w-none text-slate-500 font-medium text-lg leading-relaxed">
                   Information is utilized exclusively to synchronize project timelines, enhance digital infrastructure, and maintain elite service standards. We do not engage in unauthorized data dissemination.
                </div>
              </section>

              <section className="bg-jeet-blue/5 p-10 rounded-[2rem] border border-jeet-blue/10">
                 <h2 className="text-2xl font-black text-jeet-blue uppercase tracking-tighter mb-4">Questions?</h2>
                 <p className="text-slate-500 font-medium mb-6">Our legal team is available for clarification on data standards.</p>
                 <a href="mailto:info@jeetasia.com" className="text-jeet-blue font-black tracking-widest uppercase text-sm hover:underline">info@jeetasia.com</a>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>

  );
};

export default PrivacyPolicy;
