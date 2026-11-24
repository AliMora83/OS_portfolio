# Ali Mora — Portfolio

Personal portfolio of **Ali Mora**, a designer, developer and founder based in Johannesburg, South Africa.

The site works like a small desktop. You click an icon to open a window for each section:

- **About:** bio, current roles and certification
- **Projects:** SmartPress, Kora Tutor, Compound Calculator and Financial Alphabet
- **Services:** branding, websites and security, and how an engagement runs
- **Toolkit:** the tools and platforms I work with
- **Contact:** email and social links

On desktop, windows can be dragged, maximised and closed with `Esc`. On mobile they open full-screen.

## Tech stack

- [Vite](https://vitejs.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for window animation and dragging
- React Router (hash routing, so every window has a link, e.g. `/#/projects`)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
```

## Editing content

All personal content is in one file, `src/data/profile.ts`:

| What | Field |
| --- | --- |
| Name, tagline, location | `profile` |
| Bio, roles, certifications | `profile.bio`, `profile.roles`, `profile.credentials` |
| Email and social links | `profile.email`, `profile.links` |
| "Now building" ticker | `profile.nowBuilding` |
| Projects | `projects` |
| Services and process | `services` |
| Toolkit | `skills` |

To change the photo, replace `src/assets/ali.png` (`.jpg` and `.webp` also work).

## Project structure

```
src/
├── components/
│   ├── Desktop.tsx      # wallpaper, desktop icons, name
│   ├── Taskbar.tsx      # taskbar, clock, "now building"
│   ├── Window.tsx       # draggable / maximisable window
│   ├── Avatar.tsx
│   ├── apps.tsx         # list of windows and their icons
│   └── windows/         # About, Projects, Services, Skills, Contact
├── data/profile.ts      # all site content
├── App.tsx
└── main.tsx
```

## Deployment

`npm run build` outputs static files to `dist/`, using relative asset paths and hash routing. Serve that folder from any static host, such as nginx, a Docker container, Cloudflare Pages or a subdomain. No server-side routing is needed.

## Credits

This project started as a fork of an open-source OS-style portfolio. It has since been rewritten with new content, design and structure.

## Contact

- Email: [ali@openmindi.co.za](mailto:ali@openmindi.co.za)
- LinkedIn: [daurius-ali-swarts](https://www.linkedin.com/in/daurius-ali-swarts)
- GitHub: [AliMora83](https://github.com/AliMora83)
