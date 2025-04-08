import {Router} from 'express'
import { addToCartController, deleteCartItemController, fetchCartItemsController, updateCartItemQtyController } from '../../controllers/shop/cart.controller';

const cartRouter=Router();

cartRouter.post("/add", addToCartController);
cartRouter.get("/get/:userId", fetchCartItemsController);
cartRouter.put("/update-cart", updateCartItemQtyController);
cartRouter.delete("/:userId/:productId", deleteCartItemController);


export default cartRouter