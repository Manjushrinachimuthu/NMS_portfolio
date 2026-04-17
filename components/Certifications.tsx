'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const certifications = [
  {
    name: 'Programming in Java',
    issuer: 'NPTEL',
    year: '2023',
    icon: '☕',
    accent: '#f97316',
    accentRgb: '249,115,22',
    desc: 'Completed an intensive NPTEL course covering core Java concepts, OOP principles, data structures, and algorithms.',
    skills: ['OOP', 'Data Structures', 'Algorithms', 'Java SE'],
  },
  {
    name: 'Cloud Computing',
    issuer: 'NPTEL',
    year: '2023',
    icon: '☁️',
    accent: '#38bdf8',
    accentRgb: '56,189,248',
    desc: 'Learned cloud architecture, deployment models, virtualization, and cloud service management through NPTEL.',
    skills: ['Cloud Architecture', 'Virtualization', 'IaaS', 'SaaS'],
  },
  {
    name: 'AWS Gen AI Badge',
    issuer: 'Amazon Web Services',
    year: '2024',
    icon: '🤖',
    accent: '#facc15',
    accentRgb: '250,204,21',
    desc: 'Earned the AWS Generative AI badge by demonstrating knowledge of foundation models, prompt engineering, and AI services.',
    skills: ['Generative AI', 'Prompt Engineering', 'AWS Bedrock', 'LLMs'],
  },
  {
    name: 'AWS ML Badge',
    issuer: 'Amazon Web Services',
    year: '2024',
    icon: '🧠',
    accent: '#a78bfa',
    accentRgb: '167,139,250',
    desc: 'Validated machine learning fundamentals and AWS ML services including SageMaker, Rekognition, and Comprehend.',
    skills: ['Machine Learning', 'SageMaker', 'AWS AI Services', 'MLOps'],
  },
  {
    name: 'Java Course',
    issuer: 'Udemy',
    year: '2023',
    icon: '🎓',
    accent: '#f43f5e',
    accentRgb: '244,63,94',
    desc: 'Comprehensive Java programming course covering advanced topics like multithreading, collections, and Spring basics.',
    skills: ['Java Advanced', 'Multithreading', 'Collections', 'Spring'],
  },
  {
    name: 'Data Analytics',
    issuer: 'NoviTech',
    year: '2024',
    icon: '📊',
    accent: '#34d399',
    accentRgb: '52,211,153',
    desc: 'Hands-on data analytics training covering data wrangling, visualization, statistical analysis, and Power BI dashboards.',
    skills: ['Power BI', 'Data Wrangling', 'Statistics', 'Visualization'],
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  const select = (i: number) => {
    if (i === active) return
    setPrev(active)
    setActive(i)
  }

  const cert = certifications[active]

  return (
    <section id="certifications" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Section top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, rgba(${cert.accentRgb},0.06) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transition: 'background 0.6s ease',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-violet-400 inline-block" />
          Certifications
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-14"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            Credentials
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── LEFT: Vertical list ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {certifications.map((c, i) => (
              <motion.button
                key={c.name}
                onClick={() => select(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                className="relative w-full text-left rounded-2xl overflow-hidden transition-all duration-300 group"
                style={{
                  background:
                    active === i
                      ? `linear-gradient(135deg, rgba(${c.accentRgb},0.18) 0%, rgba(10,8,22,0.9) 100%)`
                      : 'rgba(255,255,255,0.03)',
                  border: active === i
                    ? `1.5px solid rgba(${c.accentRgb},0.45)`
                    : '1.5px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                  padding: '14px 18px',
                  boxShadow: active === i
                    ? `0 4px 24px rgba(${c.accentRgb},0.15)`
                    : 'none',
                }}
              >
                {/* Active left bar */}
                {active === i && (
                  <motion.span
                    layoutId="activebar"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                    style={{ background: c.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3 pl-2">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
                    style={{
                      background: active === i
                        ? `rgba(${c.accentRgb},0.2)`
                        : 'rgba(255,255,255,0.05)',
                      border: active === i
                        ? `1px solid rgba(${c.accentRgb},0.4)`
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {c.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm truncate transition-colors duration-200"
                      style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.6)' }}
                    >
                      {c.name}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: active === i ? c.accent : 'rgba(255,255,255,0.28)' }}>
                      {c.issuer} · {c.year}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-all duration-300"
                    style={{
                      color: active === i ? c.accent : 'rgba(255,255,255,0.15)',
                      transform: active === i ? 'translateX(0)' : 'translateX(-4px)',
                      opacity: active === i ? 1 : 0.4,
                    }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* ── RIGHT: Detail card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-28"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, rgba(${cert.accentRgb},0.16) 0%, rgba(8,6,18,0.92) 55%, rgba(${cert.accentRgb},0.06) 100%)`,
                  border: `1.5px solid rgba(${cert.accentRgb},0.3)`,
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  boxShadow: `0 20px 60px rgba(${cert.accentRgb},0.15), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
                  padding: '40px 36px',
                }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.055) 50%, transparent 65%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />

                {/* Top glow */}
                <div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none rounded-full"
                  style={{
                    background: `radial-gradient(ellipse, rgba(${cert.accentRgb},0.3) 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                  }}
                />

                {/* Header row */}
                <div className="relative z-10 flex items-start justify-between mb-8">
                  {/* Big hex icon */}
                  <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="absolute inset-0">
                      <defs>
                        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={cert.accent} stopOpacity="0.45" />
                          <stop offset="100%" stopColor={cert.accent} stopOpacity="0.08" />
                        </linearGradient>
                        <filter id="hf">
                          <feGaussianBlur stdDeviation="3" result="b" />
                          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      <polygon
                        points="40,4 72,22 72,58 40,76 8,58 8,22"
                        fill="url(#hg)"
                        stroke={cert.accent}
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                        filter="url(#hf)"
                      />
                    </svg>
                    <span className="relative z-10 text-3xl">{cert.icon}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(52,211,153,0.12)',
                        border: '1px solid rgba(52,211,153,0.35)',
                        color: '#34d399',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* Title & issuer */}
                <div className="relative z-10 mb-6">
                  <h3 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight mb-2">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: cert.accent }}
                    />
                    <p className="text-sm font-semibold" style={{ color: cert.accent }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="relative z-10 w-full h-px mb-6"
                  style={{ background: `linear-gradient(to right, rgba(${cert.accentRgb},0.3), transparent)` }}
                />

                {/* Description */}
                <p
                  className="relative z-10 text-sm leading-relaxed mb-8"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {cert.desc}
                </p>

                {/* Skills */}
                <div className="relative z-10">
                  <p
                    className="text-xs font-medium tracking-widest uppercase mb-3"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    Skills Covered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{
                          background: `rgba(${cert.accentRgb},0.12)`,
                          border: `1px solid rgba(${cert.accentRgb},0.28)`,
                          color: cert.accent,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative z-10 mt-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Proficiency</span>
                    <span className="text-xs font-semibold" style={{ color: cert.accent }}>Certified</span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, rgba(${cert.accentRgb},0.5), ${cert.accent})` }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Corner accents */}
                <span className="absolute top-5 left-5 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderLeft: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRadius: '3px 0 0 0' }} />
                <span className="absolute top-5 right-5 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRight: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRadius: '0 3px 0 0' }} />
                <span className="absolute bottom-5 left-5 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderLeft: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRadius: '0 0 0 3px' }} />
                <span className="absolute bottom-5 right-5 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRight: `1.5px solid rgba(${cert.accentRgb},0.35)`, borderRadius: '0 0 3px 0' }} />
              </motion.div>
            </AnimatePresence>

            {/* Dot nav below card */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {certifications.map((c, i) => (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 6,
                    height: 6,
                    background: i === active ? c.accent : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
