import React, { useState } from 'react';
import { OrderCard } from './OrderCard';
import { StatusFilter } from './StatusFilter';
import { filterOrders } from '../utils/orderFilters';
import {SearchOrderBar} from "./SearchOrderBar"

export const OrdersList = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = filterOrders(orders, searchTerm, statusFilter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Orders</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchOrderBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <StatusFilter status={statusFilter} onStatusChange={setStatusFilter} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};