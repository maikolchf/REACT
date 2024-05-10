import { getPaginationProductWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";


export default async function Home() {

  const { products } = await getPaginationProductWithImages();
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

    </>
  );
}
