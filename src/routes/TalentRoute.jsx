import IndexPage from '@/pages/talents/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function TalentRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
