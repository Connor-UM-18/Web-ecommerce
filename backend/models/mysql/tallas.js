import e from "cors";
import connection from "../../database.js"
/*
Este contiene al modelo de tallas, el cual se encarga de interactuar con la base de datos.
Se instancia una conexión a la base de datos y se exporta la clase TallasModelo que contiene los métodos
estáticos (pueden ser llamados sin instanciar la clase). Cada método realiza una consulta a la base de datos y retorna el resultado.
*/ 


export class TallasModelo {
    static async getAll() {
        try {
            const [tallas, tableInfo] = await connection.query('SELECT id_talla, nombre_talla FROM Tallas WHERE activo = 1');
            return tallas;
        } catch (error) {
            throw new Error('Error al obtener todas las tallas: ' + error.message);
        }
    }

    static async getById({ id }) {
        try {
            const [talla, tableInfo] = await connection.query(
                'SELECT id_talla, nombre_talla FROM Tallas WHERE id_talla = ? and activo = 1',
                [id]
            );
            return talla;
        } catch (error) {
            throw new Error('Error al obtener la talla por ID: ' + error.message);
        }
    }

    static async create({ nombre_talla }) {

        const query = `
            INSERT INTO Tallas (nombre_talla) 
            VALUES (?)
        `;
        try {
            const existe = await connection.query('SELECT * FROM Tallas WHERE nombre_talla = ?', [nombre_talla]);

            if (existe[0].length > 0) {
                try {
                    const result = await connection.query('UPDATE Tallas SET activo = 1 WHERE nombre_talla = ?', [nombre_talla]);
                    throw new Error('Talla existente, activada correctamente');
                } catch (error) {
                    throw new Error('Error al activar la talla: ' + error.message);
                }
            }
            const [result] = await connection.query(query, [nombre_talla]);
            return result;
        } catch (error) {
            throw new Error('Error al crear la talla: ' + error.message);
        }
    }

    static async update({ id, nombre_talla }) {
        try {
            const [result] = await connection.query(
                'UPDATE Tallas SET nombre_talla = ? WHERE id_talla = ? and activo = 1',
                [nombre_talla, id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la talla: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query(
                'UPDATE Tallas SET activo = 0 WHERE id_talla = ?',
                [id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar la talla: ' + error.message);
        }
    }
}
