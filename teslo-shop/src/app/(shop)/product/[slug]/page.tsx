export const revalidate = 604800; // se realiza una revalidacion de la data en + o - 7 dias

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlidesShow,
  ProductSlidesShow,
  StockLabel,
} from "@/components";
import { titleFonts } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

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
        <h1 className={`${titleFonts.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5"> ${product.price} </p>
        <StockLabel slug={product.slug} />

        <AddToCart product={product}/>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
