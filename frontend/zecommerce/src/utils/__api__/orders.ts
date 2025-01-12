import axios from "@lib/axios";
import Order from "@models/order.model";
// CUSTOM DATA MODEL
import { IDParams } from "interfaces";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;
const getOrders = async (data: any): Promise<Order[]> => {
  try {
    const response = await axios.get(`${API_URL}/ventas/usuario/${data}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const getOrdersApart = async (data: any): Promise<Order[]> => {
  try {
    const response = await axios.get(`${API_URL}/pedido-apartado/usuario/${data}`, {
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export const createUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/usuarios`, data);
  return response.data;
};

const getIds = async (): Promise<IDParams[]> => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
};

const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get(`${API_URL}/detalle-venta/detalle/${ id }`);
  console.log(response.data);
  
  // const response = await axios.get("/api/users/order", { params: { id } });
  return response.data;
};

export default { getOrders, getOrder, getIds, getOrdersApart };
