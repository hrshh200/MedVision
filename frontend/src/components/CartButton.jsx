import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Trash, Lock } from 'lucide-react';
import axios from 'axios';
import { baseURL } from '../main';

const CartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState([]);

  const viewCartModal = () => {
    setIsModalOpen(true);
  };

  const closeCartModal = () => {
    setIsModalOpen(false);
  };

  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem('medVisionToken');
      const response = await axios.get(`${baseURL}/fetchdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedData = response.data.userData;
      setUserData(fetchedData);

      localStorage.setItem('userData', JSON.stringify(fetchedData));
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (userData?.orderedmedicines?.length > 0) {
      const updatedCartItems = userData.orderedmedicines.map((medicine, index) => ({
        id: index, // Adding index as ID (can be replaced with a unique identifier)
        name: medicine.medicine,
        price: medicine.price,
        quantity: medicine.quantity || 1,
      }));
      setCartItems(updatedCartItems);
    }
  }, [userData?.orderedmedicines]);


  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      // Call API with updated items
      // updatecartwithquantity(updatedItems);
      return updatedItems;
    });
  };

  
  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      // Call API with updated items
      // updatecartwithquantity(updatedItems);
      return updatedItems;
    });
  };

  // const updatecartwithquantity = async (updatedCartItems) => {
  //   try {
  //     const token = localStorage.getItem('medVisionToken'); // Fetch token from localStorage
  //     const response = await axios.post(
  //       `${baseURL}/updatecartquantity`,
  //       { cartItems: updatedCartItems },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     if (response.status === 200) {
  //       console.log(`Cart updated successfully in the database.`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating cart quantity:', error.message);
  //   }
  // };


  const handlepayment = () => {
    console.log("Payment to be handled here");
  }

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={userData?._id ? viewCartModal : null}
        className={`fixed right-6 top-6 z-50 px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center gap-2 transform duration-200 ${userData?._id
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        disabled={!userData?._id}
      >
        {userData?._id ? (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">View Cart ({cartItems.length})</span>
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </div>
            )}
          </>
        ) : (
          <>
            <span className="font-medium">View Cart</span>
          </>
        )}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeCartModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeCartModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

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
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <button
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
                    $
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            <button
              onClick={handlepayment}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <span>Pay</span>
              <Lock className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
