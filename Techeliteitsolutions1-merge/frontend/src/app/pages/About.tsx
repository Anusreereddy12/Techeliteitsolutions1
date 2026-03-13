import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Target, Eye, Award, Users, TrendingUp, CheckCircle,
  BookOpen, Headphones, Infinity, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   Animated Skill Progress Bar
   Width animates 0 → target% when it enters the viewport (fires once).
───────────────────────────────────────────────────────────────────────────── */
function SkillBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mb-7">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-gray-800 dark:text-gray-100 font-semibold text-sm tracking-wide"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {label}
        </span>
        <motion.span
          className="text-blue-600 font-bold text-sm tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {percent}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Animated fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
        />
        {/* Shine sweep */}
        <motion.div
          className="absolute top-0 h-full w-24 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
          }}
          initial={{ left: '-10%' }}
          animate={inView ? { left: '110%' } : { left: '-10%' }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   About Page
───────────────────────────────────────────────────────────────────────────── */
export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO IMAGE  (new)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">

          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/40 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              About TechElite
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Empowering Careers with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Expert IT Skills
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Empowering individuals with cutting-edge IT skills for successful careers
            </p>
          </motion.div>

          {/* Hero banner image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-xl mb-20"
            style={{ height: 'clamp(280px, 45vw, 480px)' }}
          >
            <img
  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80&fit=crop"
  alt="DevOps engineer monitoring infrastructure"
  className="w-full h-full object-cover"
/>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-white/90 text-lg md:text-2xl font-semibold max-w-2xl leading-snug"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Building the next generation of IT professionals — one expert at a time.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── wrapper for existing centred sections ── */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ══════════════════════════════════════════════════════════════════
            EXISTING — Our Story (unchanged)
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between academic learning and industry requirements, TechElite IT Solutions has been at the forefront of technical education since its inception.
              </p>
              <p>
                We understand the challenges faced by aspiring IT professionals in today's competitive market. Our comprehensive training programs are designed by industry experts who bring years of real-world experience to the classroom.
              </p>
              <p>
                With a focus on practical, hands-on learning and placement support, we've helped thousands of students launch successful careers in the IT industry.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            EXISTING — Mission & Vision (unchanged)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl p-8"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To provide world-class IT training that equips individuals with practical skills, industry knowledge, and the confidence to excel in their chosen tech careers. We aim to create job-ready professionals who can contribute meaningfully to the digital economy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl p-8"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Eye className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To become the most trusted name in IT education and training, recognized globally for producing skilled professionals who drive innovation and technological advancement across industries.
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            EXISTING — Why Choose TechElite (unchanged)
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Why Choose TechElite?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award,       title: 'Industry-Recognized Certifications', description: 'Earn certificates that are valued by top companies worldwide.' },
              { icon: Users,       title: 'Expert Trainers',                    description: 'Learn from professionals with 10+ years of industry experience.' },
              { icon: TrendingUp,  title: '95% Placement Rate',                 description: 'Our dedicated placement team helps you land your dream job.' },
              { icon: CheckCircle, title: 'Hands-on Projects',                  description: 'Work on real-world projects to build a strong portfolio.' },
              { icon: Users,       title: 'Small Batch Size',                   description: 'Personalized attention with batches of 15-20 students.' },
              { icon: Award,       title: 'Lifetime Support',                   description: 'Access course materials and get support even after completion.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <item.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            EXISTING — Blue stats bar (unchanged)
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5000+', label: 'Students Trained'  },
              { number: '50+',   label: 'Expert Trainers'   },
              { number: '100+',  label: 'Hiring Partners'   },
              { number: '95%',   label: 'Placement Rate'    },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>{/* /max-w-7xl — intentionally closed so new sections run full-width */}


      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — WHO WE ARE  (new)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white dark:bg-slate-900 text-blue-600 text-sm font-semibold mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                About Us
              </div>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Who{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                  We Are
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                We are providing the best quality online courses. Our all instructors are highly expert.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We are a leading provider of comprehensive IT solutions, dedicated to empowering businesses with cutting-edge technology and exceptional service. Our mission is to transform your vision into reality, leveraging our deep industry knowledge and technical prowess to drive your success.
              </p>

              <div className="space-y-3">
                {[
                  'Expert-led live & recorded sessions',
                  'Real-world project-based curriculum',
                  'Dedicated placement support team',
                  '24/7 mentor access & doubt resolution',
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — image with floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="flex-1 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fit=crop"
                  alt="IT training team collaboration"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div
                        className="text-xl font-black text-gray-900 dark:text-white"
                        style={{ fontFamily: "'Exo 2', sans-serif" }}
                      >
                        5000+
                      </div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Students Trained</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — WHY WE ARE THE BEST  (new)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/40 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Best Learning Platform
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Why We Are{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                The Best
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Everything you need to accelerate your IT career — all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                bar: 'from-blue-500 to-blue-600',
                border: 'border-blue-100 hover:border-blue-300',
                shadow: 'hover:shadow-blue-100',
                title: 'High Quality Courses',
                description: 'We offer a wide range of IT services designed to meet the diverse needs of modern businesses. Whether you require robust cybersecurity measures, efficient DevOps solutions, advanced data engineering, or full stack development, we have the expertise to deliver comprehensive solutions that address all your IT needs.',
              },
              {
                icon: Headphones,
                iconBg: 'bg-indigo-100',
                iconColor: 'text-indigo-600',
                bar: 'from-indigo-500 to-indigo-600',
                border: 'border-indigo-100 hover:border-indigo-300',
                shadow: 'hover:shadow-indigo-100',
                title: 'Support & Maintenance',
                description: 'Our team consists of highly skilled professionals with extensive knowledge and experience in their respective fields. From cybersecurity experts to DevOps engineers, data analysts, and full stack developers, our team is equipped to handle the most complex IT challenges with ease and proficiency.',
              },
              {
                icon: Infinity,
                iconBg: 'bg-sky-100',
                iconColor: 'text-sky-600',
                bar: 'from-sky-500 to-blue-500',
                border: 'border-sky-100 hover:border-sky-300',
                shadow: 'hover:shadow-sky-100',
                title: 'Life Time Access',
                description: "Our commitment to your success doesn't end with the implementation of our solutions. We provide continuous support and maintenance to ensure that our services continue to deliver value long after deployment.",
              },
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className={`group relative bg-white dark:bg-slate-900 border ${card.border} rounded-2xl p-8 shadow-sm hover:shadow-xl ${card.shadow} transition-all duration-300 overflow-hidden`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${card.iconBg} rounded-2xl mb-6`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-[0.92rem]">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — OUR SKILLS  (new)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, #1d4ed8, #1d4ed8 1px, transparent 1px, transparent 14px)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Left — dashboard image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop"
                  alt="Data analytics dashboard"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-700/20" />
                <div className="absolute top-6 right-6 bg-white dark:bg-slate-900/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">100% Job Ready</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — skill bars */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1 w-full"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white dark:bg-slate-900 text-blue-600 text-sm font-semibold mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Our Expertise
              </div>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Our{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                  Skills
                </span>
              </h2>
              <p className="text-gray-500 text-base mb-10">
                What we offer — industry-validated expertise across every modern IT domain.
              </p>

              <SkillBar label="Cyber Security (SOC)" percent={100} />
              <SkillBar label="AWS DevOps"           percent={100} />
              <SkillBar label="Azure DevOps"         percent={100} />
              <SkillBar label="GCP DevOps"           percent={93}  />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — ACHIEVEMENT STATS CARDS  (new)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/40 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Our Achievements
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Numbers That{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Speak
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Proven results that define our commitment to excellence</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users,       number: '5000+', label: 'Students Trained',  gradient: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-100'    },
              { icon: Award,       number: '50+',   label: 'Expert Trainers',   gradient: 'from-indigo-500 to-indigo-600',  shadow: 'shadow-indigo-100'  },
              { icon: TrendingUp,  number: '100+',  label: 'Hiring Partners',   gradient: 'from-sky-500 to-blue-500',       shadow: 'shadow-sky-100'     },
              { icon: CheckCircle, number: '95%',   label: 'Placement Rate',    gradient: 'from-emerald-500 to-teal-500',   shadow: 'shadow-emerald-100' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  whileHover={{ y: -4 }}
                  className={`group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-md ${stat.shadow} hover:shadow-xl transition-all duration-300 overflow-hidden text-center`}
                >
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-200 rounded-tl-2xl" />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} mb-4 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className="text-3xl font-black text-gray-900 dark:text-white mb-1"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          EXISTING — CTA  (unchanged)
      ════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of successful professionals who started their careers with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Book Free Demo
            </Link>
            <Link
              to="/contact"
              className="bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 dark:bg-blue-900/40 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}