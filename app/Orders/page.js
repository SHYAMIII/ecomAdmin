"use client"
import Layout from '@/components/layout/page'
import React, { useEffect, useState } from 'react'



const page = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const a = await fetch('/api/Order')
        const data = await a.json()
        console.log(data);
        setOrders(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();



  }, [])

  return (
    <Layout>
      <div>
        <h1>Orders</h1>

        <table className='w-full'>
          <thead className=''>
            <tr className='w-full text-white bg-slate-500'>
              <td>Product </td>
              <td>username</td>
              <td>UTR</td>
              <td>Time</td>
              <td>Phone</td>
              <td>G-mail</td>
            </tr>
          </thead>
          <tbody>
            {orders?.length>1 &&orders.map((order, index) => (
              <tr className='border shadow-sm border-gray-700' key={index}>
                <td className='py-1 px-2 text-[10px]'>{order.line_items.map((item) => (
                  <>
                  <div className='flex gap-2'>

                  <div>{item.quantity}</div> <span>X</span>
                  <div className='w-36'>{item.price_data.product_data.name}</div>
                  <div>{item.price_data.unit_amount}</div>
                  </div>
                  </>
                ))}</td>
                <td className='py-1 px-2 text-[12px]'>{order.name}</td>
                <td className='py-1 px-2 text-[12px]'>{order.utr}</td>
                <td className='py-1 px-2 text-[12px]'>{new Date(order.createdAt).toLocaleString()}</td>
                <td className='py-1 px-2 text-[12px]'>{order.phone}</td>
                <td className='py-1 px-2 text-[12px]'>{order.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default page