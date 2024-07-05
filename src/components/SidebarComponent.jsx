import {
  CalendarCheck,
  CreditCard,
  Home,
  List,
  Speech,
  Users,
  UsersRound,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarComponent() {
  const location = useLocation()

  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link to='/' className='flex items-center gap-2 font-semibold'>
            <Speech className='h-6 w-6' />
            <span className=''>Semina</span>
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              to='/'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/' && 'bg-muted'} px-3 py-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Home className='h-4 w-4' />
              Dashboard
            </Link>
            <Link
              to='/categories'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/categories' && 'bg-muted'} px-3 py-2 ${location.pathname === '/categories' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <List className='h-4 w-4' />
              Categories
            </Link>
            <Link
              to='/talents'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/talents' && 'bg-muted'} px-3 py-2 ${location.pathname === '/talents' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <UsersRound className='h-4 w-4' />
              Talents
            </Link>
            <Link
              to='/events'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/events' && 'bg-muted'} px-3 py-2 ${location.pathname === '/events' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <CalendarCheck className='h-4 w-4' />
              Events
            </Link>
            <Link
              to='/participants'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/participants' && 'bg-muted'} px-3 py-2 ${location.pathname === '/participants' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Users className='h-4 w-4' />
              Participants
            </Link>
            <Link
              to='/transactions'
              className={`flex items-center gap-3 rounded-lg ${location.pathname === '/transactions' && 'bg-muted'} px-3 py-2 ${location.pathname === '/transactions' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <CreditCard className='h-4 w-4' />
              Transactions
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
