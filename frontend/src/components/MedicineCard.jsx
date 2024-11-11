import React from 'react';
import { Pill, Package, ShoppingCart } from 'lucide-react';

const MedicineCard = ({ name, manufacturer, dosage, price, stock, type, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Pill className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        </div>
        <p className="text-sm text-gray-600">{manufacturer}</p>
        <div className="flex items-center gap-2 mt-2">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{dosage} • {type}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold text-blue-600">${price}</div>
          <div className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        <button
          onClick={stock > 0 ? onAddToCart : undefined}
          disabled={stock === 0}
          className={`mt-3 w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium
            transform transition-all duration-200
            ${stock > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 hover:scale-[1.02]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;