import {model, Schema} from "mongoose";
import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    images:{
        type: [String],
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    }
    
},
{
    timestamps: true
})


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;