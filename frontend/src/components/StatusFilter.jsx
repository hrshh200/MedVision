import React from 'react';
import { Filter } from 'lucide-react';

export const StatusFilter = ({ status, onStatusChange }) => (
  <div className="relative">
    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
    >
      <option value="all">All Status</option>
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  </div>
);