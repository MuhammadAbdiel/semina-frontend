import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/signin/SignInPage'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<>Home</>} />
      <Route path='/signin' element={<SignInPage />} />
    </Routes>
  )
}
