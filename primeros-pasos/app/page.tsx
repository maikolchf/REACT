import Link from "next/link";

export const metadata = {
  title: 'Home Page',
  description: 'Pagina de inicio'
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="text-7xl"> Home page</span>
      <span className="">
        <Link href={'/login'}>Inicio de sesión administrador</Link>
      </span>
    </main>
  );
}
