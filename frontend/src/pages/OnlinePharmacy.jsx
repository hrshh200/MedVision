import React, { useState } from 'react';
import { Pill } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';
import CartButton from '../components/CartButton';
import PromoBanner from '../components/PromoBanner';

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
  const [cartCount, setCartCount] = useState(0);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <Pill className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Online Pharmacy</h1>
          </div>
        </div>
      </div>

      <CartButton />

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search our extensive catalog of medicines and check their availability
          </p>
        </div>

        <SearchBar onSearchChange={setSearchTerm} />

        <div className="mt-8">
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No medicines found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedicines.map((medicine) => (
                <MedicineCard 
                  key={medicine.id} 
                  {...medicine} 
                  onAddToCart={() => setCartCount(prev => prev + 1)}
                />
              ))}
            </div>
          )}
        </div>

        <PromoBanner />
      </div>
    </div>
  );
}

export default App;