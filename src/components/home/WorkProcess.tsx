
import React from 'react';

const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We start with a detailed consultation to understand your project requirements and objectives.'
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Our expert team develops a comprehensive plan with timelines, resources, and budget.'
  },
  {
    number: '03',
    title: 'Execution',
    description: 'We implement the project with precision, following industry best practices and standards.'
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'On-time project completion with thorough quality checks and client approval.'
  }
];

const WorkProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-jeet-blue font-semibold mb-2">OUR PROCESS</h6>
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block heading-underline after:left-1/2 after:-translate-x-1/2 pb-4">
            How We Work
          </h2>
          <p className="text-jeet-gray-medium max-w-2xl mx-auto mt-6">
            Our systematic approach ensures efficient project execution and timely delivery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="text-3xl font-bold text-jeet-blue mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-jeet-gray-medium">{step.description}</p>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#0097D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
