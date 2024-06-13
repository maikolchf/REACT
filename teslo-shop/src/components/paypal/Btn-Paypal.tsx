'use client'
import React from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Spinner } from '@/components';
import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js'

interface Props {
  orderId: string;
  amount: number;
}

export const BtnPaypal = ({ orderId, amount } : Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = Math.round(amount * 100) / 100;



  if (isPending) return <Spinner></Spinner>

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    
    const transaccionID = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: rountedAmount.toString(),
            currency_code: 'USD',
          },
        },
      ],
    });

    console.log(transaccionID);
    return transaccionID;
  };

  return (
    <>        
        <PayPalButtons
          createOrder={ createOrder}
          //onApprove={}
        />
    </>
  )
}
