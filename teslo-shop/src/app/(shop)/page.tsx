export const revalidate = 60; // para ver cuanto va estar revalidando la informacion 
import { getPaginationProductWithImages } from "@/actions";
import { ProductGrid, Title, PaginationPage } from '@/components';
import { redirect } from "next/navigation";


interface Props{
  searchParams:{
    page?: string
  }
}

export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } = await getPaginationProductWithImages({page});

  if(products.length === 0) 
    redirect('/');

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={products}
      />
      
      <PaginationPage
        totalPages={totalPages}
      />
    </>
  );
}
