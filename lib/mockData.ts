// Mock data storage for development/demo purposes
// This allows the job board to work without Supabase setup

export interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string
  salary_min?: number
  salary_max?: number
  location: string
  remote: boolean
  technologies: string[]
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience_level: 'entry' | 'mid' | 'senior' | 'lead'
  posted_by?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

// In-memory storage for demo
let mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies. This role offers the opportunity to work on exciting projects with a collaborative team in a fast-paced environment.\n\nKey Responsibilities:\n• Develop and maintain scalable web applications\n• Collaborate with cross-functional teams to define and implement new features\n• Write clean, maintainable, and efficient code\n• Participate in code reviews and technical discussions\n• Optimize applications for maximum speed and scalability\n• Stay up-to-date with emerging technologies and industry trends',
    requirements: 'Requirements:\n• 5+ years of experience in full-stack development\n• Strong proficiency in JavaScript, TypeScript, and React\n• Experience with Node.js and Express.js\n• Solid understanding of PostgreSQL or similar databases\n• Familiarity with cloud platforms (AWS, Azure, or GCP)\n• Experience with version control systems (Git)\n• Strong problem-solving skills and attention to detail\n• Excellent communication and teamwork abilities\n\nPreferred Qualifications:\n• Experience with Next.js and modern React patterns\n• Knowledge of containerization (Docker, Kubernetes)\n• Understanding of CI/CD pipelines\n• Experience with testing frameworks (Jest, Cypress)\n• Bachelor\'s degree in Computer Science or related field',
    salary_min: 90000,
    salary_max: 130000,
    location: 'San Francisco, CA',
    remote: true,
    technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Next.js'],
    employment_type: 'full-time',
    experience_level: 'senior',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Frontend React Developer',
    company: 'StartupXYZ',
    description: 'Join our innovative startup as a Frontend Developer! We\'re building the next generation of productivity tools and need a talented React developer to help bring our vision to life. You\'ll work directly with our design team to create beautiful, intuitive user interfaces.\n\nWhat You\'ll Do:\n• Build responsive web applications using React and modern JavaScript\n• Collaborate with designers to implement pixel-perfect UI components\n• Optimize applications for performance and user experience\n• Write comprehensive tests for your code\n• Participate in agile development processes\n• Contribute to our design system and component library',
    requirements: 'What We\'re Looking For:\n• 3+ years of experience with React and JavaScript\n• Strong understanding of HTML5, CSS3, and responsive design\n• Experience with state management libraries (Redux, Zustand, or similar)\n• Familiarity with modern build tools (Webpack, Vite, etc.)\n• Knowledge of testing frameworks (Jest, React Testing Library)\n• Experience with version control (Git) and collaborative development\n• Strong eye for design and user experience\n• Self-motivated and able to work in a fast-paced startup environment\n\nNice to Have:\n• Experience with TypeScript\n• Knowledge of Next.js or similar frameworks\n• Understanding of accessibility best practices\n• Experience with design tools (Figma, Sketch)',
    salary_min: 70000,
    salary_max: 95000,
    location: 'Austin, TX',
    remote: false,
    technologies: ['React', 'JavaScript', 'TypeScript', 'CSS3', 'HTML5', 'Redux'],
    employment_type: 'full-time',
    experience_level: 'mid',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Junior Python Developer',
    company: 'DataFlow Analytics',
    description: 'Are you passionate about data and Python development? Join our team as a Junior Python Developer and help us build cutting-edge data analytics solutions. This is a great opportunity for a recent graduate or someone looking to transition into Python development.\n\nYou\'ll Learn:\n• Python web development with Django/Flask\n• Data processing and analysis techniques\n• Database design and optimization\n• API development and integration\n• Testing and deployment best practices\n• Working with cloud services and containerization\n\nWe Offer:\n• Comprehensive mentorship program\n• Learning and development budget\n• Flexible working hours\n• Health and dental benefits\n• Collaborative and supportive team environment',
    requirements: 'Requirements:\n• Bachelor\'s degree in Computer Science, Engineering, or related field\n• Basic knowledge of Python programming\n• Understanding of object-oriented programming concepts\n• Familiarity with SQL and relational databases\n• Basic understanding of web development concepts\n• Strong analytical and problem-solving skills\n• Eagerness to learn and grow in a supportive environment\n• Good communication skills and ability to work in a team\n\nPreferred:\n• Experience with Django or Flask\n• Knowledge of data analysis libraries (Pandas, NumPy)\n• Understanding of version control (Git)\n• Exposure to cloud platforms (AWS, GCP)\n• Experience with Linux/Unix environments',
    salary_min: 55000,
    salary_max: 70000,
    location: 'Seattle, WA',
    remote: true,
    technologies: ['Python', 'Django', 'PostgreSQL', 'SQL', 'Git'],
    employment_type: 'full-time',
    experience_level: 'entry',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const getMockJobs = (): Job[] => {
  return mockJobs
}

export const addMockJob = (job: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Job => {
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  mockJobs.push(newJob)
  return newJob
}

export const getMockJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id)
}

export const updateMockJob = (id: string, updates: Partial<Job>): Job | null => {
  const index = mockJobs.findIndex(job => job.id === id)
  if (index === -1) return null
  
  mockJobs[index] = {
    ...mockJobs[index],
    ...updates,
    updated_at: new Date().toISOString()
  }
  return mockJobs[index]
}

export const deleteMockJob = (id: string): boolean => {
  const index = mockJobs.findIndex(job => job.id === id)
  if (index === -1) return false
  
  mockJobs.splice(index, 1)
  return true
}
