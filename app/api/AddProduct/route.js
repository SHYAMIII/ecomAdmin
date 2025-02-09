import Categories from "@/app/Categories/page";
import Category from "@/models/Category";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { checkAdmin } from "../auth/[...nextauth]/route";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request) {

  
  
  let data =await request.json();
console.log(data);
  const client = await mongoose.connect(process.env.MONGODB_URI)
  const NewProduct = await new Product({
    tittle: data.tittle,
    discription: data.discription,
    price: data.price,
    images: data.images,
    Category: data.categoryname,
    createdAt: Date.now()
  })
  await NewProduct.save();

  // console.log(product);
  return NextResponse.json({success: true,data:"yes",data})
  
}

export async function GET(request) {

  
 
  const client = await mongoose.connect(process.env.MONGODB_URI)

  
  const product = await Product.find({}).populate('Category').exec();
  return NextResponse.json(product)
}
