"use client"
import Layout from '@/components/layout/page'
import { redirect, RedirectType } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

const DeleteProduct = ({ params }) => {
    const { slug } = use(params);
    const [productInfo, setproductInfo] = useState("")
    const goBack = () => {
        redirect("/Products")
    }

    useEffect(() => {
        const fetchById = async () => {
            const a = await fetch(`/api/editProduct/${slug}`)
            const data = await a.json();
            setproductInfo(data);
        }
        fetchById();

    }, [slug])


    const del = async () => {
        const response = await fetch(`/api/editProduct/${slug}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await response.json();
          if (response.ok) {
            console.log("Product deleted successfully:", result);
          } else {
            console.error("Failed to delete product:", result);
          }
          goBack()
     }

    return (
        <Layout>
            <div>
                <h1 className='text-xl text-blue-900 font-bold mb-3'>Are you sure, you want to delete <span className='text-red-500'>&nbsp; " {productInfo.tittle} "</span></h1>
                <br />
                <div className='flex justify-center mr-7 gap-2'>

                    <button className='btn-red' onClick={() => del()}>YES</button>
                    <button className='btn-default' onClick={() => goBack()}>NO</button>
                </div>
            </div>
        </Layout>
    )
}

export default DeleteProduct