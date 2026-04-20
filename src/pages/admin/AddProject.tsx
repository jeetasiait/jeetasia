
import AdminLayout from '@/components/layouts/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

const AddProject = () => {
  return (
    <AdminLayout title="Add New Project">
      <ProjectForm />
    </AdminLayout>
  );
};

export default AddProject;
