'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   PROJECT 1 — Smart Price Checker
   Animated price graph + falling price tag
───────────────────────────────────────── */
function PriceCheckerAnim() {
  const points = [60, 80, 55, 90, 45, 70, 35, 50, 28]
  const w = 320, h = 180
  const xs = points.map((_, i) => (i / (points.length - 1)) * (w - 40) + 20)
  const ys = points.map(p => h - 20 - (p / 100) * (h - 40))
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
  const area = `${path} L${xs[xs.length-1]},${h-20} L${xs[0]},${h-20} Z`

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox={`0 0 ${w} ${h}`}>
        {[0,1,2,3].map(i => (
          <line key={i} x1="20" y1={20 + i*40} x2={w-20} y2={20 + i*40} stroke="white" strokeWidth="0.5" strokeDasharray="4 4"/>
        ))}
      </svg>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
        <defs>
          <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#34d399"/>
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          d={area}
          fill="url(#priceGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Line */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Dots */}
        {xs.map((x, i) => (
          <motion.circle
            key={i}
            cx={x} cy={ys[i]} r="4"
            fill={i === points.indexOf(Math.min(...points)) ? '#34d399' : '#a78bfa'}
            stroke="#0a0a0a" strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          />
        ))}

        {/* Price drop badge */}
        <motion.g
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
        >
          <rect x="210" y="8" width="90" height="28" rx="8" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="1"/>
          <text x="255" y="27" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">↓ Price Drop!</text>
        </motion.g>

        {/* Platform labels */}
        {['AMZ','FLK','MSH'].map((label, i) => (
          <motion.g key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 + i * 0.15 }}>
            <rect x={20 + i * 40} y={h - 18} width="28" height="14" rx="4" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8"/>
            <text x={34 + i * 40} y={h - 7} textAnchor="middle" fill="#a78bfa" fontSize="7" fontWeight="600">{label}</text>
          </motion.g>
        ))}
      </svg>

      {/* Email notification pop */}
      <motion.div
        className="absolute bottom-4 right-4 rounded-xl px-3 py-2 text-xs"
        style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], y: [10, 0, 0, -10] }}
        transition={{ duration: 3, delay: 2.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <p className="text-emerald-400 font-semibold">📧 Alert Sent!</p>
        <p className="text-white/50" style={{ fontSize: 9 }}>Price dropped ₹500</p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PROJECT 2 — AI Pathfinder
   Neural network nodes + interview chat
───────────────────────────────────────── */
function AIPathfinderAnim() {
  const nodes = [
    { x: 50, y: 30, label: 'Resume', color: '#38bdf8' },
    { x: 20, y: 60, label: 'Aptitude', color: '#a78bfa' },
    { x: 80, y: 60, label: 'Coding', color: '#f97316' },
    { x: 35, y: 85, label: 'HR Mock', color: '#34d399' },
    { x: 65, y: 85, label: 'Tech Mock', color: '#facc15' },
  ]
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,4],[2,3]]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % nodes.length), 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
        <defs>
          {nodes.map((n, i) => (
            <radialGradient key={i} id={`ng${i}`}>
              <stop offset="0%" stopColor={n.color} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={n.color} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(139,92,246,0.3)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        ))}

        {/* Pulse along active edge */}
        {edges.map(([a, b], i) => (
          <motion.circle
            key={`p${i}`}
            r="1.2"
            fill={nodes[a].color}
            opacity={0.8}
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
            }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            {i === active && (
              <motion.circle
                cx={n.x} cy={n.y} r="8"
                fill={`url(#ng${i})`}
                animate={{ r: [6, 10, 6] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <circle cx={n.x} cy={n.y} r="5"
              fill={i === active ? n.color : 'rgba(255,255,255,0.08)'}
              stroke={n.color} strokeWidth="1"
            />
            <text x={n.x} y={n.y + 10} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="4.5" fontWeight="600">
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Score badge */}
      <motion.div
        className="absolute top-4 right-4 rounded-xl px-3 py-2 text-center"
        style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', backdropFilter: 'blur(8px)' }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-[10px] text-white/40">Interview Score</p>
        <motion.p
          className="text-lg font-black text-sky-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          92%
        </motion.p>
      </motion.div>

      {/* Chat bubble */}
      <motion.div
        className="absolute bottom-4 left-4 rounded-xl px-3 py-2 max-w-[140px]"
        style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-[9px] text-violet-300 font-semibold mb-0.5">🤖 AI Interviewer</p>
        <p className="text-[9px] text-white/50">Tell me about yourself...</p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PROJECT 3 — NoteX AI
   Video grid + waveform + transcript
───────────────────────────────────────── */
function NoteXAnim() {
  const [wave, setWave] = useState<number[]>(Array(20).fill(4))

  useEffect(() => {
    const t = setInterval(() => {
      setWave(Array(20).fill(0).map(() => Math.random() * 28 + 4))
    }, 120)
    return () => clearInterval(t)
  }, [])

  const participants = [
    { initials: 'MN', color: '#7c3aed', speaking: true },
    { initials: 'AI', color: '#38bdf8', speaking: false },
    { initials: 'JS', color: '#34d399', speaking: false },
    { initials: 'RK', color: '#f97316', speaking: false },
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 p-4 overflow-hidden">
      {/* Video grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
        {participants.map((p, i) => (
          <motion.div
            key={i}
            className="relative rounded-xl flex items-center justify-center aspect-video"
            style={{
              background: `rgba(${p.color === '#7c3aed' ? '124,58,237' : p.color === '#38bdf8' ? '56,189,248' : p.color === '#34d399' ? '52,211,153' : '249,115,22'},0.12)`,
              border: p.speaking ? `1.5px solid ${p.color}` : '1px solid rgba(255,255,255,0.08)',
              boxShadow: p.speaking ? `0 0 12px ${p.color}40` : 'none',
            }}
            animate={p.speaking ? { boxShadow: [`0 0 8px ${p.color}40`, `0 0 18px ${p.color}60`, `0 0 8px ${p.color}40`] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <span className="text-xs font-bold" style={{ color: p.color }}>{p.initials}</span>
            {p.speaking && (
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-0.5 h-10 w-full max-w-[200px]">
        {wave.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: h,
              background: `linear-gradient(to top, #7c3aed, #a78bfa)`,
              opacity: 0.7,
            }}
            animate={{ height: h }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {/* Transcript line */}
      <motion.div
        className="w-full max-w-[200px] rounded-lg px-3 py-2"
        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
      >
        <p className="text-[9px] text-violet-400 font-semibold mb-0.5">📝 Live Transcript</p>
        <motion.p
          className="text-[9px] text-white/50"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          "...discussing the project timeline..."
        </motion.p>
      </motion.div>

      {/* AI summary badge */}
      <motion.div
        className="absolute top-3 right-3 rounded-lg px-2 py-1"
        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-[9px] text-emerald-400 font-semibold">✨ AI Summary Ready</p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Featured data
───────────────────────────────────────── */
const featured = [
  {
    label: 'Featured Project',
    title: 'Smart Price Checker',
    description:
      'Built an e-commerce price comparison platform that tracks real-time prices across Amazon, Flipkart, and Meesho. Integrated automated email notification system that alerts users instantly when prices drop below their target threshold.',
    tech: ['Java', 'Spring Boot', 'React', 'HTML', 'CSS'],
    link: 'https://github.com',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    accentRgb: '124,58,237',
    highlights: [
      'Real-time Price Comparison across 3 Platforms',
      'Automated Email Alerts for Price Drops',
      'Product Tracking Dashboard',
      'Spring Boot REST API Backend',
    ],
    Animation: PriceCheckerAnim,
  },
  {
    label: 'Featured Project',
    title: 'AI Pathfinder',
    description:
      'Built an AI-driven placement preparation platform that provides aptitude learning, coding practice, and company-specific question sets for MNCs. Developed AI-based HR and technical mock interview system along with resume evaluation and scoring for interview readiness.',
    tech: ['Python', 'JavaScript', 'HTML', 'CSS', 'AI/ML'],
    link: 'https://github.com',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    accentRgb: '56,189,248',
    highlights: [
      'AI-based HR & Technical Mock Interviews',
      'Resume Evaluation & Scoring',
      'Company-specific MNC Question Sets',
      'Aptitude Learning Modules',
    ],
    Animation: AIPathfinderAnim,
  },
  {
    label: 'Featured Project',
    title: 'NoteX AI',
    description:
      'Built an AI-powered meeting platform with real-time video conferencing and automatic speech-to-text transcription. Developed AI-based summarization and multilingual translation to generate structured meeting notes and action items.',
    tech: ['HTML', 'CSS', 'Node.js', 'Python', 'MongoDB', 'WebRTC'],
    link: 'https://github.com',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    accentRgb: '52,211,153',
    highlights: [
      'Real-time Video Conferencing',
      'Speech-to-Text Transcription',
      'AI Summarization & Action Items',
      'Multilingual Translation',
    ],
    Animation: NoteXAnim,
  },
]

export default function FeaturedProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-violet-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-violet-400 inline-block" />
          Featured Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-16"
        >
          Projects I&apos;m{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            Proud Of
          </span>
        </motion.h2>

        <div className="space-y-28">
          {featured.map((project, i) => {
            const { Animation } = project
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Text */}
                <div>
                  <p className="text-[#555] text-xs font-medium tracking-widest uppercase mb-3">
                    {project.label}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#777] text-sm sm:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-[#888]">
                        <span className={`w-1.5 h-1.5 rounded-full ${project.accentColor.replace('text-', 'bg-')} flex-shrink-0`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className={`px-3 py-1 rounded-full bg-white/5 border border-white/8 ${project.accentColor} text-xs font-medium`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${project.accentColor} text-sm font-semibold hover:opacity-80 transition-opacity group`}
                  >
                    View on GitHub
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Animated visual */}
                <div className="relative group">
                  {/* Outer glow */}
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(ellipse, rgba(${project.accentRgb},0.25) 0%, transparent 70%)` }}
                  />
                  <div
                    className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                    style={{
                      background: `linear-gradient(135deg, rgba(${project.accentRgb},0.1) 0%, rgba(8,6,18,0.95) 100%)`,
                      border: `1.5px solid rgba(${project.accentRgb},0.25)`,
                      boxShadow: `0 20px 60px rgba(${project.accentRgb},0.12)`,
                    }}
                  >
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <Animation />

                    {/* Corner accents */}
                    <span className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${project.accentRgb},0.5)`, borderLeft: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '3px 0 0 0' }} />
                    <span className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRight: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 3px 0 0' }} />
                    <span className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${project.accentRgb},0.5)`, borderLeft: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 0 0 3px' }} />
                    <span className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRight: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 0 3px 0' }} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
