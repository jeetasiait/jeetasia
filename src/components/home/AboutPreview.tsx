
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1578319615508-906f5a3be117?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="JEET Asia Infrastructure Project" 
                className="rounded-lg shadow-xl object-cover w-full h-[400px]" 
              />
            </div>
          </div>
          
          <div>
            <h6 className="text-jeet-blue font-semibold mb-2">OUR STORY</h6>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-underline">JEET Asia Private Limited</h2>
            <p className="text-jeet-gray-medium mb-6">
              Formerly known as JEET Buildcon Pvt. Ltd., we transformed into JEET Asia Private Limited on August 6, 2014, expanding our vision and capabilities in the infrastructure sector.
            </p>
            <p className="text-jeet-gray-medium mb-6">
              Under the leadership of our Managing Director, Mr. Krishan Singh, and Director, Mr. Ramphal, we have successfully delivered multiple road and infrastructure projects across India.
            </p>
            <p className="text-jeet-gray-medium mb-8">
              Our commitment to quality, innovation, and timely delivery has made us a trusted partner for infrastructure development projects.
            </p>
            <div className="flex space-x-4">
              <Button asChild className="bg-jeet-blue text-white">
                <Link to="/about">
                  Read More
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-jeet-blue text-jeet-blue">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
