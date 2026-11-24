import { FormEvent, useState } from 'react'
import { profile } from '../../data/profile'

export default function Contact() {
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')

  const send = (e: FormEvent) => {
    e.preventDefault()
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(message)}`
    window.location.href = url
  }

  return (
    <div className="mx-auto max-w-[62ch] px-6 py-8 md:px-10 md:py-10">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Get in touch</h1>
      <p className="mt-3 text-[17px] text-slate">
        Tell me what you’re working on. I reply from {profile.location.split(',')[0]} (SAST, UTC+2).
      </p>

      {profile.email ? (
        <form onSubmit={send} className="mt-8 space-y-4">
          <label className="block">
            <span className="font-semibold">Topic</span>
            <input
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="New website for my practice"
              className="mt-1 w-full rounded-md border border-indigo/25 bg-white px-3 py-2.5 outline-none focus:border-indigo"
            />
          </label>
          <label className="block">
            <span className="font-semibold">Message</span>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full resize-y rounded-md border border-indigo/25 bg-white px-3 py-2.5 outline-none focus:border-indigo"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button className="rounded-md bg-ochre px-4 py-2.5 font-semibold text-indigo-deep hover:brightness-105">
              Open in email
            </button>
            <a href={`mailto:${profile.email}`} className="text-slate underline underline-offset-4 hover:text-indigo">
              {profile.email}
            </a>
          </div>
        </form>
      ) : null}

      <ul className="mt-8 space-y-2">
        {profile.links.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-indigo">
              {l.label}: {l.handle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
