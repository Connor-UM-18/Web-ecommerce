import connection from "../../database.js"

export class InventarioModelo {
    static async getAll() {
        try {
            const [inventario, tableInfo] = await connection.query('SELECT id_producto,Inventario.id_talla,nombre_talla,stock FROM Inventario,Tallas WHERE Inventario.id_talla = Tallas.id_talla ORDER BY id_producto ASC;');
            return inventario;
        } catch (error) {
            throw new Error('Error al obtener todo el inventario: ' + error.message);
        }
    }
    
    static async getById({ id_producto, id_talla }) {
        try {
            const [inventario, tableInfo] = await connection.query(
                'SELECT * FROM Inventario WHERE id_producto = ? AND id_talla = ?',
                [id_producto, id_talla]
            );
            return inventario;
        } catch (error) {
            throw new Error('Error al obtener el inventario por ID: ' + error.message);
        }
    }

    static async getByIdTalla({ id_talla }) {
        try {
            const [inventario, tableInfo] = await connection.query(
                'SELECT * FROM Inventario WHERE id_talla = ?',
                [id_talla]
            );
            return inventario;
        } catch (error) {
            throw new Error('Error al obtener el inventario por ID de Talla: ' + error.message);
        }
    }

    static async create({ id_producto, id_talla, stock }) {
        const query = `
            INSERT INTO Inventario (id_producto, id_talla, stock) 
            VALUES (?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [id_producto, id_talla, stock]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el inventario: ' + error.message);
        }
    }

    static async updateStock({ id_producto, id_talla, stock }) {
        try {
            const [result] = await connection.query(
                'UPDATE Inventario SET stock = ? WHERE id_producto = ? AND id_talla = ?',
                [stock, id_producto, id_talla]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el stock: ' + error.message);
        }
    }

    static async delete({ id_producto, id_talla }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Inventario WHERE id_producto = ? AND id_talla = ?',
                [id_producto, id_talla]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el inventario: ' + error.message);
        }
    }
}
