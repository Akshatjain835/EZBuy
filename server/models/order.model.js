import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
  userId: {
     type: String
     },
  cartId: { 
    type: String 
},
  cartItems: [
    {
      productId: {
         type: String 
        },
      title: {
         type: String
         },
      image: { 
        type: String
     },
      price: { 
        type: String
     },
      quantity: { 
        type: Number 
    },
    },
  ],
  addressInfo: {
    addressId: {
         type: String 
        },
    address: { 
        type: String
     },
    city: { 
        type: String
     },
    pincode: { 
        type: String
     },
    phone: {
         type: String 
        },
    notes: { 
        type: String 
    },
  },
  orderStatus: { 
    type: String
 },
  paymentMethod: { 
    type: String
 },
  paymentStatus: { 
    type: String
 },
  totalAmount: { 
    type: Number 
},
  orderDate: {
     type: Date 
    },
  orderUpdateDate: { 
    type: Date 
},
  paymentId: { 
    type: String
 },
  payerId: { 
    type: String 
},
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

 