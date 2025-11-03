import { Advocate } from "../interfaces";

interface AdvocateRowProps {
  advocate: Advocate;
  index: number;
}

const formattedPhoneNumber = (phoneNumber: number) => {
  return String(phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export default function AdvocateRow({ advocate, index }: AdvocateRowProps) {
  return (
    <tr
      key={`advocate-${index}`}
      className="hover:bg-gray-50 transition-colors duration-150"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.firstName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.degree}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex flex-wrap gap-1">
          {advocate.specialties.map((s, i) => (
            <span
              key={`advocate-${index}-specialty-${i}`}
              className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.yearsOfExperience}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formattedPhoneNumber(advocate.phoneNumber)}
      </td>
    </tr>
  );
}

