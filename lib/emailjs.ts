import emailjs from 'emailjs-com'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!

export interface EmailData {
  to_email: string
  to_name: string
  subject: string
  message: string
  job_title?: string
  company_name?: string
  job_url?: string
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      emailData,
      USER_ID
    )
    
    return result.status === 200
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export const sendJobAlert = async (
  email: string,
  jobTitle: string,
  company: string,
  jobUrl: string
): Promise<boolean> => {
  const emailData: EmailData = {
    to_email: email,
    to_name: 'Job Seeker',
    subject: `New Job Alert: ${jobTitle} at ${company}`,
    message: `A new job matching your criteria has been posted:\n\n${jobTitle} at ${company}\n\nView details: ${jobUrl}`,
    job_title: jobTitle,
    company_name: company,
    job_url: jobUrl
  }

  return sendEmail(emailData)
}

export const sendApplicationConfirmation = async (
  email: string,
  name: string,
  jobTitle: string,
  company: string
): Promise<boolean> => {
  const emailData: EmailData = {
    to_email: email,
    to_name: name,
    subject: `Application Received: ${jobTitle} at ${company}`,
    message: `Dear ${name},\n\nWe have received your application for the ${jobTitle} position at ${company}.\n\nWe will review your application and get back to you soon.\n\nThank you for your interest!`
  }

  return sendEmail(emailData)
}
