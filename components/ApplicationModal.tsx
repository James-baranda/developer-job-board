'use client'

import { useState } from 'react'
import { X, Upload, Mail, User, FileText } from 'lucide-react'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobId: string
  jobTitle: string
  company: string
  onSubmit: (applicationData: any) => void
}

export default function ApplicationModal({ 
  isOpen, 
  onClose, 
  jobId, 
  jobTitle, 
  company, 
  onSubmit 
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    coverLetter: '',
    resumeUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId,
          ...formData
        })
      })

      const data = await response.json()

      if (response.ok) {
        onSubmit(data.application)
        onClose()
        setFormData({
          applicantName: '',
          applicantEmail: '',
          coverLetter: '',
          resumeUrl: ''
        })
      } else {
        setError(data.error || 'Failed to submit application')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
            <p className="text-gray-600 mt-1">{jobTitle} at {company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                required
                value={formData.applicantName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                required
                value={formData.applicantEmail}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Resume URL
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Link to your resume (Google Drive, LinkedIn, etc.)"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Provide a public link to your resume or portfolio
            </p>
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={6}
              value={formData.coverLetter}
              onChange={handleChange}
              className="input-field"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
