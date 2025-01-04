export const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-03-15',
      status: 'delivered',
      total: 234.99,
      customerName: 'John Doe',
      shippingAddress: '123 Main St, City, Country',
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          quantity: 1,
          price: 159.99,
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
        },
        {
          id: '2',
          name: 'Smart Watch',
          quantity: 1,
          price: 75.00,
          imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300'
        }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-03-14',
      status: 'processing',
      total: 899.97,
      customerName: 'Jane Smith',
      shippingAddress: '456 Oak Ave, Town, Country',
      items: [
        {
          id: '3',
          name: 'Laptop',
          quantity: 1,
          price: 899.97,
          imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300'
        }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-03-13',
      status: 'pending',
      total: 149.97,
      customerName: 'Robert Johnson',
      shippingAddress: '789 Pine Rd, Village, Country',
      items: [
        {
          id: '4',
          name: 'Wireless Mouse',
          quantity: 2,
          price: 49.99,
          imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300'
        },
        {
          id: '5',
          name: 'Keyboard',
          quantity: 1,
          price: 49.99,
          imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300'
        }
      ]
    }
  ];