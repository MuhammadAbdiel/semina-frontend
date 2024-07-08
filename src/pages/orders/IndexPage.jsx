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
import { useDispatch, useSelector } from 'react-redux'
import STableComponent from '@/components/STableComponent'
import { fetchOrders, setDate, setPage } from '@/redux/orders/action'
import { formatDate } from '@/utils/formatDate'
import DateRangeComponent from '@/components/DateRangeComponent'

export default function IndexPage() {
  const dispatch = useDispatch()
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  let [isShowed, setIsShowed] = useState(false)
  const orders = useSelector((state) => state.orders)
  const data = orders.data

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
    },
    defaultColumns: {
      minSize: 10,
      maxSize: 100,
    },
  })

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch, orders.page, orders.date])

  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ''
  }${orders.date?.endDate ? ' - ' + formatDate(orders.date.endDate) : ''}`

  return (
    <DashboardLayout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Orders</h1>
      </div>
      <div className='flex justify-center rounded-lg border border-dashed shadow-sm p-3'>
        <div className='w-full'>
          <div className='flex gap-3 items-center py-4'>
            <div className='relative'>
              <Input
                readOnly
                value={displayDate}
                className='max-w-sm cursor-pointer'
                onClick={() => setIsShowed(true)}
              />
              {isShowed ? (
                <DateRangeComponent
                  date={orders.date}
                  setIsShowed={() => setIsShowed(!isShowed)}
                  onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
                />
              ) : (
                ''
              )}
            </div>
            <Input
              placeholder='Filter title'
              value={table.getColumn('title')?.getFilterValue() ?? ''}
              onChange={(event) =>
                table.getColumn('title')?.setFilterValue(event.target.value)
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
            order={true}
            data={data}
            status={orders.status}
            pages={orders.pages}
            table={table}
            columns={columns}
            handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
