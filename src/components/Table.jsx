import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Table = ({
  columns,
  data,
  sortConfig,
  onSort,
  isLoading = false,
  emptyMessage = "No data available.",
}) => {
  const handleSort = (accessor, isSortable) => {
    if (!isSortable || !onSort) return;

    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === accessor &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    onSort({ key: accessor, direction });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {columns.map((col, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(col.accessor, col.sortable)}
                  className={`px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.sortable ? "cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && (
                      <div className="flex flex-col opacity-50">
                        <FiChevronUp
                          size={12}
                          className={
                            sortConfig?.key === col.accessor &&
                            sortConfig.direction === "asc"
                              ? "text-blue-600 dark:text-blue-400 opacity-100"
                              : ""
                          }
                        />
                        <FiChevronDown
                          size={12}
                          className={`-mt-1 ${sortConfig?.key === col.accessor && sortConfig.direction === "desc" ? "text-blue-600 dark:text-blue-400 opacity-100" : ""}`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading data...
                  </div>
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors duration-150 group"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {/* Use Render function if provided, else use plain accessor */}
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
