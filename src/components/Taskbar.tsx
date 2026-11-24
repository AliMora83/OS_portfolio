import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apps } from './apps'
import { profile } from '../data/profile'

const fmt = new Intl.DateTimeFormat('en-ZA', {
  timeZone: profile.timezone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export default function Taskbar({ activeId }: { activeId?: string }) {
  const navigate = useNavigate()
  const [now, setNow] = useState(() => new Date())
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000)
    const r = setInterval(() => setI((n) => (n + 1) % profile.nowBuilding.length), 5_000)
    return () => {
      clearInterval(t)
      clearInterval(r)
    }
  }, [])

  return (
    <footer className="absolute inset-x-0 bottom-0 z-30 flex h-14 items-center gap-2 border-t border-chalk/10 bg-indigo-deep/95 px-2 backdrop-blur md:px-3">
      <button
        onClick={() => navigate('/')}
        aria-label="Show desktop"
        className="grid h-10 w-10 place-items-center rounded-md bg-ochre font-extrabold text-indigo-deep"
      >
        {profile.initials}
      </button>

      <ul className="hidden items-center gap-1 sm:flex">
        {apps.map((a) => (
          <li key={a.id}>
            <button
              onClick={() => navigate(activeId === a.id ? '/' : `/${a.id}`)}
              className={`h-10 rounded-md px-3 text-sm ${
                activeId === a.id
                  ? 'bg-chalk/15 text-chalk shadow-[inset_0_-2px_0_0_#e3a22b]'
                  : 'text-chalk/75 hover:bg-chalk/10 hover:text-chalk'
              }`}
            >
              {a.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="ml-auto hidden truncate text-sm text-chalk/70 lg:block" aria-live="polite">
        Now building: <span className="text-chalk">{profile.nowBuilding[i]}</span>
      </p>
      <p className="ml-auto px-2 text-right text-sm leading-tight text-chalk/80 lg:ml-4">
        <span className="block font-semibold text-chalk">{fmt.format(now)}</span>
        <span className="block text-xs">Johannesburg</span>
      </p>
    </footer>
  )
}
