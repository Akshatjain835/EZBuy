import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/products.model.js";
import { paypal } from '../../utils/paypal.js'
import {client} from '../../utils/paypal.js'
import dotenv from 'dotenv';
dotenv.config();

export const createOrderController = async (req, res) => {

    try {

      const {  userId,  cartItems,  addressInfo,  orderStatus,  paymentMethod,  paymentStatus,  totalAmount,  orderDate,  orderUpdateDate,  paymentId,  payerId,cartId, } = req.body;
  
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: totalAmount.toFixed(2),
                },
              },
            },
            items: cartItems.map((item) => ({
              name: item.title,
              unit_amount: {
                currency_code: "USD",
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
          },
        ],
        application_context: {
          return_url: `${process.env.CLIENT_URL}/shop/paypal-return`,
          cancel_url: `${process.env.CLIENT_URL}/shop/paypal-cancel`,
        },
      });
  
      const response = await client().execute(request);
      console.log(response);
      const approvalURL = response.result.links.find(
        (link) => link.rel === "approve"
      ).href;
  
      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentID: response.result.id,
        payerId,
      });
      
      console.log(newlyCreatedOrder);
      await newlyCreatedOrder.save();
  
      res.status(201).json({
        success: true,
        approvalURL,
        orderId: newlyCreatedOrder._id,
      });
      
    } catch (error) {
      
      res.status(500).json({
        success: false,
        message: "Error occurred!",
      });
    }
  };

export const getAllOrdersByUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      res.status(404).json({
        success: false,
        message: "Order Not found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    // console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

export const getOrderDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    // console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};

export const capturePaymentController = async (req, res) => {

  try {
    const { paymentID, payerId, orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Items not found",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentID = paymentID;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Empty Stock!",
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;

    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
}