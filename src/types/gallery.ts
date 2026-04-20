
export interface GalleryItem {
  id: string;
  category: string;
  type: string;
  title: string;
  src: string;
  thumbnail?: string | null;
  year: number;
  created_at?: string | null;
}
