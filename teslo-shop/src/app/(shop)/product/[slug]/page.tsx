import { ProductMobileSlidesShow, ProductSlidesShow, QuatitySelector, SizeSelector } from "@/components";
import { titleFonts } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}


export default function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = initialData.products.find(x => x.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Escritorio */}
        <ProductSlidesShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
        {/* Movil */}
        <ProductMobileSlidesShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFonts.className} antialiased fond-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5"> ${product.price} </p>

        {/* Selector de tallas */}
        <SizeSelector
          selectdSize={product.sizes[0]}
          availableSize={product.sizes}
        />

        {/* Cantidades */}
        <QuatitySelector
          quantity={1}
        />

        <button className="btn-primary my-5">
          Agregar al carrito
        </button>
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}