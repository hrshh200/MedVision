import React from 'react';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { getStatusColor } from '../utils/statusColors';

export const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-gray-500" />
            <span className="text-sm text-gray-600">{order.items.length} items</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            ${order.total.toFixed(2)}
          </p>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Shipping Details</h4>
                <p className="text-sm text-gray-600">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};