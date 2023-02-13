import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export const Pagination = ({ cardsPerPage, totalCards, paginate }: any) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handleSelectPage(e: any) {
    paginate(e);
    setSelectedPage(e);
  }

  function handleNextPage() {
    if (
      selectedPage >= 1 &&
      selectedPage < Math.ceil(totalCards / cardsPerPage)
    ) {
      paginate(selectedPage + 1);
      setSelectedPage(selectedPage + 1);
    }
  }
  function handlePrevPage() {
    if (selectedPage > 1) {
      paginate(selectedPage - 1);
      setSelectedPage(selectedPage - 1);
    }
  }

  return (
    <div className='flex items-center justify-between mt-4 px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          onClick={handlePrevPage}
          className='cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          onClick={handleNextPage}
          className='cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-center'>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              onClick={handlePrevPage}
              className='cursor-pointer relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>
            {pageNumbers.map((number) => (
              <li key={number} className='list-none'>
                <a
                  className={
                    selectedPage === number
                      ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 cursor-pointer"
                      : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                  }
                  onClick={() => handleSelectPage(number)}
                >
                  {number}
                </a>
              </li>
            ))}
            <a
              onClick={handleNextPage}
              className='cursor-pointer relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
