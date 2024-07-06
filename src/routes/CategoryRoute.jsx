import IndexPage from '@/pages/categories/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function CategoryRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
