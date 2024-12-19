import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Trash } from 'lucide-react';

const CartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracetamol', quantity: 2, price: 10 },
    { id: 2, name: 'Ibuprofen', quantity: 1, price: 15 },
  ]); // Sample cart items

  const viewCartModal = () => {
    setIsModalOpen(true);
  };

  const closeCartModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMedicines = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={viewCartModal}
        className="fixed right-6 top-6 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 hover:scale-105 active:scale-95 transform duration-200"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-medium">View Cart ({cartItems.length})</span>
        {cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartItems.length}
          </div>
        )}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeCartModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div>
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${item.price}</p>
                      </div>
                      <div className="text-right">
                        <button
                          onClick={() => handleDeleteMedicines(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Total Price */}
                <div className="mt-4 flex justify-between items-center border-t pt-4">
                  <h3 className="text-lg font-medium">Total</h3>
                  <p className="text-lg font-medium">
                    ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            <button
              onClick={closeCartModal}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
