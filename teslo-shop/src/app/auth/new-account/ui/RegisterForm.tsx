'use client'

import Link from 'next/link'
import React from 'react'
import { FormInputs } from '@/interfaces'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'


export const RegisterForm = () => {

    const { register, handleSubmit, formState:{errors}} = useForm<FormInputs>()

    const onSubmit = async(data: FormInputs) => {
        const {email,name,password} = data;
        console.log({email,name,password})
    }

    return (
        <form onSubmit={handleSubmit( onSubmit )} className="flex flex-col">
            <label htmlFor="name">Nombre completo</label>
            <input
                className={clsx(
                    'px-5 py-2 border bg-gray-200 rounded mb-5',
                    errors.name && 'border-red-600'
                )}
                type="texto"
                {...register('name', { required: true })}
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        'px-5 py-2 border bg-gray-200 rounded mb-5',
                        errors.email && 'border-red-600'
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}') })}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        'px-5 py-2 border bg-gray-200 rounded mb-5',
                        errors.password && 'border-red-600'
                    )
                }
                type="password"
                {...register('password', {required: true})}
            />

            <button className="btn-primary">Guardar</button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/login" className="btn-secondary text-center">
                Ingresar
            </Link>
        </form>
    )
}
