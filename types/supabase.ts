

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
            is_provider_user: boolean | null
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
            is_provider_user?: boolean | null
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
            is_provider_user?: boolean | null
            is_verified?: boolean | null
            verification_token?: string | null
            role?: string | null
          }
        }
        teams: {
          Row: {
            id: string
            name: string
            avatar: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            name: string
            avatar?: string | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            name?: string
            avatar?: string | null
            created_at?: string
            updated_at?: string
          }
        }
        teams_members: {
          Row: {
            id: string
            created_at: string
            'updated-at': string
            role: string
            team_id: string
            user_id: string
          }
          Insert: {
            id?: string
            created_at?: string
            'updated-at'?: string
            role: string
            team_id: string
            user_id: string
          }
          Update: {
            id?: string
            created_at?: string
            'updated-at'?: string
            role?: string
            team_id?: string
            user_id?: string
          }
        }
        messages: {
          Row: {
            id: string
            team_id: string
            sender_id: string
            message: string
            type: string
            created_at: string
            updated_at: string
            image_path: string | null
          }
          Insert: {
            id?: string
            team_id: string
            sender_id: string
            message: string
            type: string
            created_at?: string
            updated_at?: string
            image_path?: string | null
          }
          Update: {
            id?: string
            team_id?: string
            sender_id?: string
            message?: string
            type?: string
            created_at?: string
            updated_at?: string
            image_path?: string | null
          }
        }
        password_reset_tokens: {
          Row: {
            id: string
            user_id: string
            token: string
            expires_at: string
            created_at: string
          }
          Insert: {
            id?: string
            user_id: string
            token: string
            expires_at: string
            created_at?: string
          }
          Update: {
            id?: string
            user_id?: string
            token?: string
            expires_at?: string
            created_at?: string
          }
        }
      }
    }
  }