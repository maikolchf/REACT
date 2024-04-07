import Link from "next/link";
import { FaUserPen, FaUserXmark,FaEye } from "react-icons/fa6";
export const metadata = {
    title: 'About Page',
    description: 'Pagina de about'
}

export default function UsuarioPage() {
    return (
        <>
            <div className='flex'>
                <div className="flex items-center justify-center min-h-[450px]">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">Usuario</th>
                                        <th scope="col" className="py-3 px-6">Modificar</th>
                                        <th scope="col" className="py-3 px-6">Eliminar</th>
                                        <th scope="col" className="py-3 px-6">Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="py-4 px-6">Alex Johnson</td>
                                        <td className="py-4 px-6"><Link href={"#"}><FaUserPen /></Link></td>
                                        <td className="py-4 px-6"><Link href={"#"}><FaUserXmark /></Link></td>
                                        <td className="py-4 px-6"><Link href={"#"}><FaEye /></Link></td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}