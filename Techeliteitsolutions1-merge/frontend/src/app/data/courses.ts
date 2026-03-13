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
    slug: 'cyber-security-vapt',
    title: 'Cyber Security VAPT',
    type: 'online',
    duration: '4 Months',
    students: '1200+ students',
    rating: '4.9',
    level: 'Beginner',
    description: 'Learn vulnerability assessment and penetration testing without any coding prerequisite.',
    detailedDescription: 'This comprehensive Cyber Security VAPT program focuses on practical, hands-on learning. It equips you with the skills to identify, evaluate, and mitigate security vulnerabilities in networks and web applications, preparing you for a career as a Security Analyst or Penetration Tester.',
    topics: ['Network scanning', 'VAPT tools', 'Web app security', 'Certification prep'],
    price: '₹45,000',
    priceNumeric: 45000,
    features: [
      'Live interactive classes',
      'Hands-on network labs',
      'Real-world attack simulations',
      'Industry expert mentors',
      '100% placement assistance',
      'Industry-recognized certification'
    ],
    curriculum: [
      {
        module: 'Fundamentals & Scanning',
        topics: ['Networking basics', 'Nmap & Enumeration', 'Footprinting', 'Vulnerability scanning']
      },
      {
        module: 'Web App Security',
        topics: ['OWASP Top 10', 'Burp Suite mastery', 'SQLi & XSS', 'Session management']
      },
      {
        module: 'Advanced Penetration Testing',
        topics: ['Metasploit framework', 'Privilege escalation', 'Wireless hacking', 'Reporting']
      }
    ],
    prerequisites: ['No coding required', 'Basic IT understanding', 'Curiosity to learn security'],
    whatYouWillLearn: [
      'Conduct professional vulnerability assessments',
      'Perform manual and automated penetration testing',
      'Secure organizational networks',
      'Write professional security audit reports'
    ],
    certifications: ['TechElite VAPT Certified Professional', 'Preparation for CEH/OSCP'],
    instructorInfo: 'Senior Security Researchers and Ethical Hackers from top cybersecurity firms',
    syllabus: ['Month 1: Fundamentals & Scanning', 'Month 2: Web App Security', 'Month 3: Advanced Penetration Testing', 'Month 4: Projects & Cert Prep']
  },
  {
    id: '2',
    slug: 'azure-data-engineering',
    title: 'Azure Data Engineering',
    type: 'online',
    duration: '5 Months',
    students: '980+ students',
    rating: '4.8',
    level: 'Intermediate',
    description: 'Design and orchestrate enterprise-grade data pipelines on Microsoft Azure.',
    detailedDescription: 'Master modern data engineering on the Azure cloud platform. Learn to build scalable data lakes, implement complex ETL pipelines using Azure Data Factory, and process big data with Databricks and Synapse Analytics.',
    topics: ['ADF', 'Synapse Analytics', 'Databricks', 'Data Lake architecture'],
    price: '₹48,000',
    priceNumeric: 48000,
    features: [
      'Azure certification prep (DP-203)',
      'Real-world enterprise datasets',
      'Hands-on Databricks labs',
      'Dedicated mentoring sessions',
      'Resume & interview prep',
      'Project portfolio building'
    ],
    curriculum: [
      {
        module: 'Storage & Architecture',
        topics: ['Azure Data Lake Storage Gen2', 'Azure SQL', 'Cosmos DB', 'Data modelling']
      },
      {
        module: 'Data Integration',
        topics: ['Azure Data Factory (ADF)', 'ETL/ELT pipelines', 'Data flows', 'Orchestration']
      },
      {
        module: 'Big Data Processing',
        topics: ['Azure Databricks', 'Apache Spark', 'Synapse Analytics', 'Real-time streaming']
      }
    ],
    prerequisites: ['Basic SQL knowledge', 'Familiarity with cloud concepts', 'Basic Python (optional but recommended)'],
    whatYouWillLearn: [
      'Architect data platforms on Microsoft Azure',
      'Build robust ETL pipelines with ADF',
      'Process massive datasets using Spark',
      'Implement enterprise data warehouses'
    ],
    certifications: ['TechElite Azure Data Engineer Certificate', 'DP-203 Exam preparation'],
    instructorInfo: 'Microsoft Certified Azure Data Engineers with extensive enterprise deployment experience',
    syllabus: ['Month 1: Storage & SQL', 'Month 2-3: Data Factory & Integration', 'Month 4: Databricks & Spark', 'Month 5: Synapse & Projects']
  },
  {
    id: '3',
    slug: 'ai-security',
    title: 'AI Security',
    type: 'online',
    duration: '5 Months',
    students: '1500+ students',
    rating: '4.9',
    level: 'Advanced',
    description: 'Secure AI systems and understand adversarial threats in machine learning pipelines.',
    detailedDescription: 'As AI goes mainstream, securing it is paramount. This cutting-edge program dives deep into adversarial machine learning, data poisoning, model extraction, and implementing robust governance frameworks for enterprise AI deployments.',
    topics: ['Adversarial ML attacks', 'Model security hardening', 'AI governance', 'Red-teaming AI systems'],
    price: '₹52,000',
    priceNumeric: 52000,
    features: [
      'Pioneering curriculum in a niche field',
      'Hands-on adversarial attack labs',
      'Focus on LLM security',
      'Global community access',
      'Placement in advanced security roles',
      'Access to exclusive AI security research'
    ],
    curriculum: [
      {
        module: 'AI/ML Fundamentals for Security',
        topics: ['Machine learning basics', 'Neural networks', 'AI deployment models', 'Threat landscape']
      },
      {
        module: 'Adversarial Attacks',
        topics: ['Data poisoning', 'Evasion attacks', 'Model inversion', 'Prompt injection (LLMs)']
      },
      {
        module: 'Defense & Governance',
        topics: ['Robust model training', 'Differential privacy', 'AI compliance (AI Act)', 'Red-teaming frameworks']
      }
    ],
    prerequisites: ['Understanding of basic ML concepts', 'Python fluency', 'Basic cybersecurity knowledge'],
    whatYouWillLearn: [
      'Execute and defend against adversarial attacks',
      'Secure Large Language Models (LLMs)',
      'Establish AI governance and compliance',
      'Perform red-teaming on MLOps pipelines'
    ],
    certifications: ['TechElite Certified AI Security Specialist'],
    instructorInfo: 'AI Security Researchers and practitioners leading the industry in secure AI architecture',
    syllabus: ['Month 1: ML & Security Baseline', 'Month 2-3: Adversarial ML & Vulnerabilities', 'Month 4: Defenses & Hardening', 'Month 5: LLM Security & Capstone']
  },
  {
    id: '4',
    slug: 'devops-multi-cloud',
    title: 'DevOps (Multi Cloud)',
    type: 'online',
    duration: '6 Months',
    students: '850+ students',
    rating: '4.8',
    level: 'Advanced',
    description: 'Master CI/CD pipelines, containers, and IaC across AWS, Azure, and GCP simultaneously.',
    detailedDescription: 'Go beyond single-cloud expertise. This program trains you to be a versatile DevOps engineer capable of building, deploying, and managing infrastructure seamlessly across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).',
    topics: ['Docker & Kubernetes', 'Terraform & Ansible', 'Multi-cloud strategy', 'GitHub Actions & Jenkins'],
    price: '₹55,000',
    priceNumeric: 55000,
    features: [
      'Multi-cloud architectural training',
      'Heavy focus on Infrastructure as Code',
      'Live Kubernetes cluster management',
      'Enterprise CI/CD projects',
      'Mock interviews & profile building',
      'Comprehensive DevOps toolkit'
    ],
    curriculum: [
      {
        module: 'Foundations & CI/CD',
        topics: ['Linux & Scripting', 'Git mastery', 'Jenkins pipelines', 'GitHub Actions']
      },
      {
        module: 'Containerization & Orchestration',
        topics: ['Docker architecture', 'Kubernetes administration', 'Helm charts', 'Service mesh']
      },
      {
        module: 'Infrastructure as Code & Cloud',
        topics: ['Terraform across clouds', 'Ansible configuration', 'AWS/Azure/GCP networking', 'Monitoring (Prometheus/Grafana)']
      }
    ],
    prerequisites: ['Linux administration basics', 'Understanding of networking', 'Basic programming knowledge'],
    whatYouWillLearn: [
      'Build cloud-agnostic infrastructure using Terraform',
      'Deploy and scale applications on Kubernetes',
      'Automate workflows with robust CI/CD pipelines',
      'Implement multi-cloud architectures effectively'
    ],
    certifications: ['TechElite Multi-Cloud DevOps Professional', 'Preparation for CKA / Terraform Associate'],
    instructorInfo: 'Senior Principal DevOps Engineers managing large-scale multi-cloud environments',
    syllabus: ['Month 1: Linux & CI/CD', 'Month 2: Docker & Containers', 'Month 3-4: Kubernetes Mastery', 'Month 5: Terraform & IaC', 'Month 6: Multi-Cloud Integration & Projects']
  },
  {
    id: '5',
    slug: 'information-security',
    title: 'Information Security',
    type: 'online',
    duration: '3 Months',
    students: '700+ students',
    rating: '4.7',
    level: 'Beginner',
    description: 'End-to-end information security management covering risk, governance and compliance.',
    detailedDescription: 'Step into the critical role of Information Security Management. This course focuses on the Governance, Risk, and Compliance (GRC) aspect of cybersecurity. Learn how to design security policies, conduct risk assessments, and align organizations with international standards like ISO 27001.',
    topics: ['ISO 27001 & NIST', 'Risk management frameworks', 'Security policy design', 'Audit & compliance'],
    price: '₹35,000',
    priceNumeric: 35000,
    features: [
      'Zero coding requirement',
      'Focus on management & strategy',
      'Real-world audit case studies',
      'Fast-track to GRC roles',
      'Expert resume guidance',
      'Preparation for CISA/CISM domains'
    ],
    curriculum: [
      {
        module: 'Security Frameworks',
        topics: ['ISO 27001 deployment', 'NIST CSF', 'CIS Controls', 'Regulatory compliance (GDPR, HIPAA)']
      },
      {
        module: 'Risk Management',
        topics: ['Risk assessment methodologies', 'Business continuity planning', 'Disaster recovery', 'Vendor risk management']
      },
      {
        module: 'Auditing & Operations',
        topics: ['IT auditing principles', 'Security awareness programs', 'Incident response management', 'Metrics and reporting']
      }
    ],
    prerequisites: ['Basic understanding of IT systems', 'Strong analytical skills', 'Good communication skills'],
    whatYouWillLearn: [
      'Implement and manage ISO 27001 frameworks',
      'Perform thorough IT and security risk assessments',
      'Draft comprehensive security policies',
      'Navigate the complex landscape of compliance regulations'
    ],
    certifications: ['TechElite Information Security Specialist'],
    instructorInfo: 'CISO-level executives and seasoned IT Auditors from Big 4 firms',
    syllabus: ['Month 1: Frameworks & Compliance Basics', 'Month 2: Risk Management & BCP/DR', 'Month 3: Auditing, Operations & Capstone']
  },
  {
    id: '6',
    slug: 'ai-ml-python',
    title: 'AI / ML with Python',
    type: 'online',
    duration: '6 Months',
    students: '1100+ students',
    rating: '4.9',
    level: 'Intermediate',
    description: 'Build production-ready machine learning models and deep learning systems with Python.',
    detailedDescription: 'Transition from data to intelligence. This intensive program covers the end-to-end lifecycle of machine learning. You will master Python libraries, build supervised and unsupervised models, dive deep into neural networks, and learn how to deploy these models into production using MLOps practices.',
    topics: ['Python for data science', 'Supervised & unsupervised ML', 'Neural networks & CNNs', 'MLOps & deployment'],
    price: '₹50,000',
    priceNumeric: 50000,
    features: [
      'Extensive Python coding practice',
      'Projects based on real industry datasets',
      'Deep dive into TensorFlow & PyTorch',
      'MLOps pipeline integration',
      '100% placement support',
      'Portfolio development'
    ],
    curriculum: [
      {
        module: 'Data Science & Python Core',
        topics: ['Advanced Python', 'Pandas & NumPy', 'Data visualization (Matplotlib/Seaborn)', 'Statistical foundations']
      },
      {
        module: 'Machine Learning algorithms',
        topics: ['Linear/Logistic regression', 'Decision Trees & Random Forests', 'Clustering', 'Feature engineering']
      },
      {
        module: 'Deep Learning & MLOps',
        topics: ['Neural Networks', 'CNNs & sequence models', 'TensorFlow/PyTorch', 'Model deployment via APIs (FastAPI/Docker)']
      }
    ],
    prerequisites: ['Basic programming knowledge', 'High school mathematics (Linear algebra, calculus)', 'Strong analytical mindset'],
    whatYouWillLearn: [
      'Clean, explore, and visualize complex datasets',
      'Select and train optimal machine learning algorithms',
      'Design deep learning architectures for image and text data',
      'Deploy models as scalable web services'
    ],
    certifications: ['TechElite AI & Machine Learning Expert'],
    instructorInfo: 'Lead Data Scientists and AI Engineers building commercial intelligent systems',
    syllabus: ['Month 1: Python Data Stack', 'Month 2-3: Core Machine Learning', 'Month 4: Deep Learning', 'Month 5: Computer Vision/NLP', 'Month 6: MLOps & Deployment Projects']
  },
  {
    id: '7',
    slug: 'java-testing',
    title: 'Java / Testing',
    type: 'online',
    duration: '5 Months',
    students: '800+ students',
    rating: '4.8',
    level: 'Intermediate',
    description: 'Master Java from core concepts to enterprise-level applications and automated testing.',
    detailedDescription: 'This dual-track program makes you a versatile SDET (Software Development Engineer in Test). Start by building strong foundations in Core Java and Spring Boot API development, then seamlessly transition into mastering automated testing frameworks like Selenium and TestNG to ensure software quality at scale.',
    topics: ['Core Java & OOP', 'Spring Boot REST APIs', 'Selenium & TestNG', 'API & performance testing'],
    price: '₹45,000',
    priceNumeric: 45000,
    features: [
      'Dual-skill advantage (Development + Testing)',
      'Enterprise-grade application building',
      'Automation framework design from scratch',
      'Dedicated interview preparation',
      'Live application testing',
      'Continuous Integration setups'
    ],
    curriculum: [
      {
        module: 'Java Development Back-end',
        topics: ['Core Java fundamentals', 'Collections & Multithreading', 'Spring Boot architecture', 'RESTful APIs with databases']
      },
      {
        module: 'UI Automation Testing',
        topics: ['Selenium WebDriver', 'Locators & waits', 'TestNG framework', 'Page Object Model (POM)']
      },
      {
        module: 'API & Advanced Testing',
        topics: ['Postman & RestAssured', 'Cucumber (BDD)', 'CI/CD integration for tests', 'Performance testing basics']
      }
    ],
    prerequisites: ['Basic understanding of software lifecycle', 'Logical thinking', 'Familiarity with HTML/CSS helps'],
    whatYouWillLearn: [
      'Develop robust backend APIs using Spring Boot',
      'Write clean, object-oriented Java code',
      'Automate complex web application workflows',
      'Perform comprehensive API automation testing'
    ],
    certifications: ['TechElite Certified SDET Professional'],
    instructorInfo: 'Veteran QA Architects and Senior Java Developers with deep enterprise roots',
    syllabus: ['Month 1: Core Java', 'Month 2: Spring Boot & APIs', 'Month 3: Selenium UI Automation', 'Month 4: Frameworks (TestNG/Cucumber)', 'Month 5: API Automation & Integration']
  },
  {
    id: '8',
    slug: 'soc',
    title: 'SOC',
    type: 'online',
    duration: '4 Months',
    students: '600+ students',
    rating: '4.8',
    level: 'Intermediate',
    description: 'Operate a Security Operations Centre — detect, analyse and respond to cyber incidents.',
    detailedDescription: 'Become the frontline defender against cyber threats. This hands-on program trains you as a Tier 1/Tier 2 SOC analyst. Learn to monitor network traffic, analyze logs using industry-leading SIEM tools, respond to live incidents, and utilize cyber threat intelligence.',
    topics: ['SIEM tools & log analysis', 'Threat intelligence', 'Incident response playbooks', 'SOC analyst certification'],
    price: '₹40,000',
    priceNumeric: 40000,
    features: [
      'Live SOC lab environments',
      'Hands-on SIEM deployment (Splunk/ELK)',
      'Real-world incident response scenarios',
      'Mentorship from active SOC managers',
      'Job placement assistance',
      'Shift-readiness training'
    ],
    curriculum: [
      {
        module: 'Network Defense & Logs',
        topics: ['Traffic analysis (Wireshark)', 'Intrusion Detection (Snort/Suricata)', 'Log aggregation', 'Endpoint security basics']
      },
      {
        module: 'SIEM Operations',
        topics: ['Splunk/ELK fundamentals', 'Query writing', 'Dashboard creation', 'Alert generation and tuning']
      },
      {
        module: 'Incident Response & Threat Intel',
        topics: ['Cyber kill chain', 'MITRE ATT&CK framework', 'Incident response lifecycles', 'Malware analysis basics']
      }
    ],
    prerequisites: ['Foundational networking knowledge (TCP/IP)', 'Basic Linux CLI skills', 'Analytical mindset'],
    whatYouWillLearn: [
      'Deploy, configure, and operate SIEM solutions',
      'Investigate security alerts critically and accurately',
      'Utilize Threat Intelligence to preempt attacks',
      'Execute incident response playbooks effectively'
    ],
    certifications: ['TechElite Certified SOC Analyst', 'Preparation for CompTIA CySA+'],
    instructorInfo: 'Current SOC Managers and Tier 3 Incident Responders protecting critical infrastructure',
    syllabus: ['Month 1: Networks & Logs', 'Month 2: SIEM (Splunk/ELK)', 'Month 3: Incident Analysis & ATT&CK', 'Month 4: Practical Incident Response Labs']
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCoursesByType = (type: 'online' | 'offline'): Course[] => {
  return courses.filter(course => course.type === type);
};
