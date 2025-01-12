import connection from "../../database.js";

export class EntregasModelo {
    static async getById({ id }) {
        try {
            const [venta] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return venta;
        } catch (error) {
            throw new Error('Error al obtener la venta por ID: ' + error.message);
        }
    }

    static async update({ id, fecha, id_estado }) {
        try {
            const query = 'UPDATE Ventas SET fecha = ?, id_estado = ? WHERE id_venta = UUID_TO_BIN(?)';
            const [result] = await connection.query(query, [fecha, id_estado, id]);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la venta: ' + error.message);
        }
    }
}
