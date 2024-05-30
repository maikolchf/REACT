'use client'
import { deleteUserAddress, setUserAddress, getUserAddress } from '@/actions'
import { Country, Address } from '@/interfaces'
import { useAddressStore } from '@/store'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
    countries: Country[],
    userAddress?: Partial<Address> 
}

export const AddressForm = ({ countries, userAddress = {} }: Props) => {

    const { data: session } = useSession({
        required: true
    });

    const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<Address>({
        defaultValues: {
            ...(userAddress as any),
            rememberAddress: false,
          }
    });
    const setAddress = useAddressStore(state => state.setAddress);
    const address = useAddressStore(state => state.address);

    useEffect(() => {
        if (address.firstName) {
            reset(address)
        }
    }, [address, reset])

    const onSumit = (data: Address) => {
        setAddress(data);

        if (data.rememberAddress) {
            setUserAddress(data, session?.user?.id ?? "");
        } else {
            deleteUserAddress(session?.user?.id ?? "")
        }

    }

    return (
        <form onSubmit={handleSubmit(onSumit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.firstName && "border-red-600"
                    )}
                    {...register('firstName', { required: true })} />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.lastName && "border-red-600"
                    )}
                    {...register('lastName', { required: true })} />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.address2 && "border-red-600"
                    )}
                    {...register('address', { required: true })} />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.address2 && "border-red-600"
                    )}
                    {...register('address2')} />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.postalCode && "border-red-600"
                    )}
                    {...register('postalCode', { required: true })} />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.city && "border-red-600"
                    )}
                    {...register('city', { required: true })} />
            </div>

            <div className="flex flex-col mb-2">
                <span>País</span>
                <select
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.country && "border-red-600"
                    )}
                    {...register('country', { required: true })}>
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map(country => (
                            <option id={country.id} key={country.id} value={country.id}>{country.name}</option>
                        ))
                    }

                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input type="text"
                    className={clsx(
                        "p-2 border rounded-md bg-gray-200",
                        errors.phone && "border-red-600"
                    )}
                    {...register('phone', { required: true })} />
            </div>

            <div className="flex flex-col mb-2 sm:mt-11">

                <div className="inline-flex items-center mb-10">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                    >
                        <input
                            type="checkbox"
                            className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 
                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 
                            before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            id="checkbox"
                            //checked
                            {...register('rememberAddress')}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>¿Recordar dirección?</span>
                </div>
                <button
                    disabled={!isValid}
                    type='submit'
                    className={
                        clsx({
                            'btn-primary': isValid,
                            'btn-disabled': !isValid

                        })
                    }
                >
                    Siguiente
                </button>
            </div>
        </form>
    )
}
