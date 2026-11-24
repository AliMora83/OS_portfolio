import { ComponentType } from 'react'
import About from './windows/About'
import Projects from './windows/Projects'
import Services from './windows/Services'
import Skills from './windows/Skills'
import Contact from './windows/Contact'

const glyph = (d: string) => () =>
  (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d={d} />
    </svg>
  )

export type App = {
  id: string
  title: string
  label: string
  Icon: ComponentType
  Body: ComponentType
}

export const apps: App[] = [
  { id: 'about', title: 'About Ali', label: 'About', Icon: glyph('M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM6 27c1.5-5 5.3-8 10-8s8.5 3 10 8'), Body: About },
  { id: 'projects', title: 'Projects', label: 'Projects', Icon: glyph('M4 9h9l2 3h13v14H4zM4 9V6h8l2 3'), Body: Projects },
  { id: 'services', title: 'Services', label: 'Services', Icon: glyph('M5 11h22v15H5zM11 11V7h10v4M5 17h22'), Body: Services },
  { id: 'skills', title: 'Toolkit', label: 'Toolkit', Icon: glyph('M19 5l8 8-14 14H5v-8zM15 9l8 8'), Body: Skills },
  { id: 'contact', title: 'Contact', label: 'Contact', Icon: glyph('M4 8h24v16H4zM4 8l12 9 12-9'), Body: Contact },
]
