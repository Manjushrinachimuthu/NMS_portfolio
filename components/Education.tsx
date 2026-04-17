'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const education = [
  {
    degree: 'B.Tech — Computer Science & Business Systems',
    institution: 'VSB Engineering College',
    location: 'Dharapuram, Tamil Nadu',
    period: '2022 – 2026',
    status: 'Pre-Final Year',
    description:
      'Pursuing a specialised program combining core computer science with business systems. Focused on software development, data structures, algorithms, and enterprise technologies.',
    highlights: ['Java', 'Python', 'Data Structures', 'DBMS', 'Web Technologies', 'OOP'],
    gradient: 'from-violet-600/20 via-purple-500/10 to-indigo-600/20',
    border: 'border-violet-500/20',
    dot: 'bg-violet-400',
    badge: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  {
    degree: 'Higher Secondary Certificate (HSC) — Science',
    institution: 'Ponnu Matriculation Hr. Sec. School',
    location: 'Tamil Nadu',
    period: '2020 – 2022',
    status: 'Completed',
    description:
      'Completed higher secondary education with Physics, Chemistry, and Mathematics as core subjects.',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    gradient: 'from-blue-600/20 via-cyan-500/10 to-teal-600/20',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Ponnu Matriculation Hr. Sec. School',
    location: 'Tamil Nadu',
    period: '2019 – 2020',
    status: 'Completed',
    description:
      'Completed secondary education with a strong foundation in science and mathematics.',
    highlights: ['Mathematics', 'Science', 'English', 'Social Science'],
    gradient: 'from-emerald-600/20 via-green-500/10 to-teal-600/20',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-violet-400 inline-block" />
          Education
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-14"
        >
          Academic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            Background
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full ${item.dot} border-4 border-[#0a0a0a] hidden sm:block z-10`} />

                {/* Card */}
                <div
                  className={`rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} p-6 hover:scale-[1.01] transition-transform duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-1">
                        {item.degree}
                      </h3>
                      <p className="text-[#888] text-sm font-medium">{item.institution}</p>
                      <p className="text-[#555] text-xs mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${item.badge}`}>
                        {item.status}
                      </span>
                      <span className="text-[#555] text-xs font-medium">{item.period}</span>
                    </div>
                  </div>

                  <p className="text-[#777] text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* Subject chips */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-[#888] text-xs font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
