import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock, Send, Shield, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactMessage } from '@/types/contact-messages';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const contactMessage: ContactMessage = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message
      };
      
      const SUPABASE_URL = "https://plgvpeacweofdkazyvln.supabase.co";
      const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZ3ZwZWFjd2VvZmRrYXp5dmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTM2MzUsImV4cCI6MjA2MjcyOTYzNX0.QzL1X1O_EfkiuHBHQyhyocuaDBecpftZA5VG0AcohGw";
      
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/contact_messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(contactMessage)
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      toast({
        title: "Transmission Successful",
        description: "Your message has been received. Our team will contact you shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Transmission Failed",
        description: "An error occurred. Please try again or contact us directly via email.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Immersive Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 bg-[#0a0f1d] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-jeet-blue/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/20 backdrop-blur-xl mb-10"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Global Command Center</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]"
              >
                Let's Build The <br/>
                <span className="text-blue-600">Future</span> Together
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-400 max-w-xl leading-relaxed mb-12 font-medium"
              >
                Connect with India's leading infrastructure experts. Whether you have a project in mind or just want to explore possibilities, we're here to help.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-12"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg tracking-tighter">Verified</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Enterprise Class</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg tracking-tighter">Global</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Standards</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[4rem] blur-[60px] -z-10"></div>
              <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150 duration-700"></div>
                
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-10 leading-none">Transmission <br/>Portal</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</label>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleChange} required 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 ring-blue-500/10 focus:bg-white transition-all text-lg font-bold"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coordinate</label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange} required 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 ring-blue-500/10 focus:bg-white transition-all text-lg font-bold"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Objective</label>
                    <input 
                      type="text" name="subject" value={formData.subject} onChange={handleChange} required 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 ring-blue-500/10 focus:bg-white transition-all text-lg font-bold"
                      placeholder="Subject of inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detailed Message</label>
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange} required rows={4}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 ring-blue-500/10 focus:bg-white transition-all text-lg font-bold resize-none"
                      placeholder="How can we assist you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-2xl font-black text-lg tracking-widest uppercase transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 group/btn"
                  >
                    {loading ? 'Transmitting...' : 'Initiate Transmission'}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* High-End Info Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-4">Direct Access</h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">Our Command <span className="text-blue-600">Centers</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Headquarters", content: "SCO - 105, Huda Market, Near HDFC Bank, Sector 10A, Gurugram, India 122001", color: "blue" },
              { icon: Phone, title: "Phone Line", content: "+91 80538 05324 | +91 124-4296574", color: "indigo" },
              { icon: Mail, title: "Digital Mail", content: "info@jeetasia.com", color: "sky" },
              { icon: Clock, title: "Operational", content: "Mon - Fri: 9:30 AM - 6:00 PM (IST)", color: "slate" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">{item.title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Location Section */}
      <section className="h-[600px] w-full relative grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1064962996227!2d77.00701707576974!3d28.442644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI2JzMzLjUiTiA3N8KwMDAnMzMuOSJF!5e0!3m2!1sen!2sin!4v1716380566702!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Strategic Location"
        ></iframe>
        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
      </section>
    </MainLayout>
  );
};

export default Contact;
