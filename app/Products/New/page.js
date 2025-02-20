"use client"
import Layout from '@/components/layout/page'
import { redirect } from 'next/navigation'
import { ReactSortable } from 'react-sortablejs'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'

const Page = () => {
  const [tittle, setTittle] = useState('');
  const [discription, setDiscription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/addCategory");
        const data = await res.json();
        if (data?.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tittle || !discription || !price) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch('/api/AddProduct', {
        method: 'POST',
        body: JSON.stringify({ tittle, discription, price, images, categoryId }),
        headers: { 'Content-Type': 'application/json' }
      });
      await res.json();
      setRedirectToProducts(true);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (redirectToProducts) {
    return redirect("/Products");
  }

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (!files?.length) return;

    setIsUploading(true);
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
    }

    try {
      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImages((prevImages) => [...prevImages, ...data.links]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateImageOrder = (newOrder) => {
    setImages(newOrder);
  };

  return (
    <Layout>
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg text-white w-full max-w-3xl mx-auto"
      >
        <h1 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Add New Product</h1>

        <label className="block mt-4 text-sm">Product Name</label>
        <input 
          type="text" 
          placeholder="Enter product name" 
          value={tittle} 
          onChange={(e) => setTittle(e.target.value)} 
          className="input-field"
        />

        <label className="block mt-4 text-sm">Photos of Product</label>
        <div className="mb-3 flex flex-wrap gap-3">
          <ReactSortable 
            className="flex flex-wrap gap-3"
            list={images} 
            setList={updateImageOrder}
          >
            {images.map((image, index) => (
              <div key={index} className="w-20 h-20 md:w-24 md:h-24 border rounded-md overflow-hidden shadow-md">
                <img src={image} className="w-full h-full object-cover" alt="Product" />
              </div>
            ))}
          </ReactSortable>

          {isUploading && (
            <div className="h-20 md:h-24 flex justify-center items-center">
              <HashLoader color="#36D7B7" />
            </div>
          )}

          <label className="w-20 h-20 md:w-24 md:h-24 flex flex-col justify-center items-center bg-gray-700 rounded-md cursor-pointer">
            <span className="text-gray-400 text-xs md:text-sm">+ Upload</span>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>

        <label className="block mt-4 text-sm">Category</label>
        <select 
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)} 
          className="input-field"
        >
          <option value="">Uncategorized</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <label className="block mt-4 text-sm">discription</label>
        <textarea 
          placeholder="Enter product discription" 
          value={discription} 
          onChange={(e) => setDiscription(e.target.value)} 
          className="input-field h-20 md:h-24"
        ></textarea>

        <label className="block mt-4 text-sm">Price (in INR)</label>
        <input 
          type="text" 
          placeholder="Enter product price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="input-field"
        />

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 transition-all"
        >
          Save Product
        </button>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          border: 1px solid #444;
          border-radius: 6px;
          background-color: #222;
          color: white;
        }
        .input-field:focus {
          outline: none;
          border-color: #36D7B7;
        }
      `}</style>
    </Layout>
  );
};

export default Page;
