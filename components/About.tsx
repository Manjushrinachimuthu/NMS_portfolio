'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const roles = [
  'Java Developer',
  'React Developer',
  'Python Programmer',
  'Full Stack Learner',
  'Problem Solver',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  const internships = [
    {
      role: 'Data Visualization Intern',
      company: 'Infosys Springboard',
      project: 'ElectViz — Power BI dashboards for election data visualization',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/20',
      dot: 'bg-blue-400',
    },
    {
      role: 'Python Programming Intern',
      company: 'CodeSoft',
      project: 'Python applications and algorithmic problem solving',
      color: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/20',
      dot: 'bg-yellow-400',
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-4 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-violet-400 inline-block" />
          About Me
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              A Developer who{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                Builds things
              </span>{' '}
              that actually work...
            </h2>
            <p className="text-[#555] text-lg font-medium italic leading-relaxed">
              &ldquo;Because if the code doesn&apos;t run, what else can?&rdquo;
            </p>

            {/* Decorative arrow */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-violet-500/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-violet-400 rotate-45"
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
              </div>
              <span className="text-[#555] text-sm">Scroll to see my work</span>
            </div>

            {/* Skills chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {['Java', 'Python', 'JavaScript', 'React.js', 'Spring Boot', 'MySQL', 'Node.js', 'MongoDB'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right — About paragraph + typing + internships */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Typing role */}
            <div className="text-xl sm:text-2xl font-semibold text-white">
              I&apos;m a{' '}
              <span className="text-violet-300">
                {displayed}
                <span className="cursor-blink text-violet-400">|</span>
              </span>
            </div>

            {/* About paragraph */}
            <p className="text-[#888] leading-relaxed text-sm sm:text-base">
              Aspiring pre-final year Computer Science and Business Systems student at{' '}
              <span className="text-white font-medium">VSB Engineering College</span> with strong
              skills in Java, Python, JavaScript, React.js, and MySQL. Experienced in developing
              responsive web pages and interactive applications. Currently seeking internship
              opportunities in software development and web technologies.
            </p>

            {/* Internships */}
            <div>
              <p className="text-[#555] text-xs font-medium tracking-widest uppercase mb-4">
                Experience
              </p>
              <div className="space-y-3">
                {internships.map((item) => (
                  <div
                    key={item.company}
                    className={`rounded-xl bg-gradient-to-r ${item.color} border ${item.border} p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 flex-shrink-0`} />
                      <div>
                        <p className="text-white font-semibold text-sm">{item.role}</p>
                        <p className="text-[#888] text-xs mt-0.5">@ {item.company}</p>
                        <p className="text-[#666] text-xs mt-1">{item.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors group"
            >
              Let&apos;s work together
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
