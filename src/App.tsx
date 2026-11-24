import { Navigate, Route, Routes } from 'react-router-dom'
import Desktop from './components/Desktop'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/:appId" element={<Desktop />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
