export class SchemaInventario {
    static validarCrearInventario(inventario) {
        const { id_producto, id_talla, stock } = inventario;

        if (!id_producto || !id_talla || !stock) {
            return { success: false, error: 'Faltan campos por llenar' };
        }

        if (typeof id_producto !== 'number' || typeof id_talla !== 'number') {
            return { success: false, error: 'Los campos id_producto y id_talla deben ser números' };
        }

        if (typeof stock !== 'number' || stock < 0) {
            return { success: false, error: 'El campo stock debe ser un número entero positivo' };
        }

        return { success: true };
    }

    static validarActualizarStock(stock) {
        if (stock === undefined || stock === null || typeof stock !== 'number' || stock < 0) {
            return { success: false, error: 'El campo stock debe ser un número entero positivo' };
        }

        return { success: true };
    }

}
