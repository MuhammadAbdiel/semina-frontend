import { Link, useLocation } from 'react-router-dom'
import {
  CalendarCheck,
  CircleUser,
  CreditCard,
  Home,
  List,
  Menu,
  Speech,
  Users,
  UsersRound,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from './ui/button'

export default function NavbarComponent() {
  const location = useLocation()

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link
              to='/'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Speech className='h-6 w-6' />
              <span className='sr-only'>Semina</span>
            </Link>
            <Link
              to='/'
              className={`${location.pathname === '/' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/' && 'bg-muted'} px-3 py-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Home className='h-5 w-5' />
              Dashboard
            </Link>
            <Link
              to='/categories'
              className={`${location.pathname === '/categories' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/categories' && 'bg-muted'} px-3 py-2 ${location.pathname === '/categories' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <List className='h-5 w-5' />
              Categories
            </Link>
            <Link
              to='/talents'
              className={`${location.pathname === '/talents' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/talents' && 'bg-muted'} px-3 py-2 ${location.pathname === '/talents' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <UsersRound className='h-5 w-5' />
              Talents
            </Link>
            <Link
              to='/events'
              className={`${location.pathname === '/events' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/events' && 'bg-muted'} px-3 py-2 ${location.pathname === '/events' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <CalendarCheck className='h-5 w-5' />
              Events
            </Link>
            <Link
              to='/participants'
              className={`${location.pathname === '/participants' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/participants' && 'bg-muted'} px-3 py-2 ${location.pathname === '/participants' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <Users className='h-5 w-5' />
              Participants
            </Link>
            <Link
              to='/transactions'
              className={`${location.pathname === '/transactions' && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === '/transactions' && 'bg-muted'} px-3 py-2 ${location.pathname === '/transactions' ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
            >
              <CreditCard className='h-5 w-5' />
              Transactions
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
