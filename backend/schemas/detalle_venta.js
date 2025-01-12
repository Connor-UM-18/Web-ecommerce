export class SchemaDetalleVenta {
    
    static validarCrearDetalleVenta({ id_venta, id_producto, precio_unitario, cantidad, id_talla }) {
        if (!id_venta || !id_producto || !precio_unitario || !cantidad || !id_talla) {
            return { success: false, error: 'Se requieren todos los campos: id_venta, id_producto, precio_unitario, cantidad e id_talla' };
        }

        if (typeof id_venta !== 'string' || typeof id_producto !== 'number' || typeof precio_unitario !== 'number' || typeof cantidad !== 'number' || typeof id_talla !== 'number') {
            return { success: false, error: 'Los tipos de datos no son válidos para id_venta, id_producto, precio_unitario, cantidad o id_talla' };
        }

        if (precio_unitario <= 0 || cantidad < 0) {
            return { success: false, error: 'El precio unitario debe ser un valor positivo y la cantidad debe ser mayor o igual a 0' };
        }

        return { success: true };
    }
    
    static validarPrecioUnitario({ precio_unitario }) {
        if (typeof precio_unitario !== 'number' || isNaN(precio_unitario)) {
            return { success: false, error: 'El campo precio_unitario debe ser de tipo number' };
        }
    
        if (precio_unitario <= 0) {
            return { success: false, error: 'El precio_unitario debe ser mayor a 0' };
        }
        
        return { success: true };
    }

    static validarCantidad({ cantidad }) {
        if (typeof cantidad !== 'number' || cantidad < 0) {
            return { success: false, error: 'La cantidad debe ser un número positivo o 0' };
        }

        return { success: true };
    }

    static validarUpdateDetalleVenta({ precio_unitario, cantidad, id_talla }) {
        if (precio_unitario !== undefined) {
            const validacionPrecio = this.validarPrecioUnitario({ precio_unitario });
            if (!validacionPrecio.success) {
                return validacionPrecio;
            }
        }

        if (cantidad !== undefined) {
            const validacionCantidad = this.validarCantidad({ cantidad });
            if (!validacionCantidad.success) {
                return validacionCantidad;
            }
        }

        if (id_talla !== undefined && (typeof id_talla !== 'number' || id_talla <= 0)) {
            return { success: false, error: 'El id_talla debe ser un número positivo' };
        }

        return { success: true };
    }
}

