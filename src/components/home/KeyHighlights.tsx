
import { Activity, Briefcase, CheckCircle, Truck } from 'lucide-react';

const highlights = [
  {
    icon: <Activity className="w-8 h-8 text-jeet-blue" />,
    count: "120+",
    label: "Projects Completed",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-jeet-blue" />,
    count: "10+",
    label: "Years of Experience",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-jeet-blue" />,
    count: "500+",
    label: "Skilled Staff",
  },
  {
    icon: <Truck className="w-8 h-8 text-jeet-blue" />,
    count: "15+",
    label: "Awards Won",
  },
];

const KeyHighlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-3xl font-bold text-jeet-navy mb-2">{highlight.count}</h3>
              <p className="text-jeet-gray-medium">{highlight.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
