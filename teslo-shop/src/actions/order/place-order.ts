"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, ProductToOrder } from "@/interfaces";


export const placeOrder = async (
    products: ProductToOrder[],
    address: Address
) => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return {
            ok: false,
            message: "No hay sesión de usuario",
        };
    }
    const productsInStore = await prisma.product.findMany({
        where: {
            id: {
                in: products.map((p) => p.productId),
            },
        },
    });
    const itemsInOrder = products.reduce((count, p) => count + p.quantity, 0);
    const { subTotal, tax, total } = products.reduce(
        (totals, item) => {
            const productQuantity = item.quantity;
            const product = productsInStore.find((product) => product.id === item.productId);

            if (!product) throw new Error(`${item.productId} no existe - 500`);

            const subTotal = product.price * productQuantity;

            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        },
        { subTotal: 0, tax: 0, total: 0 }
    );
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            const updatedProductsPromises = productsInStore.map((product) => {
                const productQuantity = products
                    .filter((p) => p.productId === product.id)
                    .reduce((acc, item) => item.quantity + acc, 0);
                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }
                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity,
                        },
                    },
                });
            });
            const updatedProducts = await Promise.all(updatedProductsPromises);
            updatedProducts.forEach((product) => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`);
                }
            });
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany: {
                            data: products.map((p) => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price:
                                productsInStore.find((product) => product.id === p.productId)
                                        ?.price ?? 0,
                            })),
                        },
                    },
                },
            });
            
            const { country, rememberAddress, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                },
            });
            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            };

        });
        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        };
    }
};