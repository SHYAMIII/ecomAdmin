import Product from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function GET(req, { params }) {

   

    const { slug } = await params;

    // if (!mongoose.Types.ObjectId.isValid(slug)) {
    //     return NextResponse.json({ message: "Invalid slug ID" }, { status: 400 });
    // }

    if (mongoose.connections[0].readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
    }
    const slugProduct = await Product.findOne({ _id: slug });
    if (!slugProduct) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });

    }
    return NextResponse.json(slugProduct, { status: 200 });

}

export async function PUT(req, { params }) {

  


    const { slug } = await params;


    if (mongoose.connections[0].readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
    }


    const slugProduct = await Product.findOne({ _id: slug });
    if (!slugProduct) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const data = await req.json();
    const updatedProduct = await Product.findOneAndUpdate({ _id: slug }, data, { new: true });
    return NextResponse.json(updatedProduct, { status: 200 });
}


export async function DELETE(req, { params }) {


    const { slug } = await params;
    if (mongoose.connections[0].readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
    }
    const slugProduct = await Product.findOne({ _id: slug });
    if (!slugProduct) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    await Product.deleteOne({ _id: slug });
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
}