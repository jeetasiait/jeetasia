
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { TeamMember } from '@/types/team';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  designation: z.string().min(2, { message: 'Designation is required' }),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
  image: z.string().optional(),
  linkedin: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const isEditing = !!id;

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      designation: '',
      bio: '',
      image: '',
      linkedin: '',
    },
  });

  // Fetch team member data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchTeamMember = async () => {
        try {
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('id', parseInt(id as string))
            .single();
            
          if (error) throw error;
          if (data) {
            // Cast data to our TeamMember type
            const memberData = data as unknown as TeamMember;
            
            form.reset({
              name: memberData.name,
              designation: memberData.designation,
              bio: memberData.bio,
              linkedin: memberData.linkedin || '',
              image: memberData.image || '',
            });
          }
        } catch (error: any) {
          toast({
            title: "Error loading team member",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchTeamMember();
    }
  }, [id, isEditing, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `team_images/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('team')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('team')
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

  const handleRemoveImage = async () => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ image: null })
        .eq('id', parseInt(id as string));
      
      if (error) throw error;
      
      form.setValue('image', '');
      toast({
        title: "Image removed",
        description: "The image has been removed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error removing image",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      if (isEditing && id) {
        const { error } = await supabase
          .from('team_members')
          .update({
            name: values.name,
            designation: values.designation,
            bio: values.bio,
            image: values.image || null,
            linkedin: values.linkedin || null,
          })
          .eq('id', parseInt(id));
          
        if (error) throw error;
        
        toast({
          title: "Team member updated",
          description: "The team member has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert({
            name: values.name,
            designation: values.designation,
            bio: values.bio,
            image: values.image || null,
            linkedin: values.linkedin || null,
          });
          
        if (error) throw error;
        
        toast({
          title: "Team member created",
          description: "The new team member has been created successfully.",
        });
      }
      
      navigate('/admin/team');
    } catch (error: any) {
      toast({
        title: `Error ${isEditing ? 'updating' : 'creating'} team member`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout title={isEditing ? "Edit Team Member" : "Add Team Member"}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? "Edit Team Member" : "Add Team Member"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter bio" {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin/team')}
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
                isEditing ? 'Update Team Member' : 'Create Team Member'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default TeamForm;
