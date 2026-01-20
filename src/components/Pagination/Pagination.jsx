const Pagination = ({ page, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={`flex flex-wrap justify-end gap-2 mt-4 sm:mt-8 ${className}`}
    >
      {/* Prev Button */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
            page === p
              ? "bg-red-600 text-white border-red-600"
              : "hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
