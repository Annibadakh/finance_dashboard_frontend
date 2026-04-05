import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to show (with ellipsis logic)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Mobile/Simple View */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Desktop/Full View */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalPages}
            </span>
          </p>
        </div>

        <div>
          <nav
            className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Prev Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors
                    ${
                      currentPage === page
                        ? "z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next Button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight size={20} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
