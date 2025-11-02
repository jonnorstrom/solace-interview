"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    const filteredAdvocates = advocates.filter((advocate) => {
      const searchLower = searchTerm.toLowerCase();
      
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
        String(advocate.yearsOfExperience).toLowerCase().includes(searchLower) ||
        String(advocate.phoneNumber).toLowerCase().includes(searchLower)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Solace Advocates
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="flex items-center gap-4 mb-4">
            <input
              id="search-input"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onChange={onChange}
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
            <span
              id="search-term"
              className="font-semibold text-gray-900"
            ></span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Years of Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdvocates.map((advocate, index) => {
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
                        {advocate.phoneNumber}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
