'use client'
import { placeOrder } from '@/actions';
import { Spinner } from '@/components';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const address = useAddressStore(state => state.address);
    const getSummaryInformation = useCartStore((state) =>
        state.getSummaryInformation()
    );
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);
  
    const onPlaceOrder = async () =>{
        setIsPlacingOrder(true);
        const productsInCart = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));
        const result = await placeOrder(productsInCart,address);
        console.log(result);
        if(!result.ok){
            setIsPlacingOrder(false);
            setErrorMessage(result.message);
            return;
        }        
        clearCart();
        router.replace("/orders/"+ result.order?.id);
    };
    console.log(cart);
    if (!loaded) return <Spinner />

  

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega:</h2>
            <div className="mb-10">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                    {getSummaryInformation.itemsInCart} artículos
                </span>

                <span>Subtotal</span>
                <span className="text-right">
                    {currencyFormat(getSummaryInformation.subTotal)}
                </span>

                <span>Impuestos (15%)</span>
                <span className="text-right">
                    {currencyFormat(getSummaryInformation.iva)}
                </span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                    {currencyFormat(getSummaryInformation.total)}
                </span>
            </div>            
            <div className="mt-5 mb-2 w-full">

                <div className="mt-5 mb-2 w-full">
                    <span className="text-xs">
                        Al hacer clic en &quot;Colocar orden&quot;, acepta nuestros <a href="#" className="underline">
                            términos y condiciones </a> y <a href="#" className="underline">
                            política de privacidad
                        </a>.
                    </span>
                </div>
                
                <p className='text-red-600'>{errorMessage}</p>
                <button
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled':isPlacingOrder
                        })
                    }
                    onClick={ onPlaceOrder }
                >
                    Colocar orden
                </button>
            </div>
        </div>
    )
}
