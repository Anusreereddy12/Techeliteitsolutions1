import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, MapPin, Calendar } from 'lucide-react';
import { NetworkBackground } from '../components/NetworkBackground';

const staticCourses = [
  { id: 1, title: 'Cyber Security VAPT', duration: '4 Months', students: '20/batch', rating: '4.9', location: 'Bangalore', schedule: 'Mon-Fri, 10 AM - 1 PM', description: 'Intensive classroom training with hands-on labs for vulnerability assessment.', topics: ['Network scanning', 'VAPT tools', 'Web app security testing', 'Certification prep'], price: '₹55,000' },
  { id: 2, title: 'Azure Data Engineering', duration: '5 Months', students: '20/batch', rating: '4.8', location: 'Bangalore', schedule: 'Mon-Fri, 2 PM - 5 PM', description: 'Comprehensive data engineering pipelines and architecture on Microsoft Azure.', topics: ['ADF', 'Synapse Analytics', 'Databricks', 'Data Lake architecture'], price: '₹58,000' },
  { id: 3, title: 'AI Security', duration: '5 Months', students: '15/batch', rating: '4.9', location: 'Bangalore', schedule: 'Mon-Fri, 10 AM - 1 PM', description: 'Hands-on training in securing AI systems and understanding adversarial threats.', topics: ['Adversarial ML attacks', 'Model security', 'AI governance', 'Red-teaming'], price: '₹62,000' },
  { id: 4, title: 'DevOps (Multi Cloud)', duration: '6 Months', students: '20/batch', rating: '4.8', location: 'Bangalore', schedule: 'Sat-Sun, 10 AM - 4 PM', description: 'Weekend batches for working professionals. Master CI/CD and IaC natively.', topics: ['Docker & K8s', 'Terraform', 'Multi-cloud', 'Jenkins'], price: '₹65,000' },
  { id: 5, title: 'Information Security', duration: '3 Months', students: '25/batch', rating: '4.7', location: 'Bangalore', schedule: 'Mon-Fri, 6 PM - 8 PM', description: 'Evening batch covering risk, governance, and compliance end-to-end.', topics: ['ISO 27001', 'Risk management', 'Security policy', 'Audit'], price: '₹45,000' },
  { id: 6, title: 'AI / ML with Python', duration: '6 Months', students: '15/batch', rating: '4.9', location: 'Bangalore', schedule: 'Mon-Fri, 2 PM - 5 PM', description: 'Master machine learning and deep learning with real-world enterprise projects.', topics: ['Python', 'Supervised ML', 'Neural networks', 'MLOps'], price: '₹60,000' },
  { id: 7, title: 'Java / Testing', duration: '5 Months', students: '20/batch', rating: '4.8', location: 'Bangalore', schedule: 'Mon-Fri, 10 AM - 1 PM', description: 'Core Java, Spring Boot, and Automation testing with Selenium and TestNG.', topics: ['Core Java', 'Spring Boot', 'Selenium', 'API testing'], price: '₹55,000' },
  { id: 8, title: 'SOC', duration: '4 Months', students: '25/batch', rating: '4.8', location: 'Bangalore', schedule: 'Sat-Sun, 10 AM - 4 PM', description: 'Operate a Security Operations Centre — hands-on labs and playbook learning.', topics: ['SIEM tools', 'Threat intelli', 'Incident response', 'SOC cert'], price: '₹50,000' },
];

export function OfflineCourses() {
  const [courses, setCourses] = useState(staticCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses/offline/')
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Offline Classroom Training</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Experience hands-on learning in our state-of-the-art training centers. Small batches, personal attention, and direct mentorship.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[{ icon: Users, text: 'Small Batch Size' }, { icon: MapPin, text: 'Modern Infrastructure' }, { icon: Calendar, text: 'Flexible Schedules' }, { icon: Award, text: 'Placement Assistance' }].map((feature, index) => (
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
                  <div className="flex items-center gap-2"><MapPin size={16} /><span className="text-sm">{course.location}</span></div>
                  <div className="flex items-center gap-1"><span className="text-yellow-300">★</span><span className="font-semibold">{course.rating}</span></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{course.description}</p>
                <div className="flex items-center gap-2 text-sm bg-white dark:bg-slate-900/20 px-3 py-1 rounded-lg"><Calendar size={14} /><span>{course.schedule}</span></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1"><Clock size={16} /><span>{course.duration}</span></div>
                  <div className="flex items-center gap-1"><Users size={16} /><span>{course.students}</span></div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Course Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic: string, idx: number) => (
                      <span key={idx} className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 px-3 py-1 rounded-full text-sm">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                  <div><div className="text-2xl font-bold text-blue-600">{course.price}</div><div className="text-xs text-gray-500">Full course fee</div></div>
                  <Link to="/booking" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Book Seat</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Visit Our Training Center</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Experience our world-class infrastructure and meet our expert trainers.</p>
              <div className="space-y-3 text-gray-700 dark:text-gray-200">
                <div className="flex items-start gap-3"><MapPin className="text-blue-600 flex-shrink-0 mt-1" size={20} /><div><strong>Address:</strong> 123 Tech Park, 4th Floor, Electronic City, Bangalore - 560100</div></div>
                <div className="flex items-start gap-3"><Clock className="text-blue-600 flex-shrink-0 mt-1" size={20} /><div><strong>Timing:</strong> Monday - Saturday, 9:00 AM - 7:00 PM</div></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4">
              <div className="bg-gray-100 dark:bg-slate-800 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gray-400 mx-auto mb-2" size={48} />
                  <p className="text-gray-500 font-semibold">Training Center</p>
                  <p className="text-sm text-gray-400">Electronic City, Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Limited Seats Available!</h2>
          <p className="text-xl text-blue-50 mb-8">Book your seat today and start your journey to a successful IT career</p>
          <Link to="/booking" className="inline-block bg-white dark:bg-slate-900 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:bg-slate-800 transition-all">Book Free Demo Class</Link>
        </motion.div>
      </div>
    </div>
  );
}