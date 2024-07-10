import SButtonComponent from '@/components/SButtonComponent'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowUpDown,
  // Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import EditPage from './EditPage'
import { useDispatch } from 'react-redux'
import { fetchDeleteCategory } from '@/redux/categories/action'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { accessCategories } from '@/access'

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
    id: 'actions',
    accessorKey: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original
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
        Object.keys(accessCategories).forEach(function (key) {
          if (accessCategories[key].indexOf(role) >= 0) {
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
          title: `Are you sure to delete ${category.name}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })

        if (result.isConfirmed) {
          dispatch(fetchDeleteCategory(category._id))
        }
      }

      return (
        <div className='flex items-center'>
          {/* <SButtonComponent
            size='sm'
            className='mx-1 bg-green-600 hover:bg-green-700'
          >
            <Eye className='h-5 w-5' />
          </SButtonComponent> */}
          {access.edit && <EditPage category={category} />}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='mx-1'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(category._id)}
              >
                Copy Category ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
