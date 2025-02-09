import Order from "@/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {

  const client = await mongoose.connect(process.env.MONGODB_URI)

  const order = await Order.find({}).populate('line_items').exec();
  return NextResponse.json(order)
}