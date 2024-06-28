
import { Order } from '@/interfaces'
import React from 'react'
import clsx from "clsx";

import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    orders: Order[];
}
export const OrdersGrid = ({ orders }: Props) => {
    return (
        <>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                #ID
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Nombre completo
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Estado
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((item) => (
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.id}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.OrderAddress?.firstName} {item.OrderAddress?.lastName}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <IoCardOutline className={clsx(
                                            "", {
                                            "text-green-800": item.isPaid,
                                            "text-red-800": !item.isPaid
                                        }

                                        )} />
                                        <span className={
                                            clsx(
                                                "mx-2",
                                                {
                                                    "text-green-800": item.isPaid,
                                                    "text-red-800": !item.isPaid
                                                }
                                            )
                                        }>{item.isPaid ? "Pagada" : "No pagada"}</span>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${item.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
