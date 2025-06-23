import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/redux/shop/shoppingOrderSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PaypalReturnPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // const paymentId = params.get("paymentId");
    const orderID = params.get("token");
    const payerId = params.get("PayerID");
  
    useEffect(() => {

      if (payerId && orderID) {

        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  
        dispatch(capturePayment({ paymentId: orderID, payerId, orderId })).then(
          (data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/shop/payment-success";
            }
          }
        );
      }
    }, [orderID, payerId, dispatch]);
  return (
  <Card>
    <CardHeader>
      <CardTitle>Processing Payment...Please wait!</CardTitle>
    </CardHeader>
  </Card>
  )
}

export default PaypalReturnPage