import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import ProductCard17 from "@component/product-cards/ProductCard17";
import Product from "@models/product.model";

// ======================================================================
type Section3Props = { products: Product[] };
// ======================================================================

export default function Section3({ products }: Section3Props) {
  console.log('Section3Props',products);
  
  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Productos Populares
      </H2>

      <Grid container spacing={5}>
        {products.map((product) => (
          <Grid item md={3} sm={6} xs={12} key={product.id_producto}>
            <ProductCard17
              nombre={product.nombre}
              precio={product.precio}
              nombre_categoria={product.nombre_categoria}
              imagen_url={product.imagen_url}
              id_producto={product.id_producto}
              fecha_agregada={product.fecha_agregada}
              tallas={product.tallas}
              descripcion={product.descripcion}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
