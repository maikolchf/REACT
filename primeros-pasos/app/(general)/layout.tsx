import { Sidebar } from "@/components";

export default function GeneralLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container flex flex-col mx-auto bg-white">
        <Sidebar></Sidebar>
        <div className="flex ml-9">
          <div className="w-full max-w-full sm:w-1/4 mx-auto bg-white">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}