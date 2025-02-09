import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function POST(request) {

    
    let data = await request.json();
     const {name, parentCategory} = data
    const client = await mongoose.connect(process.env.MONGODB_URI)
    const newCategory = await new Category({
        name: name,
        parent: parentCategory,
        createdAt: Date.now()
    })
    await newCategory.save();
    return NextResponse.json({ success: true, data: newCategory })
}

export async function GET(request) {
   
  


    const client = await mongoose.connect(process.env.MONGODB_URI)
    const categories = await (Category.find().populate('parent').exec());
    return NextResponse.json({ success: true, data: categories })
}

export async function PUT(request) {

    
    
    let data = await request.json();
    const { id, name, parentCategory } = data;
    const client = await mongoose.connect(process.env.MONGODB_URI);

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
            name: name,
            parent: parentCategory,
        },
        { new: true }
    );


    return NextResponse.json({ success: true, data: updatedCategory });
}


export async function DELETE(request) {

    
    let data = await request.json();
    const { id } = data;
    const client = await mongoose.connect(process.env.MONGODB_URI);

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
}