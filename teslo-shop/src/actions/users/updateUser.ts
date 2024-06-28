'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
export const updateUser = async (idUsuario: string, role: string) => {

    try {

        const session = await auth();

        if (session?.user?.role !== 'admin') {
            return {
                ok: false,
                message: 'Debe de estar autenticado como admin'
            }
        }

        const newRole = role === 'admin' ? 'admin':'user';

        console.log(newRole, idUsuario);

        await prisma.user.update({
            where: {
                id: idUsuario
            },
            data: {
                role: newRole
            }
        })

        revalidatePath('/admin/users');
        return {
            ok: true,
            message: 'Rol del usuario modificado correctamente'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error al modificar rol del usuario'
        }
    }

}