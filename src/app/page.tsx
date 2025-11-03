"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import AdvocatesList from "./components/AdvocatesList";
import NoResults from "./components/NoResults";
import Loading from "./components/Loading";
import { Advocate } from "./interfaces";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredAdvocates = advocates.filter((advocate) => {
      const searchLower = value.toLowerCase();
      
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
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Solace Advocates
        </h1>

        <SearchBar onChange={onChange} onClick={onClick} searchTerm={searchTerm} />
        
        {isLoading ? (
          <Loading />
        ) : filteredAdvocates.length === 0 ? (
          <NoResults />
        ) : (
          <AdvocatesList advocates={filteredAdvocates} />
        )}
      </div>
    </main>
  );
}
