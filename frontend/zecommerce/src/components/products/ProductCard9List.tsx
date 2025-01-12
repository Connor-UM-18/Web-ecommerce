import { Fragment } from "react";

import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Product from "@models/product.model";

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

export default function ProductListView({ products }: Props) {
  console.log('ProductListView------',products);
  
  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9
          id_producto={item.id_producto}
          key={item.id_producto}
          precio={item.precio}
          nombre={item.nombre}
          imagen_url={item.imagen_url}
          categoria={item.nombre_categoria}
        />
      ))}

      <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
        <SemiSpan>Showing 1-9 of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </Fragment>
  );
}
