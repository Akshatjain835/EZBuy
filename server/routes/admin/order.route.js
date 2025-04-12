import Router from "express";
import { getAllOrdersOfAllUsersController, getOrderDetailsForAdminController, updateOrderStatusController } from "../../controllers/admin/order.controller";

const adminOrderRouter = Router();

adminOrderRouter.get("/get", getAllOrdersOfAllUsersController);
adminOrderRouter.get("/details/:id", getOrderDetailsForAdminController);
adminOrderRouter.put("/update/:id", updateOrderStatusController);


export default adminOrderRouter;