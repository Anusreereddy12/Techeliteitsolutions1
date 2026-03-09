import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { OnlineCourses } from './pages/OnlineCourses';
import { OfflineCourses } from './pages/OfflineCourses';
import { Placements } from './pages/Placements';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CourseDetail } from './pages/CourseDetail';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminEnrollments } from './pages/admin/AdminEnrollments';
import { AdminBookings } from './pages/admin/AdminBookings';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses/online" element={<OnlineCourses />} />
          <Route path="/courses/offline" element={<OfflineCourses />} />
          <Route path="/courses/placements" element={<Placements />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
        </Routes>
        {!["/login", "/register"].includes(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
}
