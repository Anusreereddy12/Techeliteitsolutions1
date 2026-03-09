import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, BookOpen, DollarSign, Clock, Users } from 'lucide-react';
import { courses as initialCourses } from '../../data/courses';

export function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'online' as 'online' | 'offline',
    duration: '',
    level: '',
    description: '',
    detailed_description: '',
    price: '',
    topics: '',
    features: '',
  });

  const handleAddCourse = () => {
    // TODO: API call to add course
    console.log('Adding course:', formData);
    // API endpoint: POST /api/admin/courses/
    setShowAddForm(false);
    resetForm();
  };

  const handleEditCourse = (slug: string) => {
    const course = courses.find(c => c.slug === slug);
    if (course) {
      setFormData({
        title: course.title,
        slug: course.slug,
        type: course.type,
        duration: course.duration,
        level: course.level,
        description: course.description,
        detailed_description: course.detailedDescription,
        price: course.price,
        topics: course.topics.join(', '),
        features: course.features.join(', '),
      });
      setEditingCourse(slug);
    }
  };

  const handleUpdateCourse = () => {
    // TODO: API call to update course
    console.log('Updating course:', formData);
    // API endpoint: PUT /api/admin/courses/:slug/
    setEditingCourse(null);
    resetForm();
  };

  const handleDeleteCourse = (slug: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      // TODO: API call to delete course
      console.log('Deleting course:', slug);
      // API endpoint: DELETE /api/admin/courses/:slug/
      setCourses(courses.filter(c => c.slug !== slug));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      type: 'online',
      duration: '',
      level: '',
      description: '',
      detailed_description: '',
      price: '',
      topics: '',
      features: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Add, edit, or delete courses</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {(showAddForm || editingCourse) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddForm(false);
              setEditingCourse(null);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCourse(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                editingCourse ? handleUpdateCourse() : handleAddCourse();
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Python Full Stack Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="python-full-stack"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="6 Months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Level *
                    </label>
                    <input
                      type="text"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Beginner to Advanced"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="₹45,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    placeholder="Master Python, Django, React, and become a full-stack developer."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="detailed_description"
                    value={formData.detailed_description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    placeholder="This comprehensive course covers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topics (comma-separated) *
                  </label>
                  <input
                    type="text"
                    name="topics"
                    value={formData.topics}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Python Basics, Django Framework, React.js, REST APIs, Deployment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features (comma-separated) *
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Live classes, Lifetime access, Projects, Mentorship"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingCourse ? 'Update Course' : 'Add Course'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCourse(null);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Courses List */}
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.type === 'online' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {course.type === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="text-blue-600" />
                      <span>{course.students} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign size={16} className="text-blue-600" />
                      <span className="font-semibold">{course.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen size={16} className="text-blue-600" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditCourse(course.slug)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit course"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.slug)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete course"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Documentation Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            <strong>API Integration:</strong> This page requires Django backend integration with the following endpoints:
          </p>
          <ul className="text-xs text-blue-600 mt-2 space-y-1">
            <li>• POST /api/admin/courses/ - Add new course</li>
            <li>• PUT /api/admin/courses/:slug/ - Update course</li>
            <li>• DELETE /api/admin/courses/:slug/ - Delete course</li>
            <li>• GET /api/admin/courses/ - List all courses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
