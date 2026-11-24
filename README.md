# Ali Mora — Portfolio

Personal portfolio of **Ali Mora**, a designer, developer and founder based in Johannesburg, South Africa.

The site looks and behaves like a macOS-style desktop, built for recruiters: a Finder window opens on `~/Projects` the moment the page loads, and the Résumé, GitHub and LinkedIn are one click away from anywhere.

- **Menu bar, Dock, desktop icons and widgets** (profile and availability, Now building, GitHub)
- **Finder + Quick Look:** click a project to preview it, press `Space` for Quick Look, double-click or `Enter` to open it. Arrow keys move the selection, `Esc` closes.
- **Deep links:** `/#/projects/smartpress`, `/#/about`, `/#/toolkit`, `/#/contact`; `/#/desktop` shows the empty desktop
- **Mobile:** a phone home screen; apps open full-screen
- **Plain view** (`/#/plain`): everything on one scrolling page

The plan and scope live in [`SPEC.md`](SPEC.md). Artwork (wallpaper, folders, file icons) is original; no Apple assets are used.

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
| Availability status | `profile.availability` |
| Résumé link | `profile.resumeUrl` (put the file at `public/resume.pdf`) |
| Project role, outcome, repo | `projects[].role`, `.outcome`, `.repo` |
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
