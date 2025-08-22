import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'student' | 'teacher'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  full_name?: string
  avatar_url?: string
}

// Mock user profiles for demo
export const mockUserProfiles: Record<string, UserProfile> = {
  'student@demo.com': {
    id: 'student-1',
    email: 'student@demo.com',
    role: 'student',
    full_name: 'Alex Johnson',
  },
  'teacher@demo.com': {
    id: 'teacher-1',
    email: 'teacher@demo.com',
    role: 'teacher',
    full_name: 'Dr. Sarah Wilson',
  }
}

export const getUserProfile = (email: string): UserProfile | null => {
  return mockUserProfiles[email] || null
}