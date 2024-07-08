import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { flexRender } from '@tanstack/react-table'
import { Skeleton } from './ui/skeleton'
import PaginateComponent from './PaginateComponent'

export default function STableComponent({
  order,
  data,
  status,
  pages,
  table,
  columns,
  handlePageSizeChange,
  handlePageClick,
  pagination,
  withoutPagination,
}) {
  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {status === 'process' ? (
                        <>
                          <Skeleton className='w-full my-2 h-6 rounded-full' />
                          <Skeleton className='w-full my-2 h-6 rounded-full' />
                          <Skeleton className='w-full my-2 h-6 rounded-full' />
                        </>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {status === 'process' ? (
                    <>
                      <Skeleton className='w-full my-2 h-6 rounded-full' />
                      <Skeleton className='w-full my-2 h-6 rounded-full' />
                      <Skeleton className='w-full my-2 h-6 rounded-full' />
                    </>
                  ) : (
                    'No results.'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!order ? (
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows?.length} of{' '}
            {table.getFilteredRowModel().rows?.length} row(s) selected.
          </div>
          <div className='flex items-center space-x-2'>
            <span>Rows per page</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-2'>
                  {pagination.pageSize} <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <DropdownMenuCheckboxItem
                    key={pageSize}
                    checked={pagination.pageSize === pageSize}
                    onSelect={() => handlePageSizeChange(pageSize)}
                  >
                    {pageSize}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : !withoutPagination && data.length ? (
        <PaginateComponent pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ''
      )}
    </>
  )
}
