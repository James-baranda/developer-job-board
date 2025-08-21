import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, keywords, location, minSalary, maxSalary, remoteOnly } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if alert already exists for this email
    const { data: existing } = await supabase
      .from('email_alerts')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      // Update existing alert
      const { data: alert, error } = await supabase
        .from('email_alerts')
        .update({
          keywords: keywords || [],
          location,
          min_salary: minSalary,
          max_salary: maxSalary,
          remote_only: remoteOnly || false,
          active: true
        })
        .eq('email', email)
        .select()
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to update email alert' },
          { status: 500 }
        )
      }

      return NextResponse.json({ alert, message: 'Email alert updated successfully' })
    } else {
      // Create new alert
      const { data: alert, error } = await supabase
        .from('email_alerts')
        .insert({
          email,
          keywords: keywords || [],
          location,
          min_salary: minSalary,
          max_salary: maxSalary,
          remote_only: remoteOnly || false,
          active: true
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to create email alert' },
          { status: 500 }
        )
      }

      return NextResponse.json({ alert, message: 'Email alert created successfully' })
    }

  } catch (error) {
    console.error('Email alert creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      )
    }

    const { data: alert, error } = await supabase
      .from('email_alerts')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { error: 'Failed to fetch email alert' },
        { status: 500 }
      )
    }

    return NextResponse.json({ alert: alert || null })

  } catch (error) {
    console.error('Email alert fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('email_alerts')
      .update({ active: false })
      .eq('email', email)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to deactivate email alert' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Email alert deactivated successfully' })

  } catch (error) {
    console.error('Email alert deactivation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
