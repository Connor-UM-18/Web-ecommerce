import axios from "@lib/axios";
import Ticket from "models/Ticket.model";
// CUSTOM DATA MODEL
import { SlugParams } from "interfaces";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;
export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  const response = await axios.post(`${API_URL}/ventas/venta_ecommerce`, ticket);
  return response.data;
}

export const getTicketList = async (): Promise<Ticket[]> => {
  const response = await axios.get("/api/tickets");
  return response.data;
};

export const getTicket = async (slug: string): Promise<Ticket> => {
  const response = await axios.get("/api/tickets/single", { params: { slug } });
  return response.data;
};

export const getSlugs = async (): Promise<SlugParams[]> => {
  const response = await axios.get("/api/tickets/slugs");
  return response.data;
};

export default { getTicketList, getTicket, getSlugs,createTicket };
