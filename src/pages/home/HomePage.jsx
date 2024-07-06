import DashboardLayout from '@/layouts/DashboardLayout'

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Dashboard</h1>
      </div>
    </DashboardLayout>
  )
}
