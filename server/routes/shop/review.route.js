import { Router } from "express";
import { addProductReviewController, getProductReviewsController } from "../../controllers/shop/review.controller.js";

const reviewRouter = Router();


reviewRouter.post("/add", addProductReviewController);
reviewRouter.get("/:productId", getProductReviewsController);

export default reviewRouter