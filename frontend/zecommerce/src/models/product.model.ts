interface ProductSize {
  nombre_talla: string;
  stock: number;
}

interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio?: number;
  nombre_categoria: string;
  imagen_url: string;
  fecha_agregada: string;
  tallas: ProductSize[];
}

export default Product;