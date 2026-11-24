import { ReactNode, useEffect, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
}

const useIsWide = () => {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

export default function Window({ title, onClose, children }: Props) {
  const [max, setMax] = useState(false)
  const wide = useIsWide()
  const drag = useDragControls()
  const full = max || !wide

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.section
      role="dialog"
      aria-label={title}
      drag={!full}
      dragControls={drag}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={full ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`absolute z-20 flex flex-col overflow-hidden bg-chalk text-indigo-deep shadow-[0_24px_60px_-12px_rgba(8,12,36,0.65)] ${
        full
          ? 'inset-0 bottom-14 md:inset-3 md:bottom-16 md:rounded-lg'
          : 'inset-x-0 top-[7vh] mx-auto h-[76vh] w-[min(880px,calc(100vw-240px))] rounded-lg'
      }`}
    >
      <header
        onPointerDown={(e) => !full && drag.start(e)}
        onDoubleClick={() => wide && setMax((m) => !m)}
        className={`flex h-11 shrink-0 items-center justify-between bg-indigo-deep pl-4 pr-1.5 text-chalk ${
          full ? '' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <h2 className="text-[15px] font-medium">{title}</h2>
        <div className="flex gap-1">
          {wide && (
            <button
              onClick={() => setMax((m) => !m)}
              aria-label={max ? 'Restore window' : 'Maximise window'}
              className="grid h-8 w-8 place-items-center rounded text-chalk/70 hover:bg-white/10 hover:text-chalk"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                {max ? <path d="M3 1h8v8M1 3h8v8H1z" /> : <rect x="1" y="1" width="10" height="10" />}
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close window"
            className="grid h-8 w-8 place-items-center rounded text-chalk/70 hover:bg-ochre hover:text-indigo-deep"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.6">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </motion.section>
  )
}
