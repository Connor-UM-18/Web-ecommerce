export class SchemaVenta {
    static validarCreateVenta(venta) {
        const { id_usuario, monto, id_estado, fecha } = venta;

        if (!id_usuario || !monto || id_estado === undefined || !fecha) {
            return { success: false, error: 'Faltan campos por llenar' };
        }

        if (typeof id_usuario !== 'string') {
            return { success: false, error: 'El campo id_usuario debe ser de tipo string' };
        }

        if (typeof monto !== 'number') {
            return { success: false, error: 'El campo monto debe ser de tipo number' };
        }

        if (monto <= 0) {
            return { success: false, error: 'El monto debe ser mayor a 0' };
        }

        if (typeof id_estado !== 'number' || id_estado < 1 || id_estado > 6) {
            return { success: false, error: 'El campo id_estado debe ser un número entre 1 y 6' };
        }

        const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!fechaRegex.test(fecha)) {
            return { success: false, error: 'Formato de fecha inválido. Debe ser YYYY-MM-DD HH:MM:SS' };
        }

        return { success: true, value: venta };
    }

    static validarUpdateVenta(venta) {
        const { id_usuario, monto, fecha, id_estado } = venta;

        if (id_usuario && typeof id_usuario !== 'string') {
            return { success: false, error: 'El campo id_usuario debe ser de tipo string' };
        }

        if (monto !== undefined && typeof monto !== 'number') {
            return { success: false, error: 'El campo monto debe ser de tipo number' };
        }

        if (monto !== undefined && monto <= 0) {
            return { success: false, error: 'El monto debe ser mayor a 0' };
        }

        if (fecha) {
            const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!fechaRegex.test(fecha)) {
                return { success: false, error: 'Formato de fecha inválido. Debe ser YYYY-MM-DD HH:MM:SS' };
            }
        }

        if (id_estado !== undefined && (typeof id_estado !== 'number' || id_estado < 1 || id_estado > 6)) {
            return { success: false, error: 'El campo id_estado debe ser un número entre 1 y 6' };
        }

        return { success: true, value: venta };
    }
}
