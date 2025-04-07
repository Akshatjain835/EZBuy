import { Router } from "express";
import { getFilteredProductsController } from "../../controllers/shop/product.controller.js";

const shopProductRouter = express.Router();

shopProductRouter.get("/get", getFilteredProductsController);


module.exports = shopProductRouter;