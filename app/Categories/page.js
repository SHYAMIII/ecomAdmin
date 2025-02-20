"use client"
import Layout from "@/components/layout/page"
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Categories = () => {
  const [name, setName] = useState("")
  const [editCategoryState, setEditCategoryState] = useState(null)
  const [parentCategory, setParentCategory] = useState("")
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/addCategory")
      const data = await res.json()
      console.log(data.data)
      setCategories(data.data)
    } catch (error) {
      console.error("Error fetching categories", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const saveCategory = async (e) => {
    e.preventDefault()
    if (!name) {
      alert("Please enter a category name.")
      return
    }
    if (editCategoryState) {
      await fetch("/api/addCategory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, parentCategory, id: editCategoryState._id }),
      })
      setEditCategoryState(null)
    } else {
      await fetch("/api/addCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
    }
    setName("")
    setParentCategory("")
    fetchCategories()
  }

  const editCategory = (category) => {
    setEditCategoryState(category)
    setName(category.name)
    setParentCategory(category?.parent?._id || "")
  }

  const deleteCategory = async (category) => {
    await fetch("/api/addCategory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: category._id }),
    })
    fetchCategories()
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {editCategoryState ? `Edit Category: ${editCategoryState.name}` : "Add New Category"}
          </h1>
          <form onSubmit={saveCategory} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">No Parent Category</option>
                {categories?.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md transition duration-200"
            >
              SAVE
            </button>
          </form>
        </motion.div>

        {/* Categories List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Category List</h2>
          <AnimatePresence>
            {categories.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {categories.map((category) => (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/20 backdrop-blur-md rounded-lg p-4 shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-700">
                      {category?.parent ? `Parent: ${category.parent.name}` : "No Parent Category"}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => editCategory(category)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 text-center">
                No categories found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  )
}

export default Categories
