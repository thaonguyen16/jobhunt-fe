import { GrFormPrevious, GrFormNext } from "react-icons/gr";
export default function CreateCVPagination({ count, page, onPageChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-2 h-7 w-7 flex items-center justify-center bg-white py-1 rounded-full transition-colors ${
          page === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200 hover:text-blue-500"
        }`}
      >
        <GrFormPrevious />
      </button>
      <span className="px-2 py-1 text-white text-xs">
        {page} / {count}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === count}
        className={`px-2 w-7 h-7 flex items-center justify-center bg-white py-1 rounded-full transition-colors ${
          page === count
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200 hover:text-blue-500"
        }`}
      >
        <GrFormNext />
      </button>
    </div>
  );
}
