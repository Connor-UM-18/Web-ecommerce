"use client";

import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import ProductCard17 from "@component/product-cards/ProductCard17";
import Product from "@models/product.model";

// ========================================================
type Section6Props = { products: Product[] };
// ========================================================

export default function Section6({ products }: Section6Props) {
  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Productos Destacados
      </H2>

      <Grid container spacing={5}>
        {products.map((product, i) => (
          <Grid item md={3} sm={6} xs={12} key={product.id_producto + i}>
            <ProductCard17
              id_producto ={product.id_producto}
              nombre={product.nombre}
              precio={product.precio}
              imagen_url={product.imagen_url}
              nombre_categoria={product.nombre_categoria}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
