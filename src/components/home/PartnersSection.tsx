
import React from 'react';
import { Building2 } from 'lucide-react';

const bankingPartners = [
  { name: 'HDFC Bank', logo: '/lovable-uploads/hdfc.png' },
  { name: 'ICICI Bank', logo: '/lovable-uploads/icici.png' },
  { name: 'IndusInd Bank', logo: '/lovable-uploads/indusind.png' },
  { name: 'Union Bank', logo: '/lovable-uploads/union.png' },
  { name: 'PNB', logo: '/lovable-uploads/pnb.png' },
];

const clients = [
  { name: 'NHAI', logo: '/lovable-uploads/nhai.png' },
  { name: 'MoRTH', logo: '/lovable-uploads/morth.png' },
  { name: 'HSIIDC', logo: '/lovable-uploads/hsiidc.png' },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Banking Partners Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-jeet-blue">Our Banking Partners</h2>
            <div className="w-24 h-1 bg-jeet-blue mx-auto mt-2"></div>
            <p className="text-jeet-gray-medium max-w-2xl mx-auto mt-4">
              Trusted financial institutions that support our infrastructure initiatives
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {bankingPartners.map((partner) => (
              <div key={partner.name} className="w-40 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center p-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Clients Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-jeet-blue">Our Clients</h2>
            <div className="w-24 h-1 bg-jeet-blue mx-auto mt-2"></div>
            <p className="text-jeet-gray-medium max-w-2xl mx-auto mt-4">
              Organizations that trust us with their infrastructure development needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {clients.map((client) => (
              <div key={client.name} className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center p-4">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
