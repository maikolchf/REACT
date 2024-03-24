'use client'
import { itemNav } from "@/interface/ItemSidebar";
import Link from "next/link"
import style from "./ActiveSidebarItem.module.css"
import { usePathname } from "next/navigation"

export const SidebarItem = ({ path, text }: itemNav) => {

    const pathname = usePathname();

    return (
        <div>
            <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <Link href={path} key={path} className={`${style.link} ${ (pathname === path) && style['active-link']}
                 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark`}>{text}</Link>
            </span>
        </div>
    )
}