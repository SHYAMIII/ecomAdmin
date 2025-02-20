"use client"
import Layout from '@/components/layout/page'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/Order');
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Orders</h1>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
              <tr className="text-left">
                <th className="p-3">Product</th>
                <th className="p-3">Username</th>
                <th className="p-3">UTR</th>
                <th className="p-3">Time</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr 
                    key={index} 
                    className="border-t border-gray-700 hover:bg-gray-800 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-sm">
                      {order.line_items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="text-blue-400">{item.quantity}x</span>
                          <span className="w-36 truncate">{item.price_data.product_data.name}</span>
                          <span className="text-green-400 font-semibold">₹{item.price_data.unit_amount}</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 text-sm">{order.name}</td>
                    <td className="py-3 px-4 text-sm">{order.utr}</td>
                    <td className="py-3 px-4 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{order.phone}</td>
                    <td className="py-3 px-4 text-sm">{order.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        th, td {
          text-align: left;
        }
      `}</style>
    </Layout>
  );
};

export default Page;
