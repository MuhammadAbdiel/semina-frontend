import { Navigate, Route, Routes } from 'react-router-dom'
import GuardRoute from '../components/GuardRoute'
import GuestOnlyRoute from '../components/GuestOnlyRoute'
import SignInPage from '../pages/signin/SignInPage'
import HomeRoute from './HomeRoute'
import CategoryRoute from './CategoryRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/signin'
        element={
          <GuestOnlyRoute>
            <SignInPage />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/'
        element={
          <>
            <GuardRoute />
          </>
        }
      >
        <Route path='/dashboard/*' element={<HomeRoute />} />
        <Route path='/categories/*' element={<CategoryRoute />} />
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  )
}
