import Router from 'express'
import { addAddressController, deleteAddressController, editAddressController, fetchAllAddressController } from '../../controllers/shop/address.controller';

const addressRouter = Router()

addressRouter.post("/add", addAddressController);
addressRouter.get("/get/:userId", fetchAllAddressController);
addressRouter.delete("/delete/:userId/:addressId", deleteAddressController);
addressRouter.put("/update/:userId/:addressId", editAddressController);

export default addressRouter