import { KeyboardEvent, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Project, projects } from '../../data/profile'
import { useIsWide } from '../../hooks'
import { FileIcon, Glyph, bandFor, monogram, paths } from '../icons'
import { Chips, Field, ProjectSummary, ProofLinks, QuickLook, indexOf } from './ProjectCard'

export default function Projects() {
  const { itemId } = useParams()
  const detail = projects.find((p) => p.id === itemId)
  return detail ? <ProjectDetail p={detail} /> : <ProjectBrowser />
}

function ProjectBrowser() {
  const wide = useIsWide()
  const navigate = useNavigate()
  const [sel, setSel] = useState(0)
  const [ql, setQl] = useState(false)
  const grid = useRef<HTMLUListElement>(null)
  const tiles = useRef<(HTMLButtonElement | null)[]>([])
  const open = (i: number) => navigate(`/projects/${projects[i].id}`)

  const move = (i: number) => {
    const n = (i + projects.length) % projects.length
    setSel(n)
    tiles.current[n]?.focus()
  }

  const onKey = (e: KeyboardEvent) => {
    const cols = grid.current ? getComputedStyle(grid.current).gridTemplateColumns.split(' ').length : 1
    const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }
    if (e.key in map) {
      e.preventDefault()
      const next = sel + map[e.key]
      if (next >= 0 && next < projects.length) move(next)
    } else if (e.key === ' ') {
      e.preventDefault()
      setQl(true)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      open(sel)
    }
  }

  const current = projects[sel]

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-indigo/10 px-4 py-2 text-sm text-slate">
        <span className="font-medium text-indigo-deep">~/Projects</span>
        <span>{projects.length} items</span>
        {wide && (
          <>
            <span className="ml-auto hidden lg:inline">Space to preview · double-click to open</span>
            <button
              onClick={() => setQl(true)}
              className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 text-indigo-deep hover:bg-indigo/10 lg:ml-0"
              aria-label={`Quick Look ${current.title}`}
            >
              <Glyph d={paths.eye} size={18} />
              Quick Look
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-0 flex-1">
        <ul
          ref={grid}
          onKeyDown={onKey}
          aria-label="Projects"
          className={
            wide
              ? 'grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(118px,1fr))] content-start gap-2 overflow-y-auto p-4'
              : 'flex-1 divide-y divide-indigo/10 overflow-y-auto'
          }
        >
          {projects.map((p, i) => (
            <li key={p.id}>
              <button
                ref={(el) => (tiles.current[i] = el)}
                tabIndex={i === sel ? 0 : -1}
                aria-current={wide && i === sel ? 'true' : undefined}
                onFocus={() => setSel(i)}
                onClick={() => (wide ? setSel(i) : (setSel(i), setQl(true)))}
                onDoubleClick={() => open(i)}
                className={
                  wide
                    ? 'group flex w-full flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none'
                    : 'flex w-full items-center gap-4 px-4 py-3 text-left active:bg-indigo/5'
                }
              >
                <span className={wide ? `rounded-md p-1.5 ${i === sel ? 'bg-indigo/10' : ''}` : ''}>
                  <FileIcon size={wide ? 64 : 48} band={bandFor(i)} label={monogram(p.title)} />
                </span>
                {wide ? (
                  <span
                    className={`rounded px-1.5 text-[13px] font-medium leading-tight ${
                      i === sel ? 'bg-indigo text-chalk' : 'text-indigo-deep'
                    } group-focus-visible:ring-2 group-focus-visible:ring-ochre`}
                  >
                    {p.title}
                  </span>
                ) : (
                  <span className="min-w-0">
                    <span className="block font-semibold">{p.title}</span>
                    <span className="block truncate text-sm text-slate">
                      {p.kind}
                      {p.role ? ` · ${p.role}` : ''}
                    </span>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {wide && (
          <aside
            aria-label="Preview"
            aria-live="polite"
            className="hidden w-[300px] shrink-0 overflow-y-auto border-l border-indigo/10 bg-white/60 p-5 min-[1100px]:block"
          >
            <ProjectSummary p={current} i={sel} onOpen={() => open(sel)} />
          </aside>
        )}
      </div>

      {ql && (
        <QuickLook
          p={current}
          onClose={() => {
            setQl(false)
            if (wide) tiles.current[sel]?.focus()
          }}
          onStep={(d) => setSel((s) => (s + d + projects.length) % projects.length)}
          onOpen={() => {
            setQl(false)
            open(sel)
          }}
        />
      )}
    </div>
  )
}

function ProjectDetail({ p }: { p: Project }) {
  return (
    <article className="mx-auto max-w-[68ch] px-6 py-6 md:px-10 md:py-8">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-slate hover:text-indigo">
        <Glyph d={paths.chevronLeft} size={14} stroke={2.4} /> Projects
      </Link>
      <div className="mt-5 flex items-center gap-4">
        <FileIcon size={72} band={bandFor(indexOf(p))} label={monogram(p.title)} />
        <div>
          <p className="text-slate">{p.kind}</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{p.title}</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {p.role && (
          <Field label="My role">
            <p className="text-lg font-medium">{p.role}</p>
          </Field>
        )}
        <Field label="Stack">
          <Chips items={p.stack} />
        </Field>
        {p.outcome && (
          <Field label="Outcome">
            <p className="text-lg font-medium">{p.outcome}</p>
          </Field>
        )}
      </div>

      <p className="mt-8 text-lg leading-relaxed">{p.summary}</p>
      <div className="mt-8">
        <ProofLinks p={p} big />
      </div>
    </article>
  )
}
