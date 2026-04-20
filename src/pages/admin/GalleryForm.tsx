import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Loader2, ImageIcon, Video } from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { GalleryItem } from '@/types/gallery';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

// Define form schema
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  type: z.enum(['image', 'video']),
  year: z.number().min(1900, { message: 'Please enter a valid year' }),
  src: z.string().min(5, { message: 'Source URL is required' }),
  thumbnail: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const GalleryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const isEditing = !!id;

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: 'projects',
      type: 'image',
      year: currentYear,
      src: '',
      thumbnail: '',
    },
  });

  const watchType = form.watch('type');

  // Fetch gallery item data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchGalleryItem = async () => {
        try {
          const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) throw error;
          if (data) {
            // Cast data to our GalleryItem type
            const galleryData = data as unknown as GalleryItem;
            
            form.reset({
              title: galleryData.title,
              category: galleryData.category,
              type: galleryData.type as 'image' | 'video',
              year: galleryData.year,
              src: galleryData.src,
              thumbnail: galleryData.thumbnail || '',
            });
          }
        } catch (error: any) {
          toast({
            title: "Error loading gallery item",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchGalleryItem();
    }
  }, [id, isEditing, form]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumb = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (isThumb) {
      setThumbnailUploading(true);
    } else {
      setFileUploading(true);
    }
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);
        
      if (isThumb) {
        form.setValue('thumbnail', urlData.publicUrl);
      } else {
        form.setValue('src', urlData.publicUrl);
      }
      toast({
        title: `${isThumb ? 'Thumbnail' : 'Image/Video'} uploaded`,
        description: "The file has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: `Error uploading ${isThumb ? 'thumbnail' : 'file'}`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      if (isThumb) {
        setThumbnailUploading(false);
      } else {
        setFileUploading(false);
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      const galleryData = {
        title: values.title,
        category: values.category,
        type: values.type,
        year: values.year,
        src: values.src,
        thumbnail: values.thumbnail || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('gallery')
          .update(galleryData)
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Gallery item updated",
          description: "The gallery item has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert(galleryData);
          
        if (error) throw error;
        
        toast({
          title: "Gallery item created",
          description: "The new gallery item has been created successfully.",
        });
      }
      
      navigate('/admin/gallery');
    } catch (error: any) {
      toast({
        title: `Error ${isEditing ? 'updating' : 'creating'} gallery item`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout title={isEditing ? "Edit Gallery Item" : "Add Gallery Item"}>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-jeet-blue" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? "Edit Gallery Item" : "Add Gallery Item"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="projects">Projects</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
                      <SelectItem value="image">
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          <span>Image</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          <span>Video</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="src"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{watchType === 'image' ? 'Image URL' : 'Video URL'}</FormLabel>
                <div className="space-y-3">
                  <FormControl>
                    <Input {...field} placeholder={watchType === 'image' ? 'Image URL' : 'Video URL'} />
                  </FormControl>
                  {watchType === 'image' && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Or upload a new image:</p>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                          disabled={fileUploading}
                        />
                        {fileUploading && (
                          <Loader2 className="h-4 w-4 animate-spin text-jeet-blue" />
                        )}
                      </div>
                    </div>
                  )}
                  {watchType === 'image' && field.value && (
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
          
          {watchType === 'video' && (
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Thumbnail</FormLabel>
                  <div className="space-y-3">
                    <FormControl>
                      <Input {...field} placeholder="Thumbnail URL" />
                    </FormControl>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Or upload a new thumbnail:</p>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, true)}
                          disabled={thumbnailUploading}
                        />
                        {thumbnailUploading && (
                          <Loader2 className="h-4 w-4 animate-spin text-jeet-blue" />
                        )}
                      </div>
                    </div>
                    {field.value && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">Thumbnail Preview:</p>
                        <img 
                          src={field.value} 
                          alt="Thumbnail Preview" 
                          className="h-32 w-auto object-cover rounded-md border" 
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin/gallery')}
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
                isEditing ? 'Update Gallery Item' : 'Create Gallery Item'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default GalleryForm;
