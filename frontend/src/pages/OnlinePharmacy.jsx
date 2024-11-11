import React, { useState } from 'react';
import { Pill } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';

const medicines = [
  {
    id: 1,
    name: 'Amoxicillin',
    manufacturer: 'PharmaCorp Inc.',
    dosage: '500mg',
    type: 'Capsules',
    price: 12.99,
    stock: 150
  },
  {
    id: 2,
    name: 'Lisinopril',
    manufacturer: 'HealthPharm Ltd.',
    dosage: '10mg',
    type: 'Tablets',
    price: 15.49,
    stock: 200
  },
  {
    id: 3,
    name: 'Metformin',
    manufacturer: 'MediCare Solutions',
    dosage: '850mg',
    type: 'Tablets',
    price: 8.99,
    stock: 0
  },
  {
    id: 4,
    name: 'Omeprazole',
    manufacturer: 'PharmaCorp Inc.',
    dosage: '20mg',
    type: 'Capsules',
    price: 19.99,
    stock: 75
  },
  {
    id: 5,
    name: 'Sertraline',
    manufacturer: 'HealthPharm Ltd.',
    dosage: '50mg',
    type: 'Tablets',
    price: 24.99,
    stock: 100
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Pill className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Online Pharmacy</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search our extensive catalog of medicines and check their availability
          </p>
        </div>

        <SearchBar onSearchChange={setSearchTerm} />

        <div className="mt-8 space-y-4">
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No medicines found matching your search criteria.</p>
            </div>
          ) : (
            filteredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} {...medicine} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;