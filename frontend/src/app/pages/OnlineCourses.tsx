import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, Video, BookOpen } from 'lucide-react';
import { getCoursesByType } from '../data/courses';

export function OnlineCourses() {
  const courses = getCoursesByType('online');

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
            Online Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from anywhere with our interactive online courses. Live classes, recorded sessions, and lifetime access.
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
            { icon: Video, text: 'Live Interactive Classes' },
            { icon: BookOpen, text: 'Lifetime Access' },
            { icon: Users, text: 'Expert Mentorship' },
            { icon: Award, text: 'Certification' },
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
                  <div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-300">★</span>
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-blue-100">{course.description}</p>
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
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
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
                    <div className="text-xs text-gray-500">One-time payment</div>
                  </div>
                  <Link
                    to={`/course/${course.slug}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Course to Choose?</h2>
          <p className="text-xl text-blue-50 mb-8">
            Book a free consultation with our career counselors
          </p>
          <Link
            to="/booking"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Schedule Free Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}