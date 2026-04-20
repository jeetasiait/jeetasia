
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SliderImage } from '@/types/slider';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminSlider = () => {
  const navigate = useNavigate();
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('slider_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSliderImages(data as SliderImage[] || []);
    } catch (error) {
      console.error('Error fetching slider images:', error);
      toast({
        title: "Error",
        description: "Failed to load slider images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('slider_images')
        .update({ active: !currentActive })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Slider image ${currentActive ? 'hidden' : 'activated'}`,
      });
      
      setSliderImages(prev => 
        prev.map(img => img.id === id ? { ...img, active: !currentActive } : img)
      );
    } catch (error) {
      console.error('Error updating slider image:', error);
      toast({
        title: "Error",
        description: "Failed to update slider image",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedImageId) return;
    
    try {
      const { error } = await supabase
        .from('slider_images')
        .delete()
        .eq('id', selectedImageId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Slider image deleted successfully",
      });
      
      setSliderImages(prev => prev.filter(img => img.id !== selectedImageId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting slider image:', error);
      toast({
        title: "Error",
        description: "Failed to delete slider image",
        variant: "destructive",
      });
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedImageId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Manage Slider Images">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Slider Images</h1>
          <p className="text-gray-600">Manage the homepage carousel slider images</p>
        </div>
        <Button onClick={() => navigate('/admin/slider/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add New Slide
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jeet-blue"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliderImages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No slider images found. Click "Add New Slide" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                sliderImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img 
                        src={image.image} 
                        alt={image.title} 
                        className="h-16 w-24 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{image.title}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{image.description}</div>
                    </TableCell>
                    <TableCell>{image.display_order}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        image.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {image.active ? 'Active' : 'Hidden'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleActive(image.id, image.active)}
                        >
                          {image.active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/admin/slider/edit/${image.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => openDeleteDialog(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slider image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSlider;
