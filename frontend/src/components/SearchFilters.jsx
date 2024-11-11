import React from 'react';
import { Search } from 'lucide-react';

const SearchFilters = ({ onSpecialtyChange, onSearchChange }) => {
  const specialties = [
    'All Specialists',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedist',
    'Psychiatrist',
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by doctor name or keyword"
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => onSpecialtyChange(specialty)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors
                     hover:bg-blue-50 hover:text-blue-600 focus:outline-none
                     whitespace-nowrap
                     border border-gray-200 hover:border-blue-200"
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;