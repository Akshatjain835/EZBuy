import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import AdminOrderDetailsView from './AdminOrderDetailsView';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/redux/admin/adminOrderSlice';

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);


  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                <TableRow>
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

                    <Button
                      onClick={() =>
                        handleFetchOrderDetails(orderItem?._id)
                      }
                    >
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
          onOpenChange={() => {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
          }}
        >
          <DialogContent>
            <AdminOrderDetailsView orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
export default AdminOrdersView;