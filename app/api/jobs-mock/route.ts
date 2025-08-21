import { NextRequest, NextResponse } from 'next/server'
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
      posted_by: null,
      status: 'approved' // Auto-approve for demo
    })

    return NextResponse.json({ job })

  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
