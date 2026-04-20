import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, Check, X, Mail, Calendar, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
  status: string;
  notes: string | null;
}

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load contact messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // View message details
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setNotes(message.notes || '');
    setIsViewDialogOpen(true);
  };

  // Update message status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));

      toast({
        title: 'Status Updated',
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  // Save notes
  const handleSaveNotes = async () => {
    if (!selectedMessage) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ notes })
        .eq('id', selectedMessage.id);

      if (error) {
        throw error;
      }

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, notes } : msg
      ));

      toast({
        title: 'Notes Saved',
        description: 'Message notes have been updated',
      });

      setIsViewDialogOpen(false);
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive',
      });
    }
  };

  // Delete message
  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageToDelete);

      if (error) {
        throw error;
      }

      // Update local state
      setMessages(messages.filter(msg => msg.id !== messageToDelete));

      toast({
        title: 'Message Deleted',
        description: 'The message has been permanently deleted',
      });

      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  // Confirm delete
  const confirmDelete = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'read':
        return <Badge className="bg-blue-500">Read</Badge>;
      case 'replied':
        return <Badge className="bg-green-500">Replied</Badge>;
      case 'unread':
      default:
        return <Badge className="bg-yellow-500">Unread</Badge>;
    }
  };

  return (
    <AdminLayout title="Contact Messages">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Contact Messages</h2>
          <Button 
            variant="outline" 
            onClick={fetchMessages}
            disabled={loading}
          >
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No messages found</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(message.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMessage(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {message.status === 'unread' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateStatus(message.id, 'read')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        {message.status === 'read' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateStatus(message.id, 'replied')}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete(message.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* View Message Dialog */}
      {selectedMessage && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                Message from {selectedMessage.name} ({selectedMessage.email})
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(selectedMessage.created_at), 'MMMM dd, yyyy h:mm a')}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>
                  <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                  {selectedMessage.phone && ` • ${selectedMessage.phone}`}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mt-2">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Admin Notes</h4>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this message..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                {selectedMessage.status === 'unread' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateStatus(selectedMessage.id, 'read');
                      setSelectedMessage({...selectedMessage, status: 'read'});
                    }}
                  >
                    Mark as Read
                  </Button>
                ) : selectedMessage.status === 'read' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUpdateStatus(selectedMessage.id, 'replied');
                      setSelectedMessage({...selectedMessage, status: 'replied'});
                    }}
                  >
                    Mark as Replied
                  </Button>
                ) : null}
              </div>
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMessages;
