"use client";

import { initialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProduct } from "@/app/(tabs)/products/actions";

interface ProductListProps {
     initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
     const [product, setProduct] = useState(initialProducts);
     const [isLoading, setIsLoading] = useState(false);
     const onLoadMore = async () => {
          setIsLoading(true);
          const newProducts = await getMoreProduct(1);
          setProduct((prev) => [...prev, ...newProducts]);
          setIsLoading(false);
     };
     return (
          <div className="p-5 flex flex-col gap-5">
               {product.map((product) => (
                    <ListProduct key={product.id} {...product} />
               ))}
               <button disabled={isLoading} onClick={onLoadMore}>
                    {isLoading ? "로딩 중" : " 더 보기"}
               </button>
          </div>
     );
}
