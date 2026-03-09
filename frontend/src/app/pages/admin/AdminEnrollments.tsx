import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Mail, Phone, Calendar } from 'lucide-react';

// Mock data - Replace with actual API calls
const mockEnrollments = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    course: 'Python Full Stack Development',
    date: '2024-01-15',
    status: 'confirmed',
    amount: '₹45,000'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    course: 'Data Science & Machine Learning',
    date: '2024-01-14',
    status: 'pending',
    amount: '₹50,000'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    course: 'MERN Stack Development',
    date: '2024-01-14',
    status: 'confirmed',
    amount: '₹42,000'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1234567893',
    course: 'AWS Cloud Computing',
    date: '2024-01-13',
    status: 'confirmed',
    amount: '₹35,000'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom@example.com',
    phone: '+1234567894',
    course: 'DevOps Engineering',
    date: '2024-01-13',
    status: 'pending',
    amount: '₹40,000'
  },
];

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    // TODO: API call to update enrollment status
    console.log('Updating enrollment status:', { id, newStatus });
    // API endpoint: PATCH /api/admin/enrollments/:id/
    setEnrollments(enrollments.map(e => 
      e.id === id ? { ...e, status: newStatus } : e
    ));
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesFilter = filter === 'all' || enrollment.status === filter;
    const matchesSearch = 
      enrollment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    confirmed: enrollments.filter(e => e.status === 'confirmed').length,
    cancelled: enrollments.filter(e => e.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Student Enrollments</h1>
          <p className="text-gray-600 mt-2">Manage and review all student enrollments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`p-4 rounded-xl border-2 transition-all ${
                filter === status
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600 capitalize">{status}</div>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment, index) => (
                  <motion.tr
                    key={enrollment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{enrollment.name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Mail size={14} />
                          {enrollment.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Phone size={14} />
                          {enrollment.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{enrollment.course}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        {enrollment.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{enrollment.amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={enrollment.status}
                        onChange={(e) => handleStatusChange(enrollment.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-2 outline-none cursor-pointer ${
                          enrollment.status === 'confirmed'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : enrollment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {enrollment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(enrollment.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm enrollment"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(enrollment.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel enrollment"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredEnrollments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No enrollments found matching your criteria.</p>
          </div>
        )}

        {/* API Documentation Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            <strong>API Integration:</strong> This page requires Django backend integration with the following endpoints:
          </p>
          <ul className="text-xs text-blue-600 mt-2 space-y-1">
            <li>• GET /api/admin/enrollments/ - List all enrollments</li>
            <li>• PATCH /api/admin/enrollments/:id/ - Update enrollment status</li>
            <li>• GET /api/admin/enrollments/stats/ - Get enrollment statistics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
