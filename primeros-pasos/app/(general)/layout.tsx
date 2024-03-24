import { Sidebar } from "@/components";

export default function GeneralLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <>
        <Sidebar></Sidebar>
        <div className="flex flex-wrap ml-9">
            <div className="h-full w-full max-w-full sm:w-1/4 mx-auto bg-white">
                {children}
            </div>
        </div>
      </>
    </>
  );
}