import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <p className="text-2xl font-bold text-yellow-600">{value}</p>
  </div>
);

const Dashboard = () => {
  const salesData = [
    { name: 'Jan', sales: 100 },
    { name: 'Feb', sales: 80 },
    { name: 'Mar', sales: 90 },
    { name: 'Apr', sales: 60 },
    { name: 'May', sales: 85 },
    { name: 'Jun', sales: 50 },
  ];

  const mostSoldItems = [
    { name: 'Gold Necklace', value: 70 },
    { name: 'Diamond Ring', value: 50 },
    { name: 'Gold Earrings', value: 60 },
    { name: 'Bracelet', value: 40 },
    { name: 'Other Jewelry', value: 30 },
  ];

  const latestOrders = [
    { product: 'Gold Necklace', orderId: '11232', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Delivered', amount: '$1200.00' },
    { product: 'Diamond Ring', orderId: '11233', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Pending', amount: '$3000.00' },
    { product: 'Gold Earrings', orderId: '11234', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Canceled', amount: '$900.00' },
    { product: 'Bracelet', orderId: '11235', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Delivered', amount: '$750.00' },
    { product: 'Gold Ring', orderId: '11236', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Delivered', amount: '$600.00' },
    { product: 'Silver Chain', orderId: '11237', date: 'Jun 29, 2022', customer: 'Afaq Karim', status: 'Delivered', amount: '$500.00' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-yellow-700 mb-6">Jewelry Store Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Today's Sales" value="$50.4K" />
        <DashboardCard title="Today's Revenue" value="$20.2K" />
        <DashboardCard title="In Escrow" value="$35.1K" />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-yellow-700 mb-4">Total Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#d4af37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">Most Sold Jewelry</h3>
          {mostSoldItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">Latest Orders</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Product</th>
                <th className="p-2">Order ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Status</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{order.product}</td>
                  <td className="p-2">{order.orderId}</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">{order.customer}</td>
                  <td className={`p-2 font-semibold ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{order.status}</td>
                  <td className="p-2">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;