"use client"
import Layout from '@/components/layout/page'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'

const Categories = () => {

  const [name, setName] = useState('')
  const [editCategoryState, setEditCategoryState] = useState(null)
  const [parentCategory, setParentCategory] = useState('')
  const [categories, setCategories] = useState([])


  const fetchCategories = async () => {
    try {

      const a = await fetch("/api/addCategory")
      const data = await a.json();
      console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.log('erroe fetching categories', error);
    }
  };
  useEffect(() => {



    fetchCategories()


  }, []);

  const saveCategory = async (e) => {

    if (editCategoryState) {
      e.preventDefault();
      const response = await fetch('/api/addCategory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, parentCategory,id: editCategoryState._id }),
      })
      
      setEditCategoryState(null);
      fetchCategories();
      return;
    }
    else {




      e.preventDefault();
      const a = await fetch('/api/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, parentCategory }),
      })

    }
    setName('');
    setEditCategoryState(null);
    fetchCategories();

  }

  const editCategory = (category) => {
    console.log(category);
    setEditCategoryState(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
  }

  const deleteCategory = async (category) => {
    const response = await fetch('/api/addCategory', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:category._id }),
    })
    fetchCategories();
  }
  return (
    <Layout>
      <h1 className='text-xl text-blue-900 font-bold mb-3'>Categories</h1>
      <label className='flex items-center' >{
        editCategoryState
          ? `Edit Category Name: ${editCategoryState.name}`
          : 'New Category Name'
      }</label>
      <form
        onSubmit={saveCategory}
        className=' justify-center items-center  gap-2'>
      <div className='flex flex-row mb-3 gap-4'>
          <input
          className='mb-0 pb-0'
          type="text"
          placeholder={'Category Name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select className='mb-0 ' value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
          <option value=""> No parent category</option>{
            (categories?.length > 0 && categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>{category.name}</option>
              )
            }))
          }
        </select></div>


        <button
          type='submit'
          className=' text-white px-5 text-sm py-2  rounded-md bg-blue-600 font-bold'
        >
          SAVE
        </button>
      </form>

      <table className="basic mt-4 ">
        <thead className='px-2 py-1'>
          <tr>
            <td>Categories name</td>
            <td>Category</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 && categories.map((category, index) => {
            return (
              <tr key={index}>
                <td className=''>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className='flex gap-1 md:justify-around'><button onClick={() => editCategory(category)} className='bg-blue-700 md:text-base md:px-2 text-sm text-white px-1 py-1 rounded-md'>Edit</button>
                  <button onClick={()=> deleteCategory(category)} className='bg-red-700 text-white md:px-2 px-1 py-1 md:text-base text-sm rounded-md'>Delete</button></td>

              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export default Categories