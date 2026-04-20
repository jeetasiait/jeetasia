import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, LinkIcon, Globe, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useParams, useNavigate } from 'react-router-dom';
import FormLayout from './FormLayout';
import { cn } from '@/lib/utils';

// Database row type (matches your Supabase table)
interface SEORow {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string; // Stored as comma-separated string in DB
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
}

// Form data type (for our form state)
interface SEOFormData {
  page_path: string;
  title: string;
  description: string;
  keywords: string[]; // In form, we handle as array for better UX
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
}

interface SEOManagementProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Helper function to convert DB row to form data
const seoRowToFormData = (item: SEORow): SEOFormData => ({
  page_path: item.page_path || '',
  title: item.title || '',
  description: item.description || '',
  keywords: item.keywords ? item.keywords.split(',').map(k => k.trim()) : [],
  og_title: item.og_title || '',
  og_description: item.og_description || '',
  og_image: item.og_image || '',
  canonical_url: item.canonical_url || ''
});

// Helper function to convert form data to DB row
const formDataToSeoRow = (data: SEOFormData, isNew: boolean = false): Omit<SEORow, 'id' | 'created_at' | 'updated_at'> & { updated_at: string; created_at?: string } => {
  const row: Omit<SEORow, 'id' | 'created_at' | 'updated_at'> & { updated_at: string; created_at?: string } = {
    page_path: data.page_path,
    title: data.title,
    description: data.description,
    keywords: Array.isArray(data.keywords) ? data.keywords.join(',') : data.keywords,
    og_title: data.og_title || null,
    og_description: data.og_description || null,
    og_image: data.og_image || null,
    canonical_url: data.canonical_url || null,
    updated_at: new Date().toISOString()
  };
  
  if (isNew) {
    row.created_at = new Date().toISOString();
  }
  
  return row;
};

