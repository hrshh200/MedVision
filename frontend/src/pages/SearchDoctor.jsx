import React, { useState, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';
import { baseURL } from '../main';

const SearchDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialists');
  

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/alldoctors`);
      console.log(response.data.doctors); // Debug API response
      setDoctors(response.data.doctors || []); // Ensure default to empty array
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to fetch doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = Array.isArray(doctors)
  ? doctors.filter((doctor) => {
    console.log(doctor);
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase()); // Fixed field name
      const matchesSpecialty = selectedSpecialty === 'All Specialists' ||
        doctor.specialist === selectedSpecialty; // Fixed field name
      return matchesSearch && matchesSpecialty;
    })
  : []; 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Stethoscope className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
        </div>

        <SearchFilters
          onSpecialtyChange={setSelectedSpecialty}
          onSearchChange={setSearchTerm}
        />

        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading doctors...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">No doctors found matching your criteria.</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;
