import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Users, Award, CheckCircle, Building } from 'lucide-react';

const placementStats = [
  { icon: Users, number: '4500+', label: 'Students Placed' },
  { icon: Building, number: '100+', label: 'Hiring Partners' },
  { icon: TrendingUp, number: '95%', label: 'Placement Rate' },
  { icon: Award, number: '₹8 LPA', label: 'Average Package' },
];

const hiringPartners = [
  'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Tech Mahindra',
  'HCL', 'IBM', 'Amazon', 'Microsoft', 'Google', 'Oracle',
  'Capgemini', 'LTI', 'Mindtree', 'Mphasis', 'Hexaware', 'Persistent',
];

const placementProcess = [
  {
    step: '1',
    title: 'Resume Building',
    description: 'Professional resume creation highlighting your skills and projects',
  },
  {
    step: '2',
    title: 'Mock Interviews',
    description: 'Practice sessions with industry experts to boost confidence',
  },
  {
    step: '3',
    title: 'Interview Preparation',
    description: 'Technical and HR interview training with common questions',
  },
  {
    step: '4',
    title: 'Job Referrals',
    description: 'Direct referrals to our 100+ hiring partner companies',
  },
  {
    step: '5',
    title: 'Interview Scheduling',
    description: 'We schedule interviews with companies matching your profile',
  },
  {
    step: '6',
    title: 'Offer Support',
    description: 'Guidance on offer negotiation and career planning',
  },
];

const successStories = [
  {
    name: 'Rajesh Kumar',
    course: 'Python Full Stack',
    company: 'Amazon',
    package: '₹12 LPA',
    testimonial: 'The placement support was excellent. Got placed in my dream company within 2 months of course completion.',
  },
  {
    name: 'Priya Sharma',
    course: 'Data Science',
    company: 'Microsoft',
    package: '₹15 LPA',
    testimonial: 'TechElite not only taught me technical skills but also prepared me for interviews. Forever grateful!',
  },
  {
    name: 'Amit Patel',
    course: 'MERN Stack',
    company: 'Infosys',
    package: '₹8 LPA',
    testimonial: 'From zero coding knowledge to getting placed in Infosys. The journey was amazing with TechElite.',
  },
];

export function Placements() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Placement Assistance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your success is our success. We provide comprehensive placement support to help you land your dream job.
          </p>
        </motion.div>

        {/* Placement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {placementStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <stat.icon className="text-blue-600 mx-auto mb-4" size={40} />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Placement Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Placement Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {story.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-blue-600 font-semibold">{story.course}</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="text-gray-600" size={18} />
                    <span className="font-semibold text-gray-900">{story.company}</span>
                  </div>
                  <div className="text-blue-600 font-bold">{story.package}</div>
                </div>
                <p className="text-gray-600 italic">"{story.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hiring Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Hiring Partners</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {hiringPartners.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  className="bg-white rounded-lg p-6 flex items-center justify-center font-semibold text-gray-700 hover:shadow-lg transition-shadow"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Lifetime placement assistance',
              '100% job guarantee programs',
              'Interview preparation workshops',
              'Resume and LinkedIn profile building',
              'Soft skills training',
              'Mock interview sessions',
              'Direct company referrals',
              'Salary negotiation guidance',
            ].map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="flex items-center gap-3 bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors"
              >
                <CheckCircle className="text-blue-600 flex-shrink-0" size={24} />
                <span className="text-gray-900 font-medium">{offer}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center"
        >
          <Briefcase className="mx-auto mb-6" size={64} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Career?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join our training programs and get guaranteed placement assistance from day one
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Enroll Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Talk to Counselor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
