import { motion } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Award, CheckCircle, BookOpen, Code, Star } from 'lucide-react';
import { getCourseBySlug } from '../data/courses';
import { useState } from 'react';

export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = slug ? getCourseBySlug(slug) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mode: course?.type || 'online',
    date: '',
    message: '',
  });

  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          booking_type: 'enrollment',
          preferred_date: formData.date || null,
          message: `Course: ${course?.title} | Mode: ${formData.mode}${formData.message ? ' | ' + formData.message : ''}`,
          course: null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(JSON.stringify(d));
      }
      setSubmitted(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setError('Enrollment failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/courses/online" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All Courses
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-2xl p-12 shadow-xl max-w-md"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enrollment Successful!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for enrolling in {course.title}. Our team will contact you shortly to confirm your enrollment.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {' / '}
          <Link to={`/courses/${course.type}`} className="hover:text-blue-600">
            {course.type === 'online' ? 'Online Courses' : 'Offline Courses'}
          </Link>
          {' / '}
          <span className="text-gray-900">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.level}</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-300" size={18} fill="currentColor" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-blue-100 mb-6">{course.detailedDescription}</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2"><Clock size={18} /><span>{course.duration}</span></div>
                  <div className="flex items-center gap-2"><Users size={18} /><span>{course.students} enrolled</span></div>
                  <div className="flex items-center gap-2"><BookOpen size={18} /><span>{course.type === 'online' ? 'Online' : 'Classroom'}</span></div>
                </div>
              </div>
            </motion.div>

            {/* What You Will Learn */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="text-blue-600" size={28} /> What You Will Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Curriculum */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{module.module}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Course Features */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                    <Award className="text-blue-600" size={20} />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="text-green-600" size={20} />
                    {prereq}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }} className="sticky top-24">
              {!showEnrollForm ? (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-blue-600 mb-2">{course.price}</div>
                    <div className="text-gray-600">One-time payment</div>
                  </div>
                  <motion.button onClick={() => setShowEnrollForm(true)}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4">
                    Enroll Now
                  </motion.button>
                  <p className="text-sm text-gray-500 text-center mb-6">30-day money-back guarantee</p>
                  <div className="border-t pt-6 space-y-4">
                    <h3 className="font-bold text-gray-900">This course includes:</h3>
                    <div className="space-y-3">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t mt-6 pt-6">
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>Instructor:</strong> {course.instructorInfo}</p>
                      <p><strong>Students enrolled:</strong> {course.students}</p>
                      <p><strong>Course rating:</strong> {course.rating} ★</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Enrollment</h3>

                  {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="John Doe" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="john@example.com" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="+91 98765 43210" />
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message (optional)</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                        placeholder="Any questions or special requirements..." />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">Course Fee:</span>
                        <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      </div>
                      <p className="text-xs text-gray-600">Price for {course.title}</p>
                    </div>

                    <motion.button type="submit" disabled={loading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60">
                      {loading ? 'Submitting...' : 'Complete Enrollment'}
                    </motion.button>

                    <button type="button" onClick={() => setShowEnrollForm(false)}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                      Back
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}