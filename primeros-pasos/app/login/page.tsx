

import React from "react"
import { Login } from '@/components/login/Login'

export const metadata = {
    title: 'Administrador',
    description: 'Pagina de inicio de sesión para el administrador'
}


export default function LoginPage() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="px-8 p-8 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-500">Sistema de votos </h1>
                    <form action={Login}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-350 mb-2">Correo electrónico</label>
                            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300" placeholder="correo@email.com"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-350 mb-2">Contraseña</label>
                            <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300" placeholder="contraseña" />
                            <a
                                className="text-xs text-gray-600 hover:text-indigo-500">Olvide la contraseña.
                            </a>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-350">Recordarme?</label>
                            </div>
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                         text-white bg-indigo-600 hover:bg-indigo-700">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div >
        </>
    )
}