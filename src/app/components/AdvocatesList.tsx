import AdvocateRow from "./AdvocateRow";
import { Advocate } from "../interfaces";

interface AdvocatesListProps {
  advocates: Advocate[];
}

export default function AdvocatesList({ advocates }: AdvocatesListProps) {
  const thClass = "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider";
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className={thClass}>
                First Name
              </th>
              <th className={thClass}>
                Last Name
              </th>
              <th className={thClass}>
                City
              </th>
              <th className={thClass}>
                Degree
              </th>
              <th className={thClass}>
                Specialties
              </th>
              <th className={thClass}>
                Years of Experience
              </th>
              <th className={thClass}>
                Phone Number
              </th>
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

