import User from "./user.model";

interface Ticket {
  id_usuario: string;
  total: number;
  fecha: string;
  es_apartado: number;
  productos: Productos[];
}

interface Productos {
  id_producto: string;
  cantidad: number;
  id_talla: number;
}

export default Ticket;
