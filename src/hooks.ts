import { useEffect, useState } from 'react'
import { profile } from './data/profile'

const WIDE = '(min-width: 768px)'

export function useIsWide() {
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)
  useEffect(() => {
    const mq = window.matchMedia(WIDE)
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

export function useNow(ms = 15_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

export function useRotate(length: number, ms = 5_000) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms])
  return i
}

export const timeFmt = new Intl.DateTimeFormat('en-ZA', {
  timeZone: profile.timezone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export const dateFmt = new Intl.DateTimeFormat('en-ZA', {
  timeZone: profile.timezone,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

export function useDocTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · Designer who codes`
  }, [title])
}
