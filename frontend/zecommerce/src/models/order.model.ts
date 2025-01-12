import User from "./user.model";

type Item = {
  product_img: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

interface Order {
  id_venta: string;
  id_usuario: string;
  monto: string;
  estado: number;
  fecha: string;
  isDelivered: boolean;
  items: Item[];
}

export default Order;
