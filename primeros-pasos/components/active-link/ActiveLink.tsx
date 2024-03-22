'use client'
import { itemNav } from "@/interface/ItemNav"
import Link from "next/link"
import  style  from "./ActiveLink.module.css"
import { usePathname } from "next/navigation"

export const ActiveLink = ({path, text}: itemNav) => {

const pathname = usePathname();

  return (
    <Link key={ path } href={ path } className={ `${style.link} ${ (pathname === path) && style['active-link']}`}>{ text }</Link>
  )
}
