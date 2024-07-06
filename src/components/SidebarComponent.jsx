import {
  CalendarCheck,
  CreditCard,
  Home,
  List,
  Speech,
  Users,
  UsersRound,
} from 'lucide-react'
import {
  accessCategories,
  accessEvents,
  accessHome,
  accessOrders,
  accessParticipant,
  accessTalents,
} from '@/access'
import { Link } from 'react-router-dom'
import SideLinkComponent from './SideLinkComponent'

export default function SidebarComponent({ role }) {
  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link
            to='/dashboard'
            className='flex items-center gap-2 font-semibold'
          >
            <Speech className='h-6 w-6' />
            <span className=''>Semina</span>
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <SideLinkComponent
              navigate='/dashboard'
              role={role}
              roles={accessHome.read}
            >
              <Home className='h-4 w-4' />
              Dashboard
            </SideLinkComponent>
            <SideLinkComponent
              navigate='/categories'
              role={role}
              roles={accessCategories.read}
            >
              <List className='h-4 w-4' />
              Categories
            </SideLinkComponent>
            <SideLinkComponent
              navigate='/talents'
              role={role}
              roles={accessTalents.read}
            >
              <UsersRound className='h-4 w-4' />
              Talents
            </SideLinkComponent>
            <SideLinkComponent
              navigate='/events'
              role={role}
              roles={accessEvents.read}
            >
              <CalendarCheck className='h-4 w-4' />
              Events
            </SideLinkComponent>
            <SideLinkComponent
              navigate='/participants'
              role={role}
              roles={accessParticipant.read}
            >
              <Users className='h-4 w-4' />
              Participants
            </SideLinkComponent>
            <SideLinkComponent
              navigate='/transactions'
              role={role}
              roles={accessOrders.read}
            >
              <CreditCard className='h-4 w-4' />
              Transactions
            </SideLinkComponent>
          </nav>
        </div>
      </div>
    </div>
  )
}
