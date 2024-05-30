'use server'

import prisma  from '@/lib/prisma';

export const deleteUserAddress = async(userId: string) => {
    try {
        
        const deletedAddress = await prisma.userAddress.delete({
            where:{
                userId: userId
            }
        });

        return{
            ok: true,
            message: "Direccion del usuario eliminada con exito"
        }

    } catch (error) {
        return{
            ok:false,
            message: "No se pudo eliminar la direccion del usuario."
        }
    }
} 