import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, BookOpen,
  Award, Clock, Edit3, Camera, ChevronRight,
  CheckCircle, TrendingUp, Lock, Save, X,
} from 'lucide-react';

const enrolledCourses = [
  {
    title: 'Python Full Stack Development',
    progress: 65,
    status: 'In Progress',
    duration: '6 Months',
    gradient: 'from-blue-500 to-indigo-500',
    shadow: 'shadow-blue-100',
  },
  {
    title: 'Data Science & AI',
    progress: 100,
    status: 'Completed',
    duration: '6 Months',
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-100',
  },
  {
    title: 'DevOps Engineering',
    progress: 30,
    status: 'In Progress',
    duration: '5 Months',
    gradient: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-100',
  },
];

const achievements = [
  { icon: BookOpen,   label: 'Courses Enrolled', value: '3',   gradient: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-100'    },
  { icon: CheckCircle,label: 'Completed',         value: '1',   gradient: 'from-emerald-500 to-teal-500',  shadow: 'shadow-emerald-100' },
  { icon: Award,      label: 'Certificates',      value: '1',   gradient: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-100'  },
  { icon: TrendingUp, label: 'Avg Progress',       value: '65%', gradient: 'from-sky-500 to-blue-500',     shadow: 'shadow-sky-100'     },
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'courses' | 'security'>('courses');
  const [profile, setProfile] = useState({
    name: 'Vikas Kumar',
    email: 'vikas@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    joinDate: 'January 2025',
    bio: 'Passionate IT professional upskilling with TechElite to build a strong career in full-stack development and cloud technologies.',
  });
  const [form, setForm] = useState(profile);

  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              My Profile
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Learning Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Track your progress, manage your profile, and celebrate your achievements
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* ── Stats Row ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
        >
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-md ${item.shadow} hover:shadow-xl transition-all duration-300 overflow-hidden text-center`}
              >
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-200 rounded-tl-2xl" />
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} mb-4 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {item.value}
                </div>
                <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{item.label}</div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main Content Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Profile Card ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">

              {/* Cover */}
              <div className="h-28 bg-gradient-to-br from-blue-600 to-indigo-600 relative">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
                />
              </div>

              {/* Avatar */}
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4 w-fit">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white text-3xl font-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow hover:bg-blue-700 transition-colors">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    {profile.name}
                  </h2>
                  <p className="text-blue-600 text-sm font-semibold">TechElite Student</p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">{profile.bio}</p>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Mail,     value: profile.email    },
                    { icon: Phone,    value: profile.phone    },
                    { icon: MapPin,   value: profile.location },
                    { icon: Calendar, value: `Joined ${profile.joinDate}` },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate">{item.value}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Tabs Content ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Tab switcher */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
              {(['courses', 'security'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'courses' ? 'My Courses' : 'Security'}
                </button>
              ))}
            </div>

            {/* ── Courses Tab ─── */}
            {activeTab === 'courses' && (
              <div className="space-y-5">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl ${course.shadow} transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            course.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                          {course.progress}%
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Complete</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 + index * 0.1 }}
                      />
                      <motion.div
                        className="absolute top-0 h-full w-24 rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)' }}
                        initial={{ left: '-10%' }}
                        animate={{ left: '110%' }}
                        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 + index * 0.1 }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        to="/courses/online"
                        className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:gap-2 transition-all"
                      >
                        {course.status === 'Completed' ? 'View Certificate' : 'Continue Learning'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      {course.status === 'Completed' && (
                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
                          <Award className="w-4 h-4" />
                          Certified
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Browse more */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center"
                >
                  <BookOpen className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Explore More Courses</h4>
                  <p className="text-gray-500 text-sm mb-4">Keep learning and growing your skillset</p>
                  <Link
                    to="/courses/online"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Browse Courses
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            )}

            {/* ── Security Tab ─── */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8"
              >
                <h3 className="text-xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  Change Password
                </h3>
                <div className="space-y-5">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                    <div key={i}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm mt-2">
                    Update Password
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Account Security
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Two-Factor Authentication', status: 'Disabled', color: 'text-orange-500' },
                      { label: 'Login Notifications',       status: 'Enabled',  color: 'text-emerald-600' },
                      { label: 'Active Sessions',           status: '1 Device', color: 'text-blue-600'    },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                        <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Edit Profile Modal ───────────────────────────────────────────── */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsEditing(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Edit Profile
              </h3>
              <button onClick={() => setIsEditing(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Full Name',  icon: User,     key: 'name',     type: 'text'  },
                { label: 'Email',      icon: Mail,     key: 'email',    type: 'email' },
                { label: 'Phone',      icon: Phone,    key: 'phone',    type: 'text'  },
                { label: 'Location',   icon: MapPin,   key: 'location', type: 'text'  },
              ].map(({ label, icon: Icon, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}