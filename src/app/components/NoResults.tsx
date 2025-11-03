export default function NoResults() {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No results found
        </h3>
        <p className="text-sm text-gray-600">
          Try adjusting your search terms to find what you're looking for.
        </p>
      </div>
    </div>
  );
}

