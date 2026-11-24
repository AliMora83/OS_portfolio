// Everything personal lives here. Edit this file to update the site.

export const profile = {
  name: 'Ali Mora',
  initials: 'AM',
  location: 'Johannesburg, South Africa',
  timezone: 'Africa/Johannesburg',
  tagline: 'Designer who codes. Developer who ships. Founder who runs the whole stack.',
  // Leave empty to hide. Add your public address, e.g. 'hello@yourdomain.co.za'
  email: 'ali@openmindi.co.za',
  // Photo lives at src/assets/ali.png (jpg/webp also work)
  photo: true,
  links: [
    { label: 'GitHub', handle: 'AliMora83', url: 'https://github.com/AliMora83' },
    { label: 'LinkedIn', handle: 'daurius-ali-swarts', url: 'https://www.linkedin.com/in/daurius-ali-swarts' },
  ],
  bio: [
    'I work across brand, web and business systems — usually all three for the same client. I start by understanding how a business actually runs, then design and build the pieces it needs.',
    'Alongside client work I build my own products: compliance tooling for South African training providers, financial-literacy books for kids, and small web tools I use every day.',
  ],
  roles: [
    {
      title: 'Odoo Solution Consultant',
      org: 'Digital Information Solutions (Odoo partner)',
      detail: 'Sales, CRM, Website and Training lead. Contract.',
      since: 'Feb 2024',
    },
    {
      title: 'Lead Graphic Designer, Brand & Web',
      org: 'Institute of Digital Business Strategy (IDBS)',
      detail: 'Part-time.',
      since: 'Apr 2021',
    },
  ],
  credentials: ['Odoo 18 Certified Developer (2025)'],
  nowBuilding: ['Namka Compliance Engine', 'SmartPress v2', 'A 3D-printed smart RC car'],
  // Shown in the menu bar and widgets. Set to '' to hide.
  availability: 'Open to remote SE roles',
  // Put a public copy of your CV at public/resume.pdf (no home address, phone numbers or referees).
  resumeUrl: './resume.pdf',
}

export type Project = {
  id: string
  title: string
  kind: string
  summary: string
  url?: string
  urlLabel?: string
  repo?: string
  stack: string[]
  // Recruiter-first fields shown in the preview pane and Quick Look
  role?: string // e.g. 'Solo: design, build, ship'
  outcome?: string // one line of impact: users, speed, revenue, adoption. Hidden when empty.
}

// Descriptions are first drafts — tighten them in your own words.
export const projects: Project[] = [
  {
    id: 'smartpress',
    role: 'Solo: design, build, ship',
    title: 'SmartPress',
    kind: 'Web tool',
    summary:
      'Fast image and PDF compression in the browser. Drag in files, set the quality, download the smaller versions. Runs client-side with WebAssembly, no backend.',
    url: 'https://smartpress.namka.cloud',
    urlLabel: 'smartpress.namka.cloud',
    stack: ['WebAssembly', 'Client-side', 'Images', 'PDF'],
  },
  {
    id: 'kora',
    role: 'Solo: design, build, ship',
    title: 'Kora Tutor',
    kind: 'AI product',
    summary: 'An AI-powered learning platform for Khoekhoegowab (Nama), designed and built from scratch.',
    url: 'https://kora.namka.cloud',
    urlLabel: 'kora.namka.cloud',
    stack: ['AI', 'Web app'],
  },
  {
    id: 'compound-calc',
    role: 'Solo: design, build, ship',
    title: 'Compound Calculator',
    kind: 'Finance tool',
    summary: 'A compound-interest calculator for South African savers.',
    url: 'https://compoundcalc.co.za',
    urlLabel: 'compoundcalc.co.za',
    stack: ['Web app'],
  },
  {
    id: 'financial-alphabet',
    role: 'Founder: brand, writing, design',
    title: 'Financial Alphabet',
    kind: 'Brand & digital products',
    summary:
      'A children’s financial-literacy brand that teaches money basics letter by letter, starting with A for Assets. Sold on Gumroad: the Financial Alphabet book, interactive flashcards for kids and a free Letter A activity page.',
    url: 'https://pennysbooks.gumroad.com/l/encpcb',
    urlLabel: 'Financial Alphabet on Gumroad',
    stack: ['Book', 'Flashcards', 'Free activity page'],
  },
  {
    id: 'clipvault',
    role: 'Solo: design and build',
    title: 'ClipVault',
    kind: 'macOS app',
    summary:
      'A clipboard manager for macOS in the spirit of FlyCut: keeps a searchable history of everything you copy so you can paste it again later. I use it every day.',
    repo: 'https://github.com/AliMora83/ClipVault',
    stack: ['macOS', 'Desktop app'],
  },
]

export const services = {
  intro:
    'Every engagement starts the same way: I learn how your business works and what you want from it, plan the solution and the process, then present it before anything is built. Ongoing retainers suit most clients best.',
  offers: [
    {
      title: 'Branding',
      body: 'Identity, visual systems and the assets your team uses every day.',
    },
    {
      title: 'Websites',
      body: 'Marketing sites, WordPress / WooCommerce stores and Odoo websites, built and maintained.',
    },
    {
      title: 'Security',
      body: 'Hardening and housekeeping for the sites and servers your business depends on.',
    },
  ],
  process: ['Consult', 'Plan', 'Present', 'Build & support'],
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Build', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Python'] },
  { group: 'Business systems', items: ['Odoo (Sales, CRM, Website)', 'WordPress', 'WooCommerce', 'Elementor'] },
  { group: 'Ship & automate', items: ['Docker', 'Linux VPS', 'Cloudflare', 'n8n', 'Claude Code'] },
  { group: 'Design', items: ['Figma', 'Canva', 'Kittl', 'Brand identity', '3D / CAD'] },
]

export const github = profile.links.find((l) => l.label === 'GitHub')
export const linkedin = profile.links.find((l) => l.label === 'LinkedIn')
