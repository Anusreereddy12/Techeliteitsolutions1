import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, MapPin, Calendar } from 'lucide-react';

const courses = [
  {
    title: 'Python Full Stack Development',
    duration: '6 Months',
    students: '20/batch',
    rating: '4.9',
    location: 'Bangalore',
    schedule: 'Mon-Fri, 10 AM - 1 PM',
    description: 'Intensive classroom training with hands-on projects and mentorship.',
    topics: ['Python Basics', 'Django Framework', 'React.js', 'REST APIs', 'Deployment'],
    price: '₹55,000',
  },
  {
    title: 'Java Full Stack Development',
    duration: '6 Months',
    students: '20/batch',
    rating: '4.8',
    location: 'Bangalore',
    schedule: 'Mon-Fri, 2 PM - 5 PM',
    description: 'Comprehensive Java and Spring Boot training with enterprise projects.',
    topics: ['Core Java', 'Spring Boot', 'Angular', 'Microservices', 'Database'],
    price: '₹58,000',
  },
  {
    title: 'MERN Stack Development',
    duration: '5 Months',
    students: '20/batch',
    rating: '4.9',
    location: 'Bangalore',
    schedule: 'Mon-Fri, 10 AM - 1 PM',
    description: 'Build full-stack applications with modern JavaScript technologies.',
    topics: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Real Projects'],
    price: '₹52,000',
  },
  {
    title: 'Data Science & AI',
    duration: '6 Months',
    students: '15/batch',
    rating: '4.9',
    location: 'Bangalore',
    schedule: 'Sat-Sun, 10 AM - 4 PM',
    description: 'Weekend batches for working professionals. Master ML and AI.',
    topics: ['Python & R', 'ML Algorithms', 'Deep Learning', 'AI Models', 'Projects'],
    price: '₹60,000',
  },
  {
    title: 'Software Testing',
    duration: '3 Months',
    students: '25/batch',
    rating: '4.7',
    location: 'Bangalore',
    schedule: 'Mon-Fri, 6 PM - 8 PM',
    description: 'Evening batch for manual and automation testing certification.',
    topics: ['Manual Testing', 'Selenium', 'API Testing', 'Automation', 'Certification'],
    price: '₹30,000',
  },
  {
    title: 'DevOps Engineering',
    duration: '5 Months',
    students: '20/batch',
    rating: '4.8',
    location: 'Bangalore',
    schedule: 'Mon-Fri, 2 PM - 5 PM',
    description: 'Learn CI/CD, containerization, and cloud infrastructure.',
    topics: ['Jenkins', 'Docker', 'Kubernetes', 'Git', 'AWS DevOps'],
    price: '₹48,000',
  },
];

export function OfflineCourses() {
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
            Offline Classroom Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hands-on learning in our state-of-the-art training centers. Small batches, personal attention, and direct mentorship.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Users, text: 'Small Batch Size' },
            { icon: MapPin, text: 'Modern Infrastructure' },
            { icon: Calendar, text: 'Flexible Schedules' },
            { icon: Award, text: 'Placement Assistance' },
          ].map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
              <feature.icon className="text-blue-600 mx-auto mb-3" size={32} />
              <p className="font-semibold text-gray-900">{feature.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="text-sm">{course.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-300">★</span>
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{course.description}</p>
                <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-lg">
                  <Calendar size={14} />
                  <span>{course.schedule}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Course Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                    <div className="text-xs text-gray-500">Full course fee</div>
                  </div>
                  <Link
                    to="/booking"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Seat
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Training Center</h2>
              <p className="text-gray-600 mb-6">
                Experience our world-class infrastructure and meet our expert trainers. Our training center is equipped with the latest technology and comfortable learning spaces.
              </p>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>Address:</strong> 123 Tech Park, 4th Floor, Electronic City, Bangalore - 560100
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>Timing:</strong> Monday - Saturday, 9:00 AM - 7:00 PM
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gray-400 mx-auto mb-2" size={48} />
                  <p className="text-gray-500 font-semibold">Training Center</p>
                  <p className="text-sm text-gray-400">Electronic City, Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Limited Seats Available!</h2>
          <p className="text-xl text-blue-50 mb-8">
            Book your seat today and start your journey to a successful IT career
          </p>
          <Link
            to="/booking"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Book Free Demo Class
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
