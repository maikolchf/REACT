import { HomeIcon } from "@primer/octicons-react"
import Link from "next/link"
import { ActiveLink } from "../active-link/ActiveLink"

//Items para mostrar en la barra de navegacion
const itemsBarra = [
  { path:'/contact', text:'Contacto'},
  { path:'/about', text:'Acerca de' }
]

export const Navbar = () => {
  return (
    <nav className='flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded'>
        <Link className='flex items-center' href='/'>
          <HomeIcon className='mr-2'></HomeIcon>
          <span className=''>Home</span>
        </Link>
        <div className='flex flex-1'>
          
        </div>
        {
          
          itemsBarra.map(item => (
            <ActiveLink key={item.path} {...item}/>
          ))
        }
    </nav>
  )
}
