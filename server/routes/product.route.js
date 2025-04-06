
import { Router } from "express";
import { handleImageUploadController } from "../controllers/products.controller.js";
import { upload } from "../utils/cloudinary.js";


const productRouter = Router();

productRouter.post("/upload-image", upload.single("my_file"), handleImageUploadController);


export default productRouter