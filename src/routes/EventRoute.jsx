import IndexPage from '@/pages/events/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function EventRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
