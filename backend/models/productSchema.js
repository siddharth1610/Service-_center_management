import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  productImage: {
    public_id: String,
    url: String,
  },
  instruction: {
    type: String,
    required: true,
    maxLength: [100, "Message must contains at least 10 Character"],
  },
});
export const Product = mongoose.model("Product", productSchema);