import IndexPage from '@/pages/admins/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function AdminRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
