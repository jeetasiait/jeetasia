
export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string;
  image: string | null;
  linkedin?: string | null;
  created_at?: string | null;
}
