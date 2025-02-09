"use client"
import Layout from "@/components/layout/page";
import { set } from "mongoose";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { SyncLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";
const page = ({ params }) => {

  const [tittle, setTittle] = useState('')
  const [categoryname, setCategoryname] = useState('')
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [discription, setdiscription] = useState('')
  const [price, setPrice] = useState('')
  const [productInfo, setProductInfo] = useState(null)
  const [goToProducts, setGoToProducts] = useState(false)

  const [isUploading, setIsUploading] = useState(false)
  const { slug } = use(params);
  useEffect(() => {
    const fetchById = async () => {
      try {

        const a = await fetch(`/api/editProduct/${slug}`)
        const data = await a.json();
        setProductInfo(data);
      } catch (error) {
        console.log('erroe fetching slug', error);
      }
    };

    fetchById();

  }, [slug])


  useEffect(() => {
    
    const fetchCategories = async () => {
      
      const a = await fetch("/api/addCategory")
      const cat = await a.json();
      console.log(cat.data);
      setCategories(cat?.data);
    };
  
    fetchCategories();
  
  }, [])
  

  useEffect(() => {
    if (productInfo) {
      setTittle(productInfo.tittle || '');
      setdiscription(productInfo.discription || '');
      setPrice(productInfo.price || '');
      setImages(productInfo.images || []);
      setCategoryname(productInfo.Category || '');

    }
  }, [productInfo])



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tittle || !discription || !price ) {
      alert("All fields are required!");
      return;
    }
    // Make the PUT request to update the product data
    const UpdateFetch = await fetch(`/api/editProduct/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({ tittle, discription, price, images, categoryname }),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await UpdateFetch.json();

    if (UpdateFetch.ok) {
      console.log("Product updated successfully:", result);
    } else {
      console.error("Failed to update product:", result);
    }
    setGoToProducts(true)
  }
  if (goToProducts) {
    return redirect("/Products")
  }

  const uploadImages = async (e) => {

    setIsUploading(true);
    const files = e.target?.files;


    if (files?.length > 0) {
      const formdata = new FormData();
      for (const file of files) {
        formdata.append('file', file);
      }

      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formdata,

      });
      const data = await res.json();
      console.log(data.links)
      setImages(oldImage => {
        return [...oldImage, ...data.links]
      });
    }

    setIsUploading(false);
  };

  const updateImageOrder = (e) => {
    setImages(e);
  }





  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1 className='text-xl text-blue-900 font-bold mb-3'>Edit Product detail</h1>
        <label > Name</label>
        <input type="text" placeholder='Product name' value={tittle} onChange={(e) => { setTittle(e.target.value) }} />
        <label >Photos of Product</label>
        <div className="mb-2 gap-3 flex flex-wrap">
          <ReactSortable
          className="flex gap-1 flex-wrap"
          list={images} 
          setList={updateImageOrder}>
          {!!images?.length && images.map((image) => (
            <div className="w-24 shadow-lg border border-gray-400 h-24 rounded-lg overflow-hidden " key={image}>
              <img className='w-full h-full object-center' src={image} alt="" />
            </div>
          ))}
          </ReactSortable>
          {isUploading && (
            <div className='h-24 text-center justify-center items-center flex'>
<SyncLoader />
            </div>
          )}
          <div className='w-24 h-24 flex justify-center shadow-lg border border-gray-400 items-center text-sm bg-gray-300 rounded-lg'>

            <label className='flex  cursor-pointer justify-center items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                <path d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>Upload</div>
              <input onChange={uploadImages} className="hidden" type="file" />
            </label>
          </div>
        </div>
        <div className="my-2">
          {images?.length === 0 && <p className='text-sm text-gray-600'>No image uploaded</p>}
        </div>

        <label>Category</label>
        <select value={categoryname} onChange={(e) => { setCategoryname(e.target.value) }} >
          <option value="">Uncategorized</option>
          {
              (categories?.length>0&& categories.map((cat) => {
                return <option key={cat._id} value={cat._id}>{cat?.name}</option>
              }))
          }
        </select>
        <label >Discription</label>
        <textarea placeholder='Product discription' value={discription} onChange={(e) => { setdiscription(e.target.value) }}></textarea>
        <label >Price (in INR)</label>
        <input type="text" placeholder='Product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
        <button className='btn-primary'>Save</button>
      </form>
    </Layout>
  )
}

export default page