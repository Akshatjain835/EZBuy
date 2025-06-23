import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import ShoppingOrderDetailsView from './ShoppingOrderDetailsView';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/redux/shop/shoppingOrderSlice';
import { DialogContent } from '@radix-ui/react-dialog';

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`px-3 py-1 ${orderItem?.orderStatus === "confirmed"
                          ? "bg-yellow-500"
                          : orderItem?.orderStatus === "delivered"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-black"
                        }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
              : null}
           
          </TableBody>
        </Table>
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            setOpenDetailsDialog(open);
            if (!open) setSelectedOrder(null);
          }}
        > 
        <DialogContent>
        <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </DialogContent>
         </Dialog>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders