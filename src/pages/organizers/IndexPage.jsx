import DashboardLayout from '@/layouts/DashboardLayout'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { columns } from './DataTable'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import CreatePage from './CreatePage'
import { useDispatch, useSelector } from 'react-redux'
import STableComponent from '@/components/STableComponent'
import { accessOrganizers } from '@/access'
import { fetchUsers } from '@/redux/shared/action'

export default function IndexPage() {
  const dispatch = useDispatch()
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const organizers = useSelector((state) => state.organizers)
  const data = organizers.data

  const [access, setAccess] = useState({
    create: false,
    delete: false,
    edit: false,
  })

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}
    const access = { create: false, delete: false, edit: false }
    Object.keys(accessOrganizers).forEach(function (key) {
      if (accessOrganizers[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    defaultColumns: {
      minSize: 10,
      maxSize: 100,
    },
  })

  const handlePageSizeChange = (pageSize) => {
    setPagination((prev) => ({ ...prev, pageSize }))
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <DashboardLayout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Users</h1>
      </div>
      <div className='flex justify-center rounded-lg border border-dashed shadow-sm p-3'>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            {access.create && <CreatePage />}
            <Input
              placeholder='Filter name'
              value={table.getColumn('name')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-auto'>
                  Columns <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <STableComponent
            access={access}
            status={organizers.status}
            table={table}
            columns={columns}
            handlePageSizeChange={handlePageSizeChange}
            pagination={pagination}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
