import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = 4; // Number of pages to display
  const halfDisplay = Math.floor(displayPages / 2);

  // Calculate the start and end pages
  let startPage = Math.max(1, currentPage - halfDisplay);
  let endPage = Math.min(totalPages, currentPage + halfDisplay);

  // Adjust if there aren't enough pages on one side
  if (currentPage <= halfDisplay) {
    endPage = Math.min(totalPages, displayPages); 
  } else if (currentPage + halfDisplay >= totalPages) {
    startPage = Math.max(1, totalPages - displayPages + 1);
  }

  // Generate the array of page numbers
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center gap-4 justify-center my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-6 py-3 font-inter text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
          aria-hidden="true" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-inter text-xs font-medium uppercase ${currentPage === page ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10' : 'text-gray-900'} transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{page}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-6 py-3 font-inter text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
          aria-hidden="true" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
