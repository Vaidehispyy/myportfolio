export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' }
]

export const typewriterRoles = [
  'AI & Machine Learning Engineer',
  'Data Scientist',
  'Deep Learning Enthusiast',
  'Full-Stack Developer',
  'Problem Solver'
]

export const projects = [
  {
    id: 'focus-room',
    title: 'Focus Room',
    tagline: 'AI-powered deep work companion',
    description:
      'A smart focus application that blends the Pomodoro technique with machine learning to analyze your productivity patterns and suggest the perfect work-break rhythm for you.',
    category: 'AI Application',
    accent: 'from-rose-300 to-pink-400',
    mockup: 'timer',
    tech: ['React', 'TensorFlow.js', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Focus-flow engine that adapts to your energy curve',
      'Smart break suggestions driven by session analytics',
      'Ambient soundscapes with binaural beats',
      'Streak & insight dashboards',
      'Offline-first PWA support'
    ],
    github: 'https://github.com/Vaidehispyy',
    demo: '#',
    caseStudy: {
      overview:
        'Focus Room started from a simple question: why do some days feel deeply productive while others dissolve into chaos? The answer lived in the data — attention has a rhythm. Focus Room learns that rhythm per person and shapes the session around it.',
      problem:
        'Generic productivity timers treat every user identically. They fail when energy peaks, misread burnout, and offer no insight into what actually works.',
      solution:
        'A client-side neural model (TensorFlow.js) scores every completed session across 9 metrics — depth, consistency, distraction recovery — and fits a personalized productivity curve that tunes work-block length in real time.',
      impact: [
        { value: '38%', label: 'average session depth increase' },
        { value: '5.2h', label: 'median daily deep work' },
        { value: '2k+', label: 'sessions analyzed' }
      ]
    }
  },
  {
    id: 'bus-tracking',
    title: 'Bus Tracking Application',
    tagline: 'Real-time fleet intelligence',
    description:
      'A real-time GPS bus tracking platform that predicts arrival times using historical traffic models, keeping thousands of commuters informed down to the minute.',
    category: 'ML + IoT',
    accent: 'from-pink-400 to-purple-300',
    mockup: 'bus',
    tech: ['React Native', 'Node.js', 'MongoDB', 'OpenCV', 'Google Maps API'],
    features: [
      'Live GPS tracking on an interactive map',
      'ML-based ETA prediction with 91% accuracy',
      'Route planning with congestion awareness',
      'Seat availability & occupancy alerts',
      'Push notifications for departure warnings'
    ],
    github: 'https://github.com/Vaidehispyy',
    demo: '#',
    caseStudy: {
      overview:
        'Commuters were waiting blindly at stops, while operators flew blind on fleet health. Bus Tracking wired both sides into a single live intelligence loop.',
      problem:
        'Arrival estimates from static timetables were chronically wrong; no one knew where a bus was, when it would arrive, or how full it would be.',
      solution:
        'Every vehicle streams GPS telemetry into a streaming pipeline. A gradient-boosted model blends live position, dwell history and congestion signals to produce rolling ETA forecasts that correct themselves every 15 seconds.',
      impact: [
        { value: '91%', label: 'ETA prediction accuracy' },
        { value: '3,200+', label: 'daily active commuters' },
        { value: '12 min', label: 'average wait reduced' }
      ]
    }
  },
  {
    id: 'cookbook',
    title: 'Cookbook Website',
    tagline: 'Where recipes meet intelligence',
    description:
      'A beautifully crafted recipe platform with ingredient-based search, smart meal planning and an ever-growing community cookbook.',
    category: 'Full-Stack Web',
    accent: 'from-amber-200 to-rose-400',
    mockup: 'cookbook',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Ingredient-match recipe discovery',
      'Personalized weekly meal planner',
      'Nutrition breakdown per serving',
      'Community recipes with ratings',
      'Favorites sync across devices'
    ],
    github: 'https://github.com/Vaidehispyy',
    demo: '#',
    caseStudy: {
      overview:
        'Cookbook reimagines the recipe site as a product: search what you have, not what you want to buy. Type your fridge contents, get dinner.',
      problem:
        'Traditional recipe sites force navigation by dish name, failing the most common question: "What can I make with what I already have?"',
      solution:
        'An inverted-index search over 40k recipes ranks matches by ingredient overlap, dietary filters and cooking time, then assembles a full week of balanced meals.',
      impact: [
        { value: '40k+', label: 'recipes searchable' },
        { value: '8s', label: 'average discovery time' },
        { value: '12k', label: 'monthly sessions' }
      ]
    }
  },
  {
    id: 'attendance',
    title: 'Student Attendance Analysis',
    tagline: 'Predicting risk before it matters',
    description:
      'An analytics platform that turns raw attendance logs into early-warning signals, forecasting at-risk students with machine learning.',
    category: 'Data Science',
    accent: 'from-teal-300 to-emerald-300',
    mockup: 'attendance',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Power BI', 'SQL'],
    features: [
      'Dropout-risk prediction per student',
      'Attendance trend forecasting',
      'Interactive Power BI dashboards',
      'Automated report generation',
      'Department & batch-level drill-down'
    ],
    github: 'https://github.com/Vaidehispyy',
    demo: '#',
    caseStudy: {
      overview:
        'Attendance data is a silent early-warning system. This project gave faculty a lens to see risk months before grades do.',
      problem:
        'Institutions react to attendance problems only when thresholds are breached, missing gradual decline patterns that predict poor outcomes.',
      solution:
        'A pipeline of Pandas/SQL feature engineering feeds a Random Forest classifier trained on five years of records, flagging students whose trajectories project below safe limits — with full explainability.',
      impact: [
        { value: '94%', label: 'risk prediction recall' },
        { value: '3 mo', label: 'average early-warning lead' },
        { value: '17%', label: 'dropout reduction pilot' }
      ]
    }
  },
  {
    id: 'webshotsim',
    title: 'WebShotSim',
    tagline: 'Visual regression, automated',
    description:
      'A headless web screenshot simulator that captures, diffs and validates responsive layouts across devices — a designer’s safety net.',
    category: 'Dev Tooling',
    accent: 'from-orange-200 to-rose-300',
    mockup: 'browser',
    tech: ['Python', 'Selenium', 'OpenCV', 'FastAPI', 'Docker'],
    features: [
      'Headless capture across 6 viewports',
      'Pixel-level diff detection via OpenCV',
      'Responsive preview gallery',
      'Batch & scheduled runs',
      'Slack-ready change reports'
    ],
    github: 'https://github.com/Vaidehispyy',
    demo: '#',
    caseStudy: {
      overview:
        'CSS breaks silently. WebShotSim turns visual QA into an automated pipeline that catches layout drift before it ships.',
      problem:
        'Manual screenshotting is slow, inconsistent and misses subtle breakpoints — teams ship visual regressions they never see.',
      solution:
        'Selenium grids capture pages at six viewports; OpenCV histograms and perceptual hashing flag pixel drift, and a FastAPI service serves the diff gallery for instant review.',
      impact: [
        { value: '6', label: 'viewports per run' },
        { value: '60s', label: 'full site regression' },
        { value: '0', label: 'missed breakpoint bugs' }
      ]
    }
  }
]

