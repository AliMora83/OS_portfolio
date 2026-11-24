import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { apps } from './apps'
import { profile } from '../data/profile'
import Window from './Window'
import Taskbar from './Taskbar'

export default function Desktop() {
  const { appId } = useParams()
  const navigate = useNavigate()
  const open = apps.find((a) => a.id === appId)
  const close = useCallback(() => navigate('/'), [navigate])

  return (
    <main className="wallpaper relative h-full overflow-hidden text-chalk">
      <nav aria-label="Desktop" className="absolute left-3 top-4 z-10 md:left-5 md:top-6">
        <ul className="grid grid-cols-5 gap-1 md:grid-cols-1 md:gap-2">
          {apps.map(({ id, label, Icon }) => (
            <li key={id}>
              <button
                onClick={() => navigate(`/${id}`)}
                className={`group flex w-[68px] flex-col items-center gap-1.5 rounded-md p-2 md:w-[84px] ${
                  appId === id ? 'bg-chalk/15' : 'hover:bg-chalk/10'
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-chalk text-indigo shadow-[0_4px_0_0_#0f1638] group-active:translate-y-0.5 group-active:shadow-none">
                  <Icon />
                </span>
                <span className="text-[13px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="pointer-events-none absolute bottom-20 left-5 right-5 md:bottom-24 md:left-auto md:right-10 md:text-right">
        <h1 className="whitespace-nowrap text-[clamp(3.25rem,9vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.035em]">
          {profile.name}
        </h1>
        <p className="mt-4 text-[clamp(1rem,1.6vw,1.35rem)] font-medium leading-snug text-chalk/85 md:ml-auto md:max-w-[26ch]">
          {profile.tagline}
        </p>
      </section>

      <AnimatePresence>
        {open && (
          <Window key={open.id} title={open.title} onClose={close}>
            <open.Body />
          </Window>
        )}
      </AnimatePresence>

      <Taskbar activeId={open?.id} />
    </main>
  )
}
