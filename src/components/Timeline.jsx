import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { timeline } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

export default function Timeline() {
  return (
    <section id="education" className="section-pad section-blend relative z-10 overflow-hidden">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic"
          highlight="Background"
          subtitle="The foundation behind the code — where the AI & ML journey began."
        />

        <Reveal>
          <div className="relative space-y-6 before:absolute before:left-[15px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b before:from-rose-400/60 before:via-pink-400/60 before:to-transparent sm:before:left-[22px]">
            {timeline.education.map((entry, i) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-16"
              >
                <div className="absolute left-[15px] top-6 z-10 -translate-x-1/2 sm:left-[22px]">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-rose-300 to-pink-400 shadow-glow">
                    <GraduationCap size={13} className="text-white" />
                  </div>
                </div>
                <TiltCard max={4} className="glass group rounded-2xl p-6 transition-shadow duration-500 hover:shadow-glow">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-lg font-bold text-ink">{entry.title}</h4>
                    <span className="rounded-full bg-gradient-to-r from-rose-300 to-pink-400 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white">
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}
