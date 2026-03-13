import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone, Mail, MapPin, Clock,
  ArrowUpRight,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay = 0, duration = 0.9) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay },
});

function InfoCard({ icon: Icon, label, value, href }: {
  icon: React.ElementType; label: string; value: string; href?: string;
}) {
  const inner = (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(180,200,240,0.5)',
        backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(80,100,180,0.06)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.95)';
        el.style.borderColor = 'rgba(99,131,220,0.45)';
        el.style.boxShadow = '0 6px 24px rgba(80,100,180,0.13)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.75)';
        el.style.borderColor = 'rgba(180,200,240,0.5)';
        el.style.boxShadow = '0 2px 12px rgba(80,100,180,0.06)';
      }}
    >
      <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(219,234,254,0.6)', border: '1px solid rgba(147,197,253,0.4)' }}>
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[0.7rem] font-semibold mb-0.5" style={{ color: 'rgba(80,100,140,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
        <div className="text-sm font-medium leading-snug" style={{ color: '#1e293b' }}>{value}</div>
      </div>
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 opacity-40 group-hover:opacity-90 transition-all duration-300"
        style={{ background: 'rgba(219,234,254,0.6)', border: '1px solid rgba(147,197,253,0.4)' }}>
        <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" />
      </div>
    </motion.div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(180,200,240,0.6)',
    color: '#1e293b', borderRadius: '10px', width: '100%', padding: '14px 16px',
    fontSize: '0.875rem', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit',
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(99,131,220,0.55)';
    e.target.style.background = '#ffffff';
    e.target.style.boxShadow = '0 0 0 3px rgba(99,131,220,0.1)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(180,200,240,0.6)';
    e.target.style.background = 'rgba(255,255,255,0.85)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', 'Exo 2', sans-serif", background: '#f5f7fa' }}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse at 50% 20%, rgba(99,131,200,0.13) 0%, rgba(120,150,220,0.07) 40%, transparent 68%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(80,100,160,0.13) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <svg className="absolute top-0 left-0 w-80 h-80" viewBox="0 0 320 320" fill="none">
          <path d="M0 100 H80 Q96 100 96 116 V160 Q96 176 112 176 H200" stroke="rgba(80,100,180,0.18)" strokeWidth="1.2"/>
          <circle cx="200" cy="176" r="4" stroke="rgba(80,100,180,0.22)" strokeWidth="1.2" fill="none"/>
        </svg>
        <svg className="absolute top-0 right-0 w-80 h-80" viewBox="0 0 320 320" fill="none">
          <path d="M320 80 H240 Q224 80 224 96 V140 Q224 156 208 156 H110" stroke="rgba(80,100,180,0.18)" strokeWidth="1.2"/>
          <circle cx="110" cy="156" r="4" stroke="rgba(80,100,180,0.22)" strokeWidth="1.2" fill="none"/>
        </svg>
      </div>

      <div className="relative pt-45 pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-10 flex items-start justify-center overflow-hidden select-none" aria-hidden="true" style={{ zIndex: 0 }}>
          <motion.span {...fadeIn(0, 1.6)} className="font-black tracking-tighter leading-none"
            style={{ fontSize: 'clamp(90px, 16vw, 210px)', color: 'transparent', WebkitTextStroke: '2px rgba(60,80,160,0.12)', backgroundImage: 'linear-gradient(180deg, rgba(80,100,200,0.11) 0%, rgba(80,100,200,0.04) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', letterSpacing: '-0.03em' }}>
            CONTACT
          </motion.span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div {...fadeIn(0.05, 0.6)} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(219,234,254,0.6)', border: '1px solid rgba(147,197,253,0.5)', color: '#4b6fa8', backdropFilter: 'blur(8px)' }}>
              <div className="w-4 h-4 rounded-full border flex items-center justify-center text-[9px]" style={{ borderColor: 'rgba(100,140,220,0.4)', color: '#6b8fd4' }}>◎</div>
              Contact
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 xl:gap-14 items-start">
            {/* Left */}
            <div className="flex flex-col">
              <motion.div {...fadeUp(0.1)} className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#0f172a' }}>Get in touch</h1>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#64748b' }}>
                  Have a question about our courses, placement support, or want to book a free demo?
                  Our team is here to help — reach out and we'll respond within 24 hours.
                </p>
              </motion.div>
              <div className="flex flex-col gap-3">
                <motion.div {...fadeUp(0.18)}><InfoCard icon={Mail}   label="Email us"      value="info@techelite.in"    href="mailto:info@techelite.in" /></motion.div>
                <motion.div {...fadeUp(0.23)}><InfoCard icon={Phone}  label="Call us"       value="+91 91339 66888"     href="tel:+919133966888" /></motion.div>
                <motion.div {...fadeUp(0.24)}><InfoCard icon={Phone}  label="Alt. Phone"    value="+91 91334 54949"     href="tel:+919133454949" /></motion.div>
                <motion.div {...fadeUp(0.28)}><InfoCard icon={MapPin} label="Our location"  value="Plot 42, Tech Park Lane, Hitech City, Hyderabad" /></motion.div>
                <motion.div {...fadeUp(0.33)}><InfoCard icon={Clock}  label="Working hours" value="Mon – Sat: 9:00 AM – 7:00 PM" /></motion.div>
              </div>
            </div>

            {/* Right - Form */}
            <motion.div {...fadeUp(0.15)} className="relative rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(180,200,240,0.5)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 48px rgba(80,100,180,0.1), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
              <div className="p-7 md:p-9">
                {submitted && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(240,253,244,0.9)', border: '1px solid rgba(134,239,172,0.6)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(74,222,128,0.15)' }}>
                      <svg className="w-4 h-4" style={{ color: '#4ade80' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-800">Message sent!</p>
                      <p className="text-xs text-green-600">We'll respond within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Name" required style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Email" required style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Message" required rows={8}
                    style={{ ...inputStyle, resize: 'none' }} onFocus={inputFocus} onBlur={inputBlur} />

                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', color: '#ffffff', letterSpacing: '0.02em', boxShadow: '0 4px 20px rgba(79,70,229,0.28)' }}>
                    {loading ? 'Sending...' : 'Submit'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div {...fadeUp(0.45)} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '< 24h', label: 'Response Time' },
              { value: '5000+', label: 'Students Helped' },
              { value: '95%',   label: 'Placement Rate' },
              { value: 'Free',  label: 'Demo Class' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }} whileHover={{ y: -3 }}
                className="group relative rounded-xl px-5 py-5 text-center overflow-hidden transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(180,200,240,0.5)', backdropFilter: 'blur(10px)', boxShadow: '0 2px 12px rgba(80,100,180,0.05)' }}>
                <div className="text-2xl font-black mb-1" style={{ color: '#0f172a' }}>{stat.value}</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Map */}
      <motion.div {...fadeUp(0.35)} className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-5">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(80,100,180,0.15), transparent)' }} />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{ background: 'rgba(219,234,254,0.6)', border: '1px solid rgba(147,197,253,0.5)', color: '#4b6fa8' }}>
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Find Us on the Map
            </div>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(80,100,180,0.15), transparent)' }} />
          </div>
        </div>
        <div className="relative w-full overflow-hidden" style={{ height: '420px', borderRadius: '24px 24px 0 0', border: '1px solid rgba(180,200,240,0.5)', borderBottom: 'none', boxShadow: '0 -4px 24px rgba(80,100,180,0.07)' }}>
          <iframe title="TechElite Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3310815047406!2d78.3717!3d17.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dfe2c9fe13%3A0x2bd80736a7c25850!2sHitech%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="100%" style={{ border: 0, filter: 'saturate(0.9) contrast(1.02)', display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full" />
          <div className="absolute bottom-5 left-6 flex items-center gap-3 z-10 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(180,200,240,0.6)', boxShadow: '0 8px 24px rgba(80,100,180,0.14)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(219,234,254,0.7)' }}>
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: '#0f172a' }}>TechElite IT Solutions</div>
              <div className="text-[10px] font-medium" style={{ color: '#64748b' }}>Hitech City, Hyderabad</div>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold" style={{ color: '#4ade80' }}>Open Now</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}