import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Truck, QrCode } from 'lucide-react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { baseURL } from '../main';
import axios from 'axios';

const paymentMethods = [
  {
    id: 'card',
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Credit/Debit Card',
    description: 'Pay securely with your card'
  },
  {
    id: 'upi',
    icon: <QrCode className="w-6 h-6" />,
    title: 'UPI',
    description: 'Pay using UPI apps'
  },
  {
    id: 'cod',
    icon: <Truck className="w-6 h-6" />,
    title: 'Cash on Delivery',
    description: 'Pay when you receive'
  },
  {
    id: 'metamask',
    icon: <Wallet className="w-6 h-6" />,
    title: 'Metamask Wallet',
    description: 'Pay with cryptocurrency'
  }
];

export function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [userdata, setUserData] = useState([]);

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

  const handlePayment = async (e) => {
    // In a real app, you'd process the payment here
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/addpayment`, {
        id: userdata?._id,
        orderid: userdata?.order?.[userdata.order.length - 1]?.orderId,
        payment: selectedMethod
      });

      if (response.status === 200) {
        setTimeout(() => {
        deletecartitems();
        setLoading(false);
          toast.success(response.data.message);
          navigate('/orderconfirmation')
        }, 1000)
      }
    } catch (error) {
      console.log("Error updating the address to order");
    }
  };

  const deletecartitems = async () => {
      try {
        const response = await axios.post(`${baseURL}/deletefullcart`,{id: userdata?._id});
  
        if (response.status === 200) {
          console.log("Items from cart has been deleted");
        }
      } catch (error) {
        console.log("Error deleting the items from the cart");
      }
  }

  return (
    <div className="mt-[10vh] min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader w-16 h-16 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Payment Method
          </h1>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'border-2 border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`${
                        selectedMethod === method.id
                          ? 'text-blue-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Complete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
