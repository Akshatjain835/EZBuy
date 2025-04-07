import { Router } from "express";
import { getFilteredProductsController, getProductDetailsController } from "../../controllers/shop/product.controller.js";

const shopProductRouter =Router();

shopProductRouter.get("/get", getFilteredProductsController);
shopProductRouter.get("/get/:id", getProductDetailsController);


export default shopProductRouter