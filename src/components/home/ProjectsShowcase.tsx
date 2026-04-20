
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  status: 'completed' | 'ongoing';
  image: string;
  description: string;
}

const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, location, status, image, description')
          .limit(4);
        
        if (error) {
          console.error('Error fetching projects:', error);
          return;
        }
        
        setProjects(data as Project[]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h6 className="text-jeet-blue font-semibold mb-2">OUR PROJECTS</h6>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">
              Featured Projects
            </h2>
            <p className="text-jeet-gray-medium max-w-2xl mb-6 md:mb-0">
              Discover our completed and ongoing infrastructure projects across India.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'bg-jeet-blue text-white' : 'text-jeet-gray-dark'}
            >
              All
            </Button>
            <Button 
              variant={activeFilter === 'completed' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('completed')}
              className={activeFilter === 'completed' ? 'bg-jeet-blue text-white' : 'text-jeet-gray-dark'}
            >
              Completed
            </Button>
            <Button 
              variant={activeFilter === 'ongoing' ? 'default' : 'outline'} 
              onClick={() => setActiveFilter('ongoing')}
              className={activeFilter === 'ongoing' ? 'bg-jeet-blue text-white' : 'text-jeet-gray-dark'}
            >
              Ongoing
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-lg shadow-md transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={project.image || "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full">
                    <span className={`text-sm font-medium ${project.status === 'completed' ? 'text-green-600' : 'text-amber-600'}`}>
                      {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-jeet-gray-medium mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-jeet-gray-dark">{project.location}</span>
                    <Link to={`/projects`} className="text-jeet-blue hover:underline flex items-center">
                      Details <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-jeet-gray-medium text-lg">No projects found matching your filter.</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button asChild className="btn-primary">
            <Link to="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
