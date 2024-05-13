export const revalidate = 60; // para ver cuanto va estar revalidando la informacion 

import { getPaginationProductWithImages } from "@/actions";
import { PaginationPage, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
  params: {
    gender: string
  },
  searchParams:{
    page?: string
  }
}

const generos: Record<string, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': 'para todos'
}

export default  async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;


  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } = await getPaginationProductWithImages({page, gender: gender as Gender});

  if(products.length === 0) 
    redirect('/');

  return (
    <div>
      <Title
        title={`Productos ${generos [gender]}`}
        subtitle=""
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />

      <PaginationPage
        totalPages={totalPages}
      />
    </div>
  );
}