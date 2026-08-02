import Reveal from './Reveal'
import { Flower } from './Flowers'

export default function SectionHeading({ eyebrow, title, highlight, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <Reveal>
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-rose-400 to-peach-400 animate-pulse-glow" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title} <span className="text-gradient italic">{highlight}</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
          <Flower size={15} className="opacity-80" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300" />
        </div>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-ink/55 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
