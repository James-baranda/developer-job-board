'use client'

import { useState } from 'react'
import { MapPin, DollarSign, Clock, Heart, ExternalLink } from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  description: string
  location: string
  remote: boolean
  salary_min?: number
  salary_max?: number
  technologies: string[]
  employment_type: string
  experience_level: string
  created_at: string
}

interface JobCardProps {
  job: Job
  onApply?: (jobId: string) => void
  onFavorite?: (jobId: string) => void
  isFavorited?: boolean
  showFullDescription?: boolean
}

export default function JobCard({ 
  job, 
  onApply, 
  onFavorite, 
  isFavorited = false,
  showFullDescription = false 
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(showFullDescription)

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified'
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `From $${min.toLocaleString()}`
    if (max) return `Up to $${max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-lg text-primary-600 font-medium mb-2">
            {job.company}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
              {job.remote && <span className="ml-1 text-green-600">(Remote)</span>}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {formatSalary(job.salary_min, job.salary_max)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(job.created_at)}
            </div>
          </div>
        </div>
        {onFavorite && (
          <button 
            onClick={() => onFavorite(job.id)}
            className={`transition-colors ${
              isFavorited 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-700">
          {isExpanded ? job.description : truncateDescription(job.description)}
        </p>
        {job.description.length > 200 && !showFullDescription && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700 text-sm mt-2"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {job.employment_type.replace('-', ' ')}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {job.experience_level} level
        </span>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
          className="btn-secondary flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View Details
        </button>
        {onApply && (
          <button 
            onClick={() => onApply(job.id)}
            className="btn-primary"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}
