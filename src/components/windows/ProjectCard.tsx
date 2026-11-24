// Project preview pieces shared by the Finder preview pane, Quick Look and the detail view.
import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Project, projects } from '../../data/profile'
import { FileIcon, Glyph, GitHubMark, bandFor, monogram, paths } from '../icons'

export const indexOf = (p: Project) => projects.findIndex((x) => x.id === p.id)

export function Chips({ items }: { items: string[] }) {
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

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

export function ProofLinks({ p, big }: { p: Project; big?: boolean }) {
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
export function ProjectSummary({ p, i, onOpen }: { p: Project; i: number; onOpen?: () => void }) {
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

export function QuickLook({
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
