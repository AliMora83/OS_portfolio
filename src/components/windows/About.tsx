import { profile } from '../../data/profile'
import Avatar from '../Avatar'

export default function About() {
  return (
    <div className="mx-auto max-w-[68ch] px-6 py-8 md:px-10 md:py-10">
      <div className="flex items-center gap-5">
        <Avatar size={88} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{profile.name}</h1>
          <p className="mt-1 text-slate">{profile.location}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-[17px] leading-relaxed">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold">Where I work</h2>
      <ul className="mt-3 divide-y divide-indigo/10 border-y border-indigo/10">
        {profile.roles.map((r) => (
          <li key={r.title} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
            <div>
              <p className="font-semibold">{r.title}</p>
              <p className="text-slate">
                {r.org}. {r.detail}
              </p>
            </div>
            <p className="text-sm text-slate sm:pt-0.5">Since {r.since}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-bold">Certified</h2>
      <ul className="mt-2 text-[17px]">
        {profile.credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-bold">Find me</h2>
      <ul className="mt-2 flex flex-wrap gap-3">
        {profile.links.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md border border-indigo/20 px-3 py-1.5 hover:border-indigo hover:bg-indigo hover:text-chalk"
            >
              {l.label}: {l.handle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
