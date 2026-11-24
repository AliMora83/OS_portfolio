// Mobile layout (< 768px): a phone home screen instead of draggable windows.
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { apps, findApp, glyphColor } from './apps'
import { profile, projects } from '../data/profile'
import { timeFmt, useDocTitle, useNow } from '../hooks'
import { AppTile, NowBuildingWidget, ProfileWidget, Wallpaper } from './Chrome'
import { GitHubMark, Glyph, LinkedInMark, paths } from './icons'

const github = profile.links.find((l) => l.label === 'GitHub')
const linkedin = profile.links.find((l) => l.label === 'LinkedIn')

function StatusBar({ dark }: { dark?: boolean }) {
  const now = useNow()
  return (
    <div className={`flex h-11 shrink-0 items-center justify-between px-6 text-[15px] font-semibold ${dark ? 'text-indigo-deep' : 'text-chalk'}`}>
      <time className="tabular-nums">{timeFmt.format(now)}</time>
      <span className="text-xs font-medium opacity-80">SAST</span>
    </div>
  )
}

function HomeApp({ label, children, to, href }: { label: string; children: ReactNode; to?: string; href?: string }) {
  const inner = (
    <>
      {children}
      <span className="mt-1.5 text-[12px] font-medium text-chalk [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">{label}</span>
    </>
  )
  const cls = 'flex flex-col items-center'
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={to!} className={cls}>
      {inner}
    </Link>
  )
}

const cvTile = (size: number) => (
  <AppTile tile="linear-gradient(160deg,#fff,#e9ecf5)" color="#d9644a" size={size}>
    <span className="text-[17px] font-extrabold">CV</span>
  </AppTile>
)

function Home() {
  useDocTitle()
  const appsInGrid = apps.filter((a) => a.id !== 'contact')
  return (
    <main className="relative flex min-h-full flex-col overflow-hidden">
      <Wallpaper />
      <div className="relative flex flex-1 flex-col">
        <StatusBar />
        <div className="space-y-3 px-4">
          <ProfileWidget />
          <NowBuildingWidget />
        </div>
        <nav aria-label="Apps" className="px-5 pt-6">
          <ul className="grid grid-cols-4 gap-x-3 gap-y-5">
            {appsInGrid.map((a) => (
              <li key={a.id}>
                <HomeApp label={a.label} to={`/${a.id}`}>
                  <AppTile glyph={a.glyph} tile={a.tile} color={glyphColor(a.id)} size={60} />
                </HomeApp>
              </li>
            ))}
            <li>
              <HomeApp label="Résumé" href={profile.resumeUrl}>
                {cvTile(60)}
              </HomeApp>
            </li>
            {github && (
              <li>
                <HomeApp label="GitHub" href={github.url}>
                  <AppTile tile="linear-gradient(160deg,#2b3247,#0f1638)" color="#fff" size={60}>
                    <GitHubMark size={30} />
                  </AppTile>
                </HomeApp>
              </li>
            )}
            {linkedin && (
              <li>
                <HomeApp label="LinkedIn" href={linkedin.url}>
                  <AppTile tile="linear-gradient(160deg,#2d7fd3,#0a5bb0)" color="#fff" size={60}>
                    <LinkedInMark size={28} />
                  </AppTile>
                </HomeApp>
              </li>
            )}
            <li>
              <HomeApp label="Plain view" to="/plain">
                <AppTile glyph={paths.page} tile="linear-gradient(160deg,#59627a,#2e3550)" color="#fff" size={60} />
              </HomeApp>
            </li>
          </ul>
        </nav>
        <div className="flex-1" />
        <nav aria-label="Dock" className="sticky bottom-0 px-3 pb-3 pt-6">
          <ul className="flex justify-around rounded-[30px] border border-white/20 bg-white/[0.14] px-4 py-3 backdrop-blur-2xl">
            <li>
              <Link to="/projects" aria-label="Projects">
                <AppTile glyph={apps[0].glyph} tile={apps[0].tile} color="#fff" size={58} />
              </Link>
            </li>
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" aria-label="Résumé">
                {cvTile(58)}
              </a>
            </li>
            <li>
              <Link to="/contact" aria-label="Mail">
                <AppTile glyph={paths.mail} tile={findApp('contact')!.tile} color="#fff" size={58} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default function Phone({ section, itemId }: { section?: string; itemId?: string }) {
  const open = findApp(section)
  const item = open?.id === 'projects' ? projects.find((p) => p.id === itemId) : undefined
  useDocTitle(item?.title ?? open?.title)
  if (!open) return <Home />

  return (
    <main className="flex h-full flex-col bg-chalk text-indigo-deep">
      <StatusBar dark />
      <header className="relative flex h-11 shrink-0 items-center border-b border-indigo/10 px-3">
        <Link to="/" className="flex items-center gap-0.5 text-[17px] font-medium text-indigo">
          <Glyph d={paths.chevronLeft} size={20} stroke={2.6} /> Home
        </Link>
        <h1 className="pointer-events-none absolute inset-x-0 text-center text-[17px] font-semibold">{open.title}</h1>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <open.Body />
      </div>
    </main>
  )
}
