import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Desktop from './components/Desktop'
import Phone from './components/Phone'
import PlainView from './components/PlainView'
import { findApp } from './components/apps'
import { useIsWide } from './hooks'

// Routes:  /            desktop: Finder on Projects · mobile: home screen
//          /desktop     desktop with every window closed
//          /:section    about, projects, services, toolkit, contact
//          /projects/:id  a project's detail view
//          /plain       single scrolling page
function Shell() {
  const wide = useIsWide()
  const { pathname } = useLocation()
  const { section, itemId } = useParams()
  if (section && section !== 'desktop' && !findApp(section)) return <Navigate to="/" replace />
  const current = section === 'desktop' ? undefined : section ?? (pathname === '/' && wide ? 'projects' : undefined)
  return wide ? <Desktop section={current} itemId={itemId} /> : <Phone section={current} itemId={itemId} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/plain" element={<PlainView />} />
      <Route path="/skills" element={<Navigate to="/toolkit" replace />} />
      <Route path="/" element={<Shell />} />
      <Route path="/:section" element={<Shell />} />
      <Route path="/:section/:itemId" element={<Shell />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
