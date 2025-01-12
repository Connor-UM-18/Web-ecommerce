import connection from "../../database.js";
/*
Este contiene el modelo de categorías, el cual se encarga de interactuar con la base de datos
se instancia una conexión a la base de datos y se exporta la clase CategoriasModelo que contiene los métodos
estáticos (pueden ser llamados sin instanciar la clase) cada método realiza una consulta a la base de datos y retorna el resultado
*/

export class CategoriasModelo {
    static async getAll() {
        try {
            const [categorias, tableInfo] = await connection.query('SELECT * FROM Categorias where activo = 1');
            return categorias;
        } catch (error) {
            throw new Error('Error al obtener todas las categorías: ' + error.message);
        }
    }

    static async getById({ id }) {
        try {
            const [categoria, tableInfo] = await connection.query('SELECT * FROM Categorias WHERE id_categoria = ? and activo= 1', [id]);
            return categoria;
        } catch (error) {
            throw new Error('Error al obtener la categoría por ID: ' + error.message);
        }
    }

    static async create({ input }) {
        try {
            const { nombre_categoria } = input;

            const existe = await connection.query('SELECT * FROM Categorias WHERE nombre_categoria = ?', [nombre_categoria]);
        
            if (existe[0].length > 0) {
                try {
                    const result = await connection.query('UPDATE Categorias SET activo = 1 WHERE nombre_categoria = ?', [nombre_categoria]);
                    throw new Error('Categoría existente, activada correctamente');
                } catch (error) {
                    throw new Error('Error al activar la categoría: ' + error.message);
                }
            }
            const result = await connection.query('INSERT INTO Categorias (nombre_categoria) VALUES (?)', [nombre_categoria]);
            return result;
        } catch (error) {
            throw new Error('Error al crear la categoría: ' + error.message);
        }
    }

    static async update({ id, input }) {
        try {
            const { nombre_categoria } = input;
            
            const result = await connection.query(
                'UPDATE Categorias SET nombre_categoria = ? WHERE id_categoria = ? and activo = 1',
                [nombre_categoria, id]
            );

            return result;
        } catch (error) {
            throw new Error('Error al actualizar la categoría: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const result = await connection.query('UPDATE Categorias SET activo=0 WHERE id_categoria = ?', [id]);
            return result;
        } catch (error) {
            throw new Error('Error al eliminar la categoría: ' + error.message);
        }
    }
}
