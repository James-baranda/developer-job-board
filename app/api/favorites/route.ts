import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { jobId, userEmail } = await request.json()

    if (!jobId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorite_jobs')
      .select('id')
      .eq('job_id', jobId)
      .eq('user_email', userEmail)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Job already in favorites' },
        { status: 400 }
      )
    }

    // Add to favorites
    const { data: favorite, error } = await supabase
      .from('favorite_jobs')
      .insert({
        job_id: jobId,
        user_email: userEmail
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({ favorite })

  } catch (error) {
    console.error('Add favorite error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    const userEmail = searchParams.get('userEmail')

    if (!jobId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('favorite_jobs')
      .delete()
      .eq('job_id', jobId)
      .eq('user_email', userEmail)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Removed from favorites' })

  } catch (error) {
    console.error('Remove favorite error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get('userEmail')

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email required' },
        { status: 400 }
      )
    }

    const { data: favorites, error } = await supabase
      .from('favorite_jobs')
      .select(`
        *,
        jobs:job_id (
          id,
          title,
          company,
          description,
          location,
          remote,
          salary_min,
          salary_max,
          technologies,
          employment_type,
          experience_level,
          created_at
        )
      `)
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({ favorites })

  } catch (error) {
    console.error('Fetch favorites error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
