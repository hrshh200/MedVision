import { Package2 } from 'lucide-react';
import { MedicineForm } from '../components/medicine-admin/MedicineForm';

function UpdateMedicine() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <Package2 className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-3xl font-bold text-gray-900">Medicine Management</h1>
          </div>
          <p className="mt-2 text-gray-600">Add new medicines to the inventory database</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <MedicineForm />
        </div>
      </div>
    </div>
  );
}

export default UpdateMedicine;