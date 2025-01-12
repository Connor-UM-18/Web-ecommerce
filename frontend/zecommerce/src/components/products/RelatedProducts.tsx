import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H3 } from "@component/Typography";
import { ProductCard1 } from "@component/product-cards";
import Product from "@models/product.model";

// ============================================================
type Props = { products: Product[] };
// ============================================================

export default function RelatedProducts({ products }: Props) {
  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Productos Relacionados</H3>

      <Grid container spacing={8}>
        {products.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id_producto}>
            <ProductCard1
              hoverEffect
              id_producto={item.id_producto}
              precio={item.precio}
              nombre={item.nombre}
              imagen_url={item.imagen_url}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
