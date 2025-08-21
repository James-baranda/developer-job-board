import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string
  salary_min?: number
  salary_max?: number
  location: string
  remote: boolean
  technologies: string[]
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience_level: 'entry' | 'mid' | 'senior' | 'lead'
  posted_by?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  company_name?: string
  role: 'company' | 'admin'
  created_at: string
}

export interface Application {
  id: string
  job_id: string
  applicant_email: string
  applicant_name: string
  cover_letter?: string
  resume_url?: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  created_at: string
}

export interface FavoriteJob {
  id: string
  user_email: string
  job_id: string
  created_at: string
}
