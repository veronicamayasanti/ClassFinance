import React from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const pages = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if(startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div className="mt-4 flex justify-center">
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== '...' && onPageChange(page)}
                    className={`px-4 py-2 ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-300'} rounded-md hover:bg-gray-400`}
                    disabled={page === '...' || (page === currentPage)}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}
export default Pagination