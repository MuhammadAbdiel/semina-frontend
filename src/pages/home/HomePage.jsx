import DashboardLayout from '@/layouts/DashboardLayout'
import { Navigate } from 'react-router-dom'

export default function HomePage() {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to='/signin' replace />
  }

  return (
    <DashboardLayout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
      </div>
    </DashboardLayout>
  )
}
