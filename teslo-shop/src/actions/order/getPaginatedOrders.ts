'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface Props {
    page?: number;
    take?: number;
}

export const getPaginatedOrdes = async ({ page = 1, take = 12 }: Props) => {

    const session = await auth();

    if (session?.user?.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const orders = await prisma.order.findMany({
        take: take,
        skip: (page - 1) * take,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
    const totalCount = await prisma.order.count();

    const totalpages = Math.ceil(totalCount / take);

    return {
        ok: true,
        message: 'Ordenes obtenidas',
        orders: orders,
        currentPage: page,
        totalPages: totalpages,
    }


}