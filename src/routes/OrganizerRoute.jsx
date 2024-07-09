import IndexPage from '@/pages/organizers/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function OrganizerRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
