
export interface JobPosting {
  id: string | number;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  department: string;
  description: string;
  requirements: string[];
  posted: string;
}

export interface JobApplication {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  "job title": string | null;
  "cover letter": string | null;
  "resume URL"?: string | null;  // Keep for backward compatibility
  resume_link?: string | null;   // New field for Google Drive links
  created_at: string | null;
}
