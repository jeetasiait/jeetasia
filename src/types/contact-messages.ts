export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  created_at?: string;
  status?: string;
  notes?: string | null;
}
