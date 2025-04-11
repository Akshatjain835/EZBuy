import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import ShoppingOrderDetailsView from './ShoppingOrderDetailsView';

const ShoppingOrders = () => {


 
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
          
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Badge>
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
                        <ShoppingOrderDetailsView/>
                      </Dialog>

                    </TableCell>
                  </TableRow>
              
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders