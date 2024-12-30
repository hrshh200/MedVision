import React, { useState } from 'react';
import { CreditCard, Wallet, Truck, QrCode } from 'lucide-react';
import { PaymentOption } from './PaymentOption';
import { paymentMethods } from './PaymentMethods';

export function PaymentModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('card');

  if (!isOpen) return null;

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Processing payment with:', selectedMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment Options</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentOption
              key={method.id}
              icon={method.icon}
              title={method.title}
              description={method.description}
              selected={selectedMethod === method.id}
              onClick={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}