export const skillBubbles = [
  'Python',
  'Machine Learning',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'React',
  'Node.js',
  'OpenCV',
  'SQL',
  'Power BI',
  'Git',
  'GitHub',
  'Java',
  'C++',
  'JavaScript'
]

export const skillCategories = [
  {
    name: 'Languages',
    icon: 'code',
    color: 'from-rose-300 to-pink-400',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'SQL', level: 88 }
    ]
  },
  {
    name: 'AI & Machine Learning',
    icon: 'brain',
    color: 'from-pink-400 to-purple-300',
    skills: [
      { name: 'Machine Learning', level: 92 },
      { name: 'Deep Learning', level: 86 },
      { name: 'TensorFlow', level: 84 },
      { name: 'PyTorch', level: 78 },
      { name: 'OpenCV', level: 82 }
    ]
  },
  {
    name: 'Web Development',
    icon: 'globe',
    color: 'from-amber-200 to-rose-400',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 84 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Express', level: 80 }
    ]
  },
  {
    name: 'Tools & Platforms',
    icon: 'wrench',
    color: 'from-teal-300 to-emerald-300',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Power BI', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'Docker', level: 70 }
    ]
  }
]

export const timeline = {
  education: [
    {
      title: 'B.E. CSE — AI & ML Engineering',
      org: 'Finolex Academy of Management & Technology, Ratnagiri',
      period: '2023 – 2027',
      detail: 'CGPA 9.138 / 10',
      tag: 'B.E.'
    }
  ]
}

export const contact = {
  email: 'vaidehibhuwad09@gmail.com',
  phone: '+91 9657588528',
  location: 'Ratnagiri, Maharashtra, India',
  github: 'https://github.com/Vaidehispyy',
  linkedin: 'https://www.linkedin.com/in/vaidehi-bhuwad-6a661b357',
  instagram: 'https://www.instagram.com/vaid_1708/',
  formEndpoint: null
}
