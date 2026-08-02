import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Cpu, GraduationCap, Trophy } from 'lucide-react'
import { timeline } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

const tabs = [
  { id: 'education', label: 'Education', icon: GraduationCap, data: timeline.education, accent: 'from-rose-300 to-pink-400' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, data: timeline.achievements, accent: 'from-peach-300 to-rose-400' },
  { id: 'hackathons', label: 'Hackathons', icon: Cpu, data: timeline.hackathons, accent: 'from-pink-400 to-purple-300' },
  { id: 'certifications', label: 'Certifications', icon: Award, data: timeline.certifications, accent: 'from-teal-300 to-rose-300' }
]

const tabOrder = tabs.map((t) => t.id)

export default function Timeline() {
  const [active, setActive] = useState('education')
  const tab = tabs.find((t) => t.id === active)

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace('#', '')
      if (tabOrder.includes(id)) {
        setActive(id)
        const el = document.getElementById('education')
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <section id="education" className="section-pad relative z-10 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Journey"
          title="Education,"
          highlight="Impact & Credentials"
          subtitle="Every chapter of the journey — from lecture halls to podium wins and certified mastery."
        />

        <Reveal>
          <div className="glass-strong mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-1.5 rounded-full p-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors duration-300 sm:px-5 ${
                  active === id ? 'text-white' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="timeline-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-6 before:absolute before:left-[15px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b before:from-rose-400/60 before:via-pink-400/60 before:to-transparent sm:before:left-[22px]"
          >
            {tab.data.map((entry, i) => (
              <motion.div
                key={`${active}-${entry.title}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-16"
              >
                <div className="absolute left-[15px] top-6 z-10 -translate-x-1/2 sm:left-[22px]">
                  <div className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${tab.accent} shadow-glow`}>
                    <tab.icon size={13} className="text-white" />
                  </div>
                </div>
                <TiltCard max={4} className="glass group rounded-2xl p-6 transition-shadow duration-500 hover:shadow-glow">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-lg font-bold text-ink">{entry.title}</h4>
                    <span className={`rounded-full bg-gradient-to-r ${tab.accent} px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white`}>
                      {entry.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink/50">
                    {entry.org} <span className="text-ink/30">·</span>{' '}
                    <span className="text-rose-500">{entry.period}</span>
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{entry.detail}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
