'use client'

import { Product } from '@/interfaces'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImg, setDisplayImg] = useState(product.images[0])    

    return (
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImg}`}
                    alt={product.title}
                    className='w-full object-cover'
                    width={500}
                    height={500}
                    onMouseEnter={() => setDisplayImg(product.images[1])}
                    onMouseLeave={() => setDisplayImg(product.images[0])}
                />
            </Link>
            <div className='p-4 flex flex-col'>
                <Link
                    className='hover:text-blue-600'
                    href={`/products/${product.slug}`}>
                    {product.title}
                </Link>
            </div>
            <span className='font-bold'>
                ${product.price}
            </span>
        </div>
    )
}
