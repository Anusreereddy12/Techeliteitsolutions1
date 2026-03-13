// ── OnlineCourses.tsx ──────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, Video, BookOpen } from 'lucide-react';
import { NetworkBackground } from '../components/NetworkBackground';

const staticCourses = [
  { id: 1, slug: 'cyber-security-vapt', level: 'Beginner', rating: '4.9', title: 'Cyber Security VAPT', duration: '4 Months', students: '1200+ students', description: 'Learn vulnerability assessment and penetration testing without any coding prerequisite.', topics: ['Network scanning', 'VAPT tools', 'Web app security', 'Certification prep'], price: '₹45,000' },
  { id: 2, slug: 'azure-data-engineering', level: 'Intermediate', rating: '4.8', title: 'Azure Data Engineering', duration: '5 Months', students: '980+ students', description: 'Design and orchestrate enterprise-grade data pipelines on Microsoft Azure.', topics: ['ADF', 'Synapse Analytics', 'Databricks', 'Data Lake'], price: '₹48,000' },
  { id: 3, slug: 'ai-security', level: 'Advanced', rating: '4.9', title: 'AI Security', duration: '5 Months', students: '1500+ students', description: 'Secure AI systems and understand adversarial threats in machine learning pipelines.', topics: ['Adversarial ML', 'Model security', 'AI governance', 'Red-teaming'], price: '₹52,000' },
  { id: 4, slug: 'devops-multi-cloud', level: 'Advanced', rating: '4.8', title: 'DevOps (Multi Cloud)', duration: '6 Months', students: '850+ students', description: 'Master CI/CD pipelines, containers, and IaC across AWS, Azure, and GCP simultaneously.', topics: ['Docker & K8s', 'Terraform', 'Multi-cloud', 'Jenkins'], price: '₹55,000' },
  { id: 5, slug: 'information-security', level: 'Beginner', rating: '4.7', title: 'Information Security', duration: '3 Months', students: '700+ students', description: 'End-to-end information security management covering risk, governance and compliance.', topics: ['ISO 27001', 'Risk management', 'Security policy', 'Audit'], price: '₹35,000' },
  { id: 6, slug: 'ai-ml-python', level: 'Intermediate', rating: '4.9', title: 'AI / ML with Python', duration: '6 Months', students: '1100+ students', description: 'Build production-ready machine learning models and deep learning systems with Python.', topics: ['Python', 'Supervised ML', 'Neural networks', 'MLOps'], price: '₹50,000' },
  { id: 7, slug: 'java-testing', level: 'Intermediate', rating: '4.8', title: 'Java / Testing', duration: '5 Months', students: '800+ students', description: 'Master Java from core concepts to enterprise-level applications and automated testing.', topics: ['Core Java', 'Spring Boot', 'Selenium', 'API testing'], price: '₹45,000' },
  { id: 8, slug: 'soc', level: 'Intermediate', rating: '4.8', title: 'SOC', duration: '4 Months', students: '600+ students', description: 'Operate a Security Operations Centre — detect, analyse and respond to cyber incidents.', topics: ['SIEM tools', 'Threat intelli', 'Incident response', 'SOC cert'], price: '₹40,000' },
];

export function OnlineCourses() {
  const [courses, setCourses] = useState(staticCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses/online/')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-blue-600 text-xl font-semibold animate-pulse">Loading courses...</div>
    </div>
  );

  return (
    <div className="min-h-screen relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-sky-50 to-blue-100 pointer-events-none" />
      <NetworkBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Online Courses</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Learn from anywhere with our interactive online courses. Live classes, recorded sessions, and lifetime access.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[{ icon: Video, text: 'Live Interactive Classes' }, { icon: BookOpen, text: 'Lifetime Access' }, { icon: Users, text: 'Expert Mentorship' }, { icon: Award, text: 'Certification' }].map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
              <feature.icon className="text-blue-600 mx-auto mb-3" size={32} />
              <p className="font-semibold text-gray-900 dark:text-white">{feature.text}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any, index: number) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-white dark:bg-slate-900/20 px-3 py-1 rounded-full text-sm">{course.level}</span>
                  <div className="flex items-center gap-1"><span className="text-yellow-300">★</span><span className="font-semibold">{course.rating}</span></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-blue-100">{course.description}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1"><Clock size={16} /><span>{course.duration}</span></div>
                  <div className="flex items-center gap-1"><Users size={16} /><span>{course.students}</span></div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic: string, idx: number) => (
                      <span key={idx} className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 px-3 py-1 rounded-full text-sm">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                  <div><div className="text-2xl font-bold text-blue-600">{course.price}</div><div className="text-xs text-gray-500">One-time payment</div></div>
                  <Link to={`/course/${course.slug}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Course to Choose?</h2>
          <p className="text-xl text-blue-50 mb-8">Book a free consultation with our career counselors</p>
          <Link to="/booking" className="inline-block bg-white dark:bg-slate-900 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:bg-slate-800 transition-all">Schedule Free Consultation</Link>
        </motion.div>
      </div>
    </div>
  );
}