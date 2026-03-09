export interface Course {
  id: string;
  slug: string;
  title: string;
  type: 'online' | 'offline';
  duration: string;
  students: string;
  rating: string;
  level: string;
  description: string;
  detailedDescription: string;
  topics: string[];
  price: string;
  priceNumeric: number;
  location?: string;
  schedule?: string;
  features: string[];
  curriculum: {
    module: string;
    topics: string[];
  }[];
  prerequisites: string[];
  whatYouWillLearn: string[];
  certifications: string[];
  instructorInfo: string;
  syllabus: string[];
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'python-full-stack',
    title: 'Python Full Stack Development',
    type: 'online',
    duration: '6 Months',
    students: '500+',
    rating: '4.8',
    level: 'Beginner to Advanced',
    description: 'Master Python, Django, React, and become a full-stack developer.',
    detailedDescription: 'This comprehensive Python Full Stack Development course covers everything from Python basics to advanced Django and React development. Build production-ready web applications with industry-standard practices.',
    topics: ['Python Basics', 'Django Framework', 'React.js', 'REST APIs', 'Deployment'],
    price: '₹45,000',
    priceNumeric: 45000,
    features: [
      'Live interactive classes',
      'Lifetime access to recordings',
      'Hands-on projects',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'Python Fundamentals',
        topics: ['Python syntax', 'Data structures', 'OOP concepts', 'File handling']
      },
      {
        module: 'Django Backend',
        topics: ['Django setup', 'Models and ORM', 'Views and Templates', 'Authentication']
      },
      {
        module: 'React Frontend',
        topics: ['React basics', 'Components', 'State management', 'API integration']
      },
      {
        module: 'Full Stack Integration',
        topics: ['REST APIs', 'Database design', 'Deployment', 'Best practices']
      }
    ],
    prerequisites: ['Basic computer knowledge', 'Problem-solving skills'],
    whatYouWillLearn: [
      'Build complete web applications from scratch',
      'Master Python programming language',
      'Develop REST APIs with Django',
      'Create dynamic UIs with React',
      'Deploy applications to production',
      'Work with PostgreSQL databases'
    ],
    certifications: ['TechElite Python Full Stack Certificate', 'Course completion badge'],
    instructorInfo: 'Industry experts with 10+ years of experience in full-stack development',
    syllabus: ['Week 1-4: Python Fundamentals', 'Week 5-12: Django Development', 'Week 13-20: React Development', 'Week 21-24: Capstone Project']
  },
  {
    id: '2',
    slug: 'java-full-stack',
    title: 'Java Full Stack Development',
    type: 'online',
    duration: '6 Months',
    students: '450+',
    rating: '4.7',
    level: 'Beginner to Advanced',
    description: 'Learn Java, Spring Boot, Angular, and enterprise development.',
    detailedDescription: 'Master enterprise-level Java development with Spring Boot backend and Angular frontend. Learn to build scalable, production-ready applications used by Fortune 500 companies.',
    topics: ['Core Java', 'Spring Boot', 'Angular', 'Microservices', 'Database'],
    price: '₹48,000',
    priceNumeric: 48000,
    features: [
      'Live interactive classes',
      'Lifetime access to recordings',
      'Enterprise projects',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'Core Java',
        topics: ['Java fundamentals', 'OOP', 'Collections', 'Exception handling']
      },
      {
        module: 'Spring Boot',
        topics: ['Spring basics', 'REST APIs', 'JPA', 'Security']
      },
      {
        module: 'Angular Frontend',
        topics: ['TypeScript', 'Components', 'Services', 'Routing']
      },
      {
        module: 'Microservices',
        topics: ['Architecture', 'Docker', 'Kubernetes', 'Cloud deployment']
      }
    ],
    prerequisites: ['Basic programming knowledge', 'Understanding of OOP concepts'],
    whatYouWillLearn: [
      'Master Java programming',
      'Build REST APIs with Spring Boot',
      'Develop SPAs with Angular',
      'Implement microservices architecture',
      'Deploy to cloud platforms',
      'Work with MySQL/PostgreSQL'
    ],
    certifications: ['TechElite Java Full Stack Certificate', 'Course completion badge'],
    instructorInfo: 'Senior developers from top IT companies with enterprise experience',
    syllabus: ['Month 1-2: Core Java', 'Month 3-4: Spring Boot', 'Month 5: Angular', 'Month 6: Microservices & Project']
  },
  {
    id: '3',
    slug: 'mern-stack',
    title: 'MERN Stack Development',
    type: 'online',
    duration: '5 Months',
    students: '600+',
    rating: '4.9',
    level: 'Intermediate',
    description: 'Build modern web apps with MongoDB, Express, React, and Node.js.',
    detailedDescription: 'Learn the most popular JavaScript stack used by startups and tech giants. Build full-stack applications using MongoDB, Express.js, React, and Node.js.',
    topics: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Real Projects'],
    price: '₹42,000',
    priceNumeric: 42000,
    features: [
      'Live interactive classes',
      'Lifetime access to recordings',
      'Real-world projects',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'JavaScript Mastery',
        topics: ['ES6+', 'Async programming', 'Promises', 'Modules']
      },
      {
        module: 'Node.js & Express',
        topics: ['Node basics', 'Express setup', 'Middleware', 'Authentication']
      },
      {
        module: 'MongoDB',
        topics: ['Database design', 'CRUD operations', 'Mongoose', 'Aggregation']
      },
      {
        module: 'React Development',
        topics: ['Hooks', 'Context API', 'Redux', 'Performance optimization']
      }
    ],
    prerequisites: ['JavaScript fundamentals', 'HTML & CSS knowledge'],
    whatYouWillLearn: [
      'Master modern JavaScript',
      'Build REST APIs with Node.js',
      'Develop SPAs with React',
      'Work with NoSQL databases',
      'Implement authentication',
      'Deploy full-stack applications'
    ],
    certifications: ['TechElite MERN Stack Certificate', 'Course completion badge'],
    instructorInfo: 'Full-stack developers from leading product companies',
    syllabus: ['Month 1: JavaScript & Node.js', 'Month 2: Express & MongoDB', 'Month 3-4: React', 'Month 5: Final Project']
  },
  {
    id: '4',
    slug: 'aws-cloud-computing',
    title: 'AWS Cloud Computing',
    type: 'online',
    duration: '4 Months',
    students: '400+',
    rating: '4.8',
    level: 'Intermediate',
    description: 'Get AWS certified and master cloud infrastructure.',
    detailedDescription: 'Prepare for AWS certification while learning to architect, deploy, and manage applications on Amazon Web Services. Hands-on labs included.',
    topics: ['EC2 & S3', 'Lambda', 'RDS', 'CloudFormation', 'AWS Certification'],
    price: '₹35,000',
    priceNumeric: 35000,
    features: [
      'AWS certification prep',
      'Hands-on labs',
      'Real cloud projects',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'AWS Fundamentals',
        topics: ['Cloud concepts', 'AWS global infrastructure', 'IAM', 'Billing']
      },
      {
        module: 'Compute Services',
        topics: ['EC2', 'Lambda', 'ECS', 'Auto Scaling']
      },
      {
        module: 'Storage & Database',
        topics: ['S3', 'EBS', 'RDS', 'DynamoDB']
      },
      {
        module: 'Advanced Services',
        topics: ['VPC', 'CloudFormation', 'CloudWatch', 'Best practices']
      }
    ],
    prerequisites: ['Basic Linux knowledge', 'Understanding of networking'],
    whatYouWillLearn: [
      'AWS core services',
      'Cloud architecture design',
      'Security best practices',
      'Cost optimization',
      'Deploy scalable applications',
      'Pass AWS certification exam'
    ],
    certifications: ['TechElite AWS Certificate', 'AWS Solutions Architect Associate (exam prep)'],
    instructorInfo: 'AWS certified instructors with cloud architecture experience',
    syllabus: ['Month 1: AWS Basics', 'Month 2: Compute & Storage', 'Month 3: Advanced Services', 'Month 4: Certification Prep']
  },
  {
    id: '5',
    slug: 'devops-engineering',
    title: 'DevOps Engineering',
    type: 'online',
    duration: '5 Months',
    students: '350+',
    rating: '4.7',
    level: 'Advanced',
    description: 'Learn CI/CD, Docker, Kubernetes, and automation.',
    detailedDescription: 'Master DevOps tools and practices to become a DevOps engineer. Learn containerization, orchestration, CI/CD pipelines, and cloud infrastructure.',
    topics: ['Jenkins', 'Docker', 'Kubernetes', 'Git & GitHub', 'AWS DevOps'],
    price: '₹40,000',
    priceNumeric: 40000,
    features: [
      'Live interactive classes',
      'Hands-on labs',
      'Real DevOps projects',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'DevOps Fundamentals',
        topics: ['DevOps culture', 'Linux administration', 'Git', 'Shell scripting']
      },
      {
        module: 'CI/CD',
        topics: ['Jenkins', 'GitLab CI', 'Automated testing', 'Deployment pipelines']
      },
      {
        module: 'Containerization',
        topics: ['Docker', 'Docker Compose', 'Container registries', 'Best practices']
      },
      {
        module: 'Orchestration & Cloud',
        topics: ['Kubernetes', 'Helm', 'AWS/Azure', 'Infrastructure as Code']
      }
    ],
    prerequisites: ['Linux basics', 'Basic programming', 'Networking fundamentals'],
    whatYouWillLearn: [
      'CI/CD pipeline creation',
      'Docker containerization',
      'Kubernetes orchestration',
      'Cloud infrastructure management',
      'Automation scripting',
      'Monitoring and logging'
    ],
    certifications: ['TechElite DevOps Certificate', 'Course completion badge'],
    instructorInfo: 'DevOps engineers from tech companies with production experience',
    syllabus: ['Month 1: Linux & Git', 'Month 2: CI/CD', 'Month 3: Docker', 'Month 4-5: Kubernetes & Cloud']
  },
  {
    id: '6',
    slug: 'data-science-ml',
    title: 'Data Science & Machine Learning',
    type: 'online',
    duration: '6 Months',
    students: '550+',
    rating: '4.9',
    level: 'Intermediate to Advanced',
    description: 'Master data analysis, ML algorithms, and AI models.',
    detailedDescription: 'Comprehensive data science program covering statistics, machine learning, deep learning, and AI. Work on real datasets and build ML models.',
    topics: ['Python & R', 'Pandas & NumPy', 'ML Algorithms', 'Deep Learning', 'Projects'],
    price: '₹50,000',
    priceNumeric: 50000,
    features: [
      'Live interactive classes',
      'Industry datasets',
      'Kaggle competitions',
      'Industry expert mentors',
      '100% job assistance',
      'Certificate of completion'
    ],
    curriculum: [
      {
        module: 'Data Science Fundamentals',
        topics: ['Python', 'Statistics', 'Pandas', 'NumPy']
      },
      {
        module: 'Machine Learning',
        topics: ['Supervised learning', 'Unsupervised learning', 'Scikit-learn', 'Model evaluation']
      },
      {
        module: 'Deep Learning',
        topics: ['Neural networks', 'TensorFlow', 'Keras', 'Computer vision']
      },
      {
        module: 'AI & Deployment',
        topics: ['NLP', 'Reinforcement learning', 'Model deployment', 'MLOps']
      }
    ],
    prerequisites: ['Python basics', 'Mathematics fundamentals'],
    whatYouWillLearn: [
      'Data analysis and visualization',
      'Statistical modeling',
      'Machine learning algorithms',
      'Deep learning techniques',
      'Deploy ML models',
      'Work with TensorFlow and PyTorch'
    ],
    certifications: ['TechElite Data Science Certificate', 'Course completion badge'],
    instructorInfo: 'Data scientists from top tech companies and research backgrounds',
    syllabus: ['Month 1-2: Python & Statistics', 'Month 3-4: Machine Learning', 'Month 5: Deep Learning', 'Month 6: Projects']
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCoursesByType = (type: 'online' | 'offline'): Course[] => {
  return courses.filter(course => course.type === type);
};
