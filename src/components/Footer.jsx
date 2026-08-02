import { motion } from 'framer-motion'
import { ArrowUp, Github, Heart, Instagram, Linkedin, Mail } from 'lucide-react'
import { contact, navLinks } from '../data/content'
import Magnetic from './Magnetic'
import { Flower } from './Flowers'

export default function Footer() {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative z-10 overflow-hidden border-t border-ink/10 bg-white/40 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/70 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-rose-400 via-rose-500 to-peach-400 font-display font-bold text-white">
                V
              </span>
              <span className="font-display text-lg font-bold text-ink">
                Vaidehi<span className="text-rose-500">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/50">
              AI & Machine Learning Engineer crafting intelligent systems and data-driven
              experiences.
            </p>
            <div className="mt-5 flex gap-3">
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
                    className="glass grid h-10 w-10 place-items-center rounded-full text-ink/50 transition-all hover:border-rose-300 hover:text-rose-600 hover:shadow-glow"
                  >
                    <Icon size={16} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-ink/70 uppercase">Navigate</h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goTo(link.id)}
                  className="group flex items-center gap-2 text-left text-sm text-ink/50 transition-colors hover:text-ink"
                >
                  <span className="h-px w-3 bg-gradient-to-r from-rose-400 to-peach-400 transition-all duration-300 group-hover:w-5" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-ink/70 uppercase">Let's talk</h4>
            <p className="mt-4 text-sm text-ink/50">
              Open to AI/ML, data analyst roles, collaborations and interesting problems.
            </p>
            <a href={`mailto:${contact.email}`} className="mt-2 inline-block text-sm text-rose-500 transition-colors hover:text-rose-600">
              {contact.email}
            </a>
            <p className="mt-4 font-display text-sm font-semibold text-ink/70">
              {contact.location}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-ink/10 pt-7 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-ink/45">
            Designed and Developed with <Heart size={14} className="animate-pulse-glow fill-rose-400 text-rose-400" /> by{' '}
            <span className="font-semibold text-ink/80">Vaidehi Bhuwad</span>
          </p>
          <div className="flex items-center gap-4">
            <Flower size={22} className="opacity-70" />
            <Magnetic strength={0.35}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="glass grid h-11 w-11 place-items-center rounded-full text-ink/60 transition-all hover:border-rose-300 hover:text-rose-600 hover:shadow-glow"
                aria-label="Back to top"
              >
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
                  <ArrowUp size={17} />
                </motion.span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  )
}
