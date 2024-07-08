import IndexPage from '@/pages/orders/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function OrderRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
