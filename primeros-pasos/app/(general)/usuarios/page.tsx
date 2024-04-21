import Link from "next/link";
import { FaUserPen, FaUserXmark, FaEye } from "react-icons/fa6";
export const metadata = {
    title: 'About Page',
    description: 'Pagina de about'
}

export default function UsuarioPage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className=" mt-4 sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900"></h1>
                    <p className="mt-2 text-sm text-gray-700">Lista de usuarios registrados en el sistema</p>
                </div>
                <div className=" mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button" className=" mt-4 block rounded-md bg-balck px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Agregar usuario</button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm front-semibold text-black sm:pl-0">Nombre</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-blue-500">Apellidos</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-orange-500">Editar</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ver</th>                                    
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">Michael</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black">Chavarría Flores</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black"><button><FaUserPen/></button></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-black"><button><FaEye/></button></td>                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}