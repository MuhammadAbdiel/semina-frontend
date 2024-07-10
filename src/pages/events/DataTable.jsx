import SButtonComponent from '@/components/SButtonComponent'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
import {
  ArrowUpDown,
  //  MoreHorizontal,
  NotebookPen,
  Trash2,
} from 'lucide-react'
import moment from 'moment'
import EditPage from './EditPage'
import { Badge } from '@/components/ui/badge'
import { deleteData, putData } from '@/utils/fetch'
import { fetchEvents } from '@/redux/events/action'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { accessEvents } from '@/access'
import { useEffect, useState } from 'react'

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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Event Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>
        {moment(row.getValue('date')).format('DD-MM-YYYY, h:mm:ss a')}
      </div>
    ),
  },
  {
    accessorKey: 'venueName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Venue Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('venueName')}</div>
    ),
  },
  {
    accessorKey: 'statusEvent',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status Event
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('statusEvent')
      return (
        <div className='capitalize'>
          <Badge
            className={`${status === 'Published' ? 'bg-green-600 hover:bg-green-600' : 'bg-red-600 hover:bg-red-600'} cursor-default text-white`}
          >
            {row.getValue('statusEvent')}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('categoryName')}</div>
    ),
  },
  {
    accessorKey: 'talentName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Talent
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('talentName')}</div>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original
      const dispatch = useDispatch()

      const [access, setAccess] = useState({
        delete: false,
        edit: false,
      })

      const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
          ? JSON.parse(localStorage.getItem('auth'))
          : {}
        const access = { delete: false, edit: false }
        Object.keys(accessEvents).forEach(function (key) {
          if (accessEvents[key].indexOf(role) >= 0) {
            access[key] = true
          }
        })
        setAccess(access)
      }

      useEffect(() => {
        checkAccess()
      }, [])

      const handleDelete = async () => {
        const result = await Swal.fire({
          title: `Are you sure to delete ${event.title}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
          const res = await deleteData(`/cms/events/${event._id}`)

          if (res?.data?.data) {
            Swal.fire({
              title: 'Success',
              text: `${event.title} Event Deleted Successfully`,
              icon: 'success',
            })

            dispatch(fetchEvents())
          } else {
            Swal.fire({
              title: 'Failed',
              text: res?.response?.data?.msg ?? 'Internal Server Error',
              icon: 'error',
            })
          }
        }
      }

      const handleStatusUpdate = async () => {
        const result = await Swal.fire({
          title: `Are you sure to change ${event.title} status?`,
          text: `Change ${event.title} status to ${
            event.statusEvent === 'Published' ? 'Draft' : 'Published'
          }`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, change it!',
        })

        if (result.isConfirmed) {
          const res = await putData(`/cms/events/${event._id}/status`, {
            statusEvent:
              event.statusEvent === 'Published' ? 'Draft' : 'Published',
          })
          if (res?.data?.data) {
            Swal.fire({
              title: 'Success',
              text: 'Status Event Updated Successfully',
              icon: 'success',
            })

            dispatch(fetchEvents())
          } else {
            Swal.fire({
              title: 'Failed',
              text: res?.response?.data?.msg ?? 'Internal Server Error',
              icon: 'error',
            })
          }
        }
      }

      return (
        <div className='flex items-center'>
          {access.edit && <EditPage eventId={event._id} />}
          {access.edit && (
            <SButtonComponent
              onClick={handleStatusUpdate}
              size='sm'
              className='mx-1 bg-green-500 hover:bg-green-600'
            >
              <NotebookPen className='h-5 w-5' />
            </SButtonComponent>
          )}
          {access.delete && (
            <SButtonComponent
              onClick={handleDelete}
              size='sm'
              className='mx-1'
              variant='destructive'
            >
              <Trash2 className='h-5 w-5' />
            </SButtonComponent>
          )}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='mx-1'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(event._id)}
              >
                Copy Event ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      )
    },
  },
]
