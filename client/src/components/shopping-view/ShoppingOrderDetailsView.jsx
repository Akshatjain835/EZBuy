import React from 'react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

const ShoppingOrderDetailsView = ({orderDetails}) => {
    
    const { user } = useSelector((state) => state.auth);

  return (
 
    <div className="sm:max-w-[600px]">

    <div className="grid gap-6">
      <div className="grid gap-2">

        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label>
            <Badge
              className={`py-1 px-3 ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </Label>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>
          
          <ul className="grid gap-3">
              {orderDetails?.cartItems &&
              orderDetails?.cartItems?.length > 0 ? (
                <li className="flex justify-between font-semibold border-b pb-1">
                  <span className="w-1/3">Title</span>
                  <span className="w-1/3 text-center">Quantity</span>
                  <span className="w-1/3 text-right">Price</span>
                </li>
              ) : null}
              {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0
                ? orderDetails?.cartItems?.map((item) => (
                    <li className="flex items-center justify-between">
                      <span className="w-1/3">{item.title}</span>
                      <span className="w-1/3 text-center">{item.quantity}</span>
                      <span className="w-1/3 text-right">${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </div>

  </div>

  )
}

export default ShoppingOrderDetailsView