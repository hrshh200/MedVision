import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import DoctorCard from '../components/DoctorCard';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '15 years exp',
    location: 'National Medical Center',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    nextAvailable: 'Today, 2:00 PM',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    experience: '12 years exp',
    location: 'Downtown Clinic',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    nextAvailable: 'Tomorrow, 10:30 AM',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.9,
    experience: '10 years exp',
    location: 'Children\'s Hospital',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    nextAvailable: 'Today, 4:15 PM',
  },
];

const SearchDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialists');

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialists' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="mt-[12vh] min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Stethoscope className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
        </div>
        
        <SearchFilters
          onSpecialtyChange={setSelectedSpecialty}
          onSearchChange={setSearchTerm}
        />

        <div className="space-y-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
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
}

export default SearchDoctor;