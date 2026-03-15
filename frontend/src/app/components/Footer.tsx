// ── src/components/Footer.tsx ─────────────────────────────────────────────
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-[#080c12] border-t border-gray-800 dark:border-[#1a2035] text-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              <span className="text-blue-400 dark:text-blue-400">Tech</span>
              <span className="text-white">Elite</span>
            </h3>
            <p className="text-gray-400 dark:text-slate-500 text-sm mb-2 font-medium">www.techeliteitsolutions.com</p>
            <p className="text-gray-400 dark:text-slate-400 mb-5 max-w-sm text-sm leading-relaxed">
              Empowering individuals with cutting-edge IT skills for successful careers. Industry-leading training with guaranteed placement support.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-gray-800 dark:bg-[#1c2230] border border-gray-700 dark:border-[#2d3748] rounded-xl flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-200">
                  <Icon size={16} className="text-gray-400 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white dark:text-slate-100 mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/services',           label: 'Services'        },
                { to: '/courses/online',     label: 'Online Courses'  },
                { to: '/courses/offline',    label: 'Offline Courses' },
                { to: '/courses/placements', label: 'Placements'      },
                { to: '/about',              label: 'About Us'        },
                { to: '/contact',            label: 'Contact'         },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-gray-400 dark:text-slate-500 hover:text-blue-400 dark:hover:text-blue-400 transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white dark:text-slate-100 mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone,  text: '9133966888'                     },
                { icon: Phone,  text: '9133454949'                     },
                { icon: Mail,   text: 'info@techeliteitsolutions.com'   },
                { icon: MapPin, text: 'Hyderabad, Telangana'            },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 dark:text-slate-500">
                  <Icon size={14} className="mt-0.5 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 dark:border-[#1a2035] pt-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-slate-600">
              © {currentYear} TechElite IT Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(label => (
                <a key={label} href="#"
                  className="text-gray-500 dark:text-slate-600 hover:text-blue-400 dark:hover:text-blue-400 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}