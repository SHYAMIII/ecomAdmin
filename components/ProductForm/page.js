"use client"
import Layout from "@/components/layout/page";
import { set } from "mongoose";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
const page = ({ params }) => {

  const [goToProducts, setGoToProducts] = useState(false)
  




  


  
  const uploadImages = async (e) => {  
    const files = e.target?.files;

    
    if (files?.length>0) {
      const formdata= new FormData();
      for (const file of files) {
        formdata.append('file', file);
      }

      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formdata,

      });
      const data = await res.json();
      console.log(data.fileUrl)
      setImages(oldImage=>{
        return [...oldImage,...data.fileUrl]
      })
    }
  };





return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-xl text-blue-900 font-bold mb-3'>Edit Product detail</h1>
      <label > Name</label>
      <input type="text" placeholder='Product name' value={tittle} onChange={(e) => { setTittle(e.target.value) }} />
      <label >Photos of Product</label>
      <div className='w-24 h-24 flex justify-center items-center text-sm bg-gray-300 rounded-lg'>

        <label className='flex cursor-pointer justify-center items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
            <path d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>Upload</div>
          <input onChange={uploadImages} className="hidden" type="file" />
        </label>
      </div>
      <div className="my-">
        {!productInfo?.images && <p className='text-sm text-gray-600'>No image uploaded</p>}
      </div>
      <label >Discription</label>
      <textarea placeholder='Product discription' value={discription} onChange={(e) => { setdiscription(e.target.value) }}></textarea>
      <label >Price (in INR)</label>
      <input type="text" placeholder='Product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
      <button className='btn-primary'>Save</button>
    </form>
)
}

export default page