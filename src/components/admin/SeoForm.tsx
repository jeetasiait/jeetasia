
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface SeoData {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_image?: string;
}

const SeoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SeoData>({
    page_path: '',
    title: '',
    description: '',
    keywords: '',
    og_image: '',
  });

  useEffect(() => {
    // Check for path parameter in URL when adding a new entry
    if (!isEditMode) {
      const query = new URLSearchParams(location.search);
      const pathParam = query.get('path');
      if (pathParam) {
        setFormData(prev => ({
          ...prev,
          page_path: pathParam
        }));
      }
    }
  }, [location, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      fetchSeoData();
    }
  }, [id]);

  const fetchSeoData = async () => {
    try {
      setIsLoading(true);
      // Access the page_seo table directly without typing it first
      const { data, error } = await supabase
        .from('page_seo')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          id: data.id,
          page_path: data.page_path || '',
          title: data.title || '',
          description: data.description || '',
          keywords: data.keywords || '',
          og_image: data.og_image || '',
        });
      }
    } catch (error: any) {
      toast({
        title: "Error fetching SEO data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.page_path.trim()) {
      toast({
        title: "Validation Error",
        description: "Page path is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Description is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      
      if (isEditMode) {
        // Update existing entry
        const { error } = await supabase
          .from('page_seo')
          .update({
            page_path: formData.page_path,
            title: formData.title,
            description: formData.description,
            keywords: formData.keywords,
            og_image: formData.og_image,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "SEO data updated successfully",
        });
      } else {
        // Insert new entry
        const { error } = await supabase
          .from('page_seo')
          .insert({
            page_path: formData.page_path,
            title: formData.title,
            description: formData.description,
            keywords: formData.keywords,
            og_image: formData.og_image
          });
          
        if (error) throw error;
        
        toast({
          title: "Success", 
          description: "SEO data added successfully",
        });
      }
      
      navigate('/admin/seo');
    } catch (error: any) {
      toast({
        title: "Error saving SEO data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="page_path">Page Path</Label>
              <Input
                id="page_path"
                name="page_path"
                placeholder="/about or /projects"
                value={formData.page_path}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the page path without domain (e.g., /about, /careers)
              </p>
            </div>
            
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="JEET Asia - About Us"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter a brief description (150-160 characters recommended)"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Characters: {formData.description.length}/160
              </p>
            </div>
            
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="construction, infrastructure, roads"
                value={formData.keywords}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Comma separated keywords
              </p>
            </div>
            
            <div>
              <Label htmlFor="og_image">Open Graph Image URL</Label>
              <Input
                id="og_image"
                name="og_image"
                placeholder="https://example.com/image.jpg"
                value={formData.og_image || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/seo')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isEditMode ? 'Update' : 'Save'} SEO Data
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SeoForm;
