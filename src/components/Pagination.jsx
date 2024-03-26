import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = 4; // Number of pages to display
  const halfDisplay = Math.floor(displayPages / 2);

  const startPage = Math.max(1, currentPage - halfDisplay);
  const endPage = Math.min(totalPages, startPage + displayPages - 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className='mx-2 px-4 py-2 bg-primary rounded-full text-white'
      >
        {'<<'}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='mx-2 px-4 py-2 bg-primary rounded text-white'
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-2 px-4 rounded-full py-2 ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          {page} 
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='mx-2 px-4 rounded py-2 bg-primary text-white'
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className='mx-2 px-4 rounded-full py-2 bg-primary text-white'
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
