import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartButton = () => {
  return (
    <button className="fixed right-6 top-6 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 hover:scale-105 active:scale-95 transform duration-200">
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">View Cart (0)</span>
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">0</div>
    </button>
  );
};

export default CartButton;