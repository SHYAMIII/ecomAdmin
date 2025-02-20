"use client"
import Layout from "@/components/layout/page"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Page = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/AddProduct')
        const data = await res.json()
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error("Data is not an array")
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-zinc-500">Products</h1>
        <Link 
          href="/Products/New" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-md transition duration-200"
        >
          Add New Product
        </Link>
      </div>

      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600">
                    {product.tittle.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.tittle}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {/* You can add additional product details here */}
                    Product details go here.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Link 
                  href={`/Products/edit/${product._id}`}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Edit
                </Link>
                <Link 
                  href={`/Products/delete/${product._id}`}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Delete
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </div>
    </Layout>
  )
}

export default Page
