// Original icon set for the site. Patterns borrowed from desktop OSes; artwork is our own.

export const paths = {
  person: 'M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM6 27c1.5-5 5.3-8 10-8s8.5 3 10 8',
  folder: 'M4 9h9l2 3h13v14H4zM4 9V6h8l2 3',
  briefcase: 'M5 11h22v15H5zM11 11V7h10v4M5 17h22',
  pencil: 'M19 5l8 8-14 14H5v-8zM15 9l8 8',
  mail: 'M4 8h24v16H4zM4 8l12 9 12-9',
  doc: 'M8 4h11l6 6v18H8zM19 4v6h6M12 16h9M12 20h9M12 24h6',
  eye: 'M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16zM16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  page: 'M6 5h20v22H6zM10 11h12M10 16h12M10 21h7',
  chevronLeft: 'M20 7l-9 9 9 9',
  external: 'M18 5h9v9M27 5L15 17M24 19v8H5V8h8',
}

export function Glyph({ d, size = 28, stroke = 1.8 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}

// Ochre folder: deliberately not the blue desktop-OS folder.
export function FolderIcon({ size = 64, glyph }: { size?: number; glyph?: string }) {
  return (
    <svg viewBox="0 0 64 52" width={size} height={(size * 52) / 64} aria-hidden>
      <defs>
        <linearGradient id="fold-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9851a" />
          <stop offset="1" stopColor="#b07214" />
        </linearGradient>
        <linearGradient id="fold-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c45e" />
          <stop offset="1" stopColor="#e3a22b" />
        </linearGradient>
      </defs>
      <path d="M4 6a4 4 0 0 1 4-4h14l6 6h28a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="url(#fold-back)" />
      <path d="M2 16a4 4 0 0 1 4-4h52a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="url(#fold-front)" />
      <path d="M2 17h60" stroke="#fff" strokeOpacity=".35" />
      {glyph && (
        <g transform="translate(20 19) scale(0.75)" fill="none" stroke="#8a5a10" strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d={glyph} />
        </g>
      )}
    </svg>
  )
}

// A document with a coloured band and a short label — used for Résumé.pdf and project files.
export function FileIcon({
  size = 56,
  band = '#1d2b6b',
  label,
  sub,
}: {
  size?: number
  band?: string
  label: string
  sub?: string
}) {
  return (
    <svg viewBox="0 0 48 60" width={(size * 48) / 60} height={size} aria-hidden>
      <path d="M4 3a3 3 0 0 1 3-3h24l13 13v44a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="#fff" />
      <path d="M31 0v10a3 3 0 0 0 3 3h10z" fill="#dfe3ee" />
      <path d="M4 3a3 3 0 0 1 3-3h24l13 13v44a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="none" stroke="#0f1638" strokeOpacity=".12" />
      <rect x="4" y="30" width="40" height="17" fill={band} />
      <text x="24" y="42.5" textAnchor="middle" fontFamily="Bricolage Grotesque, system-ui, sans-serif" fontWeight="800" fontSize="11" fill="#fff">
        {label}
      </text>
      {sub && (
        <text x="24" y="24" textAnchor="middle" fontFamily="Bricolage Grotesque, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#59627a">
          {sub}
        </text>
      )}
    </svg>
  )
}

export function GitHubMark({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export function LinkedInMark({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

const bands = ['#1d2b6b', '#e3a22b', '#2f8f83', '#d9644a', '#4c6ce6']
export const bandFor = (i: number) => bands[i % bands.length]
export const monogram = (title: string) =>
  title
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
