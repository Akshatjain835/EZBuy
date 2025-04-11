import { Router } from "express";
import { createOrderController } from "../../controllers/shop/order.controller.js";

const orderRouter = Router();

orderRouter.post('/create',createOrderController)

export default orderRouter;