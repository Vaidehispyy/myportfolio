import { Flower } from './Flowers'

const words = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Data Science',
  'Python',
  'TensorFlow',
  'React',
  'Neural Networks'
]

export default function PetalMarquee() {
  const row = [...words, ...words]
  return (
    <div className="relative z-10 overflow-hidden border-y border-ink/10 bg-white/30 py-4 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#faf5ec] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#faf5ec] to-transparent" />
      <div className="flex w-max animate-marquee gap-12">
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-lg italic tracking-wide text-ink/40">{word}</span>
            <Flower size={14} className="opacity-70" />
          </span>
        ))}
      </div>
    </div>
  )
}
