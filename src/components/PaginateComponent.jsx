import ReactPaginate from 'react-paginate'

const PaginateComponent = ({ pages, handlePageClick, page = 1 }) => {
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={
        <span className='px-4 py-2 font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>
          ...
        </span>
      }
      breakClassName={'page-item'}
      pageCount={pages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination flex justify-end mt-5 mb-2'}
      pageClassName={'page-item'}
      pageLinkClassName={
        'page-link px-4 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
      }
      nextClassName={'page-item'}
      nextLinkClassName={
        'page-link rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
      }
      previousClassName={'page-item'}
      previousLinkClassName={
        'page-link rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
      }
      activeClassName={'active'}
      activeLinkClassName={
        'bg-indigo-600 px-4 py-2 font-semibold !text-white !ring-indigo-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-700'
      }
      disabledClassName={'disabled'}
      disabledLinkClassName={'!text-gray-300 cursor-default'}
      forcePage={page - 1}
    />
  )
}

export default PaginateComponent
