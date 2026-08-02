import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { contact } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { FloatingFlowers } from './Flowers'

export default function Contact() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Hello Vaidehi!')}&body=${encodeURIComponent('Hi Vaidehi,\n\nI came across your portfolio and would love to talk.\n\n')}`

  const info = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: contact.location, href: null },
    { icon: Github, label: 'GitHub', value: '@Vaidehispyy', href: contact.github },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/vaidehi-bhuwad-6a661b357', href: contact.linkedin },
    { icon: Instagram, label: 'Instagram', value: '@vaid_1708', href: contact.instagram }
  ]

  return (
    <section id="contact" className="section-pad relative z-10 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build"
          highlight="Something Great"
          subtitle="Have a role, a project, or a wild idea? My inbox is a safe space — no spam, just signal."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="glass-strong glow-ring flex h-full flex-col justify-between rounded-3xl p-7">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">Get in touch</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  Currently exploring full-time AI/ML and data analyst roles, plus research
                  collaborations. Average response time — under 24 hours.
                </p>
              </div>
              <Magnetic strength={0.15} className="mt-6">
                <a
                  href={mailto}
                  className="btn-primary group w-full"
                >
                  <Mail size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Send Me an Email
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <div className="grid content-start gap-3">
            {info.map(({ icon: Icon, label, value, href }, i) => {
              const inner = (
                <div className="glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:border-rose-300 hover:shadow-glow">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500">
                    <Icon size={17} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-widest text-ink/40 uppercase">{label}</div>
                    <div className="truncate text-sm font-medium text-ink/85">{value}</div>
                  </div>
                </div>
              )
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <FloatingFlowers count={4} />
    </section>
  )
}
