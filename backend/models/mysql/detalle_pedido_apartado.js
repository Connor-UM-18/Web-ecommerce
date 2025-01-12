import connection from "../../database.js"

export class DetallePedidoApartadoModelo {
    static async getAll() {
        try {
            const [detalles, tableInfo] = await connection.query(
                'SELECT id_detalle_pedido_apartado, id_pedido_apartado, id_producto, id_talla, cantidad FROM Detalle_pedido_apartado'
            );
            return detalles;
        } catch (error) {
            throw new Error('Error al obtener todos los detalles de pedidos apartados: ' + error.message);
        }
    }

    static async getById({ id_detalle_pedido_apartado }) {
        try {
            const [detalle, tableInfo] = await connection.query(
                'SELECT id_detalle_pedido_apartado, id_pedido_apartado, id_producto, id_talla, cantidad FROM Detalle_pedido_apartado WHERE id_detalle_pedido_apartado = ?',
                [id_detalle_pedido_apartado]
            );
            return detalle;
        } catch (error) {
            throw new Error('Error al obtener el detalle del pedido apartado por ID: ' + error.message);
        }
    }

    static async getByPedidoApartadoId({ id_pedido_apartado }) {
        try {
            const [detalles, tableInfo] = await connection.query(
                'SELECT id_detalle_pedido_apartado, id_pedido_apartado, id_producto, id_talla, cantidad FROM Detalle_pedido_apartado WHERE id_pedido_apartado = ?',
                [id_pedido_apartado]
            );
            return detalles;
        } catch (error) {
            throw new Error('Error al obtener los detalles del pedido apartado por ID de pedido apartado: ' + error.message);
        }
    }

    static async getByProductoId({ id_producto }) {
        try {
            const [detalles, tableInfo] = await connection.query(
                'SELECT id_detalle_pedido_apartado, id_pedido_apartado, id_producto, id_talla, cantidad FROM Detalle_pedido_apartado WHERE id_producto = ?',
                [id_producto]
            );
            return detalles;
        } catch (error) {
            throw new Error('Error al obtener los detalles del pedido apartado por ID de producto: ' + error.message);
        }
    }

    static async getByTallaId({ id_talla }) {
        try {
            const [detalles, tableInfo] = await connection.query(
                'SELECT id_detalle_pedido_apartado, id_pedido_apartado, id_producto, id_talla, cantidad FROM Detalle_pedido_apartado WHERE id_talla = ?',
                [id_talla]
            );
            return detalles;
        } catch (error) {
            throw new Error('Error al obtener los detalles del pedido apartado por ID de talla: ' + error.message);
        }
    }

    static async create({ id_pedido_apartado, id_producto, id_talla, cantidad }) {
        try {
            const [result] = await connection.query(
                'INSERT INTO Detalle_pedido_apartado (id_pedido_apartado, id_producto, id_talla, cantidad) VALUES (?, ?, ?, ?)',
                [id_pedido_apartado, id_producto, id_talla, cantidad]
            );
            return result;
        } catch (error) {
            throw new Error('Error al crear el detalle del pedido apartado: ' + error.message);
        }
    }

    static async updateCantidad({ id_detalle_pedido_apartado, cantidad }) {
        try {
            const [result] = await connection.query(
                'UPDATE Detalle_pedido_apartado SET cantidad = ? WHERE id_detalle_pedido_apartado = ?',
                [cantidad, id_detalle_pedido_apartado]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la cantidad del detalle del pedido apartado: ' + error.message);
        }
    }

    static async delete({ id_detalle_pedido_apartado }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Detalle_pedido_apartado WHERE id_detalle_pedido_apartado = ?',
                [id_detalle_pedido_apartado]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el detalle del pedido apartado: ' + error.message);
        }
    }
}
