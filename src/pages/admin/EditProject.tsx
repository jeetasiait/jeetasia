
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Project not found",
            description: "The project you are trying to edit does not exist.",
            variant: "destructive",
          });
          navigate('/admin/projects');
          return;
        }
        
        setProjectData(data);
      } catch (error: any) {
        toast({
          title: "Error fetching project",
          description: error.message,
          variant: "destructive",
        });
        navigate('/admin/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <AdminLayout title="Edit Project">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Project">
      {projectData && (
        <ProjectForm projectId={id} initialData={projectData} />
      )}
    </AdminLayout>
  );
};

export default EditProject;
