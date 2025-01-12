import axios from "@lib/axios";
import Product from "@models/product.model";
import Shop from "@models/shop.model";
// CUSTOM DATA MODEL
import { SlugParams } from "interfaces";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;
// get all product slug
export const getSlugs = async (): Promise<SlugParams[]> => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

// get product based on slug
export const getProduct = async (slug: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/productos-stock/${slug}`);
  // const response = await axios.get("/api/products/slug", { params: { slug } });
  return response.data;
};

export const getFrequentlyBought = async (): Promise<Product[]> => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};

export const getRelatedProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/related-products");
  return response.data;
};

export const getAvailableShop = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/product/shops");
  return response.data;
};

// export default { getSlugs, getProduct, getFrequentlyBought, getRelatedProducts, getAvailableShop };
