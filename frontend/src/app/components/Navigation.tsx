import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, User, Settings } from 'lucide-react';

interface UserData {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_staff?: boolean;
  is_admin?: boolean;
  is_superuser?: boolean;
  role?: string;
}

export function Navigation() {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen]       = useState(false);
  const [isProfileOpen, setIsProfileOpen]       = useState(false);
  const [user, setUser]                         = useState<UserData | null>(null);
  const location   = useLocation();
  const navigate   = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  // Read user on mount AND on every storage change
  const loadUser = () => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []); // on mount

  useEffect(() => {
    loadUser();
  }, [location.pathname]); // on every route change

  // Also listen for storage events (cross-tab login/logout)
  useEffect(() => {
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const isAdmin = !!(
    user?.is_staff     === true ||
    user?.is_admin     === true ||
    user?.is_superuser === true ||
    user?.role         === 'admin'
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
  };

  const getDisplayName = () => {
    if (!user) return '';
    const full = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.name || '';
    return full.trim() || user.email?.split('@')[0] || 'Account';
  };

  const getInitials = () => {
    const name = getDisplayName();
    if (name && name !== 'Account') {
      return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  // ── DEBUG: remove this block after confirming it works ──
  useEffect(() => {
    console.log('[Nav] user state:', user);
    console.log('[Nav] isAdmin:', isAdmin);
    console.log('[Nav] localStorage raw:', localStorage.getItem('user'));
  }, [user]);
  // ────────────────────────────────────────────────────────

  return (
    <nav className={`w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">TechElite</h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <Link to="/" className={`transition-colors ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Home</Link>
              <Link to="/services" className={`transition-colors ${isActive('/services') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Services</Link>

              <div className="relative" onMouseEnter={() => setIsCoursesOpen(true)} onMouseLeave={() => setIsCoursesOpen(false)}>
                <button className={`flex items-center gap-1 transition-colors ${
                  location.pathname.startsWith('/courses') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  Courses
                  <ChevronDown size={16} className={`transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCoursesOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 mt-1 z-50">
                    <Link to="/courses/online"     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Online Courses</Link>
                    <Link to="/courses/offline"    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Offline Courses</Link>
                    <Link to="/courses/placements" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Placements</Link>
                  </div>
                )}
              </div>

              <Link to="/about"   className={`transition-colors ${isActive('/about')   ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>About</Link>
              <Link to="/contact" className={`transition-colors ${isActive('/contact') ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>Contact</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">

                {/* Admin Dashboard pill — always visible for admins */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <LayoutDashboard size={15} />
                    Dashboard
                  </Link>
                )}

                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(v => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600'}`}>
                      {getInitials()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 max-w-[110px] truncate">
                      {getDisplayName()}
                    </span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600'}`}>
                            {getInitials()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{getDisplayName()}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                          </div>
                        </div>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">
                            ✦ Admin
                          </span>
                        )}
                      </div>

                      <div className="py-1">
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <LayoutDashboard size={15} /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                          <User size={15} /> My Profile
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsProfileOpen(false)}>
                          <Settings size={15} /> Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors font-medium">
                          <LogOut size={15} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link to="/login"    className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMobileMenuOpen(v => !v)} className="lg:hidden text-gray-700">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <Link to="/"         className="block text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition-colors">Services</Link>

            <div>
              <button onClick={() => setIsCoursesOpen(v => !v)} className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors w-full">
                Courses <ChevronDown size={16} className={`transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCoursesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="/courses/online"     className="block text-gray-600 hover:text-blue-600 transition-colors">Online Courses</Link>
                  <Link to="/courses/offline"    className="block text-gray-600 hover:text-blue-600 transition-colors">Offline Courses</Link>
                  <Link to="/courses/placements" className="block text-gray-600 hover:text-blue-600 transition-colors">Placements</Link>
                </div>
              )}
            </div>

            <Link to="/about"   className="block text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>

            <div className="border-t pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${isAdmin ? 'bg-violet-600' : 'bg-blue-600'}`}>
                      {getInitials()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{getDisplayName()}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <span className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 shrink-0">Admin</span>
                    )}
                  </div>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                      <LayoutDashboard size={15} /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile"  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"><User size={15} /> My Profile</Link>
                  <Link to="/settings" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"><Settings size={15} /> Settings</Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 font-semibold w-full">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login"    className="block text-gray-700 hover:text-blue-600 font-semibold text-center transition-colors">Login</Link>
                  <Link to="/register" className="block bg-blue-600 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}