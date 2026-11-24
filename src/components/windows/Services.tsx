import { Link } from 'react-router-dom'
import { services } from '../../data/profile'

export default function Services() {
  return (
    <div className="mx-auto max-w-[72ch] px-6 py-8 md:px-10 md:py-10">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Work with me</h1>
      <p className="mt-4 text-[17px] leading-relaxed">{services.intro}</p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-indigo/15 sm:grid-cols-3">
        {services.offers.map((o) => (
          <div key={o.title} className="bg-chalk p-5">
            <h2 className="text-xl font-bold">{o.title}</h2>
            <p className="mt-2 text-slate">{o.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold">How it runs</h2>
      <ol className="mt-4 flex flex-wrap items-center gap-2">
        {services.process.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="rounded-md bg-indigo px-3 py-1.5 text-chalk">
              <span className="mr-2 text-ochre">{i + 1}</span>
              {step}
            </span>
            {i < services.process.length - 1 && <span aria-hidden className="h-px w-5 bg-indigo/30" />}
          </li>
        ))}
      </ol>

      <Link
        to="/contact"
        className="mt-10 inline-block rounded-md bg-ochre px-4 py-2.5 font-semibold text-indigo-deep hover:brightness-105"
      >
        Start a conversation
      </Link>
    </div>
  )
}
