import { BtnPaypal, Title } from "@/components";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from '@/utils';


interface Props {
  params: {
    id: string;
  };
}

export default async function OrderIdPage({ params }: Props) {
  const { id } = params;


  const result = await getOrderById(id);

  if (!result.ok) return redirect("/")

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !result.order?.isPaid,
                  "bg-green-700": result.order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">{!result.order?.isPaid ? "Pendiente de pago" : "Pagada"}</span>
            </div>

            {/* Items */}
            {result.order?.OrderItem?.map((product) => (
              <div key={product.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.product.title}</p>
                  <p>{currencyFormat(product.price)} x {product.quantity}</p>
                  <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{result.order?.OrderAddress?.firstName} {result.order?.OrderAddress?.lastName}</p>
              <p>{result.order?.OrderAddress?.address}</p>
              <p>{result.order?.OrderAddress?.address2}</p>
              <p>{result.order?.OrderAddress?.postalCode}</p>
              <p>{result.order?.OrderAddress?.city}, {result.order?.OrderAddress?.countryId}</p>
              <p>{result.order?.OrderAddress?.phone}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{
                (result.order?.itemsInOrder ?? 0) < 1 ?
                  `${result.order?.itemsInOrder} artículo` :
                  `${result.order?.itemsInOrder} artículos`
              } </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(result.order?.subTotal ?? 0)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(result.order?.tax ?? 0)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(result.order?.total ?? 0)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <BtnPaypal/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
