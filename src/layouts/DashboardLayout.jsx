import { useEffect, useState } from 'react'
import SidebarComponent from '@/components/SidebarComponent'
import NavbarComponent from '@/components/NavbarComponent'

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {}

      setRole(role)
    }
    fetchData()
  }, [])

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SidebarComponent role={role} />
      <div className='flex flex-col'>
        <NavbarComponent role={role} />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
