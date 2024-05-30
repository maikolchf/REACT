'use server'

import type { Address } from '@/interfaces'
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {

    try {
        console.log({address,userId})
        const saveAddress = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            address: saveAddress
        }

    } catch (error) {
        return {
            ok: false,
            message: "No se pudo guardar la dirección."
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: { userId }
          });

        const addressSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
        };


       if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressSave
            });
            return newAddress
        }

        const updateAddress = await prisma.userAddress.update({
            where: {
                userId: userId
            },
            data: addressSave
        });

        return updateAddress

    } catch (error) {
        console.log(error)
        throw new Error("No se pudo guardar la informacion");
    }
}