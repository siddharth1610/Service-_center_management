import { Product } from "../models/productSchema.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "cloudinary";
import fs from "fs";


export const addNewProduct =asyncHandler(async(req,res)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        throw new ApiError("Product Image is required", 400);
      }

      const { productImage } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(productImage.mimetype)) {
    new ApiError("File Format Not Supported!", 400);
  }

  const {
    name,
    category,
    price,
    instruction,
    
  } = req.body;
  if (
    !name ||
    !category ||
    !price ||
    !instruction ||
    !productImage
  ) {
    throw new ApiError("Please Fill Full Product Form!", 400);
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    productImage.tempFilePath
  );
  fs.unlinkSync(productImage.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    throw new ApiError("Failed To Upload Product Image To Cloudinary", 500);
  }
  const product = await Product.create({
    name,
    category,
    price,
    instruction,
    productImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json(new ApiResponse(200, product, "PRODUCT Added"));
});

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(
    new ApiResponse(200,products,"All PRODUCT")
  );
});

export const updateProductStatus = asyncHandler(
    async (req, res, next) => {
      const { id } = req.params;
      let product = await Product.findById(id);
      if (!product) {
        throw (new ApiError("Product not found!", 404));
      }
      product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json(new ApiResponse(200,product,"Product Updated!"));
    }
  );

  export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw(new ApiError("Product Not Found!", 404));
    }
    await product.deleteOne();
    res.status(200).json(new ApiResponse(200,"Product Deleted!"));
  });