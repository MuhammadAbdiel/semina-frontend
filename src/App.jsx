import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/signin/SignInPage'
import HomePage from './pages/home/HomePage'
import IndexPage from './pages/categories/IndexPage'

export default function App() {
  return (
    <Routes>
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/categories' element={<IndexPage />} />
    </Routes>
  )
}
