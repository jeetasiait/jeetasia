export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      careers: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          id: string
          location: string | null
          requirements: string | null
          salary: string | null
          status: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          location?: string | null
          requirements?: string | null
          salary?: string | null
          status?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          location?: string | null
          requirements?: string | null
          salary?: string | null
          status?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string
          created_at: string | null
          id: string
          src: string
          thumbnail: string | null
          title: string
          type: string
          year: number
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          src: string
          thumbnail?: string | null
          title: string
          type: string
          year: number
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          src?: string
          thumbnail?: string | null
          title?: string
          type?: string
          year?: number
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          "cover letter": string | null
          created_at: string | null
          email: string | null
          id: number
          "job title": string | null
          name: string
          phone: string | null
          resume_link: string | null
          "user id": string | null
        }
        Insert: {
          "cover letter"?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          "job title"?: string | null
          name: string
          phone?: string | null
          resume_link?: string | null
          "user id"?: string | null
        }
        Update: {
          "cover letter"?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          "job title"?: string | null
          name?: string
          phone?: string | null
          resume_link?: string | null
          "user id"?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          content: string
          id: string
          image_url: string | null
          published_at: string | null
          title: string
        }
        Insert: {
          author?: string | null
          content: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          title: string
        }
        Update: {
          author?: string | null
          content?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          title?: string
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          created_at: string | null
          description: string
          id: string
          keywords: string | null
          og_image: string | null
          page_path: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          keywords?: string | null
          og_image?: string | null
          page_path: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          keywords?: string | null
          og_image?: string | null
          page_path?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image: string | null
          location: string | null
          start_date: string | null
          status: string | null
          timeline: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image?: string | null
          location?: string | null
          start_date?: string | null
          status?: string | null
          timeline?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image?: string | null
          location?: string | null
          start_date?: string | null
          status?: string | null
          timeline?: string | null
          title?: string
        }
        Relationships: []
      }
      slider_images: {
        Row: {
          active: boolean
          created_at: string | null
          cta_link: string
          cta_text: string
          description: string
          display_order: number
          id: string
          image: string
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          cta_link: string
          cta_text: string
          description: string
          display_order: number
          id?: string
          image: string
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          cta_link?: string
          cta_text?: string
          description?: string
          display_order?: number
          id?: string
          image?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string | null
          designation: string
          id: number
          image: string | null
          linkedin: string | null
          name: string
        }
        Insert: {
          bio: string
          created_at?: string | null
          designation: string
          id?: number
          image?: string | null
          linkedin?: string | null
          name: string
        }
        Update: {
          bio?: string
          created_at?: string | null
          designation?: string
          id?: number
          image?: string | null
          linkedin?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
