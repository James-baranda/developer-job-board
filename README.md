# Developer Job Board

A full-stack job board application built with Next.js, featuring authentication, job posting, filtering, and application tracking.

## Features

- **Job Posting**: Companies can post jobs with detailed descriptions, requirements, and salary information
- **Authentication**: JWT-based authentication for company accounts
- **Job Filtering**: Filter jobs by technology, location, salary, employment type, and experience level
- **Application System**: Apply to jobs with cover letters and resume links
- **Favorites**: Save jobs for later viewing
- **Email Alerts**: Get notified about new jobs matching your criteria
- **Dashboard**: Company dashboard to manage posted jobs and view applications
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT with bcryptjs
- **Email**: EmailJS for notifications
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- EmailJS account (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd developer-job-board
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# JWT Secret (generate a random string)
JWT_SECRET=your_jwt_secret_here

# EmailJS Configuration (optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
```

4. Set up the database:
- Create a new Supabase project
- Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
- Update the environment variables with your Supabase credentials

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application uses the following main tables:

- **users**: Company accounts with authentication
- **jobs**: Job listings with all details and status
- **applications**: Job applications from candidates
- **favorite_jobs**: Saved jobs by users
- **email_alerts**: Email notification preferences

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new company account
- `POST /api/auth/login` - Login to existing account
- `GET /api/auth/verify` - Verify JWT token

### Jobs
- `GET /api/jobs` - Get all approved jobs with filtering
- `POST /api/jobs` - Create new job posting
- `GET /api/jobs/[id]` - Get specific job details
- `PUT /api/jobs/[id]` - Update job (owner only)
- `DELETE /api/jobs/[id]` - Delete job (owner only)
- `GET /api/jobs/my-jobs` - Get jobs posted by authenticated user

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get applications (with filters)

### Favorites
- `POST /api/favorites` - Add job to favorites
- `DELETE /api/favorites` - Remove job from favorites
- `GET /api/favorites` - Get user's favorite jobs

### Email Alerts
- `POST /api/email-alerts` - Create/update email alert
- `GET /api/email-alerts` - Get user's email alert settings
- `DELETE /api/email-alerts` - Deactivate email alerts

## Features in Detail

### Job Posting
- Companies can post jobs without requiring approval (if authenticated)
- Anonymous job posting requires admin approval
- Rich job descriptions with technology tags
- Salary ranges and employment type specification

### Advanced Filtering
- Search by job title, company, or description
- Filter by location or remote work
- Technology stack filtering
- Salary range filtering
- Employment type and experience level filters

### Application System
- Simple application form with cover letter
- Resume URL submission
- Application status tracking
- Email confirmations

### Company Dashboard
- View all posted jobs
- Edit and delete job postings
- Track application statistics
- Job performance metrics

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `JWT_SECRET`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` (optional)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` (optional)
- `NEXT_PUBLIC_EMAILJS_USER_ID` (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.