const SEOManagement: React.FC<SEOManagementProps> = ({ onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: routeId } = useParams<{ id: string }>();
  
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [seoData, setSeoData] = useState<SEORow[]>([]);
  const [formData, setFormData] = useState<SEOFormData>({
    page_path: '',
    title: '',
    description: '',
    keywords: [],
    og_title: '',
    og_description: '',
    og_image: '',
    canonical_url: ''
  });

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData({
      page_path: '',
      title: '',
      description: '',
      keywords: [],
      og_title: '',
      og_description: '',
      og_image: '',
      canonical_url: ''
    });
    setEditingId(null);
    setIsAdding(false);
  }, []);

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle keywords array changes
  const handleKeywordsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k);
    setFormData(prev => ({
      ...prev,
      keywords
    }));
  }, []);

  // Fetch SEO data
  const fetchSEODATA = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_seo')
        .select('*')
        .order('page_path');
        
      if (error) throw error;
      
      setSeoData(
        (data || []).map((item: any) => ({
          id: item.id,
          page_path: item.page_path,
          title: item.title,
          description: item.description,
          keywords: item.keywords,
          og_title: item.og_title,
          og_description: item.og_description,
          og_image: item.og_image,
          canonical_url: item.canonical_url,
          created_at: item.created_at,
          updated_at: item.updated_at
        }))
      );
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load SEO data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.page_path || !formData.title || !formData.description) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const rowData = formDataToSeoRow(formData, !editingId);
      
      if (editingId) {
        // Update existing record
        const { error } = await supabase
          .from('page_seo')
          .update(rowData)
          .eq('id', editingId);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'SEO data updated successfully',
        });
      } else {
        // Insert new record
        const { error } = await supabase
          .from('page_seo')
          .insert([rowData]);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'SEO data added successfully',
        });
      }
      
      // Refresh data and reset form
      await fetchSEODATA();
      resetForm();
      setShowForm(false);
      
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast({
        title: 'Error',
        description: 'Failed to save SEO data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [formData, editingId, resetForm, onSuccess, toast, fetchSEODATA]);
  
  // Handle edit action
  const handleEdit = useCallback((item: SEORow) => {
    setFormData(seoRowToFormData(item));
    setEditingId(item.id);
    setIsAdding(false);
    setShowForm(true);
    
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  // Handle delete action
  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this SEO entry?')) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('page_seo')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'SEO data deleted successfully',
      });
      
      await fetchSEODATA();
      
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete SEO data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [fetchSEODATA, toast]);

  // Handle cancel button click
  const handleCancel = useCallback(() => {
    setShowForm(false);
    resetForm();
    
    // If we're in edit mode from URL, navigate back to the list
    if (routeId) {
      navigate('/admin/seo');
    }
    
    if (onCancel) {
      onCancel();
    }
  }, [onCancel, resetForm, routeId, navigate]);

  // Memoize the form visibility to prevent unnecessary re-renders
  const shouldShowForm = useMemo(() => showForm || isAdding || !!editingId, [showForm, isAdding, editingId]);

  // Handle route ID changes
  useEffect(() => {
    if (routeId) {
      setEditingId(routeId);
      setIsAdding(false);
      fetchSEODATA();
      setShowForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [routeId, fetchSEODATA]);

  // Initial data fetch
  useEffect(() => {
    fetchSEODATA();
  }, [fetchSEODATA]);
  
  // Handle add new entry
  const handleAddNew = useCallback(() => {
    resetForm();
    setIsAdding(true);
    setEditingId(null);
    setShowForm(true);
    
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [resetForm]);

  if (loading && seoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SEO Management</h1>
        {!shouldShowForm && (
          <Button onClick={handleAddNew} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            Add New SEO Entry
          </Button>
        )}
      </div>

      {/* Back button in form view */}
      {shouldShowForm && !isAdding && (
        <Button 
          variant="ghost" 
          onClick={handleCancel}
          className="mb-4"
        >
          &larr; Back to List
        </Button>
      )}

      {/* Add/Edit Form */}
      {shouldShowForm && (
        <FormLayout
          title={editingId ? 'Edit SEO Entry' : 'Add New SEO Entry'}
          description={editingId ? 'Update the SEO metadata for this page' : 'Add SEO metadata for a new page'}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={loading}
          isEdit={!!editingId}
        >
          <div className="space-y-8">
            {/* Basic SEO Fields */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic SEO Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    Page Path
                  </label>
                  <div className="relative">
                    <Input
                      name="page_path"
                      value={formData.page_path}
                      onChange={handleChange}
                      placeholder="/about or /products/item-1"
                      className="pl-8 font-mono text-sm"
                      required
                    />
                    <span className="absolute left-3 top-2.5 text-muted-foreground">/</span>
                  </div>
                  <p className="text-xs text-muted-foreground">The URL path for this page</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Meta Title
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Page Title"
                    className="text-sm"
                    required
                  />
                  <p className={cn(
                    "text-xs", 
                    formData.title.length > 60 ? "text-red-500" : "text-muted-foreground"
                  )}>
                    {formData.title.length}/60 characters recommended
                  </p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none">
                    Meta Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Page Description"
                    className="resize-none h-20 text-sm"
                    required
                  />
                  <p className={cn(
                    "text-xs", 
                    formData.description.length > 160 ? "text-red-500" : "text-muted-foreground"
                  )}>
                    {formData.description.length}/160 characters recommended
                  </p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none">
                    Keywords
                  </label>
                  <Input
                    name="keywords"
                    value={formData.keywords.join(', ')}
                    onChange={handleKeywordsChange}
                    placeholder="keyword1, keyword2, ..."
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords
                  </p>
                </div>
              </div>
            </div>
            
            {/* Open Graph Fields */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                Open Graph Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    OG Title
                  </label>
                  <Input
                    name="og_title"
                    value={formData.og_title}
                    onChange={handleChange}
                    placeholder="Open Graph Title"
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use meta title
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    OG Image URL
                  </label>
                  <Input
                    name="og_image"
                    value={formData.og_image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none">
                    OG Description
                  </label>
                  <Textarea
                    name="og_description"
                    value={formData.og_description}
                    onChange={handleChange}
                    placeholder="Open Graph Description"
                    className="resize-none h-20 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use meta description
                  </p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium leading-none">
                    Canonical URL
                  </label>
                  <Input
                    name="canonical_url"
                    value={formData.canonical_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </FormLayout>
      )}

      {/* SEO Entries Table - Only show in list view */}
      {!shouldShowForm && (
        <div className="mt-8">
          <Card className="border shadow-sm">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle>SEO Entries</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search entries..." 
                    className="pl-10 h-9 w-full focus-visible:ring-1 text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b">  
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-1/4">Page Path</TableHead>
                        <TableHead className="w-1/4">Title</TableHead>
                        <TableHead className="w-1/3">Description</TableHead>
                        <TableHead className="w-1/6">Keywords</TableHead>
                        <TableHead className="w-24 text-right pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {seoData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Search className="h-8 w-8 text-muted-foreground/50" />
                              <p>No SEO entries found</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleAddNew}
                                className="mt-2"
                              >
                                Add your first entry
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        seoData.map(item => (
                          <TableRow key={item.id} className="h-16">
                            <TableCell>
                              <div className="font-medium">{item.page_path}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium max-w-[200px] truncate" title={item.title}>{item.title}</div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[250px] truncate text-muted-foreground" title={item.description}>
                                {item.description}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[150px] truncate text-muted-foreground" title={item.keywords}>
                                {item.keywords}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)} disabled={loading}>
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDelete(item.id)} disabled={loading}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{seoData.length}</span> entries
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SEOManagement;
