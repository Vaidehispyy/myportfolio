import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { projects, skillBubbles, contact } from '../data/content'
import { Flower } from './Flowers'

const brain = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'yo'],
    reply: "Hey there! I'm Nova — Vaidehi's AI assistant. Ask me about her projects, skills, experience, or how to reach her."
  },
  {
    keywords: ['project', 'work', 'portfolio', 'build', 'built'],
    reply: `Her featured projects are: ${projects.map((p) => p.title).join(', ')}. Want details on any one of them? Just say its name!`
  },
  {
    keywords: ['focus room'],
    reply: 'Focus Room is an AI-powered deep work companion — it learns your attention rhythm and tunes work/break blocks in real time. Built with React, TensorFlow.js and Node.js.'
  },
  {
    keywords: ['bus', 'tracking'],
    reply: 'The Bus Tracking App gives live GPS positions with ML-based ETA predictions at 91% accuracy — built with React Native, Node.js and OpenCV.'
  },
  {
    keywords: ['cookbook'],
    reply: 'Cookbook is a recipe platform with ingredient-based search over 40k recipes and smart weekly meal planning. React + Node.js + MongoDB under the hood.'
  },
  {
    keywords: ['attendance'],
    reply: 'The Attendance Analysis platform forecasts at-risk students with 94% recall — Python, Scikit-learn, Pandas and Power BI dashboards.'
  },
  {
    keywords: ['webshotsim', 'webshot'],
    reply: 'WebShotSim automates visual regression testing — headless captures across 6 viewports with OpenCV pixel-diff detection.'
  },
  {
    keywords: ['skill', 'tech', 'stack', 'tools', 'languages'],
    reply: `Her toolkit: ${skillBubbles.join(', ')}. Scroll to the Skills section for animated breakdowns!`
  },
  {
    keywords: ['experience', 'intern', 'job', 'internship'],
    reply: 'She is pursuing B.E. CSE (AI & ML) at Finolex Academy of Management & Technology. Open to full-time AI/ML and data analyst roles!'
  },
  {
    keywords: ['education', 'study', 'college', 'university', 'degree'],
    reply: 'Vaidehi is pursuing B.E. CSE — AI & ML Engineering at Finolex Academy of Management & Technology, Ratnagiri (2023–2027), CGPA 9.138/10.'
  },
  {
    keywords: ['certif', 'certification', 'course', 'achiev', 'hackathon'],
    reply: 'The best story is the work itself — check out her projects (Focus Room, Bus Tracking, Cookbook, Attendance Analysis, WebShotSim) for the hands-on proof!'
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'resume', 'cv'],
    reply: `You can reach her at ${contact.email} — or use the contact form below. She's also on GitHub (Vaidehispyy), LinkedIn (vaidehi-bhuwad) and Instagram (@vaid_1708).`
  },
  {
    keywords: ['instagram', 'insta', 'social', 'github', 'linkedin', 'link'],
    reply: 'Follow her work: GitHub → Vaidehispyy · LinkedIn → vaidehi-bhuwad · Instagram → @vaid_1708. Or use the contact form below!'
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'cool', 'nice'],
    reply: "You're welcome! If you want, I can tell you about her projects or how to get in touch."
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    reply: 'See you! Come back anytime — I usually remember the good parts.'
  },
  {
    keywords: ['who', 'about', 'vaidehi', 'yourself', 'you'],
    reply: "I'm Nova, a tiny rule-based brain that lives in the corner of Vaidehi's portfolio. She's an AI/ML engineer who loves building intelligent systems and beautiful interfaces."
  }
]

const quickReplies = ['Show projects', 'Your skills', 'Education', 'Contact her']

function getReply(input) {
  const q = input.toLowerCase()
  const match = brain.find((b) => b.keywords.some((k) => q.includes(k)))
  if (match) return match.reply
  return "Interesting question — my rule-based brain doesn't know that one yet. Try asking about projects, skills, education, or contact info!"
}

function ChatMessage({ role, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          role === 'user'
            ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-glow'
            : 'glass text-ink/85'
        }`}
      >
        {text}
      </div>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="glass flex items-center gap-1.5 rounded-2xl px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-rose-400"
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm Nova — Vaidehi's AI assistant. Ask me anything about her work, skills or how to get in touch."
    }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getReply(text) }])
      setTyping(false)
    }, 900 + Math.random() * 600)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="glass-strong glow-ring fixed bottom-24 right-5 z-[60] flex h-[540px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-[28px]"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 bg-gradient-to-r from-rose-200/50 to-peach-200/50 px-5 py-4">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500">
                  <Bot size={19} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#fffbf4] bg-emerald-400 animate-pulse-glow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-display text-sm font-bold text-ink">
                  Nova AI <Sparkles size={13} className="text-rose-400" />
                </div>
                <div className="text-[11px] text-emerald-600">Online · replies instantly</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="glass grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:text-ink"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} text={m.text} />
              ))}
              {typing && <TypingDots />}
            </div>

            <div className="border-t border-ink/10 p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-rose-300/60 bg-rose-100/70 px-3 py-1 text-[11px] text-rose-600 transition-colors hover:bg-rose-200/80"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send()
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="input-field !rounded-full !px-4 !py-2.5 !text-sm !placeholder-ink/40"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-glow transition-transform hover:scale-105"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[60] grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-peach-400 text-white shadow-glow"
        aria-label="Toggle AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={26} />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 to-peach-400 opacity-50 blur-md animate-pulse-glow" />
        <span className="absolute -right-1 -top-1">
          <Flower size={20} />
        </span>
      </motion.button>
    </>
  )
}
