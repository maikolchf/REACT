'use client'

import { updateUser } from "@/actions"
import { User } from "@/interfaces"
import { useState } from "react"

interface Props {
    users: User[]
}

export const UsersGrid = ({ users }: Props) => {
    const [error, setError] = useState("")

    const chanceRoleUser = async (id: string, role: string) => {
        const respuesta = await updateUser(id, role);
        if (!respuesta.ok) {
            setError(respuesta.message)
        }
    }

    return (
        <>
            <div className="mb-10">
                <div className="text-red-600">
                    {error}
                </div>
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
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
                                Email
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Rol
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item) => (
                                <tr key={item.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.email}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                        <select
                                            id={item.id}
                                            value={item.role}
                                            onChange={(e) => { chanceRoleUser(item.id, e.target.value) }}
                                            className="text-sm w-full p-2 text-gray-900"
                                        >
                                            <option value="admin">Administrador</option>
                                            <option value="user">Usuario</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}