import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  location: z.string().min(2, { message: 'Location is required' }),
  timeline: z.string().min(2, { message: 'Timeline is required' }),
  status: z.string(), // Changed from enum to string to match Supabase's expected type
  category: z.string().min(2, { message: 'Category is required' }),
  image: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

// Define expected database structure to match Supabase types
type ProjectRecord = {
  id?: string;
  title: string;
  location?: string | null;
  timeline?: string | null;
  status?: string | null;
  category?: string | null;
  image?: string | null;
  description?: string | null;
};

interface ProjectFormProps {
  projectId?: string;
  initialData?: FormValues;
}

const ProjectForm = ({ projectId, initialData }: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const navigate = useNavigate();
  const isEditing = !!projectId;

  // Initialize form with schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      location: '',
      timeline: '',
      status: 'ongoing',
      category: '',
      image: '',
      description: '',
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `project_images/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('projects')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);
        
      form.setValue('image', urlData.publicUrl);
      toast({
        title: "Image uploaded",
        description: "The image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setFileUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      // Convert form values to match expected database structure
      const projectData: ProjectRecord = {
        title: values.title,
        location: values.location,
        timeline: values.timeline,
        status: values.status,
        category: values.category,
        image: values.image || null,
        description: values.description,
      };

      if (isEditing) {
        // For updates, use the single object format
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (error) throw error;
        
        toast({
          title: "Project updated",
          description: "The project has been updated successfully.",
        });
      } else {
        // For inserts, use the single object format (not an array)
        const { error } = await supabase
          .from('projects')
          .insert(projectData);
          
        if (error) throw error;
        
        toast({
          title: "Project created",
          description: "The new project has been created successfully.",
        });
      }
      
      navigate('/admin/projects');
    } catch (error: any) {
      toast({
        title: `Error ${isEditing ? 'updating' : 'creating'} project`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Maharashtra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeline</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2022 - Present" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Highway, Rural, Urban" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div className="space-y-3">
                <FormControl>
                  <Input {...field} placeholder="Image URL" />
                </FormControl>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Or upload a new image:</p>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={fileUploading}
                    />
                    {fileUploading && (
                      <Loader2 className="h-4 w-4 animate-spin text-jeet-blue" />
                    )}
                  </div>
                </div>
                {field.value && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Image Preview:</p>
                    <img 
                      src={field.value} 
                      alt="Preview" 
                      className="h-32 w-auto object-cover rounded-md border" 
                    />
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter project description" 
                  {...field}
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/admin/projects')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-jeet-blue hover:bg-jeet-navy"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
