import { motion } from 'framer-motion'
import { skillBubbles } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const bubbleSizes = [
  'text-xs px-4 py-2',
  'text-sm px-5 py-2.5',
  'text-base px-6 py-3'
]

export default function Skills() {
  return (
    <section id="skills" className="section-pad section-blend relative z-10 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="My Tech"
          highlight="Arsenal"
          subtitle="A fluid toolkit that floats between research and production — hover the bubbles, watch them drift."
        />

        <Reveal>
          <div className="glass-strong relative mx-auto rounded-[36px] p-8 sm:p-12">
            <div className="mask-fade-y relative grid place-items-center">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                {skillBubbles.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.4, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 160,
                      damping: 14,
                      delay: i * 0.055
                    }}
                    className={`glass inline-flex items-center gap-2 rounded-full font-medium text-ink/80 transition-all duration-300 hover:scale-110 hover:border-rose-300 hover:text-rose-600 animate-float-x ${bubbleSizes[i % 3]}`}
                    style={{ animationDelay: `${(i % 7) * -1.2}s` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-rose-400 to-peach-400" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
