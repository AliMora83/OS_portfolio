// One scrolling page with everything on it, for skimmers, printers and anyone who dislikes the desktop.
import { Link } from 'react-router-dom'
import { profile, projects, services, skills } from '../data/profile'
import { useDocTitle } from '../hooks'
import Avatar from './Avatar'

const H2 = ({ children }: { children: string }) => (
  <h2 className="mt-12 border-b-2 border-ochre pb-1 text-xl font-bold">{children}</h2>
)

export default function PlainView() {
  useDocTitle('Plain view')
  return (
    <main className="min-h-full bg-chalk text-indigo-deep">
      <div className="mx-auto max-w-[72ch] px-6 py-10 md:py-14">
        <Link to="/" className="text-sm text-slate underline underline-offset-4 hover:text-indigo print:hidden">
          ‹ Back to desktop view
        </Link>

        <header className="mt-6 flex items-center gap-5">
          <Avatar size={80} />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{profile.name}</h1>
            <p className="text-slate">{profile.location}</p>
          </div>
        </header>
        <p className="mt-5 text-xl font-medium leading-snug">{profile.tagline}</p>
        {profile.availability && <p className="mt-2 font-semibold text-[#1d7a4a]">{profile.availability} · SAST, UTC+2</p>}

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href={profile.resumeUrl} className="font-semibold underline underline-offset-4">Résumé (PDF)</a>
          </li>
          {profile.email && (
            <li>
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">{profile.email}</a>
            </li>
          )}
          {profile.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} className="underline underline-offset-4">{l.label}: {l.handle}</a>
            </li>
          ))}
        </ul>

        <H2>Projects</H2>
        <ul className="mt-4 space-y-8">
          {projects.map((p) => (
            <li key={p.id}>
              <h3 className="text-lg font-bold">
                {p.title} <span className="font-normal text-slate">· {p.kind}</span>
              </h3>
              {p.role && <p className="mt-1"><strong>Role:</strong> {p.role}</p>}
              <p className="mt-1"><strong>Stack:</strong> {p.stack.join(', ')}</p>
              {p.outcome && <p className="mt-1"><strong>Outcome:</strong> {p.outcome}</p>}
              <p className="mt-2 leading-relaxed">{p.summary}</p>
              <p className="mt-2 flex gap-4">
                {p.url && <a href={p.url} className="underline underline-offset-4">{p.urlLabel ?? 'Live site'}</a>}
                {p.repo && <a href={p.repo} className="underline underline-offset-4">GitHub</a>}
              </p>
            </li>
          ))}
        </ul>

        <H2>Experience</H2>
        <ul className="mt-4 space-y-4">
          {profile.roles.map((r) => (
            <li key={r.title}>
              <p className="font-semibold">{r.title} <span className="font-normal text-slate">· since {r.since}</span></p>
              <p className="text-slate">{r.org}. {r.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4"><strong>Certified:</strong> {profile.credentials.join(', ')}</p>

        <H2>About</H2>
        <div className="mt-4 space-y-3 leading-relaxed">
          {profile.bio.map((b) => <p key={b}>{b}</p>)}
        </div>

        <H2>Toolkit</H2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-[10rem_1fr]">
          {skills.map((g) => (
            <div key={g.group} className="contents">
              <dt className="font-semibold">{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <H2>Services</H2>
        <p className="mt-4 leading-relaxed">{services.intro}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {services.offers.map((o) => (
            <li key={o.title}><strong>{o.title}:</strong> {o.body}</li>
          ))}
        </ul>

        <H2>Contact</H2>
        <p className="mt-4">
          {profile.email ? <>Email <a href={`mailto:${profile.email}`} className="underline underline-offset-4">{profile.email}</a>. </> : null}
          Based in {profile.location}.
        </p>
      </div>
    </main>
  )
}
