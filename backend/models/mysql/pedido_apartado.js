import connection from "../../database.js"

export class PedidoApartadoModelo {
    static async getAll() {
        try {
            const [pedidos, tableInfo] = await connection.query(
                'SELECT id_pedido_apartado, BIN_TO_UUID(id_usuario) AS id_usuario, fecha_apartado, estado FROM Pedido_apartado'
            );
            return pedidos;
        } catch (error) {
            throw new Error('Error al obtener todos los pedidos apartados: ' + error.message);
        }
    }

    static async getById({ id_pedido_apartado }) {
        try {
            const [pedido, tableInfo] = await connection.query(
                'SELECT id_pedido_apartado, BIN_TO_UUID(id_usuario) AS id_usuario, fecha_apartado, estado FROM Pedido_apartado WHERE id_pedido_apartado = ?',
                [id_pedido_apartado]
            );
            return pedido;
        } catch (error) {
            throw new Error('Error al obtener el pedido apartado por ID: ' + error.message);
        }
    }

    static async getByUserId({ id_usuario }) {
        try {
            const [pedidos, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE id_usuario = UUID_TO_BIN(?) AND id_estado = 1',
                [id_usuario]
            );
            return pedidos;
        } catch (error) {
            throw new Error('Error al obtener pedidos apartados por ID de usuario: ' + error.message);
        }
    }

    static async getByEstado({ estado }) {
        const estadoBool = (estado === 'true' || estado === true);
        const estadoInt = estadoBool ? 1 : 0;
        
        try {
            const [pedidos, tableInfo] = await connection.query(
                'SELECT id_pedido_apartado, BIN_TO_UUID(id_usuario) AS id_usuario, fecha_apartado, estado FROM Pedido_apartado WHERE estado = ?',
                [estadoInt]
            );
            return pedidos;
        } catch (error) {
            throw new Error('Error al obtener pedidos apartados por estado: ' + error.message);
        }
    }

    static async getByFecha({ fecha_apartado }) {
        // Extraemos la parte de la fecha (sin la hora)
        const fechaSinHora = fecha_apartado.split('T')[0]; // Esto tomará solo la parte de la fecha (YYYY-MM-DD)
        
        console.log(fechaSinHora);
        
        try {
            const [pedidos, tableInfo] = await connection.query(
                'SELECT id_pedido_apartado, BIN_TO_UUID(id_usuario) AS id_usuario, fecha_apartado, estado FROM Pedido_apartado WHERE DATE(fecha_apartado) = ?',
                [fechaSinHora]
            );
            return pedidos;
        } catch (error) {
            throw new Error('Error al obtener pedidos apartados por fecha: ' + error.message);
        }
    }

    static async create({ id_usuario, estado }) {
        try {
            const [result] = await connection.query(
                'INSERT INTO Pedido_apartado (id_usuario, estado) VALUES (UUID_TO_BIN(?), ?)',
                [id_usuario, estado]
            );
            return result;
        } catch (error) {
            throw new Error('Error al crear el pedido apartado: ' + error.message);
        }
    }

    static async updateEstado({ id_pedido_apartado, estado }) {
        try {
            const [result] = await connection.query(
                'UPDATE Pedido_apartado SET estado = ? WHERE id_pedido_apartado = ?',
                [estado, id_pedido_apartado]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el estado del pedido apartado: ' + error.message);
        }
    }

    static async delete({ id_pedido_apartado }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Pedido_apartado WHERE id_pedido_apartado = ?',
                [id_pedido_apartado]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el pedido apartado: ' + error.message);
        }
    }
}
