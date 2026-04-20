import { Briefcase, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';


const BenefitsSection = () => {
  const benefits = [
    {
      icon: Briefcase,
      title: "Visionary Careers",
      desc: "Architect your path in an environment that rewards bold thinking and celebrates technical mastery."
    },
    {
      icon: Clock,
      title: "Sustainable Pace",
      desc: "Elite performance requires elite recovery. We champion a culture of balance and well-being."
    },
    {
      icon: MapPin,
      title: "National Blueprint",
      desc: "Work on monolithic projects that define the horizon of modern India and leave a lasting legacy."
    }
  ];

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 transform origin-top-right"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">The JEET <span className="text-gradient">Experience</span></h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Beyond competitive packages, we provide the platform to engineer your masterpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-12 text-center group hover:-translate-y-4"
            >
              <div className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center mb-10 mx-auto group-hover:bg-jeet-blue group-hover:rotate-12 transition-all duration-500 shadow-inner">
                <item.icon className="h-12 w-12 text-jeet-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black mb-6 text-jeet-blue uppercase tracking-tighter">{item.title}</h3>
              <p className="text-lg text-slate-500 font-bold leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default BenefitsSection;
