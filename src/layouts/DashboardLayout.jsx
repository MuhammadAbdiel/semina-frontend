import SidebarComponent from '@/components/SidebarComponent'
import NavbarComponent from '@/components/NavbarComponent'

export default function DashboardLayout({ children }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SidebarComponent />
      <div className='flex flex-col'>
        <NavbarComponent />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
