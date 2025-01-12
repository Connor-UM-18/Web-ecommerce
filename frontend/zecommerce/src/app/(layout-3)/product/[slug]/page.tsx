"use client";
import { Fragment, useEffect, useState } from "react";
import { getProduct } from "@utils/__api__/products";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import api from "@utils/__api__/fashion-3";
import { useAppContext } from "@context/app-context";

// ==============================================================
interface Props {
  params: { slug: string };
}
// ==============================================================

export default function ProductDetails({ params }: Props) {
  const { state, dispatch } = useAppContext();
  const { products } = state;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await getProduct(params.slug as string);
        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [params.slug]);

  // Obtener todos los productos si el contexto está vacío
  useEffect(() => {
    const fetchProductsIfEmpty = async () => {
      if (!products || products.length === 0) {
        try {
          const fetchedProducts = await api.getProducts();
          // Actualizar el contexto con los productos obtenidos
          dispatch({ type: "SET_PRODUCTS", payload: fetchedProducts });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else if (product) {
        // Calcular productos relacionados solo si ya tenemos los productos en el contexto y el producto actual
        const related = products.filter(p => p.nombre_categoria === product.nombre_categoria && p.id_producto !== product.id_producto);
        setRelatedProducts(related);
      }
    };

    fetchProductsIfEmpty();
  }, [products, dispatch, product]);

  // Si el producto aún no está cargado, mostrar un mensaje de carga
  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <Fragment>
      <ProductIntro
        id_producto={product.id_producto}
        precio={product.precio}
        nombre={product.nombre}
        imagen_url={product.imagen_url}
        tallas={product.tallas}
      />

      <ProductView
        description_product={product.descripcion}
        relatedProducts={relatedProducts}
      />
    </Fragment>
  );
}
