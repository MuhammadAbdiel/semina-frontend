import HomePage from '@/pages/home/HomePage'
import { Route, Routes } from 'react-router-dom'

export default function HomeRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}
