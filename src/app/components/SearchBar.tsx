interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  searchTerm: string;
}

export default function SearchBar({ onChange, onClick, searchTerm }: SearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search
      </label>
      <div className="flex items-center gap-4 mb-4">
        <input
          id="search-input"
          data-testid="search-input"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={onChange}
          value={searchTerm}
          placeholder="Search by name, city, degree, specialty, experience, or phone number..."
        />
        <button
          onClick={onClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Reset Search
        </button>
      </div>
      <p className="text-sm text-gray-600">
        Searching for:{" "}
        <span className="font-semibold text-gray-900">{searchTerm}</span>
      </p>
    </div>
  );
}

