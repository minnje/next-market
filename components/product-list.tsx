"use client";

import { initialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProduct } from "@/app/(tabs)/products/actions";

interface ProductListProps {
     initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
     const [product, setProduct] = useState(initialProducts);
     const [isLoading, setIsLoading] = useState(false);
     const [page, setPage] = useState(0);
     const [isLastPage, setIsLastPage] = useState(false);
     const trigger = useRef<HTMLSpanElement>(null);
     useEffect(() => {
          const observer = new IntersectionObserver(
               async (
                    entries: IntersectionObserverEntry[],
                    observer: IntersectionObserver
               ) => {
                    const element = entries[0];
                    if (element.isIntersecting && trigger.current) {
                         observer.unobserve(trigger.current);
                         setIsLoading(true);
                         const newProducts = await getMoreProduct(page + 1);
                         if (newProducts.length !== 0) {
                              setPage((prev) => prev + 1);
                              setProduct((prev) => [...prev, ...newProducts]);
                              setIsLoading(false);
                         } else {
                              setIsLastPage(true);
                         }
                    }
               },
               { threshold: 1.0 }
          );
          if (trigger.current) {
               observer.observe(trigger.current);
          }
          return () => {
               observer.disconnect();
          };
     }, [page]);
     return (
          <div className="p-5 flex flex-col gap-5">
               {product.map((product) => (
                    <ListProduct key={product.id} {...product} />
               ))}
               {/* {!isLastPage ? (
                    <span
                         className=" text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
                         ref={trigger}
                    >
                         {isLoading ? "로딩 중" : " 더 보기"}
                    </span>
               ) : null} */}
          </div>
     );
}
