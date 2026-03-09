import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Search, CheckCircle, XCircle, Calendar, Mail, Phone, Clock } from 'lucide-react';

// Mock data - Replace with actual API calls
const mockBookings = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    course: 'Python Full Stack',
    mode: 'online',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'pending',
    message: 'Interested in learning Python development'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1234567891',
    course: 'Data Science',
    mode: 'offline',
    date: '2024-01-21',
    time: '2:00 PM',
    status: 'confirmed',
    message: 'Want to attend demo at your training center'
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+1234567892',
    course: 'MERN Stack',
    mode: 'online',
    date: '2024-01-22',
    time: '11:00 AM',
    status: 'pending',
    message: ''
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+1234567893',
    course: 'AWS Cloud',
    mode: 'online',
    date: '2024-01-23',
    time: '3:00 PM',
    status: 'confirmed',
    message: 'Need career guidance for cloud computing'
  },
  {
    id: 5,
    name: 'Emma Martinez',
    email: 'emma@example.com',
    phone: '+1234567894',
    course: 'DevOps',
    mode: 'offline',
    date: '2024-01-24',
    time: '10:00 AM',
    status: 'cancelled',
    message: ''
  },
];

export function AdminBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    // TODO: API call to update booking status
    console.log('Updating booking status:', { id, newStatus });
    // API endpoint: PATCH /api/admin/bookings/:id/
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin" className="text-blue-600 hover:text-blue-700 text-sm font-semibold mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Demo Bookings</h1>
          <p className="text-gray-600 mt-2">Manage demo class bookings and requests</p>
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

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
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

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{booking.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.mode === 'online' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {booking.mode}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Course: {booking.course}
                  </div>
                </div>
                
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-2 outline-none cursor-pointer ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      : 'bg-red-100 text-red-700 border-red-200'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-blue-600" />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-blue-600" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-blue-600" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-blue-600" />
                  <span>{booking.time}</span>
                </div>
              </div>

              {booking.message && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Message:</strong> {booking.message}
                  </p>
                </div>
              )}

              {booking.status === 'pending' && (
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle size={18} />
                    Confirm Demo
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'cancelled')}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <XCircle size={18} />
                    Cancel Demo
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </div>
        )}

        {/* API Documentation Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            <strong>API Integration:</strong> This page requires Django backend integration with the following endpoints:
          </p>
          <ul className="text-xs text-blue-600 mt-2 space-y-1">
            <li>• GET /api/admin/bookings/ - List all demo bookings</li>
            <li>• PATCH /api/admin/bookings/:id/ - Update booking status</li>
            <li>• GET /api/admin/bookings/stats/ - Get booking statistics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
