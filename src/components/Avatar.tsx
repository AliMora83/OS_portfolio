import { profile } from '../data/profile'

// Shows src/assets/ali.(jpg|jpeg|png|webp) when profile.photo is true, otherwise initials.
const photos = import.meta.glob('../assets/ali.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })
const photoUrl = Object.values(photos)[0] as string | undefined

export default function Avatar({ size = 64 }: { size?: number }) {
  if (profile.photo && photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={profile.name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover ring-2 ring-ochre"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      aria-hidden
      className="grid shrink-0 place-items-center rounded-full bg-indigo font-extrabold text-ochre"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {profile.initials}
    </div>
  )
}
