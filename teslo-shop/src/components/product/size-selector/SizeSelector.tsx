import { Size } from '@/interfaces'
import React from 'react'
import clsx from 'clsx';


interface Props{
    selectdSize: Size;
    availableSize: Size[];
}

export const SizeSelector = ( { availableSize, selectdSize }: Props ) => {
  return (
    <div className='my-5'>
        <h3 className='font-bold mb-4'>
            Tallas disponibles
        </h3>

        <div className='flex '>
            {
                availableSize.map( size => (

                    <button 
                        key={size}
                        className= {
                            clsx('mx-2 hover:underline text-lg', 
                                {
                                    'underline': size === selectdSize
                                }
                            )                            
                        }>
                        {size}
                    </button>
                ) )
            }
        </div>
    </div>
  )
}
