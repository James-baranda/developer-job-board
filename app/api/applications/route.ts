import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { jobId, applicantEmail, applicantName, coverLetter, resumeUrl } = await request.json()

    if (!jobId || !applicantEmail || !applicantName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if job exists and is approved
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id, title, company')
      .eq('id', jobId)
      .eq('status', 'approved')
      .single()

    if (jobError || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Check if user already applied
    const { data: existingApplication } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', jobId)
      .eq('applicant_email', applicantEmail)
      .single()

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied to this job' },
        { status: 400 }
      )
    }

    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        job_id: jobId,
        applicant_email: applicantEmail,
        applicant_name: applicantName,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      application,
      message: 'Application submitted successfully'
    })

  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    const applicantEmail = searchParams.get('applicantEmail')

    let query = supabase
      .from('applications')
      .select(`
        *,
        jobs:job_id (
          title,
          company,
          location
        )
      `)
      .order('created_at', { ascending: false })

    if (jobId) {
      query = query.eq('job_id', jobId)
    }

    if (applicantEmail) {
      query = query.eq('applicant_email', applicantEmail)
    }

    const { data: applications, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications })

  } catch (error) {
    console.error('Applications fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
