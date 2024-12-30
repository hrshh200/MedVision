import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Trash, Lock } from 'lucide-react';
import axios from 'axios';
import { baseURL } from '../main';
import { BrowserProvider, parseEther, formatEther } from 'ethers';
import { PaymentModal }  from './PaymentModal';

const ethereum = window.ethereum;

const CartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [paylock, setPayLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const [isModalOpenPayment, setIsModalOpenPayement] = useState(false);


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
      setPayLock(true);
    }
  }, [userData?.orderedmedicines]);


  const handleIncreaseQuantity = async (name) => {

    //Calling the API for updating the quantity of the medicine
    try {
      const response = await axios.post(`${baseURL}/updatecartquantity`, { name, id: userData?._id });
      console.log(response);

      if (response.status === 200) {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.map((item) =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item
          );
          return updatedItems;
        });
      }
    } catch (error) {
      console.error('Error updating the quantity of medicine:', error.message);
    }
  };


  const handleDecreaseQuantity = async (name) => {

    //Calling the API for updating the quantity of the medicine
    try {
      const response = await axios.post(`${baseURL}/decreaseupdatecartquantity`, { name, id: userData?._id });
      console.log(response);

      if (response.status === 200) {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.map((item) =>
            item.name === name && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return updatedItems;
        });
      }
    } catch (error) {
      console.error('Error updating the quantity of medicine:', error.message);
    }
  };

  const handleDeleteMedicine = async (name) => {
    try {
      const response = await axios.post(`${baseURL}/deletemedicine`, { name, id: userData?._id });
      console.log(response);

      if (response.status === 200) {
        console.log("Medicine Deleted from cart!")
      }
    } catch (error) {
      console.error('Error deleting the medicine from cart:', error.message);
    }
  };

  // const connectWallet = async () => {
  //   try {
  //     if (!window.ethereum) {
  //       alert('Please install MetaMask to make payments!');
  //       return false;
  //     }

  //     setLoading(true);
  //     const accounts = await window.ethereum.request({
  //       method: 'eth_requestAccounts'
  //     });

  //     setAccount(accounts[0]);
  //     setLoading(false);
  //     return true;
  //   } catch (error) {
  //     console.error('Error connecting wallet:', error);
  //     setLoading(false);
  //     return false;
  //   }
  // };


  // const handlePayment = async () => {
  //   try {
  //     // First connect the wallet
  //     const isConnected = await connectWallet();
  //     if (!isConnected) return;

  //     // Calculate total amount in ETH (you'll need to implement your own conversion rate)
  //     const totalAmount = cartItems.reduce(
  //       (total, item) => total + item.price * item.quantity,
  //       0
  //     );

  //     // Convert INR to ETH (using a hypothetical conversion rate - you should get this from an API)
  //     const ETH_TO_INR_RATE = 200000; // Example rate: 1 ETH = 200,000 INR
  //     const amountInEth = totalAmount / ETH_TO_INR_RATE;

  //     // Create provider and get signer
  //     const provider = new BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();

  //     // Replace with your merchant wallet address
  //     const merchantAddress = "0x52c7d0701Fa7460552085E406CD33042EaB1eC40";

  //     // Create the transaction
  //     const tx = {
  //       from: account,
  //       to: merchantAddress,
  //       value: parseEther(amountInEth.toFixed(18)),
  //       gasLimit: 21000n
  //     };

  //     setLoading(true);

  //     // Send transaction
  //     const transaction = await signer.sendTransaction(tx);

  //     // Wait for transaction confirmation
  //     await transaction.wait();

  //     // After successful payment, update the backend
  //     const paymentData = {
  //       transactionHash: transaction.hash,
  //       amount: totalAmount,
  //       userId: userData._id,
  //       items: cartItems
  //     };

  //     await axios.post(`${baseURL}/payment-success`, paymentData);

  //     // Clear cart and close modal
  //     setCartItems([]);
  //     setIsModalOpen(false);
  //     alert('Payment successful!');
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     alert('Payment failed! Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const choicePayment = () => {
    console.log("Choice payment");
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
                        <p className="text-sm text-gray-500">Rs {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item.name)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.name)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Delete"
                          onClick={() => handleDeleteMedicine(item.name)}
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
                    Rs{" "}
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                    /-
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

              <button
                onClick={() => setIsModalOpenPayement(true)}
                className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-1  ${paylock
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
                disabled={!paylock}
              >
                Proceed
                <Lock className='w-4 h-4'/>
              </button>

              <PaymentModal
                isOpen={isModalOpenPayment}
                onClose={() => setIsModalOpenPayement(false)}
              />

          </div>
        </div>
      )}
    </>
  );
};

export default CartButton;
