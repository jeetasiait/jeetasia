
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
import AdminLayout from '@/components/layouts/AdminLayout';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  department: z.string().min(2, { message: 'Department is required' }),
  location: z.string().min(2, { message: 'Location is required' }),
  type: z.string().min(2, { message: 'Type is required' }),
  status: z.enum(['active', 'filled', 'closed']),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  requirements: z.string().min(10, { message: 'Requirements must be at least 10 characters' }),
  salary: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CareerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const isEditing = !!id;

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      status: 'active',
      description: '',
      requirements: '',
      salary: '',
    },
  });

  // Fetch career listing data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchCareerListing = async () => {
        try {
          const { data, error } = await supabase
            .from('careers')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          if (data) {
            form.reset({
              title: data.title,
              department: data.department || '',
              location: data.location || '',
              type: data.type || 'Full-time',
              status: (data.status || 'active') as 'active' | 'filled' | 'closed',
              description: data.description || '',
              requirements: data.requirements || '',
              salary: data.salary || '',
            });
          }
        } catch (error: any) {
          toast({
            title: "Error loading career listing",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchCareerListing();
    }
  }, [id, isEditing, form]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      const careerData = {
        title: values.title,
        department: values.department,
        location: values.location,
        type: values.type,
        status: values.status,
        description: values.description,
        requirements: values.requirements,
        salary: values.salary || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('careers')
          .update(careerData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Career listing updated",
          description: "The job listing has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('careers')
          .insert(careerData);
          
        if (error) throw error;
        
        toast({
          title: "Career listing created",
          description: "The new job listing has been created successfully.",
        });
      }
      
      navigate('/admin/careers');
    } catch (error: any) {
      toast({
        title: `Error ${isEditing ? 'updating' : 'creating'} career listing`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout title={isEditing ? "Edit Job Listing" : "Add Job Listing"}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? "Edit Job Listing" : "Add Job Listing"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Engineering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Delhi NCR" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="filled">Filled</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. ₹5-7 LPA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter job description" 
                    {...field} 
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter job requirements" 
                    {...field} 
                    rows={5}
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
              onClick={() => navigate('/admin/careers')}
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
                isEditing ? 'Update Job Listing' : 'Create Job Listing'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default CareerForm;
