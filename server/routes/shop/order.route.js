import { Router } from "express";
import { capturePaymentController, createOrderController, getAllOrdersByUserController, getOrderDetailsController } from "../../controllers/shop/order.controller.js";

const orderRouter = Router();

orderRouter.post('/create',createOrderController)
orderRouter.post('/capture',capturePaymentController)
orderRouter.get('/list/:userId',getAllOrdersByUserController)
orderRouter.get('/details/:id',getOrderDetailsController)

export default orderRouter;