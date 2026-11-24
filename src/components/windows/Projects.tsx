import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Project, projects } from '../../data/profile'
import { useIsWide } from '../../hooks'
import { FileIcon, Glyph, GitHubMark, bandFor, monogram, paths } from '../icons'

const indexOf = (p: Project) => projects.findIndex((x) => x.id === p.id)

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

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded-full bg-indigo/10 px-2.5 py-0.5 text-sm">
          {s}
        </li>
      ))}
    </ul>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function ProofLinks({ p, big }: { p: Project; big?: boolean }) {
  const cls = big ? 'px-4 py-2.5' : 'px-3 py-2 text-sm'
  return (
    <div className="flex flex-wrap gap-2">
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md bg-ochre font-semibold text-indigo-deep hover:brightness-105 ${cls}`}
        >
          Live <Glyph d={paths.external} size={14} stroke={2.4} />
        </a>
      )}
      {p.repo && (
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md bg-indigo-deep font-semibold text-chalk hover:bg-indigo ${cls}`}
        >
          <GitHubMark size={16} /> GitHub
        </a>
      )}
    </div>
  )
}

// Recruiter-first order: title, role, stack, outcome, proof.
function ProjectSummary({ p, i, onOpen }: { p: Project; i: number; onOpen?: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <FileIcon size={52} band={bandFor(i)} label={monogram(p.title)} />
        <div>
          <h3 className="text-xl font-extrabold leading-tight tracking-tight">{p.title}</h3>
          <p className="text-sm text-slate">{p.kind}</p>
        </div>
      </div>
      {p.role && (
        <Field label="My role">
          <p className="font-medium">{p.role}</p>
        </Field>
      )}
      <Field label="Stack">
        <Chips items={p.stack} />
      </Field>
      {p.outcome && (
        <Field label="Outcome">
          <p className="font-medium">{p.outcome}</p>
        </Field>
      )}
      <p className="text-[15px] leading-relaxed text-indigo-deep/80">{p.summary}</p>
      <div className="flex flex-wrap items-center gap-2">
        <ProofLinks p={p} />
        {onOpen && (
          <button onClick={onOpen} className="rounded-md px-3 py-2 text-sm font-semibold text-indigo hover:bg-indigo/10">
            Open
          </button>
        )}
      </div>
    </div>
  )
}

function QuickLook({
  p,
  onClose,
  onStep,
  onOpen,
}: {
  p: Project
  onClose: () => void
  onStep: (d: number) => void
  onOpen: () => void
}) {
  const closeBtn = useRef<HTMLButtonElement>(null)
  useEffect(() => closeBtn.current?.focus(), [])
  useEffect(() => {
    // Capture so Esc closes Quick Look before it reaches the window.
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === ' ' && (e.target as HTMLElement).tagName !== 'A')) {
        e.preventDefault()
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        onStep(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        onStep(-1)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose, onStep])

  return createPortal(
    <div className="fixed inset-0 z-[60] grid place-items-end bg-indigo-deep/40 backdrop-blur-[2px] sm:place-items-center" onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick Look: ${p.title}`}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.14 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full overflow-hidden rounded-t-2xl bg-chalk text-indigo-deep shadow-[0_30px_80px_-10px_rgba(8,12,36,.7)] sm:w-[520px] sm:rounded-xl"
      >
        <div className="flex h-10 items-center border-b border-indigo/10 px-3">
          <button
            ref={closeBtn}
            onClick={onClose}
            aria-label="Close Quick Look"
            className="grid h-6 w-6 place-items-center rounded-full text-slate hover:bg-indigo/10"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8">
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" />
            </svg>
          </button>
          <p className="flex-1 text-center text-sm font-medium">{p.title}</p>
          <button onClick={onOpen} className="rounded px-2 py-0.5 text-sm font-semibold text-indigo hover:bg-indigo/10">
            Open
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <ProjectSummary p={p} i={indexOf(p)} />
        </div>
      </motion.div>
    </div>,
    document.body,
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
