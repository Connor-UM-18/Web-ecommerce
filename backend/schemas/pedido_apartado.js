export class SchemaPedidoApartado {
    static validarCrearPedidoApartado({ id_usuario, estado }) {
        if (!id_usuario || typeof id_usuario !== 'string') {
            return { success: false, message: 'El id_usuario es requerido y debe ser una cadena de texto válida.' };
        }
        if (typeof estado !== 'boolean') {
            return { success: false, message: 'El estado es requerido y debe ser un valor booleano.' };
        }
        return { success: true };
    }

    static validarEstado({ estado }) {
        if (typeof estado !== 'boolean') {
            return { success: false, message: 'El estado es requerido y debe ser un valor booleano.' };
        }
        return { success: true };
    }
}
