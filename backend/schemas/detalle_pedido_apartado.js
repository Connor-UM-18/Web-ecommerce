export class SchemaDetallePedidoApartado {
    static validarCrearDetallePedidoApartado({ id_pedido_apartado, id_producto, id_talla, cantidad }) {
        if (!id_pedido_apartado || typeof id_pedido_apartado !== 'number') {
            return { success: false, message: 'El id_pedido_apartado es requerido y debe ser un número válido.' };
        }
        if (!id_producto || typeof id_producto !== 'number') {
            return { success: false, message: 'El id_producto es requerido y debe ser un número válido.' };
        }
        if (!id_talla || typeof id_talla !== 'number') {
            return { success: false, message: 'El id_talla es requerido y debe ser un número válido.' };
        }
        if (!cantidad || typeof cantidad !== 'number') {
            return { success: false, message: 'La cantidad es requerida y debe ser un número válido.' };
        }
        return { success: true };
    }

    static validarCantidad({ cantidad }) {
        if (!cantidad || typeof cantidad !== 'number') {
            return { success: false, message: 'La cantidad es requerida y debe ser un número válido.' };
        }
        return { success: true };
    }
}
