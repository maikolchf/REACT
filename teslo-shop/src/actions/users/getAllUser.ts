'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface Props {
    page?: number;
    take?: number;
}

export const getAllUser = async ({ page = 1, take = 12 }: Props) => {

    try {

        const session = await auth();

        if (session?.user?.role !== 'admin') {
            return {
                ok: false,
                message: 'Debe de estar autenticado'
            }
        }

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        const users = await prisma.user.findMany({
            take: take,
            skip: (page - 1) * take            
        });

        if (!users) {
            return {
                ok: false,
                message: 'No se encontraron usuarios'
            }
        }    

        const {  } = users;
        
        const totalCount = await prisma.user.count();
        const totalpages = Math.ceil(totalCount / take);    

        return {
            ok: true,
            users: users,
            message: 'Usuarios obtenidos correctamente',
            currentPage: page,
            totalPages: totalpages,
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al obtener los usuarios'
        }
    }
}