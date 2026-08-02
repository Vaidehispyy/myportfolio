import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download, Github, Instagram, Linkedin, Mail, Sparkles, ChevronDown } from 'lucide-react'
import { typewriterRoles, contact } from '../data/content'
import { useTypewriter } from '../hooks/useEffects'
import Magnetic from './Magnetic'
import { FloatingFlowers, RetroComputer } from './Flowers'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } }
}

const item = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Hero() {
  const typed = useTypewriter(typewriterRoles)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const contentX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const contentY = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const bgX = useTransform(sx, [-0.5, 0.5], [18, -18])
  const bgY = useTransform(sy, [-0.5, 0.5], [14, -14])

  const onMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    mx.set(e.clientX / innerWidth - 0.5)
    my.set(e.clientY / innerHeight - 0.5)
  }

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <div className="aurora-blob left-[10%] top-[14%] h-[400px] w-[400px] bg-rose-400/15 animate-blob" />
        <div className="aurora-blob right-[8%] bottom-[8%] h-[360px] w-[360px] bg-peach-400/15 animate-blob [animation-delay:-8s]" />
        <div className="grid-lines absolute inset-0 opacity-60" />
      </motion.div>

      <FloatingFlowers count={5} />

      <div className="pointer-events-none absolute right-[1%] top-1/2 hidden -translate-y-1/2 xl:block">
        <div className="origin-top-right scale-[0.82] xl:scale-100 2xl:scale-110">
          <RetroComputer />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ x: contentX, y: contentY }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div variants={item} className="mb-8 flex justify-center">
          <Magnetic strength={0.25}>
            <span className="chip border-rose-300/50 bg-white/70 text-rose-500">
              <Sparkles size={14} className="animate-pulse-glow" />
              Open to AI / ML & Data Analyst roles
            </span>
          </Magnetic>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m
          <span className="mt-2 block">
            <span className="text-gradient italic">Vaidehi Bhuwad</span>
            <span className="text-rose-500">.</span>
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-7 flex h-10 items-center justify-center font-display text-xl font-semibold text-ink/90 sm:text-3xl"
        >
          <span>{typed}</span>
          <span className="ml-1 inline-block h-7 w-[3px] animate-caret rounded-full bg-gradient-to-b from-rose-400 to-peach-400 sm:h-9" />
        </motion.div>

        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
          Building intelligent systems, data-driven applications, and beautiful digital
          experiences — where machine learning meets product design.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <button onClick={() => goTo('projects')} className="btn-primary group">
              Explore Projects
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <Magnetic>
            <a href="/resume.pdf" download className="btn-ghost group">
              <Download size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </Magnetic>
          <Magnetic>
            <button onClick={() => goTo('contact')} className="btn-ghost">
              Contact Me
            </button>
          </Magnetic>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex items-center justify-center gap-4">
          {[
            { icon: Github, href: contact.github, label: 'GitHub' },
            { icon: Linkedin, href: contact.linkedin, label: 'LinkedIn' },
            { icon: Instagram, href: contact.instagram, label: 'Instagram' },
            { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <Magnetic key={label} strength={0.3}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-12 w-12 place-items-center rounded-full text-ink/60 transition-all duration-300 hover:border-rose-400/60 hover:text-rose-500 hover:shadow-glow"
              >
                <Icon size={19} />
              </a>
            </Magnetic>
          ))}
        </motion.div>

        <motion.div variants={item} className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: '5+', label: 'Projects' },
            { value: '15+', label: 'Skills' },
            { value: '4', label: 'Certifications' },
            { value: '24h', label: 'Response' }
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl px-3 py-3.5">
              <div className="font-display text-xl font-bold text-rose-500">{s.value}</div>
              <div className="mt-0.5 text-[10px] tracking-widest text-ink/50 uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          variants={item}
          onClick={() => goTo('projects')}
          className="mx-auto mt-16 flex flex-col items-center gap-1 text-ink/40 transition-colors hover:text-ink"
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  )
}
