import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Check, ExternalLink, Github, X } from 'lucide-react'
import { projects } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import Reveal from './Reveal'
import ProjectTerminal from './ProjectTerminal'
import { FloatingFlowers } from './Flowers'

function Keycap({ children }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-[#d4c2a5] bg-gradient-to-b from-[#f9f2e3] to-[#e7d6ba] px-4 py-2.5 text-xs font-semibold text-ink/75 shadow-[0_3px_0_#c9b491] transition-all duration-200 hover:-translate-y-px hover:text-rose-600 hover:shadow-[0_4px_0_#c9b491] active:translate-y-[3px] active:shadow-none">
      {children}
    </span>
  )
}

function CaseStudyModal({ project, onClose }) {
  const [step, setStep] = useState(0)
  const steps = ['Overview', 'Challenge', 'Solution', 'Impact']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong glow-ring relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[28px] p-7 sm:p-10"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className={`chip bg-gradient-to-r ${project.accent} border-transparent !text-white`}>
              {project.category}
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold text-ink">{project.title}</h3>
            <p className="mt-1 text-sm text-ink/50">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink/60 transition-colors hover:text-ink"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                step === i
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-glow'
                  : 'bg-white/60 text-ink/50 hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="min-h-[140px] text-sm leading-relaxed text-ink/70"
          >
            {step === 0 && <p>{project.caseStudy.overview}</p>}
            {step === 1 && <p>{project.caseStudy.problem}</p>}
            {step === 2 && <p>{project.caseStudy.solution}</p>}
            {step === 3 && (
              <div className="grid grid-cols-3 gap-3">
                {project.caseStudy.impact.map((m) => (
                  <div key={m.label} className="glass rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-bold text-gradient">{m.value}</div>
                    <div className="mt-1 text-[11px] leading-tight text-ink/50">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 border-t border-ink/10 pt-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-[11px] text-ink/70">
                {t}
              </span>
            ))}
          </div>
          <ul className="mb-7 space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink/70">
                <Check size={15} className="mt-0.5 shrink-0 text-rose-500" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary !px-6 !py-3 !text-xs">
              <Github size={15} /> GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ghost !px-6 !py-3 !text-xs">
              <ExternalLink size={15} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="section-pad relative z-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected"
          highlight="Projects"
          subtitle="Five products, five stories — engineered end to end with machine learning at the core and design at the surface."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.12}>
              <TiltCard className="glass group relative h-full overflow-hidden rounded-[30px] transition-shadow duration-500 hover:shadow-glow">
                <div className={`absolute -inset-px rounded-[31px] bg-gradient-to-br ${project.accent} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-25`} />
                <ProjectTerminal project={project} />

                <div className="relative z-10 rounded-b-[30px] border-t border-[#d4c2a5] bg-gradient-to-b from-[#f4ead8] to-[#e8d9c2] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full bg-gradient-to-r ${project.accent} px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase`}>
                      {project.category}
                    </span>
                    <span className="font-display text-xs text-ink/30">0{i + 1}</span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-gradient">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-ink/45 uppercase">{project.tagline}</p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <Keycap>
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                        <Github size={13} /> GitHub
                      </a>
                    </Keycap>
                    <Keycap>
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    </Keycap>
                    <Keycap>
                      <button
                        onClick={() => setActive(project)}
                        className="flex items-center gap-1.5"
                      >
                        <BookOpen size={13} /> Case Study
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </Keycap>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <FloatingFlowers count={3} />

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
