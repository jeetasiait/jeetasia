
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SliderImage } from '@/types/slider';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(), // Make image optional since we might upload a file instead
  cta_text: z.string().min(1, "CTA text is required"),
  cta_link: z.string().min(1, "CTA link is required"),
  display_order: z.number().min(1, "Order must be at least 1"),
  active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const SliderForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isEditing = Boolean(id);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      cta_text: "Learn More",
      cta_link: "/about",
      display_order: 1,
      active: true,
    }
  });

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('slider_images')
          .select('*')
          .limit(1);
          
        if (error) {
          console.error('Supabase connection test failed:', error);
        } else {
          console.log('Supabase connection test successful');
        }
      } catch (error) {
        console.error('Error testing Supabase connection:', error);
      }
    };
    
    testConnection();
    
    if (isEditing) {
      fetchSliderImage();
    }
  }, [id]);

  const fetchSliderImage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        form.reset({
          title: data.title,
          description: data.description,
          image: data.image,
          cta_text: data.cta_text,
          cta_link: data.cta_link,
          display_order: data.display_order,
          active: data.active,
        });
        
        setImagePreview(data.image);
      }
    } catch (error) {
      console.error('Error fetching slider image:', error);
      toast({
        title: "Error",
        description: "Failed to load slider image data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Clear the image URL field when a file is selected
      form.setValue("image", "");
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  

  const uploadImage = async () => {
    if (!imageFile) return form.getValues().image;
    
    try {
      console.log('Uploading file:', imageFile.name, imageFile.type, imageFile.size);
      
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`; // Removed 'slider/' prefix as it might not exist
      
      // Upload the file to 'slider-images' bucket
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('slider-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        console.error('Storage Upload Error:', uploadError);
        throw uploadError;
      }
      
      const { data } = supabase
        .storage
        .from('slider-images')
        .getPublicUrl(filePath);
      
      console.log('Public URL generated:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    console.log('Submitting Slider Form:', { isEditing, id, values });
    
    try {
      let imageUrl = values.image;
      
      if (imageFile) {
        try {
          imageUrl = await uploadImage();
        } catch (uploadErr: any) {
          toast({
            title: "Upload Failed",
            description: uploadErr.message || "Failed to upload image. Check storage permissions.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }
      
      if (!imageUrl) {
        toast({
          title: "Missing Image",
          description: "Please provide an image URL or upload a file.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const sliderData = {
        title: values.title,
        description: values.description,
        image: imageUrl,
        cta_text: values.cta_text,
        cta_link: values.cta_link,
        display_order: values.display_order,
        active: values.active,
      };
      
      if (isEditing && id) {
        console.log('Updating slider image:', id, sliderData);
        const { error } = await supabase
          .from('slider_images')
          .update(sliderData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Update Successful",
          description: "Slider details have been updated.",
        });
      } else {
        console.log('Creating new slider image:', sliderData);
        const { error } = await supabase
          .from('slider_images')
          .insert([sliderData]);
          
        if (error) throw error;
        
        toast({
          title: "Slide Created",
          description: "New slider image added successfully.",
        });
      }
      
      navigate('/admin/slider');
    } catch (err: any) {
      console.error('Supabase Operation Error:', err);
      toast({
        title: "Operation Failed",
        description: err.message || "An unexpected error occurred while saving.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title={isEditing ? "Edit Slider Image" : "Add Slider Image"}>
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Slide Title" {...field} />
                      </FormControl>
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
                          placeholder="Short description for this slide" 
                          className="resize-none h-24" 
                          {...field} 
                        />
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
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input 
                            placeholder="Image URL" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value) {
                                setImagePreview(e.target.value);
                                setImageFile(null);
                              }
                            }}
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Or upload:</span>
                            <Input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        {imageFile ? "Image will be uploaded when you submit the form" : "Recommended size: 1920x1080px"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                <div className="mb-4">
                  {imagePreview && (
                    <div className="rounded-lg overflow-hidden border">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="cta_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call to Action Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Learn More" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cta_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call to Action Link</FormLabel>
                      <FormControl>
                        <Input placeholder="/about" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="display_order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Active
                          </FormLabel>
                          <FormDescription>
                            Show this slide on the website
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/slider')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                  </div>
                ) : (
                  <span>{isEditing ? 'Update Slide' : 'Create Slide'}</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default SliderForm;
