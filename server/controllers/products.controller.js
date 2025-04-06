// controllers/productController.js

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
  
  


