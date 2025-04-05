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
  


