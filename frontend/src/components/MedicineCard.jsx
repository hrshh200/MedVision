import React from 'react';
import { Pill, Package } from 'lucide-react';

const MedicineCard = ({ name, manufacturer, dosage, price, stock, type }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">{manufacturer}</p>
          <div className="flex items-center gap-2 mt-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{dosage} • {type}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">${price}</div>
          <div className={`text-sm mt-1 ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;