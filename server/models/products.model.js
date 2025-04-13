import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      default: null,
      min: 0,
    },
    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    }, 
    averageReview:{
      type:Number,
    }
   
  },
  { timestamps: true }
);

const Product=mongoose.model("Product",ProductSchema);
export default Product