import { Router } from "express";
import { capturePaymentController, createOrderController } from "../../controllers/shop/order.controller.js";

const orderRouter = Router();

orderRouter.post('/create',createOrderController)
orderRouter.post('/capture',capturePaymentController)

export default orderRouter;