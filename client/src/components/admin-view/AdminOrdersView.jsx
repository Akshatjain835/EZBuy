import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';

import AdminOrderDetailsView from './AdminOrderDetailsView';
const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  

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
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Badge >
                      
                    </Badge>
                  </TableCell>
                  <TableCell>totalAmount</TableCell>
                  <TableCell>
                  <Dialog
                        open={openDetailsDialog}
                       
                      >
                        <Button
                         
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView />
                      </Dialog>
                  </TableCell>
                </TableRow>
           
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}

export default AdminOrdersView