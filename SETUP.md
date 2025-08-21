# Developer Job Board - Setup Guide

## Quick Start

### 1. Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to the SQL Editor and run the schema from `database/schema.sql`
4. Go to Settings > API to get your project URL and anon key

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Required - JWT Secret (generate a random 32+ character string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Optional - EmailJS Configuration (for email alerts)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features Overview

### 🏢 **For Companies**
- Register company account
- Post jobs (auto-approved for authenticated users)
- Manage job listings from dashboard
- View application statistics

### 👨‍💻 **For Job Seekers**
- Browse jobs with advanced filtering
- Apply to jobs with cover letter
- Save favorite jobs
- Set up email alerts for new matching jobs

### 🔍 **Job Filtering**
- Search by title, company, description
- Filter by location or remote work
- Technology stack filtering
- Salary range filtering
- Employment type and experience level

## Email Alerts Setup (Optional)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}`
   - `{{to_name}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{job_title}}`
   - `{{company_name}}`
   - `{{job_url}}`
4. Add your service ID, template ID, and user ID to `.env.local`

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
   - EmailJS variables (optional)
4. Deploy!

## Database Schema

The application uses these main tables:
- `users` - Company accounts
- `jobs` - Job listings
- `applications` - Job applications
- `favorite_jobs` - Saved jobs
- `email_alerts` - Email notification preferences

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register company
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Jobs
- `GET /api/jobs` - Get jobs with filtering
- `POST /api/jobs` - Create job
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job
- `GET /api/jobs/my-jobs` - Get user's jobs

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get applications

### Other
- `POST /api/favorites` - Add/remove favorites
- `POST /api/email-alerts` - Manage email alerts

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check Supabase URL and key in `.env.local`
   - Ensure database schema is properly set up

2. **JWT errors**
   - Make sure `JWT_SECRET` is set and long enough
   - Clear browser localStorage if needed

3. **Email alerts not working**
   - Check EmailJS configuration
   - Verify template variables match

### Development Tips

- Use browser dev tools to check API responses
- Check Supabase dashboard for database queries
- Monitor console for JavaScript errors
- Use `npm run build` to test production build

## Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure database schema matches the provided SQL
4. Check API responses in browser dev tools
