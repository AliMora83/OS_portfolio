import { useState } from 'react'
import { projects } from '../../data/profile'

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId)!

  return (
    <div className="flex h-full flex-col md:flex-row">
      <nav aria-label="Projects" className="shrink-0 border-indigo/10 bg-indigo/[0.04] md:w-60 md:border-r">
        <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col md:p-3">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setActiveId(p.id)}
                aria-current={p.id === activeId}
                className={`w-full whitespace-nowrap rounded-md px-3 py-2 text-left ${
                  p.id === activeId ? 'bg-indigo text-chalk' : 'hover:bg-indigo/10'
                }`}
              >
                <span className="block font-semibold">{p.title}</span>
                <span className={`block text-sm ${p.id === activeId ? 'text-chalk/70' : 'text-slate'}`}>
                  {p.kind}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <article className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <p className="text-slate">{active.kind}</p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight md:text-5xl">{active.title}</h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">{active.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {active.stack.map((s) => (
            <li key={s} className="rounded-full bg-indigo/10 px-3 py-1 text-sm">
              {s}
            </li>
          ))}
        </ul>

        {active.url && (
          <a
            href={active.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-ochre px-4 py-2.5 font-semibold text-indigo-deep hover:brightness-105"
          >
            Open {active.urlLabel ?? 'site'}
          </a>
        )}
      </article>
    </div>
  )
}
