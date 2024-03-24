'use client'
import { itemSidebar } from "@/interface/ItemSidebar";
import Link from "next/link"
import style from "./ActiveSidebarItem.module.css"
import { usePathname } from "next/navigation"


export const SidebarItem = ({ path, text, icon }: itemSidebar) => {

    const pathname = usePathname();

    return (
        <div className={`${ pathname === path ? 'bg-gray-600 text-zinc-50' : '' } flex items-center`}>            
            <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">            
                <Link href={path} key={path} className={` flex items-center flex-grow text-[1.15rem] hover:text-dark`}>
                    <span className="m-2">{icon}</span>
                    {text}
                </Link>
            </span>
        </div>
    )
}