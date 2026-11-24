# OS Portfolio — macOS desktop redesign

**Owner:** Ali Mora · **Live:** alimora.namka.cloud · **Repo:** AliMora83/OS_portfolio
**Status:** v1 built locally (branch `macos-v1`), not yet deployed · **Last updated:** 24 Nov 2026

## 1. Goal

Make the portfolio look and behave like a current macOS desktop, so that a **recruiter hiring for Software Engineering / design-engineering roles** can find my best work and my CV within 30 seconds of landing.

The OS metaphor is the hook. It must never slow a recruiter down.

## 2. Audience

Primary: recruiters and hiring managers, who skim and usually open the site once.
They want four things: **what I built, my role, the stack, and proof (live link / GitHub)**, plus the CV.

Secondary: clients (Services and Contact stay, but they're not the hero).

## 3. Principles

1. **Content in the first 3 seconds.** The site never lands on an empty desktop. A Finder window opens on `~/Projects` by default, with the first project already previewed.
2. **Everything is one click from anywhere:** projects, the CV and contact.
3. **Mac-flavoured, Ali-branded.** Copy the *patterns* (menu bar, Dock, Finder, Quick Look, widgets), not Apple's assets. No Apple logo, wallpapers, SF Pro or Apple icons. Own wallpaper, ochre folder icons and the brand palette (indigo `#1d2b6b`, ink `#0f1638`, chalk `#f4f6fb`, ochre `#e3a22b`) with Bricolage Grotesque.
4. **Real HTML, not canvas.** Screen readers, crawlers, Ctrl-F and keyboard navigation all work.
5. **Escape hatch.** A "Plain view" link shows everything on one scrolling page.
6. **Fast.** No heavy images on load; the wallpaper is CSS/SVG. Target Lighthouse ≥ 90 on performance and accessibility.

## 4. Landing state (desktop ≥ 768px)

| Area | Content |
|---|---|
| Menu bar (top) | `AM` badge · **Ali Mora** · Projects, Résumé, Contact, Plain view · right: "Open to remote SE roles" status, date and time (SAST) |
| Desktop icons (top right) | **Résumé.pdf** (first), Projects, About Me, Toolkit. **Single click opens** (recruiters don't double-click desktops). |
| Widgets (left, ≥ 1280px) | **Profile** (photo, name, tagline, availability, Résumé + Email buttons), **Now building** (rotates `profile.nowBuilding`), **GitHub** (`@AliMora83`) |
| Open window | Finder on `~/Projects`, projects shown as files, preview pane on the right |
| Dock (bottom) | Projects, About, Services, Toolkit, Mail (Contact), Résumé · divider · GitHub, LinkedIn. Dot under the open app. |

The big "Ali Mora" headline from the old design moved into the Profile widget so the window can sit in the middle.

## 5. Finder + Quick Look

- Every section opens in the same Finder-style window. Sidebar: Favourites (Projects, About, Services, Toolkit, Contact) and Documents (Résumé.pdf). Sidebar shows from 1024px.
- Projects show as file tiles (own file icon with a coloured band and monogram).
- **Click** selects and fills the **preview pane** (≥ 1100px). **Space** or the Quick Look button opens **Quick Look**. **Double-click / Enter** opens the detail view. **Arrow keys** move the selection (and step through projects inside Quick Look). **Esc** closes Quick Look, then the window.
- **Preview pane / Quick Look card** (recruiter-first order):
  1. Title + kind
  2. **My role**
  3. **Stack** chips
  4. **Outcome**: one line of impact (hidden when empty)
  5. Summary
  6. Buttons: **Live**, **GitHub** (when set)

Each project in `src/data/profile.ts` has `role`, `stack`, `outcome`, `url` and `repo`.

## 6. Windows and routes

- Traffic lights: close and minimise go to the empty desktop; zoom (or double-click the title bar) maximises. Centred title.
- One window at a time in v1. Every view has a shareable URL:

| URL | Shows |
|---|---|
| `/#/` | Finder on Projects (desktop) · home screen (mobile) |
| `/#/projects/<id>` | Project detail |
| `/#/about`, `/#/services`, `/#/toolkit`, `/#/contact` | That section |
| `/#/desktop` | Empty desktop, widgets only |
| `/#/plain` | Plain view |

- Draggable by the title bar when not maximised. Resizing is v2.

## 7. Mobile (< 768px): phone home screen

- Status bar (time, SAST), Profile and Now building widgets, a 4-column app grid (Projects, About, Services, Toolkit, Résumé, GitHub, LinkedIn, Plain view) and a Dock with Projects, Résumé and Mail.
- Tapping an app opens it full-screen with a "‹ Home" control.
- In Projects, tapping a row opens Quick Look as a bottom sheet.

## 8. Plain view

`/#/plain`: name, tagline, availability, Résumé/email/links, projects (role/stack/outcome/links), experience, about, toolkit, services and contact on one page. Prints cleanly.

## 9. Scope

### v1 (built 24 Nov 2026)
- [x] Wallpaper (CSS + SVG hills, brand palette)
- [x] Menu bar
- [x] Dock replacing the old taskbar
- [x] Desktop icons, Résumé.pdf first
- [x] Widgets: Profile/Availability, Now building, GitHub
- [x] Finder open on Projects by default, preview pane, Quick Look, keyboard navigation
- [x] Mac-style window chrome with sidebar
- [x] Plain view
- [x] Phone home-screen layout on mobile
- [x] Profile photo shrunk from 249 KB to 63 KB
- [ ] **Ali:** add `public/resume.pdf` (a public version: no home address, phone numbers or referees). Until then every Résumé link 404s.
- [ ] **Ali:** write the `outcome` line for each project; check the `role` lines (drafted as "Solo: design, build, ship" for own products); add `repo` links where public
- [ ] **Ali:** review, merge `macos-v1` and deploy
- [ ] 30-second test with 3 people (see §10)

### v2 (next)
- Terminal window: `whoami`, `ls projects`, `open <project>`, `cat resume`, `git log --oneline career`
- Terminal "peeking" behind Finder on load
- Liquid Glass styling pass (translucency, specular edges, refraction-style blur)
- Multiple windows open at once, with resize
- GitHub contributions graph in the widget
- Project screenshots inside Quick Look
- More projects (DevConnect, DevelopMe, Flawtale) once links/case studies are ready

### Out of scope
- Real filesystem, apps that don't map to content, boot/login screen animations (they cost the recruiter time).

## 10. Success check

- **30-second test** with 3 people: "Find his best project and his CV." Pass = all 3 manage it without help.
- Lighthouse ≥ 90 on performance and accessibility on both mobile and desktop.
- Every section is reachable by keyboard alone.

## 11. Riskiest assumption

That recruiters will engage with the desktop instead of bouncing. The default-open Finder with a filled preview pane, the Résumé icon and Plain view exist to protect against that. The 30-second test checks it.
