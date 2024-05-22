import { titleFonts } from "@/config/fonts";
import Link from "next/link";
import { RegisterForm } from "./ui/RegisterForm";

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFonts.className} text-4xl mb-5`}>Registrar cuenta</h1>

      <RegisterForm/>
    </main>
  );
}
