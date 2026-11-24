import { skills } from '../../data/profile'

export default function Skills() {
  return (
    <div className="mx-auto max-w-[80ch] px-6 py-8 md:px-10 md:py-10">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Toolkit</h1>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {skills.map((g) => (
          <section key={g.group}>
            <h2 className="border-b-2 border-ochre pb-1 text-lg font-bold">{g.group}</h2>
            <ul className="mt-3 space-y-1.5 text-[17px]">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
