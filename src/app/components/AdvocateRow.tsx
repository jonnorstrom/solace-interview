import { Advocate } from "../interfaces";

interface AdvocateRowProps {
  advocate: Advocate;
  index: number;
}

const basicAdvocateCellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

const formattedPhoneNumber = (phoneNumber: number) => {
  return String(phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

const truncateSpecialties = (specialties: string[], advocateIndex: number) => {
  return (
    <>
      {specialties.slice(0, 2).map((specialty, index) => (
        <span
          key={`advocate-${advocateIndex}-specialty-${index}`}
          className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
        >
          {specialty}
        </span>
      ))}
      {specialties.length > 2 && (
        <span className="inline-block text-gray-600 px-2 py-1 text-xs">
          .. and {specialties.length - 2} more
        </span>
      )}
    </>
  );
};

export default function AdvocateRow({ advocate, index }: AdvocateRowProps) {
  return (
    <tr
      key={`advocate-${index}`}
      className="hover:bg-gray-50 transition-colors duration-150"
    >
      <td className={basicAdvocateCellClass}>
        {advocate.firstName}
      </td>
      <td className={basicAdvocateCellClass}>
        {advocate.lastName}
      </td>
      <td className={basicAdvocateCellClass}>
        {advocate.city}
      </td>
      <td className={basicAdvocateCellClass}>
        {advocate.degree}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex flex-wrap gap-1">
          {truncateSpecialties(advocate.specialties, index)}
        </div>
      </td>
      <td className={basicAdvocateCellClass}>
        {advocate.yearsOfExperience}
      </td>
      <td className={basicAdvocateCellClass}>
        {formattedPhoneNumber(advocate.phoneNumber)}
      </td>
    </tr>
  );
}

