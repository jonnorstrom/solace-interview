import AdvocateRow from "./AdvocateRow";
import { Advocate } from "../interfaces";

interface AdvocatesListProps {
  advocates: Advocate[];
}

const thClass = "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider";

const headers = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Specialties",
  "Years of Experience",
  "Phone Number",
];

const headerElements = headers.map((header, index) => (
  <th className={thClass} key={`header-${index}`}>
    {header}
  </th>
));

export default function AdvocatesList({ advocates }: AdvocatesListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headerElements}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advocates.map((advocate, index) => (
              <AdvocateRow key={`advocate-${index}`} advocate={advocate} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

