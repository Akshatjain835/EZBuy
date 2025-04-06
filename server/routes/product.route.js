
import { Router } from "express";
import { addProductController, deleteProductController, editProductController, fetchAllProductsController, handleImageUploadController } from "../controllers/products.controller.js";
import { upload } from "../utils/cloudinary.js";


const productRouter = Router();

productRouter.post("/upload-image", upload.single('image'), handleImageUploadController);
productRouter.post("/add",addProductController);
productRouter.get("/get",fetchAllProductsController);
productRouter.put("/edit/:id",editProductController);
productRouter.delete("/delete/:id",deleteProductController);



export default productRouter