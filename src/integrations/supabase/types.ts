export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "cms_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          credentials: string | null
          expertise: string[] | null
          id: string
          linkedin_url: string | null
          name: string
          role: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          credentials?: string | null
          expertise?: string[] | null
          id?: string
          linkedin_url?: string | null
          name: string
          role?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          credentials?: string | null
          expertise?: string[] | null
          id?: string
          linkedin_url?: string | null
          name?: string
          role?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_study_tags: {
        Row: {
          case_study_id: string
          tag_id: string
        }
        Insert: {
          case_study_id: string
          tag_id: string
        }
        Update: {
          case_study_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_tags_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "cms_case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_study_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      cms_articles: {
        Row: {
          author_id: string | null
          body: Json
          canonical_url: string | null
          category_id: string | null
          city: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          faq: Json | null
          id: string
          og_image_url: string | null
          published_at: string | null
          reading_minutes: number | null
          region: string | null
          scheduled_for: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json
          canonical_url?: string | null
          category_id?: string | null
          city?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          faq?: Json | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          reading_minutes?: number | null
          region?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          canonical_url?: string | null
          category_id?: string | null
          city?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          faq?: Json | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          reading_minutes?: number | null
          region?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_case_studies: {
        Row: {
          author_id: string | null
          body: Json
          building_type: string | null
          canonical_url: string | null
          category_id: string | null
          city: string | null
          created_at: string
          faq: Json | null
          hero_image_url: string | null
          id: string
          metrics: Json | null
          og_image_url: string | null
          published_at: string | null
          region: string | null
          scheduled_for: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json
          building_type?: string | null
          canonical_url?: string | null
          category_id?: string | null
          city?: string | null
          created_at?: string
          faq?: Json | null
          hero_image_url?: string | null
          id?: string
          metrics?: Json | null
          og_image_url?: string | null
          published_at?: string | null
          region?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          building_type?: string | null
          canonical_url?: string | null
          category_id?: string | null
          city?: string | null
          created_at?: string
          faq?: Json | null
          hero_image_url?: string | null
          id?: string
          metrics?: Json | null
          og_image_url?: string | null
          published_at?: string | null
          region?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_case_studies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_case_studies_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          source_url: string | null
          topic: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone: string
          source_url?: string | null
          topic: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          source_url?: string | null
          topic?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      content_relationships: {
        Row: {
          created_at: string
          id: string
          relation: string
          sort_order: number
          source_slug: string
          source_type: string
          target_slug: string
          target_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          relation?: string
          sort_order?: number
          source_slug: string
          source_type: string
          target_slug: string
          target_type: string
        }
        Update: {
          created_at?: string
          id?: string
          relation?: string
          sort_order?: number
          source_slug?: string
          source_type?: string
          target_slug?: string
          target_type?: string
        }
        Relationships: []
      }
      heat_pump_leads: {
        Row: {
          area_m2: number
          building_type: string
          climate_zone: number
          created_at: string
          email: string
          estimated_price_max: number | null
          estimated_price_min: number | null
          floors: number
          heat_demand_kw: number
          heating_system: string
          id: string
          insulation: string
          name: string
          notes: string | null
          occupants: number
          phone: string
          recommended_power_kw: number
          recommended_series: string | null
          rodo_consent: boolean
          source_url: string | null
          status: string
          user_agent: string | null
        }
        Insert: {
          area_m2: number
          building_type: string
          climate_zone?: number
          created_at?: string
          email: string
          estimated_price_max?: number | null
          estimated_price_min?: number | null
          floors?: number
          heat_demand_kw: number
          heating_system: string
          id?: string
          insulation: string
          name: string
          notes?: string | null
          occupants?: number
          phone: string
          recommended_power_kw: number
          recommended_series?: string | null
          rodo_consent?: boolean
          source_url?: string | null
          status?: string
          user_agent?: string | null
        }
        Update: {
          area_m2?: number
          building_type?: string
          climate_zone?: number
          created_at?: string
          email?: string
          estimated_price_max?: number | null
          estimated_price_min?: number | null
          floors?: number
          heat_demand_kw?: number
          heating_system?: string
          id?: string
          insulation?: string
          name?: string
          notes?: string | null
          occupants?: number
          phone?: string
          recommended_power_kw?: number
          recommended_series?: string | null
          rodo_consent?: boolean
          source_url?: string | null
          status?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt: string | null
          caption: string | null
          created_at: string
          height: number | null
          id: string
          mime_type: string | null
          storage_path: string | null
          updated_at: string
          url: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          storage_path?: string | null
          updated_at?: string
          url: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          storage_path?: string | null
          updated_at?: string
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
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
      content_status: "draft" | "scheduled" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_status: ["draft", "scheduled", "published", "archived"],
    },
  },
} as const
