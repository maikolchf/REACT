import React from 'react'
import { SidebarItem } from './SidebarItem';
import { RiUserFill } from "react-icons/ri";
import { IoIosCall, IoIosStats } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { VscGroupByRefType } from "react-icons/vsc";
import Image from 'next/image';
import logo from '@/app/img/logo2.png'


const itemsBarra = [
    { path: '/estadistica', text: 'Estadísticas', icon: <IoIosStats /> },
    { path: '/usuarios', text: 'Usuarios', icon: <RiUserFill /> },
    { path: '/partidos', text: 'Partidos', icon: <VscGroupByRefType /> },
    { path: '/', text: 'Cerrar sesión', icon: <IoLogOut /> }
]

export const Sidebar = () => {
    return (

        <div className="container flex flex-col mx-auto bg-white">
            <aside className="logo group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start" id="sidenav-main">
                <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
                    <Image className='h-[96px]' src={logo} alt='logo'/>
                </div>
                <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
                <div className="relative pl-3 my-5 overflow-y-scroll">
                    <div className="flex flex-col w-full font-medium">
                        {
                            itemsBarra.map(item => (
                                <SidebarItem key={item.path} {...item} />
                            ))
                        }
                    </div>
                </div>
            </aside>
        </div>

    )
}
