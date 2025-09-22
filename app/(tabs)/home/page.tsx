import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import Link from "next/link";

const getCashedProducts = unstable_cache(getProducts, ["home-product"], {
     revalidate: 60,
});

async function getProducts() {
     const products = await db.product.findMany({
          select: {
               title: true,
               price: true,
               created_at: true,
               photo: true,
               id: true,
          },
          orderBy: {
               created_at: "desc",
          },
     });
     return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof getProducts>;

export default async function Products() {
     const initialProducts = await getCashedProducts();
     const revalidate = async () => {
          "use server";
          revalidatePath("/home");
     };
     return (
          <div>
               <ProductList initialProducts={initialProducts} />
               <form action={revalidate}>
                    <button>새로고침</button>
               </form>
               <Link
                    href="/products/add"
                    className="bg-orange-500 flex transition-colors hover:bg-orange-400 items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white"
               >
                    <PlusIcon className="size-10" />
               </Link>
          </div>
     );
}
