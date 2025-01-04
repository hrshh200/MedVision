import React from 'react';
import { OrdersList } from '../components/OrdersList';
import { mockOrders } from '../data/mockOrders';

function App() {
  return (
    <div className="mt-[10vh] min-h-screen bg-gray-50">
      <OrdersList orders={mockOrders} />
    </div>
  );
}

export default App;