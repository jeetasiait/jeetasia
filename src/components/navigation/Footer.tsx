import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#0a0f1d] text-white pt-32 pb-16 relative overflow-hidden">
      {/* Engineering Aesthetic Elements */}
      <div className="absolute inset-0 opacity-[0.02] z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Decorative Glows */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-full blur-[150px] rotate-12"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="inline-block group">
              <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 group-hover:border-blue-500/50 transition-all duration-500">
                <img 
                  src="/jeetasia-uploads/7e6f9b24-6c98-48a1-8e02-ff9bc51058f9.png" 
                  alt="JEET Asia" 
                  className="h-12 md:h-16 brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-xl leading-relaxed font-medium max-w-md">
              JEET Asia Private Limited is redefining the Indian landscape with high-precision infrastructure and world-class civil engineering.
            </p>
            <div className="flex items-center gap-4">
               {[
                 { Icon: Facebook, color: 'hover:bg-blue-600' },
                 { Icon: Twitter, color: 'hover:bg-sky-500' },
                 { Icon: Instagram, color: 'hover:bg-pink-600' },
                 { Icon: Linkedin, color: 'hover:bg-blue-700' }
               ].map((social, i) => (
                 <a key={i} href="#" className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${social.color} transition-all duration-500 group border border-white/5 hover:border-transparent hover:scale-110 shadow-lg`}>
                   <social.Icon size={22} className="text-slate-400 group-hover:text-white transition-all duration-500" />
                 </a>
               ))}
            </div>
            
            <div className="pt-8 flex items-center gap-4 opacity-50 group cursor-default">
              <ShieldCheck className="w-6 h-6 text-blue-500 group-hover:animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">ISO 9001:2015 Certified Enterprise</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-blue-500/30"></div>
              Navigation
            </h3>
            <div className="grid grid-cols-1 gap-y-4">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-slate-400 hover:text-blue-400 transition-all group flex items-center gap-3 text-lg font-bold tracking-tight"
                >
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                  <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-blue-500/30"></div>
              Headquarters
            </h3>
            <ul className="space-y-10">
              <li className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-500">
                   <MapPin className="text-blue-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Office Location</p>
                  <span className="text-slate-300 font-bold text-lg leading-snug">SCO - 105, Huda Market, Sector 10A, Gurugram, India 122001</span>
                </div>
              </li>
              <li className="flex items-start gap-6 group cursor-pointer" onClick={() => window.location.href = 'tel:+918053805324'}>
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-500">
                    <Phone className="text-blue-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Direct Line</p>
                    <div className="text-slate-300 font-bold text-lg">+91 80538 05324 <br/> <span className="text-slate-500 text-sm font-medium">+91 124-4296574</span></div>
                 </div>
              </li>
              <li className="flex items-start gap-6 group cursor-pointer" onClick={() => window.location.href = 'mailto:info@jeetasia.com'}>
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-500">
                    <Mail className="text-blue-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Official Email</p>
                    <span className="text-slate-300 font-bold text-lg hover:text-blue-400 transition-colors">info@jeetasia.com</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Redesigned */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">
            <p>&copy; {currentYear} <span className="text-white">JEET Asia Private Limited</span></p>
            <div className="hidden md:block w-[1px] h-4 bg-white/10"></div>
            <p>Designed for Infrastructure Excellence</p>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link to="/privacy-policy" className="text-slate-500 hover:text-blue-400 transition-colors">Privacy Protocol</Link>
            <Link to="/terms-conditions" className="text-slate-500 hover:text-blue-400 transition-colors">Legal Terms</Link>
          </div>
        </div>
      </div>
      
      {/* Large Background JA (JEET Asia) Initial */}
      <div className="absolute bottom-[-10%] right-[-5%] text-[30rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
        JA
      </div>
    </footer>
  );
};

export default Footer;
