import SButtonComponent from '@/components/SButtonComponent'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal, Trash2 } from 'lucide-react'
import EditPage from './EditPage'
import { useDispatch } from 'react-redux'
import { fetchDeleteTalent } from '@/redux/talents/action'
import Swal from 'sweetalert2'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { config } from '@/configs'

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'avatar',
    enableSorting: false,
    header: () => {
      return <Button variant='ghost'>Avatar</Button>
    },
    cell: ({ row }) => {
      return (
        <div className='capitalize'>
          <Avatar>
            <AvatarImage
              src={`${config.api_image}/${row.getValue('avatar')}`}
              alt='Avatar'
            />
          </Avatar>
        </div>
      )
    },
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const talent = row.original
      const dispatch = useDispatch()

      const handleDelete = async () => {
        const result = await Swal.fire({
          title: `Are you sure to delete ${talent.name}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
          dispatch(fetchDeleteTalent(talent._id))
        }
      }

      return (
        <div className='flex items-center'>
          <EditPage talentId={talent._id} />
          <SButtonComponent
            onClick={handleDelete}
            size='sm'
            className='mx-1'
            variant='destructive'
          >
            <Trash2 className='h-5 w-5' />
          </SButtonComponent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='mx-1'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(talent._id)}
              >
                Copy Talent ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
