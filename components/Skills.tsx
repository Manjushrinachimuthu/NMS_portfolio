'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillsRow1 = [
  { name: 'Java', icon: '☕' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React.js', icon: '⚛️' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Spring Boot', icon: '🍃' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub', icon: '🐙' },
]

const skillsRow2 = [
  { name: 'Power BI', icon: '📊' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Excel', icon: '📈' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Problem Solving', icon: '🧩' },
  { name: 'Data Analytics', icon: '📉' },
  { name: 'OOP', icon: '🏗️' },
  { name: 'Agile', icon: '🔄' },
  { name: 'Linux', icon: '🐧' },
]

function MarqueeRow({ items, reverse = false }: { items: typeof skillsRow1; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden gap-4 py-2">
      <motion.div
        className="flex gap-4 flex-shrink-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {[...items, ...items].map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111] border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 cursor-default flex-shrink-0"
          >
            <span className="text-lg">{skill.icon}</span>
            <span className="text-[#888] text-sm font-medium whitespace-nowrap hover:text-white transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-violet-400 inline-block" />
          Skills & Tools
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-2"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            Tech Stack
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#555] text-sm"
        >
          Technologies and tools I work with regularly.
        </motion.p>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4 overflow-hidden"
      >
        <MarqueeRow items={skillsRow1} />
        <MarqueeRow items={skillsRow2} reverse />
      </motion.div>
    </section>
  )
}
