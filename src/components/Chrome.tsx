// Desktop furniture: wallpaper, menu bar, desktop icons, widgets and Dock.
import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apps, glyphColor } from './apps'
import { profile } from '../data/profile'
import { dateFmt, timeFmt, useNow, useRotate } from '../hooks'
import Avatar from './Avatar'
import { FileIcon, FolderIcon, Glyph, GitHubMark, LinkedInMark, paths } from './icons'

const github = profile.links.find((l) => l.label === 'GitHub')
const linkedin = profile.links.find((l) => l.label === 'LinkedIn')

export function Wallpaper() {
  return (
    <div aria-hidden className="wallpaper absolute inset-0 -z-0 overflow-hidden">
      <svg className="absolute inset-x-0 bottom-0 h-[58%] w-full" viewBox="0 0 1440 520" preserveAspectRatio="none">
        <path d="M0 260C220 170 420 150 640 210s420 120 800 10v300H0z" fill="#2a3d8f" fillOpacity=".55" />
        <path d="M0 340c260-90 520-110 760-40s420 70 680-20v240H0z" fill="#e3a22b" fillOpacity=".22" />
        <path d="M0 410c300-70 560-60 820-10s400 40 620-10v130H0z" fill="#0f1638" fillOpacity=".7" />
      </svg>
    </div>
  )
}

export function MenuBar() {
  const now = useNow()
  const item = 'rounded px-2 py-0.5 hover:bg-white/15'
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex h-7 items-center gap-1 bg-indigo-deep/45 px-3 text-[13px] text-chalk backdrop-blur-xl">
      <Link to="/" aria-label="Home" className="mr-1 grid h-5 w-6 place-items-center rounded bg-ochre text-[10px] font-extrabold text-indigo-deep">
        {profile.initials}
      </Link>
      <Link to="/about" className={`${item} font-bold`}>
        {profile.name}
      </Link>
      <nav aria-label="Menu" className="flex">
        <Link to="/projects" className={item}>Projects</Link>
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={item}>Résumé</a>
        <Link to="/contact" className={item}>Contact</Link>
        <Link to="/plain" className={item}>Plain view</Link>
      </nav>
      <div className="ml-auto flex items-center gap-3">
        {profile.availability && (
          <span className="hidden items-center gap-1.5 lg:flex">
            <span className="h-2 w-2 rounded-full bg-[#3ddc84] shadow-[0_0_6px_#3ddc84]" />
            {profile.availability}
          </span>
        )}
        <time className="tabular-nums" dateTime={now.toISOString()}>
          {dateFmt.format(now)} {timeFmt.format(now)}
        </time>
      </div>
    </header>
  )
}

