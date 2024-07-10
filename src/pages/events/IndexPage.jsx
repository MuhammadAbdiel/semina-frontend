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
// import CreatePage from './CreatePage'
import { useDispatch, useSelector } from 'react-redux'
import STableComponent from '@/components/STableComponent'
import { accessEvents } from '@/access'
import {
  fetchEvents,
  setCategory,
  setKeyword,
  setTalent,
} from '@/redux/events/action'
import { fetchListCategories, fetchListTalents } from '@/redux/lists/action'
import Select from 'react-select'
import CreatePage from './CreatePage'

export default function IndexPage() {
  const dispatch = useDispatch()
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const lists = useSelector((state) => state.lists)
  const events = useSelector((state) => state.events)
  const data = events.data

  const [access, setAccess] = useState({
    create: false,
  })

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}
    const access = { create: false }
    Object.keys(accessEvents).forEach(function (key) {
      if (accessEvents[key].indexOf(role) >= 0) {
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
    dispatch(fetchListTalents())
    dispatch(fetchListCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch, events.keyword, events.category, events.talent])

  return (
    <DashboardLayout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Events</h1>
      </div>
      <div className='flex justify-center rounded-lg border border-dashed shadow-sm p-3'>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            {access.create && <CreatePage />}
            <Input
              placeholder='Filter title'
              value={events.keyword}
              onChange={(event) => dispatch(setKeyword(event.target.value))}
              className='max-w-sm me-2'
            />
            <Select
              name='category'
              isClearable={true}
              placeholder='Filter category'
              options={lists.categories}
              onChange={(e) => dispatch(setCategory(e))}
              value={events.category}
              className='max-w me-2'
            />
            <Select
              name='talent'
              isClearable={true}
              placeholder='Filter talent'
              options={lists.talents}
              onChange={(e) => dispatch(setTalent(e))}
              value={events.talent}
              className='max-w me-2'
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
            status={events.status}
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
