
import { MessageSquare } from 'lucide-react';
import ExpandableText from '@/components/common/ExpandableText';

const DirectorMessage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <img 
              src="/jeetasia-uploads/director.jpg" 
              alt="Director" 
              className="rounded-full shadow-lg w-48 h-48 object-cover mx-auto"
            />
            <p className="text-center mt-4 font-semibold text-jeet-navy">Mr. Krishan Singh</p>
            <p className="text-center text-jeet-gray-medium">Managing Director</p>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-jeet-blue">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="text-jeet-blue" />
                <h2 className="text-2xl font-heading font-bold">Director's Message</h2>
              </div>
              <ExpandableText
                text={"At JEET Asia, we are committed to excellence in infrastructure development. Our vision is to create sustainable solutions that contribute to India's growth story. With a dedicated team and unwavering commitment to quality, we continue to deliver projects that make a difference."}
                maxLines={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;
