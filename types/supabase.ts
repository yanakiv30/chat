// File: types/supabase.ts

export interface Database {
    public: {
      Tables: {
        users: {
          Row: {
            id: string
            username: string | null
            full_name: string | null
            created_at: string
            avatar: string | null
            status: string | null
            updated_at: string
            email: string
            password: string | null
            is_google_user: boolean | null
            is_verified: boolean | null
            verification_token: string | null
            role: string | null
          }
          Insert: {
            id?: string
            username?: string | null
            full_name?: string | null
            created_at?: string
            avatar?: string | null
            status?: string | null
            updated_at?: string
            email: string
            password?: string | null
            is_google_user?: boolean | null
            is_verified?: boolean | null
            verification_token?: string | null
            role?: string | null
          }
          Update: {
            id?: string
            username?: string | null
            full_name?: string | null
            created_at?: string
            avatar?: string | null
            status?: string | null
            updated_at?: string
            email?: string
            password?: string | null
            is_google_user?: boolean | null
            is_verified?: boolean | null
            verification_token?: string | null
            role?: string | null
          }
        }
        // Add other tables as needed
      }
    }
  }