import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data - Replace with actual API calls
const stats = [
  { icon: Users, label: 'Total Students', value: '1,234', change: '+12%', positive: true },
  { icon: BookOpen, label: 'Active Courses', value: '24', change: '+3', positive: true },
  { icon: Calendar, label: 'Pending Bookings', value: '45', change: '-5', positive: true },
  { icon: DollarSign, label: 'Revenue (Month)', value: '₹4.5L', change: '+18%', positive: true },
];

const recentEnrollments = [
  { id: 1, name: 'John Doe', course: 'Python Full Stack', date: '2024-01-15', status: 'confirmed' },
  { id: 2, name: 'Jane Smith', course: 'Data Science', date: '2024-01-14', status: 'pending' },
  { id: 3, name: 'Mike Johnson', course: 'MERN Stack', date: '2024-01-14', status: 'confirmed' },
  { id: 4, name: 'Sarah Williams', course: 'AWS Cloud', date: '2024-01-13', status: 'confirmed' },
  { id: 5, name: 'Tom Brown', course: 'DevOps', date: '2024-01-13', status: 'pending' },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.positive ? 'bg-blue-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={stat.positive ? 'text-blue-600' : 'text-red-600'} size={24} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/courses"
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <BookOpen className="text-blue-600" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                      Manage Courses
                    </div>
                    <div className="text-xs text-gray-600">Add, edit, or delete courses</div>
                  </div>
                </Link>

                <Link
                  to="/admin/enrollments"
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                >
                  <Users className="text-green-600" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-green-600">
                      View Enrollments
                    </div>
                    <div className="text-xs text-gray-600">Manage student enrollments</div>
                  </div>
                </Link>

                <Link
                  to="/admin/bookings"
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <Calendar className="text-purple-600" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                      Demo Bookings
                    </div>
                    <div className="text-xs text-gray-600">Review demo requests</div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Enrollments</h2>
                <Link to="/admin/enrollments" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  View All →
                </Link>
              </div>

              <div className="space-y-3">
                {recentEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {enrollment.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{enrollment.name}</div>
                        <div className="text-sm text-gray-600">{enrollment.course}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {enrollment.status === 'confirmed' ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : (
                          <Clock className="text-yellow-600" size={16} />
                        )}
                        <span className={`text-xs font-semibold ${
                          enrollment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{enrollment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">API Status</div>
                <div className="text-sm text-green-600">All systems operational</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Database</div>
                <div className="text-sm text-green-600">Connected</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Email Service</div>
                <div className="text-sm text-yellow-600">Configuration needed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Documentation Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Admin Panel Backend Integration</h3>
              <p className="text-sm text-blue-700 mb-2">
                This admin panel requires Django backend API integration. Ensure the following endpoints are configured:
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• GET /api/admin/stats/ - Dashboard statistics</li>
                <li>• GET /api/admin/enrollments/ - Recent enrollments</li>
                <li>• GET /api/admin/courses/ - Course management</li>
                <li>• POST /api/admin/courses/ - Add new course</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
