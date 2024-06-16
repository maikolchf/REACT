'use server'

import { PayPalOrderStatusResponse, Response } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export const paypalCheckPaymets = async (transactionId: string) => {
    try {
        const { ok, token } = await tokenGenerator();

        if (!ok) return { ok: false, message: 'No se pudo generar el token' };

        const { ok: paymentOK, result } = await verifyPayment(transactionId, token);

        if (!paymentOK) return { ok: false, message: 'No se pudo verificar el pago' };
        
        const { status, purchase_units } = result!;

        const { invoice_id: orderId } = purchase_units[0];

        if (result!.status !== 'COMPLETED') {
            return {
                ok: true,
                message: 'El no pago se a realizado'
            }
        }

        const { ok: updateOK, message } = await updateOrderCompleted(orderId);

        if (!updateOK) return { ok: false, message: message };

        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true,
            message: 'Orden pagada con éxito'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo verificar el pago'
        }
    }
}

const tokenGenerator = async () => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString("base64");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store'
        }).then((r) => r.json());
        return {
            ok: true,
            token: result.access_token
        }
    } catch (error) {
        return {
            ok: false,
            token: ''
        };
    }
}


const verifyPayment = async (transactionId: string, token: string): Promise<Response<PayPalOrderStatusResponse>> => {
    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        `Bearer ${token}`
    );

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const result = await fetch(paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json());

        if (!result) return { ok: false, result: undefined };

        return {
            ok: true,
            result: result
        };

    } catch (error) {
        console.log(error);
        return {
            ok: true,
            result: undefined
        };
    }

}

const updateOrderCompleted = async (orderId: string) => {
    try {
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        });

        return {
            ok: true,
            message: 'Se actualizó la orden a pagada'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar la orden a pagada'
        }
    }
}