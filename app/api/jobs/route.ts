import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../lib/auth'
import { getMockJobs, addMockJob } from '../../../lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const location = searchParams.get('location')
    const technology = searchParams.get('technology')
    const minSalary = searchParams.get('minSalary')
    const maxSalary = searchParams.get('maxSalary')
    const remote = searchParams.get('remote')
    const employmentType = searchParams.get('employmentType')
    const experienceLevel = searchParams.get('experienceLevel')

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here')

    if (!isSupabaseConfigured) {
      // Use mock data
      let jobs = getMockJobs().filter(job => job.status === 'approved')

      // Apply filters to mock data
      if (search) {
        const searchLower = search.toLowerCase()
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
        )
      }

      if (location && location !== 'remote') {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()))
      }

      if (remote === 'true') {
        jobs = jobs.filter(job => job.remote === true)
      }

      if (technology) {
        jobs = jobs.filter(job => job.technologies.includes(technology))
      }

      if (minSalary) {
        jobs = jobs.filter(job => job.salary_min && job.salary_min >= parseInt(minSalary))
      }

      if (maxSalary) {
        jobs = jobs.filter(job => job.salary_max && job.salary_max <= parseInt(maxSalary))
      }

      if (employmentType) {
        jobs = jobs.filter(job => job.employment_type === employmentType)
      }

      if (experienceLevel) {
        jobs = jobs.filter(job => job.experience_level === experienceLevel)
      }

      return NextResponse.json({ jobs })
    }

    // Use Supabase if configured
    try {
      const { supabase } = await import('../../../lib/supabase')
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      // Apply filters
      if (search) {
        query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`)
      }

      if (location && location !== 'remote') {
        query = query.ilike('location', `%${location}%`)
      }

      if (remote === 'true') {
        query = query.eq('remote', true)
      }

      if (technology) {
        query = query.contains('technologies', [technology])
      }

      if (minSalary) {
        query = query.gte('salary_min', parseInt(minSalary))
      }

      if (maxSalary) {
        query = query.lte('salary_max', parseInt(maxSalary))
      }

      if (employmentType) {
        query = query.eq('employment_type', employmentType)
      }

      if (experienceLevel) {
        query = query.eq('experience_level', experienceLevel)
      }

      const { data: jobs, error } = await query

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch jobs' },
          { status: 500 }
        )
      }

      return NextResponse.json({ jobs })
    } catch (supabaseError) {
      // Fallback to mock data if Supabase fails
      return NextResponse.json({ jobs: getMockJobs().filter(job => job.status === 'approved') })
    }

  } catch (error) {
    console.error('Jobs fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    let userId = null

    // Check if user is authenticated (optional for job posting)
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const payload = verifyToken(token)
      if (payload) {
        userId = payload.userId
      }
    }

    const jobData = await request.json()

    const {
      title,
      company,
      description,
      requirements,
      salaryMin,
      salaryMax,
      location,
      remote,
      technologies,
      employmentType,
      experienceLevel
    } = jobData

    if (!title || !company || !description || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes('your_supabase_url_here')

    if (!isSupabaseConfigured) {
      // Use mock data
      const job = addMockJob({
        title,
        company,
        description,
        requirements: requirements || '',
        salary_min: salaryMin,
        salary_max: salaryMax,
        location,
        remote: remote || false,
        technologies: technologies || [],
        employment_type: employmentType || 'full-time',
        experience_level: experienceLevel || 'mid',
        posted_by: userId,
        status: 'approved' // Auto-approve for demo
      })

      return NextResponse.json({ job })
    }

    // Use Supabase if configured
    try {
      const { supabase } = await import('../../../lib/supabase')
      const { data: job, error } = await supabase
        .from('jobs')
        .insert({
          title,
          company,
          description,
          requirements,
          salary_min: salaryMin,
          salary_max: salaryMax,
          location,
          remote: remote || false,
          technologies: technologies || [],
          employment_type: employmentType || 'full-time',
          experience_level: experienceLevel || 'mid',
          posted_by: userId,
          status: userId ? 'approved' : 'pending' // Auto-approve if posted by authenticated user
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to create job' },
          { status: 500 }
        )
      }

      return NextResponse.json({ job })
    } catch (supabaseError) {
      // Fallback to mock data if Supabase fails
      const job = addMockJob({
        title,
        company,
        description,
        requirements: requirements || '',
        salary_min: salaryMin,
        salary_max: salaryMax,
        location,
        remote: remote || false,
        technologies: technologies || [],
        employment_type: employmentType || 'full-time',
        experience_level: experienceLevel || 'mid',
        posted_by: userId,
        status: 'approved'
      })

      return NextResponse.json({ job })
    }

  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
