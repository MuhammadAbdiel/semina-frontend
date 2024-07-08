import { Navigate, Route, Routes } from 'react-router-dom'
import GuardRoute from '../components/GuardRoute'
import GuestOnlyRoute from '../components/GuestOnlyRoute'
import SignInPage from '../pages/signin/SignInPage'
import HomeRoute from './HomeRoute'
import CategoryRoute from './CategoryRoute'
import TalentRoute from './TalentRoute'
import PaymentRoute from './PaymentRoute'
import EventRoute from './EventRoute'
import OrderRoute from './OrderRoute'

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
        <Route path='/talents/*' element={<TalentRoute />} />
        <Route path='/payments/*' element={<PaymentRoute />} />
        <Route path='/events/*' element={<EventRoute />} />
        <Route path='/orders/*' element={<OrderRoute />} />
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  )
}
