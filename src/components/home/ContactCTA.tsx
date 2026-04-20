
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-jeet-blue/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
            <p className="text-white/80 text-lg mb-8">
              Contact us today to discuss your infrastructure needs. Our team of experts is ready to provide you with the best solutions.
            </p>
            <Button asChild size="lg" className="bg-white text-jeet-blue hover:bg-white/90">
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-jeet-gray-dark">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-jeet-blue/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-jeet-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-jeet-gray-dark">Office Address</h4>
                  <p className="text-jeet-gray-medium">123 Infrastructure Road, New Delhi, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-jeet-blue/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-jeet-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-jeet-gray-dark">Phone Number</h4>
                  <p className="text-jeet-gray-medium">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-jeet-blue/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-jeet-blue" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-jeet-gray-dark">Email Address</h4>
                  <p className="text-jeet-gray-medium">info@jeetasia.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
