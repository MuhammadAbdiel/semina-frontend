import IndexPage from '@/pages/payments/IndexPage'
import { Route, Routes } from 'react-router-dom'

export default function PaymentRoute() {
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
    </Routes>
  )
}
