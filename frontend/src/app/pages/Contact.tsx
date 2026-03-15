import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

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
      className="group flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300
        bg-white/75 dark:bg-[#1c2230]/80
        border border-blue-100/60 dark:border-[#2d3748]
        hover:bg-white/95 dark:hover:bg-[#1e2a3a]
        hover:border-blue-300/60 dark:hover:border-blue-700/60
        shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)]"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0
        bg-blue-50/80 dark:bg-blue-900/30
        border border-blue-100/60 dark:border-blue-800/40">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[0.7rem] font-semibold mb-0.5 uppercase tracking-wider
          text-blue-500/70 dark:text-blue-400/70">
          {label}
        </div>
        <div className="text-sm font-medium leading-snug text-gray-900 dark:text-slate-200">
          {value}
        </div>
      </div>
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
        opacity-40 group-hover:opacity-90 transition-all duration-300
        bg-blue-50/80 dark:bg-blue-900/30
        border border-blue-100/60 dark:border-blue-800/40">
        <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
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

  const inputCls = `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200
    bg-white/85 dark:bg-[#161b22]
    border border-blue-100/60 dark:border-[#2d3748]
    text-gray-900 dark:text-slate-100
    placeholder-gray-400 dark:placeholder-slate-500
    focus:border-blue-400 dark:focus:border-blue-500
    focus:ring-2 focus:ring-blue-200/60 dark:focus:ring-blue-900/40
    focus:bg-white dark:focus:bg-[#1c2230]`;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#f5f7fa] dark:bg-[#0d1117]"
      style={{ fontFamily: "'DM Sans', 'Exo 2', sans-serif" }}
    >

      {/* ── CSS for CONTACT watermark dark/light ────────────────────────── */}
      <style>{`
        .contact-watermark {
          font-size: clamp(90px, 16vw, 210px);
          letter-spacing: -0.03em;
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(37, 99, 235, 0.20);
          background-image: linear-gradient(
            180deg,
            rgba(37, 99, 235, 0.09) 0%,
            rgba(79, 70, 229, 0.03) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
        }
        .dark .contact-watermark {
          -webkit-text-stroke: 2.5px rgba(96, 165, 250, 0.55);
          background-image: linear-gradient(
            180deg,
            rgba(96, 165, 250, 0.18) 0%,
            rgba(129, 140, 248, 0.06) 100%
          );
          filter: drop-shadow(0 0 24px rgba(96, 165, 250, 0.18));
        }
      `}</style>

      {/* ── Decorative background ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{
          top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '1000px', height: '700px',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(99,131,200,0.10) 0%, rgba(120,150,220,0.05) 40%, transparent 68%)',
        }} />
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(80,100,160,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <svg className="absolute top-0 left-0 w-80 h-80 opacity-100 dark:opacity-40" viewBox="0 0 320 320" fill="none">
          <path d="M0 100 H80 Q96 100 96 116 V160 Q96 176 112 176 H200" stroke="rgba(80,100,180,0.18)" strokeWidth="1.2" />
          <circle cx="200" cy="176" r="4" stroke="rgba(80,100,180,0.22)" strokeWidth="1.2" fill="none" />
        </svg>
        <svg className="absolute top-0 right-0 w-80 h-80 opacity-100 dark:opacity-40" viewBox="0 0 320 320" fill="none">
          <path d="M320 80 H240 Q224 80 224 96 V140 Q224 156 208 156 H110" stroke="rgba(80,100,180,0.18)" strokeWidth="1.2" />
          <circle cx="110" cy="156" r="4" stroke="rgba(80,100,180,0.22)" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative pt-40 pb-20">

        {/* ── CONTACT watermark ── */}
        <div
          className="pointer-events-none absolute inset-x-0 top-10 flex items-start justify-center overflow-hidden select-none"
          style={{ zIndex: 0 }}
        >
          <motion.span
            {...fadeIn(0, 1.4)}
            className="contact-watermark font-black tracking-tighter leading-none"
          >
            CONTACT
          </motion.span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

          {/* Badge */}
          <motion.div {...fadeIn(0.05, 0.6)} className="mb-8">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold
                bg-blue-50/80 dark:bg-blue-900/30
                border border-blue-200/60 dark:border-blue-800/50
                text-blue-600 dark:text-blue-400"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="w-4 h-4 rounded-full border border-blue-300/50 dark:border-blue-700/50 flex items-center justify-center text-[9px] text-blue-500 dark:text-blue-400">◎</div>
              Contact
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 xl:gap-14 items-start">

            {/* Left */}
            <div className="flex flex-col">
              <motion.div {...fadeUp(0.1)} className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                  Get in touch
                </h1>
                <p className="text-sm leading-relaxed max-w-xs text-gray-500 dark:text-slate-400">
                  Have a question about our courses, placement support, or want to book a free demo?
                  Our team is here to help — reach out and we'll respond within 24 hours.
                </p>
              </motion.div>

              <div className="flex flex-col gap-3">
                <motion.div {...fadeUp(0.18)}>
                  <InfoCard icon={Mail}   label="Email us"      value="info@techeliteitsolutions.com" href="mailto:info@techeliteitsolutions.com" />
                </motion.div>
                <motion.div {...fadeUp(0.23)}>
                  <InfoCard icon={Phone}  label="Call us"       value="9133966888 · 9133454949"       href="tel:+919133966888" />
                </motion.div>
                <motion.div {...fadeUp(0.28)}>
                  <InfoCard icon={MapPin} label="Our location"  value="Hyderabad, Telangana" />
                </motion.div>
                <motion.div {...fadeUp(0.33)}>
                  <InfoCard icon={Clock}  label="Working hours" value="Mon – Sat: 9:00 AM – 7:00 PM" />
                </motion.div>
              </div>
            </div>

            {/* Right: form */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative rounded-2xl overflow-hidden
                bg-white/80 dark:bg-[#1c2230]/90
                border border-blue-100/50 dark:border-[#2d3748]
                shadow-[0_8px_48px_rgba(80,100,180,0.10)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
              style={{ backdropFilter: 'blur(20px)' }}
            >
              <div className="p-7 md:p-9">

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl
                      bg-green-50/90 dark:bg-green-900/25
                      border border-green-200/60 dark:border-green-800/50"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100 dark:bg-green-900/40">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-800 dark:text-green-300">Message sent!</p>
                      <p className="text-xs text-green-600 dark:text-green-400">We'll respond within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl
                    bg-rose-50 dark:bg-rose-900/25
                    border border-rose-200 dark:border-rose-800/50
                    text-rose-700 dark:text-rose-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Name" required className={inputCls}
                  />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Email" required className={inputCls}
                  />
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Message" required rows={8}
                    className={inputCls + ' resize-none'}
                  />
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
                      font-semibold text-sm text-white transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                      boxShadow: '0 4px 20px rgba(79,70,229,0.28)',
                    }}
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div {...fadeUp(0.45)} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '< 24h', label: 'Response Time'   },
              { value: '5000+', label: 'Students Helped'  },
              { value: '95%',   label: 'Placement Rate'   },
              { value: 'Free',  label: 'Demo Class'       },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-xl px-5 py-5 text-center transition-all duration-300
                  bg-white/75 dark:bg-[#1c2230]/80
                  border border-blue-100/50 dark:border-[#2d3748]
                  hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="text-2xl font-black mb-1 text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Map ─────────────────────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.35)} className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-5">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200/50 dark:via-blue-900/50 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
              bg-blue-50/80 dark:bg-blue-900/30
              border border-blue-200/60 dark:border-blue-800/50
              text-blue-600 dark:text-blue-400">
              <MapPin className="w-3.5 h-3.5" /> Find Us on the Map
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200/50 dark:via-blue-900/50 to-transparent" />
          </div>
        </div>

        <div className="relative w-full overflow-hidden"
          style={{ height: '420px', borderRadius: '24px 24px 0 0', border: '1px solid rgba(180,200,240,0.4)', borderBottom: 'none' }}>
          <iframe
            title="TechElite Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3310815047406!2d78.3717!3d17.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dfe2c9fe13%3A0x2bd80736a7c25850!2sHitech%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="100%"
            className="absolute inset-0 w-full h-full [.dark_&]:invert [.dark_&]:hue-rotate-180 [.dark_&]:saturate-50 [.dark_&]:brightness-90"
            style={{ border: 0, filter: 'saturate(0.9) contrast(1.02)', display: 'block' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-5 left-6 flex items-center gap-3 z-10 px-4 py-3 rounded-xl
            bg-white/92 dark:bg-[#1c2230]/95
            border border-blue-100/60 dark:border-[#2d3748]"
            style={{ backdropFilter: 'blur(12px)', boxShadow: '0 8px 24px rgba(80,100,180,0.14)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50/80 dark:bg-blue-900/30">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 dark:text-white">TechElite IT Solutions</div>
              <div className="text-[10px] font-medium text-gray-500 dark:text-slate-400">Hyderabad, Telangana</div>
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 dark:text-green-400">Open Now</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}