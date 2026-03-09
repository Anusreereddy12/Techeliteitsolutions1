import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Award, Users, TrendingUp,
  Shield, ServerCog, Database, Lock, Brain, BarChart3,
  ArrowRight,
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NetworkBackground } from '../components/NetworkBackground';

/* ── Training Programs data ─────────────────────────────────────────────── */
const programs = [
  {
    title: 'Cyber Security',
    description: 'Ethical hacking, network defence & top certifications like CEH and CISSP.',
    icon: Shield,
    gradient: 'from-rose-500 to-orange-400',
    shadow: 'shadow-rose-200',
    glow: 'group-hover:shadow-rose-300',
  },
  {
    title: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes & cloud-native infrastructure at scale.',
    icon: ServerCog,
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-200',
    glow: 'group-hover:shadow-emerald-300',
  },
  {
    title: 'Azure Data Engineering',
    description: 'ADF, Synapse & Databricks pipelines on Microsoft Azure.',
    icon: Database,
    gradient: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-200',
    glow: 'group-hover:shadow-violet-300',
  },
  {
    title: 'SAP Security & GRC',
    description: 'SAP access control, risk frameworks & enterprise compliance.',
    icon: Lock,
    gradient: 'from-orange-500 to-amber-400',
    shadow: 'shadow-orange-200',
    glow: 'group-hover:shadow-orange-300',
  },
  {
    title: 'Data Science',
    description: 'ML models, neural networks & production AI with Python.',
    icon: Brain,
    gradient: 'from-cyan-500 to-sky-400',
    shadow: 'shadow-cyan-200',
    glow: 'group-hover:shadow-cyan-300',
  },
  {
    title: 'Data Analyst',
    description: 'Power BI, SQL & advanced visualisation for business insights.',
    icon: BarChart3,
    gradient: 'from-blue-600 to-indigo-500',
    shadow: 'shadow-blue-200',
    glow: 'group-hover:shadow-blue-300',
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-sky-50 to-blue-100" />
        <NetworkBackground />

        <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl"
            animate={{ y: [0, 80, 0], x: [0, 40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-32 right-16 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl"
            animate={{ y: [0, -60, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-16 left-1/3 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 60, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-blue-100/60 rounded-full blur-[70px]" />
          <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-indigo-100/50 rounded-full blur-[70px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-300 bg-blue-50 text-blue-700 text-sm font-semibold mb-6 shadow-sm"
              >
                {/* <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Next-Gen IT Education */}
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl xl:text-[4.25rem] font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Transform Your Career with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500">
                  Expert IT Training
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Industry-leading courses in software development, cloud computing, and more.
                Learn from experts and get placement assistance.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to="/booking"
                  className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md shadow-blue-200 hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-300"
                >
                  <span className="relative z-10">Book a Free Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/courses/online"
                  className="border-2 border-blue-500 text-blue-600 bg-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 hover:border-blue-600 hover:shadow-md transition-all duration-300"
                >
                  View Courses
                </Link>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { icon: Users,      number: '5000+', label: 'Students Trained'  },
                  { icon: BookOpen,   number: '50+',   label: 'Courses Available' },
                  { icon: Award,      number: '95%',   label: 'Placement Rate'    },
                  { icon: TrendingUp, number: '100+',  label: 'Hiring Partners'   },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-300 rounded-tl-2xl" />
                    <stat.icon className="w-6 h-6 text-blue-500 mb-3 group-hover:text-blue-600 transition-colors" />
                    <div className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="flex-1 flex items-center justify-center w-full lg:max-w-[520px]"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              <div className="relative w-full max-w-[460px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-blue-200/40 blur-3xl" />
                <div className="absolute inset-6 rounded-full border border-blue-200/70" />
                <DotLottieReact
                  src="https://lottie.host/bf2dd201-294a-4240-b169-71d90d90b050/HKKu2urWZ9.lottie"
                  autoplay
                  loop
                  style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent z-[4]" />
      </section>

      {/* ─── Why Choose TechElite Section ──────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #2563eb 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Why TechElite
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                TechElite?
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">Your success is our priority</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience in cutting-edge technologies.',
                icon: '⚡',
                accent: 'border-blue-200 hover:border-blue-400',
                iconBg: 'bg-blue-50',
                bar: 'from-blue-500 to-blue-600',
                shadow: 'hover:shadow-blue-100',
              },
              {
                title: 'Hands-on Projects',
                description: 'Build real-world projects to strengthen your portfolio, skills, and confidence for the job market.',
                icon: '🚀',
                accent: 'border-indigo-200 hover:border-indigo-400',
                iconBg: 'bg-indigo-50',
                bar: 'from-indigo-500 to-indigo-600',
                shadow: 'hover:shadow-indigo-100',
              },
              {
                title: 'Placement Support',
                description: 'Get dedicated placement assistance with 100+ hiring partners to kickstart your IT career.',
                icon: '🎯',
                accent: 'border-sky-200 hover:border-sky-400',
                iconBg: 'bg-sky-50',
                bar: 'from-sky-500 to-blue-500',
                shadow: 'hover:shadow-sky-100',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className={`group relative bg-white border ${feature.accent} rounded-2xl p-8 shadow-sm hover:shadow-lg ${feature.shadow} transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.iconBg} rounded-2xl text-3xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[0.95rem]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ─── Training Programs Section ────────────────────────────────────
          Only this section has been changed. Everything above is untouched.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">

        {/* Top gradient fade — smooth transition from white Features section */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

        {/* Section background */}
        <div className="absolute inset-0 bg-gray-100" />

        {/* Subtle diagonal lines texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #1d4ed8,
              #1d4ed8 1px,
              transparent 1px,
              transparent 12px
            )`,
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-blue-600 text-sm font-semibold mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Our Programs
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              Our Training{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Programs
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Industry-aligned courses built for the modern tech landscape
            </p>
          </motion.div>

          {/* ── Step row ── */}
          <div className="flex flex-col sm:flex-wrap md:flex-row items-start justify-center gap-y-10">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isLast = index === programs.length - 1;

              return (
                <div
                  key={program.title}
                  className="flex items-start md:items-center"
                >
                  {/* ── Program item ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.15, ease: 'easeOut' }}
                    className="group flex flex-col items-center text-center w-[148px] xl:w-[160px] shrink-0"
                  >
                    {/* Circle icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -4 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`
                        relative flex items-center justify-center
                        w-[110px] h-[110px] rounded-full
                        bg-gradient-to-br ${program.gradient}
                        shadow-lg ${program.shadow} ${program.glow}
                        transition-shadow duration-300 mb-5 cursor-pointer
                      `}
                    >
                      {/* Soft inner highlight ring */}
                      <div className="absolute inset-[3px] rounded-full bg-white/10" />

                      {/* Outer pulse ring on hover */}
                      <div className={`
                        absolute -inset-[5px] rounded-full border-2 border-current opacity-0
                        group-hover:opacity-20 transition-opacity duration-300
                        bg-gradient-to-br ${program.gradient}
                      `} />

                      <Icon className="w-11 h-11 text-white drop-shadow-sm relative z-10" strokeWidth={1.75} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      className="text-[0.9rem] font-extrabold text-gray-900 mb-2 leading-snug px-1"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {program.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                      className="text-gray-500 text-[0.78rem] leading-relaxed px-1"
                    >
                      {program.description}
                    </motion.p>
                  </motion.div>

                  {/* ── Arrow connector (hidden on mobile) ── */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.35 }}
                      className="hidden md:flex items-center self-start mt-[38px] mx-1 xl:mx-2 shrink-0"
                    >
                      <div className="flex items-center gap-0.5">
                        {/* Dashed line */}
                        <div className="w-4 xl:w-6 h-px border-t-2 border-dashed border-gray-300" />
                        {/* Arrow icon */}
                        <ArrowRight
                          className="w-5 h-5 text-gray-400 shrink-0"
                          strokeWidth={2}
                        />
                        {/* Dashed line */}
                        <div className="w-4 xl:w-6 h-px border-t-2 border-dashed border-gray-300" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-14"
          >
            <Link
              to="/courses/online"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 group"
            >
              Explore All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

        </div>

        {/* Bottom fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none" />
      </section>

    </div>
  );
}