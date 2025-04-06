// controllers/productController.js

import Product from "../models/products.model.js";
import { imageUploadUtil } from "../utils/cloudinary.js";


export const handleImageUploadController = async (req, res) => {
    
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
  
      res.json({
        success: true,
        result,
      });

    } catch (error) {
    //   console.log(error);

      res.json({
        success: false,
        message: "Error occured",
      });
    }
  };


  //add a new product Controller
export const addProductController = async (req, res) => {

    try {

      const { image,title,description,category,brand,price,salePrice,totalStock} = req.body;
  
      
  
      const newlyCreatedProduct = new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
      });
  
      await newlyCreatedProduct.save();

      res.status(201).json({

        success: true,
        data: newlyCreatedProduct,
        error:false,

      });

    } catch (e) {

      // console.log(e);

      res.status(500).json({
        success: false,
        message: "Error occured",
        error:true
      });
    }
  };
  
//fetch all products
export const fetchAllProductsController = async (req, res) => {

    try {

      const listOfProducts = await Product.find({});

      res.status(200).json({
        success: true,
        data: listOfProducts,


      });

    } catch (e) {

      // console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };
  

  //edit a product
export const editProductController = async (req, res) => {
    try {
    
      const { id } = req.params;
      // console.log(id)

      const { image, title, description, category, brand, price, salePrice, totalStock} = req.body;
  
      let findProduct = await Product.findById(id);
      // console.log(findProduct)

      if (!findProduct){

        return res.status(404).json({
          success: false,
          message: "Product not found",
          error:true
        });

      }
  
      findProduct.title = title || findProduct.title;

      findProduct.description = description || findProduct.description;

      findProduct.category = category || findProduct.category;

      findProduct.brand = brand || findProduct.brand;

      findProduct.price = price === "" ? 0 : price || findProduct.price;

      findProduct.salePrice =salePrice === "" ? 0 : salePrice || findProduct.salePrice;

      findProduct.totalStock = totalStock || findProduct.totalStock;

      findProduct.image = image || findProduct.image;
  
  
      await findProduct.save();

      res.status(200).json({
        success: true,
        data: findProduct,
        error:false
      });

    } catch (e) {

      // console.log(e);

      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };
  

  //delete a product
export const deleteProductController = async (req, res) => {

  try {

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product){
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({

      success: true,
      message: "Product delete successfully",
      error:false
    });
  } catch (e) {
    // console.log(e);

    res.status(500).json({
      success: false,
      message: "Error occured",
      error:true
    });
  }
};

  


