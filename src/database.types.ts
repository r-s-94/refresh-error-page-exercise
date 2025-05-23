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
      Clients: {
        Row: {
          address: string
          age: number
          firstName: string
          id: number
          lastName: string
          mail: string
        }
        Insert: {
          address: string
          age: number
          firstName: string
          id?: number
          lastName: string
          mail: string
        }
        Update: {
          address?: string
          age?: number
          firstName?: string
          id?: number
          lastName?: string
          mail?: string
        }
        Relationships: []
      }
      Companyreport: {
        Row: {
          id: number
          salesVolume: number | null
        }
        Insert: {
          id?: number
          salesVolume?: number | null
        }
        Update: {
          id?: number
          salesVolume?: number | null
        }
        Relationships: []
      }
      "Demo-Tabelle": {
        Row: {
          Text: string
        }
        Insert: {
          Text?: string
        }
        Update: {
          Text?: string
        }
        Relationships: []
      }
      "Demo-Tabelle 2": {
        Row: {
          id: number
          Text: string
        }
        Insert: {
          id: number
          Text: string
        }
        Update: {
          id?: number
          Text?: string
        }
        Relationships: []
      }
      Employees: {
        Row: {
          age: number
          firstName: string
          id: number
          lastName: string
          note: string
        }
        Insert: {
          age: number
          firstName: string
          id?: number
          lastName: string
          note: string
        }
        Update: {
          age?: number
          firstName?: string
          id?: number
          lastName?: string
          note?: string
        }
        Relationships: []
      }
      "Example-Img-Table": {
        Row: {
          id: number
          Img: string
        }
        Insert: {
          id?: number
          Img: string
        }
        Update: {
          id?: number
          Img?: string
        }
        Relationships: []
      }
      Exampletable: {
        Row: {
          id: number
          Text: string
        }
        Insert: {
          id?: number
          Text: string
        }
        Update: {
          id?: number
          Text?: string
        }
        Relationships: []
      }
      Orders: {
        Row: {
          business: boolean
          clients_id: number
          employee_id: number
          id: number
          note: string | null
          orderDay: string
          paymentMethod: string
          paymentStatus: string
          quantity: number
          service: string
          serviceValue: number
        }
        Insert: {
          business: boolean
          clients_id: number
          employee_id: number
          id?: number
          note?: string | null
          orderDay: string
          paymentMethod: string
          paymentStatus?: string
          quantity: number
          service?: string
          serviceValue: number
        }
        Update: {
          business?: boolean
          clients_id?: number
          employee_id?: number
          id?: number
          note?: string | null
          orderDay?: string
          paymentMethod?: string
          paymentStatus?: string
          quantity?: number
          service?: string
          serviceValue?: number
        }
        Relationships: [
          {
            foreignKeyName: "Orders_clients_id_fkey"
            columns: ["clients_id"]
            isOneToOne: false
            referencedRelation: "Clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "Employees"
            referencedColumns: ["id"]
          },
        ]
      }
      "Social-Media-Post-Table": {
        Row: {
          Date: string | null
          id: number
          Post: string | null
          UserId: string
          UserProfilname: string | null
        }
        Insert: {
          Date?: string | null
          id?: number
          Post?: string | null
          UserId: string
          UserProfilname?: string | null
        }
        Update: {
          Date?: string | null
          id?: number
          Post?: string | null
          UserId?: string
          UserProfilname?: string | null
        }
        Relationships: []
      }
      "Social-Media-User-Table": {
        Row: {
          id: number
          UserId: string
          UserProfilname: string | null
        }
        Insert: {
          id?: number
          UserId: string
          UserProfilname?: string | null
        }
        Update: {
          id?: number
          UserId?: string
          UserProfilname?: string | null
        }
        Relationships: []
      }
      "SupaBase-Session": {
        Row: {
          id: number
          Session: string
        }
        Insert: {
          id?: number
          Session: string
        }
        Update: {
          id?: number
          Session?: string
        }
        Relationships: []
      }
      user_permission: {
        Row: {
          id: number
          order_authorized: boolean | null
          user_id: string | null
        }
        Insert: {
          id?: number
          order_authorized?: boolean | null
          user_id?: string | null
        }
        Update: {
          id?: number
          order_authorized?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      "User-Tabelle": {
        Row: {
          Age: number | null
          FirstName: string
          id: number
          LastName: string | null
        }
        Insert: {
          Age?: number | null
          FirstName: string
          id: number
          LastName?: string | null
        }
        Update: {
          Age?: number | null
          FirstName?: string
          id?: number
          LastName?: string | null
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
