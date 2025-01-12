import connection from "../../database.js";

export class SimuladorModelo {
    static async cambiarEstado({ id_estado, descripcion }) {
        try {
            await connection.beginTransaction();
            
            // Actualizar los estados en la tabla ventas
            await connection.query('UPDATE Ventas SET id_estado = ? WHERE id_estado = 1', [id_estado]);

            await connection.commit();
            return { success: true, message: 'Estados actualizados correctamente' };
        } catch (error) {
            await connection.rollback();
            throw new Error('Error al actualizar los estados: ' + error.message);
        }
    }
}
