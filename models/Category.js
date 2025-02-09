
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;



// const Category = model("Category", categorySchema);

// export default mongoose.models?.Category || Category;
