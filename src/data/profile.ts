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
}

export type Project = {
  id: string
  title: string
  kind: string
  summary: string
  url?: string
  urlLabel?: string
  stack: string[]
}

// Descriptions are first drafts — tighten them in your own words.
export const projects: Project[] = [
  {
    id: 'smartpress',
    title: 'SmartPress',
    kind: 'Web tool',
    summary:
      'Fast image and video compression in the browser. Drag in files, set video CRF and image quality, download the smaller versions.',
    url: 'https://smartpress.namka.cloud',
    urlLabel: 'smartpress.namka.cloud',
    stack: ['Images', 'Video', 'v2.0.0'],
  },
  {
    id: 'kora',
    title: 'Kora Tutor',
    kind: 'AI product',
    summary: 'An AI tutor built under the Namka umbrella.',
    url: 'https://kora.namka.cloud',
    urlLabel: 'kora.namka.cloud',
    stack: ['AI', 'Web app'],
  },
  {
    id: 'compound-calc',
    title: 'Compound Calculator',
    kind: 'Finance tool',
    summary: 'A compound-interest calculator for South African savers.',
    url: 'https://compoundcalc.co.za',
    urlLabel: 'compoundcalc.co.za',
    stack: ['Web app'],
  },
  {
    id: 'financial-alphabet',
    title: 'Financial Alphabet',
    kind: 'Brand & digital products',
    summary:
      'A children’s financial-literacy brand that teaches money basics letter by letter, starting with A for Assets. Sold on Gumroad: the Financial Alphabet book, interactive flashcards for kids and a free Letter A activity page.',
    url: 'https://pennysbooks.gumroad.com/l/encpcb',
    urlLabel: 'Financial Alphabet on Gumroad',
    stack: ['Book', 'Flashcards', 'Free activity page'],
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
