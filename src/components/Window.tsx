import { ReactNode, useEffect, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { apps } from './apps'
import { profile } from '../data/profile'
import { FileIcon, FolderIcon } from './icons'

type Props = {
  title: string
  activeId: string
  onClose: () => void
  children: ReactNode
}

function TrafficLights({ onClose, onMin, onZoom, zoomed }: { onClose: () => void; onMin: () => void; onZoom: () => void; zoomed: boolean }) {
  const dot = 'group/tl grid h-3 w-3 place-items-center rounded-full ring-1 ring-black/10'
  const icon = 'h-2 w-2 opacity-0 group-hover/lights:opacity-70'
  return (
    <div className="group/lights flex gap-2" onPointerDown={(e) => e.stopPropagation()}>
      <button onClick={onClose} aria-label="Close window" className={`${dot} bg-[#ff5f57]`}>
        <svg viewBox="0 0 8 8" className={icon} stroke="#4d0000" strokeWidth="1.3"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" /></svg>
      </button>
      <button onClick={onMin} aria-label="Minimise to desktop" className={`${dot} bg-[#febc2e]`}>
        <svg viewBox="0 0 8 8" className={icon} stroke="#5a3a00" strokeWidth="1.3"><path d="M1.5 4h5" /></svg>
      </button>
      <button onClick={onZoom} aria-label={zoomed ? 'Restore window' : 'Zoom window'} className={`${dot} bg-[#28c840]`}>
        <svg viewBox="0 0 8 8" className={icon} fill="#003d00"><path d="M2 2h3L2 5zM6 6H3l3-3z" /></svg>
      </button>
    </div>
  )
}

export default function Window({ title, activeId, onClose, children }: Props) {
  const [max, setMax] = useState(false)
  const drag = useDragControls()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`pointer-events-none absolute z-20 ${
        max ? 'inset-x-2 bottom-[92px] top-9' : 'bottom-[104px] left-6 right-[132px] top-12 xl:left-[318px]'
      }`}
    >
      <motion.section
        role="dialog"
        aria-label={title}
        drag={!max}
        dragControls={drag}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={max ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={`pointer-events-auto mx-auto flex h-full overflow-hidden rounded-xl border border-black/10 bg-chalk text-indigo-deep shadow-[0_30px_80px_-12px_rgba(8,12,36,0.7)] ${
          max ? 'w-full' : 'w-full max-w-[1000px]'
        }`}
      >
        <nav aria-label="Favourites" className="hidden w-[176px] shrink-0 flex-col bg-[#e4e8f3]/90 px-2.5 pb-3 pt-3 lg:flex">
          <p className="px-2 text-[11px] font-semibold text-slate">Favourites</p>
          <ul className="mt-1 space-y-0.5">
            {apps.map((a) => (
              <li key={a.id}>
                <NavLink
                  to={`/${a.id}`}
                  className={`flex items-center gap-2 rounded-md px-2 py-1 text-[13px] ${
                    a.id === activeId ? 'bg-indigo/15 font-semibold' : 'hover:bg-indigo/[0.07]'
                  }`}
                >
                  <FolderIcon size={18} />
                  {a.id === 'contact' ? 'Contact' : a.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-4 px-2 text-[11px] font-semibold text-slate">Documents</p>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex items-center gap-2 rounded-md px-2 py-1 text-[13px] hover:bg-indigo/[0.07]"
          >
            <FileIcon size={18} band="#d9644a" label="" /> Résumé.pdf
          </a>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            onPointerDown={(e) => !max && drag.start(e)}
            onDoubleClick={() => setMax((m) => !m)}
            className={`relative flex h-11 shrink-0 items-center border-b border-indigo/10 bg-chalk px-4 ${
              max ? '' : 'cursor-grab active:cursor-grabbing'
            }`}
          >
            <TrafficLights onClose={onClose} onMin={onClose} onZoom={() => setMax((m) => !m)} zoomed={max} />
            <h2 className="pointer-events-none absolute inset-x-0 text-center text-[13px] font-semibold">{title}</h2>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </motion.section>
    </div>
  )
}
