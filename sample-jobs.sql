-- Sample job data for testing the Developer Job Board
-- Run this after setting up your Supabase database

-- Insert sample jobs
INSERT INTO jobs (
  title,
  company,
  description,
  requirements,
  salary_min,
  salary_max,
  location,
  remote,
  technologies,
  employment_type,
  experience_level,
  status
) VALUES 
(
  'Senior Full Stack Developer',
  'TechCorp Solutions',
  'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies. This role offers the opportunity to work on exciting projects with a collaborative team in a fast-paced environment.

Key Responsibilities:
• Develop and maintain scalable web applications
• Collaborate with cross-functional teams to define and implement new features
• Write clean, maintainable, and efficient code
• Participate in code reviews and technical discussions
• Optimize applications for maximum speed and scalability
• Stay up-to-date with emerging technologies and industry trends',
  'Requirements:
• 5+ years of experience in full-stack development
• Strong proficiency in JavaScript, TypeScript, and React
• Experience with Node.js and Express.js
• Solid understanding of PostgreSQL or similar databases
• Familiarity with cloud platforms (AWS, Azure, or GCP)
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork abilities

Preferred Qualifications:
• Experience with Next.js and modern React patterns
• Knowledge of containerization (Docker, Kubernetes)
• Understanding of CI/CD pipelines
• Experience with testing frameworks (Jest, Cypress)
• Bachelor''s degree in Computer Science or related field',
  90000,
  130000,
  'San Francisco, CA',
  true,
  ARRAY['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Next.js'],
  'full-time',
  'senior',
  'approved'
),
(
  'Frontend React Developer',
  'StartupXYZ',
  'Join our innovative startup as a Frontend Developer! We''re building the next generation of productivity tools and need a talented React developer to help bring our vision to life. You''ll work directly with our design team to create beautiful, intuitive user interfaces.

What You''ll Do:
• Build responsive web applications using React and modern JavaScript
• Collaborate with designers to implement pixel-perfect UI components
• Optimize applications for performance and user experience
• Write comprehensive tests for your code
• Participate in agile development processes
• Contribute to our design system and component library',
  'What We''re Looking For:
• 3+ years of experience with React and JavaScript
• Strong understanding of HTML5, CSS3, and responsive design
• Experience with state management libraries (Redux, Zustand, or similar)
• Familiarity with modern build tools (Webpack, Vite, etc.)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Experience with version control (Git) and collaborative development
• Strong eye for design and user experience
• Self-motivated and able to work in a fast-paced startup environment

Nice to Have:
• Experience with TypeScript
• Knowledge of Next.js or similar frameworks
• Understanding of accessibility best practices
• Experience with design tools (Figma, Sketch)',
  70000,
  95000,
  'Austin, TX',
  false,
  ARRAY['React', 'JavaScript', 'TypeScript', 'CSS3', 'HTML5', 'Redux'],
  'full-time',
  'mid',
  'approved'
),
(
  'Junior Python Developer',
  'DataFlow Analytics',
  'Are you passionate about data and Python development? Join our team as a Junior Python Developer and help us build cutting-edge data analytics solutions. This is a great opportunity for a recent graduate or someone looking to transition into Python development.

You''ll Learn:
• Python web development with Django/Flask
• Data processing and analysis techniques
• Database design and optimization
• API development and integration
• Testing and deployment best practices
• Working with cloud services and containerization

We Offer:
• Comprehensive mentorship program
• Learning and development budget
• Flexible working hours
• Health and dental benefits
• Collaborative and supportive team environment',
  'Requirements:
• Bachelor''s degree in Computer Science, Engineering, or related field
• Basic knowledge of Python programming
• Understanding of object-oriented programming concepts
• Familiarity with SQL and relational databases
• Basic understanding of web development concepts
• Strong analytical and problem-solving skills
• Eagerness to learn and grow in a supportive environment
• Good communication skills and ability to work in a team

Preferred:
• Experience with Django or Flask
• Knowledge of data analysis libraries (Pandas, NumPy)
• Understanding of version control (Git)
• Exposure to cloud platforms (AWS, GCP)
• Experience with Linux/Unix environments',
  55000,
  70000,
  'Seattle, WA',
  true,
  ARRAY['Python', 'Django', 'PostgreSQL', 'SQL', 'Git'],
  'full-time',
  'entry',
  'approved'
),
(
  'DevOps Engineer',
  'CloudFirst Technologies',
  'We''re seeking a skilled DevOps Engineer to join our infrastructure team. You''ll be responsible for designing, implementing, and maintaining our cloud infrastructure while ensuring high availability and security of our applications.

Key Responsibilities:
• Design and manage cloud infrastructure on AWS/Azure
• Implement and maintain CI/CD pipelines
• Monitor system performance and troubleshoot issues
• Automate deployment processes and infrastructure provisioning
• Ensure security best practices across all environments
• Collaborate with development teams to optimize application performance
• Participate in on-call rotation for production support',
  'Required Skills:
• 4+ years of experience in DevOps or Site Reliability Engineering
• Strong experience with cloud platforms (AWS, Azure, or GCP)
• Proficiency with containerization technologies (Docker, Kubernetes)
• Experience with Infrastructure as Code (Terraform, CloudFormation)
• Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Scripting skills in Python, Bash, or similar languages
• Experience with monitoring and logging tools (Prometheus, ELK stack)
• Understanding of networking, security, and database administration

Preferred:
• Kubernetes certification (CKA, CKAD)
• Experience with service mesh technologies (Istio, Linkerd)
• Knowledge of configuration management tools (Ansible, Chef, Puppet)
• Experience with database technologies (PostgreSQL, MongoDB, Redis)',
  85000,
  115000,
  'Denver, CO',
  true,
  ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python', 'Jenkins'],
  'full-time',
  'senior',
  'approved'
),
(
  'Mobile App Developer (React Native)',
  'MobileFirst Inc',
  'Join our mobile development team to create amazing cross-platform applications using React Native. We''re building consumer-facing apps that serve millions of users worldwide.

What You''ll Build:
• Cross-platform mobile applications for iOS and Android
• Integration with RESTful APIs and GraphQL
• Real-time features using WebSockets
• Push notifications and background processing
• In-app purchases and analytics integration
• Performance optimization for mobile devices',
  'Requirements:
• 3+ years of React Native development experience
• Strong JavaScript/TypeScript skills
• Experience with mobile app deployment (App Store, Google Play)
• Knowledge of native iOS/Android development concepts
• Understanding of mobile UI/UX principles
• Experience with state management (Redux, MobX, or Context API)
• Familiarity with testing frameworks for mobile apps
• Knowledge of mobile security best practices

Bonus Points:
• Native iOS (Swift) or Android (Kotlin) experience
• Experience with CodePush or similar OTA update solutions
• Knowledge of mobile analytics and crash reporting tools
• Understanding of mobile performance optimization
• Experience with GraphQL and Apollo Client',
  75000,
  100000,
  'New York, NY',
  false,
  ARRAY['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Redux'],
  'full-time',
  'mid',
  'approved'
);
