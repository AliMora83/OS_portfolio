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
  // Tile background and glyph colour
  tile: string
  ink: string
  Body: ComponentType
}

export const apps: App[] = [
  { id: 'projects', title: 'Projects', label: 'Projects', glyph: paths.folder, tile: 'linear-gradient(160deg,#4c6ce6,#1d2b6b)', ink: '#fff', Body: Projects },
  { id: 'about', title: 'About Ali', label: 'About', glyph: paths.person, tile: 'linear-gradient(160deg,#ffffff,#dfe3ee)', ink: '#1d2b6b', Body: About },
  { id: 'services', title: 'Services', label: 'Services', glyph: paths.briefcase, tile: 'linear-gradient(160deg,#f6c45e,#e3a22b)', ink: '#3b2a06', Body: Services },
  { id: 'toolkit', title: 'Toolkit', label: 'Toolkit', glyph: paths.pencil, tile: 'linear-gradient(160deg,#4fb3a5,#2f8f83)', ink: '#fff', Body: Skills },
  { id: 'contact', title: 'Contact', label: 'Mail', glyph: paths.mail, tile: 'linear-gradient(160deg,#6aa0ff,#3461d1)', ink: '#fff', Body: Contact },
]

export const findApp = (id?: string) => apps.find((a) => a.id === id)

