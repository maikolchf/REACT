'use client'
import React from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Spinner } from '@/components';
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPaymets, setTransactionId } from '@/actions';


interface Props {
  orderId: string;
  amount: number;
}

export const BtnPaypal = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = Math.round(amount * 100) / 100;



  if (isPending) return <Spinner></Spinner>

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transaccionID = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: rountedAmount.toString(),
            currency_code: 'USD',
          },
        },
      ],
    });

    const { ok, message } = await setTransactionId(transaccionID, orderId);

    if (!ok) {
      throw new Error(message);
    }

    return transaccionID;
  };
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

    const details = await actions.order?.capture();

    if (!details) return;

    const checkPayment = await paypalCheckPaymets(details.id!);

  }

  return (
    <>
      <div className='relative z-0'>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>

    </>
  )
}
