import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getProducts() {
     const products = await db.product.findMany({
          select: {
               title: true,
               price: true,
               created_at: true,
               photo: true,
               id: true,
          },
          take: 1,
          orderBy: {
               created_at: "desc",
          },
     });
     return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof getProducts>;

export default async function Products() {
     const initialProducts = await getProducts();
     return (
          <div>
               <ProductList initialProducts={initialProducts} />
               <Link
                    href="/products/add"
                    className="bg-orange-500 flex transition-colors hover:bg-orange-400 items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white"
               >
                    <PlusIcon className="size-10" />
               </Link>
          </div>
     );
}
