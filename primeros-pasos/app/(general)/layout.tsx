import { Navbar } from "@/components";

export default function GeneralLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>      
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <span className="text-7xl"> {children} </span>
      </main>
    </>
  );
}