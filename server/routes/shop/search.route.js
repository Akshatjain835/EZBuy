import {Router} from "express";
import { searchProductsController } from "../../controllers/shop/search.controller.js";

const searchRouter =Router();


searchRouter.get("/:keyword", searchProductsController);

export default searchRouter;