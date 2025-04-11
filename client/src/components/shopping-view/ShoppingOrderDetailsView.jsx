import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'

const ShoppingOrderDetailsView = () => {
    const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label></Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label></Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Price</p>
          <Label></Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment method</p>
          <Label></Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label></Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label>
            <Badge
            
            >
              
            </Badge>
          </Label>
        </div>
      </div>
      <Separator/>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-3">
           
          </ul>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>{user.userName}</span>
            <span>address</span>
            <span>city</span>
            <span>pincode</span>
            <span>phone</span>
            <span>notes</span>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
  )
}

export default ShoppingOrderDetailsView