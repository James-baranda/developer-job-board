'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Search, MapPin, DollarSign, Clock, Heart, Filter } from 'lucide-react'

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

export default function JobsPage() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    technology: '',
    minSalary: '',
    maxSalary: '',
    remote: false,
    employmentType: '',
    experienceLevel: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const technologies = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'Ruby']
  const employmentTypes = ['full-time', 'part-time', 'contract', 'internship']
  const experienceLevels = ['entry', 'mid', 'senior', 'lead']

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user)
      })
      .catch(() => localStorage.removeItem('token'))
    }
    
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
          params.set(key, value.toString())
        }
      })

      const response = await fetch(`/api/jobs-mock?${params.toString()}`)
      const data = await response.json()
      
      if (data.jobs) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    fetchJobs()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, skills, or company"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button type="submit" className="btn-primary">
                Search
              </button>
            </div>

            {showFilters && (
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t">
                <select
                  value={filters.technology}
                  onChange={(e) => handleFilterChange('technology', e.target.value)}
                  className="input-field"
                >
                  <option value="">Any Technology</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>

                <select
                  value={filters.employmentType}
                  onChange={(e) => handleFilterChange('employmentType', e.target.value)}
                  className="input-field"
                >
                  <option value="">Any Type</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type.replace('-', ' ')}</option>
                  ))}
                </select>

                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="input-field"
                >
                  <option value="">Any Level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Min Salary"
                  value={filters.minSalary}
                  onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                  className="input-field"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={filters.remote}
                    onChange={(e) => handleFilterChange('remote', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="remote" className="text-sm text-gray-700">Remote only</label>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading...' : `${jobs.length} Jobs Found`}
          </h2>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="card hover:shadow-lg transition-shadow">
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
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {job.description}
              </p>

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
                <button className="btn-primary">
                  View Details
                </button>
                <button className="btn-secondary">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
