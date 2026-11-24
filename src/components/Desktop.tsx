import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { findApp } from './apps'
import { projects } from '../data/profile'
import { useDocTitle } from '../hooks'
import Window from './Window'
import { DesktopIcons, Dock, MenuBar, Wallpaper, Widgets } from './Chrome'

export default function Desktop({ section, itemId }: { section?: string; itemId?: string }) {
  const navigate = useNavigate()
  const open = findApp(section)
  const close = useCallback(() => navigate('/desktop'), [navigate])
  const item = open?.id === 'projects' ? projects.find((p) => p.id === itemId) : undefined
  const title = item ? item.title : open?.title
  useDocTitle(title)

  return (
    <main className="relative h-full overflow-hidden text-chalk">
      <Wallpaper />
      <MenuBar />
      <Widgets />
      <DesktopIcons />

      <AnimatePresence>
        {open && (
          <Window key={open.id} title={item ? `Projects › ${item.title}` : open.title} activeId={open.id} onClose={close}>
            <open.Body />
          </Window>
        )}
      </AnimatePresence>

      <Dock activeId={open?.id} />
    </main>
  )
}
