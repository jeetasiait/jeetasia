
import { Link } from 'react-router-dom';
import { HardHat, Building, Ruler, Construction } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-2">
      <div className="mb-4 bg-jeet-blue/10 w-16 h-16 rounded-full flex items-center justify-center">
        <Icon className="text-jeet-blue h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-jeet-gray-medium mb-4">{description}</p>
      <Link to="/services" className="text-jeet-blue font-medium hover:underline">Learn more</Link>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: HardHat,
      title: "Road Construction",
      description: "Specializing in highways, expressways, and rural road development with advanced engineering techniques."
    },
    {
      icon: Building,
      title: "Infrastructure Development",
      description: "Comprehensive infrastructure solutions from planning and design to execution and maintenance."
    },
    {
      icon: Ruler,
      title: "Civil Engineering",
      description: "Expert civil engineering services for both public and private sector projects with precision and quality."
    },
    {
      icon: Construction,
      title: "Construction Management",
      description: "End-to-end project management services ensuring on-time, within-budget completion of construction projects."
    }
  ];

  return (
    <section className="section-padding bg-jeet-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-jeet-blue font-semibold mb-2">OUR SERVICES</h6>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block heading-underline after:left-1/2 after:-translate-x-1/2 pb-4">
            What We Offer
          </h2>
          <p className="text-jeet-gray-medium max-w-2xl mx-auto mt-6">
            JEET Asia provides comprehensive infrastructure and construction services 
            with a focus on quality, innovation, and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
