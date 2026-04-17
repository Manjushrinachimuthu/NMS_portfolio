'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'Smart Price Checker',
    description:
      'E-commerce platform with real-time price comparison across Amazon, Flipkart, and Meesho with automated email notifications for price drops.',
    tech: ['Java', 'Spring Boot', 'React', 'HTML', 'CSS'],
    gradient: 'from-violet-600/30 via-purple-500/20 to-indigo-600/30',
    border: 'border-violet-500/20',
    glow: 'shadow-violet-500/10',
    icon: '🛒',
    iconBg: 'bg-violet-500/20',
  },
  {
    title: 'AI Pathfinder',
    description:
      'AI-driven placement preparation platform with aptitude learning, coding practice, mock interviews, and job recommendations.',
    tech: ['Python', 'JavaScript', 'HTML', 'CSS'],
    gradient: 'from-blue-600/30 via-cyan-500/20 to-teal-600/30',
    border: 'border-blue-500/20',
    glow: 'shadow-blue-500/10',
    icon: '🤖',
    iconBg: 'bg-blue-500/20',
  },
  {
    title: 'NoteX AI',
    description:
      'AI-powered meeting platform with real-time video conferencing, speech-to-text transcription, and multilingual translation.',
    tech: ['HTML', 'CSS', 'Node.js', 'Python', 'MongoDB'],
    gradient: 'from-emerald-600/30 via-green-500/20 to-teal-600/30',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/10',
    icon: '📝',
    iconBg: 'bg-emerald-500/20',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-violet-400 inline-block" />
              Work & Projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white"
            >
              Things I&apos;ve{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                Built
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#555] text-sm max-w-xs"
          >
            A selection of projects I&apos;ve worked on during my studies.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className={`group relative rounded-2xl bg-[#111] border ${project.border} overflow-hidden hover:shadow-2xl ${project.glow} transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Card image area */}
              <div
                className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Icon */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl ${project.iconBg} backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {project.icon}
                </div>
                {/* Corner decoration */}
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/20" />
                <div className="absolute top-3 right-7 w-2 h-2 rounded-full bg-white/10" />
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[#888] text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Learn more */}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-violet-400 text-xs font-semibold tracking-wide hover:text-violet-300 transition-colors group/link"
                >
                  LEARN MORE
                  <svg
                    className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
