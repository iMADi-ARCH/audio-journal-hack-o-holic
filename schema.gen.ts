export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chapters: {
        Row: {
          created_at: string
          desc: string | null
          id: number
          thumbnail: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          desc?: string | null
          id?: number
          thumbnail?: string | null
          title?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          desc?: string | null
          id?: number
          thumbnail?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      friend_requests: {
        Row: {
          created_at: string
          friend_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_requests_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      friends: {
        Row: {
          created_at: string
          friend_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friends_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          msg: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          msg: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          msg?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          dob: string | null
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          dob?: string | null
          email: string
          full_name?: string | null
          id?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_friend_requests:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
              request_id: string
              user_id: string
              friend_id: string
              sender_email: string
              sender_full_name: string
            }[]
          }
        | {
            Args: {
              user_id_param: string
            }
            Returns: {
              request_id: string
              user_id: string
              friend_id: string
              sender_username: string
            }[]
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
