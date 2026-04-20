
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import SEOManagement from '@/components/admin/SEOManagement';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Edit, Trash2, MoreHorizontal, Plus, RefreshCcw } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SeoEntry {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_image?: string;
  created_at: string;
  updated_at: string;
}

// Main SEO List Component
const SeoList = ({ onAddNew }: { onAddNew: () => void }) => {
  const [seoEntries, setSeoEntries] = useState<SeoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSeoEntries();
  }, []);

  const fetchSeoEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_seo')
        .select('*')
        .order('page_path');

      if (error) throw error;
      setSeoEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching SEO data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('page_seo')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "SEO entry deleted successfully",
      });
      
      // Refresh the list
      fetchSeoEntries();
    } catch (error: any) {
      toast({
        title: "Error deleting SEO entry",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Management</h2>
          <p className="text-muted-foreground">
            Manage SEO metadata for your website pages
          </p>
        </div>
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add SEO Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SEO Entries</CardTitle>
          <CardDescription>
            Manage SEO metadata for all pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Path</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="hidden md:table-cell">Keywords</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Loading SEO entries...
                    </TableCell>
                  </TableRow>
                ) : seoEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No SEO entries found. Add your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  seoEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.page_path}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{entry.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {entry.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        {entry.keywords || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/admin/seo/edit/${entry.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this SEO entry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Main AdminSeo Component
const AdminSeo = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  // Handle navigation
  useEffect(() => {
    if (window.location.pathname.includes('/add')) {
      setMode('add');
    } else if (window.location.pathname.includes('/edit/')) {
      setMode('edit');
      setSelectedId(id);
    } else {
      setMode('list');
    }
  }, [id]);

  const handleAddNew = () => {
    navigate('/admin/seo/add');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/seo/edit/${id}`);
  };

  const handleSuccess = () => {
    navigate('/admin/seo');
  };

  const handleCancel = () => {
    navigate('/admin/seo');
  };

  return (
    <AdminLayout title="SEO Management">
      {mode === 'list' ? (
        <SeoList onAddNew={handleAddNew} />
      ) : (
        <SEOManagement 
          id={selectedId} 
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      )}
    </AdminLayout>
  );
};

export default AdminSeo;
