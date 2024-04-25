import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";


interface Props {
  params: {
    id: Category
  }
}

const generos: Record<Category, string> = {
  'men': 'para hombres',
  'women': 'para mujeres',
  'kid': 'para niños',
  'unisex': 'para todos'
}

export default function CategoryPage({ params }: Props) {

  const { id } = params;

  //if(id === 'kids'){
  //  notFound();
  //}

  const products = initialData.products.filter(x => x.gender === id);

  return (
    <div>
      <Title
        title={`Productos ${generos [id]}`}
        subtitle=""
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
    </div>
  );
}