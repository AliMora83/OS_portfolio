import { ComponentType } from 'react'
import About from './windows/About'
import Projects from './windows/Projects'
import Services from './windows/Services'
import Skills from './windows/Skills'
import Contact from './windows/Contact'
import { paths } from './icons'

export type App = {
  id: string
  title: string
  label: string
  glyph: string
  // Dock tile background
  tile: string
  Body: ComponentType
}

export const apps: App[] = [
  { id: 'projects', title: 'Projects', label: 'Projects', glyph: paths.folder, tile: 'linear-gradient(160deg,#4c6ce6,#1d2b6b)', Body: Projects },
  { id: 'about', title: 'About Ali', label: 'About', glyph: paths.person, tile: 'linear-gradient(160deg,#ffffff,#dfe3ee)', Body: About },
  { id: 'services', title: 'Services', label: 'Services', glyph: paths.briefcase, tile: 'linear-gradient(160deg,#f6c45e,#e3a22b)', Body: Services },
  { id: 'toolkit', title: 'Toolkit', label: 'Toolkit', glyph: paths.pencil, tile: 'linear-gradient(160deg,#4fb3a5,#2f8f83)', Body: Skills },
  { id: 'contact', title: 'Contact', label: 'Mail', glyph: paths.mail, tile: 'linear-gradient(160deg,#6aa0ff,#3461d1)', Body: Contact },
]

export const findApp = (id?: string) => apps.find((a) => a.id === id)

// Dark glyph on light tiles, white glyph on dark tiles
export const glyphColor = (id: string) => (id === 'about' ? '#1d2b6b' : id === 'services' ? '#3b2a06' : '#fff')
