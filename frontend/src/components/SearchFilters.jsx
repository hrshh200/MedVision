import React from 'react';
import { Search } from 'lucide-react';

const SearchFilters = ({ onSpecialtyChange, onSearchChange }) => {
  const specialties = [
    'All Specialists',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => onSpecialtyChange(specialty)}
            className="px-4 py-2 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 transition-all duration-200 whitespace-nowrap"
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;