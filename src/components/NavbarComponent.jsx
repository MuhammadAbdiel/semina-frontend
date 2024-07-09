import { Link } from 'react-router-dom'
import {
  CalendarCheck,
  CircleUser,
  CreditCard,
  Home,
  List,
  Menu,
  Speech,
  UserCheck,
  UserCog,
  UsersRound,
  WalletCards,
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
import NavLinkComponent from './NavLinkComponent'
import {
  accessAdmins,
  accessCategories,
  accessEvents,
  accessHome,
  accessOrders,
  accessOrganizers,
  accessParticipant,
  accessTalents,
} from '@/access'
import Swal from 'sweetalert2'

export default function NavbarComponent({ role }) {
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Logged Out Successful',
          icon: 'success',
          willClose: () => {
            localStorage.removeItem('auth')
            window.location.href = '/signin'
          },
        })
      }
    })
  }

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
              to='/dashboard'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Speech className='h-6 w-6' />
              <span className='sr-only'>Semina</span>
            </Link>
            <NavLinkComponent
              navigate='/dashboard'
              role={role}
              roles={accessHome.read}
            >
              <Home className='h-5 w-5' />
              Dashboard
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/categories'
              role={role}
              roles={accessCategories.read}
            >
              <List className='h-5 w-5' />
              Categories
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/talents'
              role={role}
              roles={accessTalents.read}
            >
              <UsersRound className='h-5 w-5' />
              Talents
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/payments'
              role={role}
              roles={accessParticipant.read}
            >
              <WalletCards className='h-5 w-5' />
              Payments
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/events'
              role={role}
              roles={accessEvents.read}
            >
              <CalendarCheck className='h-5 w-5' />
              Events
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/organizers'
              role={role}
              roles={accessOrganizers.read}
            >
              <UserCog className='h-5 w-5' />
              Organizers
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/admins'
              role={role}
              roles={accessAdmins.read}
            >
              <UserCheck className='h-5 w-5' />
              Admins
            </NavLinkComponent>
            <NavLinkComponent
              navigate='/orders'
              role={role}
              roles={accessOrders.read}
            >
              <CreditCard className='h-5 w-5' />
              Orders
            </NavLinkComponent>
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
          <DropdownMenuLabel className='capitalize'>{role}</DropdownMenuLabel>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