function DeskIcon({ children, label, to, href }: { children: ReactNode; label: string; to?: string; href?: string }) {
  const cls =
    'group flex w-[92px] flex-col items-center gap-1 rounded-lg p-1.5 text-center outline-none focus-visible:bg-white/15'
  const inner = (
    <>
      <span className="grid h-16 place-items-center drop-shadow-[0_4px_8px_rgba(8,12,36,.45)] transition-transform group-hover:-translate-y-0.5">
        {children}
      </span>
      <span className="rounded px-1 text-[12.5px] font-medium leading-tight text-chalk [text-shadow:0_1px_3px_rgba(0,0,0,.8)] group-hover:bg-indigo/70 group-focus-visible:bg-indigo">
        {label}
      </span>
    </>
  )
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

export function DesktopIcons() {
  return (
    <nav aria-label="Desktop" className="absolute right-4 top-10 z-10">
      <ul className="flex flex-col gap-2">
        <li>
          <DeskIcon label="Résumé.pdf" href={profile.resumeUrl}>
            <FileIcon size={60} band="#d9644a" label="PDF" sub="CV" />
          </DeskIcon>
        </li>
        <li>
          <DeskIcon label="Projects" to="/projects">
            <FolderIcon size={64} glyph={paths.doc} />
          </DeskIcon>
        </li>
        <li>
          <DeskIcon label="About Me" to="/about">
            <FolderIcon size={64} glyph={paths.person} />
          </DeskIcon>
        </li>
        <li>
          <DeskIcon label="Toolkit" to="/toolkit">
            <FolderIcon size={64} glyph={paths.pencil} />
          </DeskIcon>
        </li>
      </ul>
    </nav>
  )
}

function Widget({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  return (
    <section
      aria-label={label}
      className={`rounded-[22px] border border-white/15 bg-white/[0.11] p-4 text-chalk shadow-[0_10px_30px_-10px_rgba(8,12,36,.6)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </section>
  )
}

export function ProfileWidget() {
  return (
    <Widget label="About Ali">
      <div className="flex items-center gap-3">
        <Avatar size={52} />
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight">{profile.name}</h1>
          <p className="text-[13px] text-chalk/70">Johannesburg · SAST, UTC+2</p>
        </div>
      </div>
      <p className="mt-3 text-[15px] font-medium leading-snug">{profile.tagline}</p>
      {profile.availability && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#3ddc84]/15 px-2.5 py-1 text-[12.5px] font-semibold text-[#8ff0b9]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" />
          {profile.availability}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-ochre px-3 py-1.5 text-sm font-semibold text-indigo-deep hover:brightness-105">
          Résumé
        </a>
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/25">
            Email me
          </a>
        )}
      </div>
    </Widget>
  )
}

export function NowBuildingWidget() {
  const i = useRotate(profile.nowBuilding.length)
  return (
    <Widget label="Now building">
      <p className="text-[11px] font-bold uppercase tracking-wider text-ochre">Now building</p>
      <p className="mt-1 min-h-[2.6em] text-[17px] font-semibold leading-snug" aria-live="polite">
        {profile.nowBuilding[i]}
      </p>
      <div className="mt-2 flex gap-1" aria-hidden>
        {profile.nowBuilding.map((_, n) => (
          <span key={n} className={`h-1 rounded-full transition-all ${n === i ? 'w-5 bg-ochre' : 'w-1.5 bg-white/30'}`} />
        ))}
      </div>
    </Widget>
  )
}

export function GitHubWidget() {
  if (!github) return null
  return (
    <Widget label="GitHub">
      <a href={github.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ochre">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-deep">
          <GitHubMark size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-chalk/60">GitHub</span>
          <span className="block font-semibold">@{github.handle}</span>
        </span>
        <Glyph d={paths.external} size={16} stroke={2.2} />
      </a>
    </Widget>
  )
}

export function Widgets() {
  return (
    <aside aria-label="Widgets" className="absolute left-4 top-10 z-10 hidden w-[284px] flex-col gap-3 xl:flex">
      <ProfileWidget />
      <NowBuildingWidget />
      <GitHubWidget />
    </aside>
  )
}

export function AppTile({ glyph, tile, color, size = 52, children }: { glyph?: string; tile: string; color: string; size?: number; children?: ReactNode }) {
  return (
    <span
      className="grid place-items-center rounded-[24%] border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_4px_10px_-2px_rgba(8,12,36,.5)]"
      style={{ width: size, height: size, background: tile, color }}
    >
      {children ?? (glyph && <Glyph d={glyph} size={size * 0.55} stroke={2} />)}
    </span>
  )
}

function DockItem({ label, active, onClick, href, children }: { label: string; active?: boolean; onClick?: () => void; href?: string; children: ReactNode }) {
  const cls = 'group relative flex flex-col items-center outline-none'
  const body = (
    <>
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-indigo-deep/90 px-2 py-0.5 text-xs text-chalk opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
      <span className="transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110 group-focus-visible:-translate-y-1.5 group-focus-visible:scale-110">
        {children}
      </span>
      <span aria-hidden className={`mt-1 h-1 w-1 rounded-full ${active ? 'bg-chalk/90' : 'bg-transparent'}`} />
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={cls}>
      {body}
    </a>
  ) : (
    <button onClick={onClick} aria-label={label} aria-current={active ? 'page' : undefined} className={cls}>
      {body}
    </button>
  )
}

export function Dock({ activeId }: { activeId?: string }) {
  const navigate = useNavigate()
  return (
    <nav aria-label="Dock" className="absolute inset-x-0 bottom-2 z-40 flex justify-center">
      <ul className="flex items-end gap-2 rounded-[24px] border border-white/20 bg-white/[0.14] px-2.5 pb-1 pt-2.5 shadow-[0_20px_50px_-10px_rgba(8,12,36,.6)] backdrop-blur-2xl">
        {apps.map((a) => (
          <li key={a.id}>
            <DockItem label={a.label} active={activeId === a.id} onClick={() => navigate(activeId === a.id ? '/desktop' : `/${a.id}`)}>
              <AppTile glyph={a.glyph} tile={a.tile} color={glyphColor(a.id)} />
            </DockItem>
          </li>
        ))}
        <li>
          <DockItem label="Résumé.pdf" href={profile.resumeUrl}>
            <AppTile tile="linear-gradient(160deg,#fff,#e9ecf5)" color="#d9644a">
              <span className="text-[15px] font-extrabold">CV</span>
            </AppTile>
          </DockItem>
        </li>
        <li aria-hidden className="mx-1 mb-3 h-10 w-px self-center bg-white/25" />
        {github && (
          <li>
            <DockItem label="GitHub" href={github.url}>
              <AppTile tile="linear-gradient(160deg,#2b3247,#0f1638)" color="#fff">
                <GitHubMark size={28} />
              </AppTile>
            </DockItem>
          </li>
        )}
        {linkedin && (
          <li>
            <DockItem label="LinkedIn" href={linkedin.url}>
              <AppTile tile="linear-gradient(160deg,#2d7fd3,#0a5bb0)" color="#fff">
                <LinkedInMark size={26} />
              </AppTile>
            </DockItem>
          </li>
        )}
      </ul>
    </nav>
  )
}
