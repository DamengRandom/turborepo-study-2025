'use client';

import { Product } from "@repo/types";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [productsState, setProductsState] = useState([]);

  useEffect(() => {
    // Utitlity function for getting products
    const getProducts = async () => {
      console.log("URL 🥐🥐🥐🥐🥐🥐🥐", process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const products = await res.json();

      setProductsState(products);
    };

    getProducts();
  }, []);

  return <div>
    <h3>Sample Demo ONLY - for NestJS API connection</h3>
    <ul>
      {/* Render products here */}
      {productsState && productsState.map((product: Product) => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  </div>;
};

export default ProductsPage;
