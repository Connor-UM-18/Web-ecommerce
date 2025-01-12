import connection from "../../database.js";

export class TrabajadorModelo {
    static async getAll() {
        try {
            const [trabajadores, tableInfo] = await connection.query('SELECT * FROM Trabajador');
            return trabajadores;
        } catch (error) {
            throw new Error('Error al obtener todos los trabajadores: ' + error.message);
        }
    }
    
    static async getById({ id }) {
        try {
            const [trabajador, tableInfo] = await connection.query(
                'SELECT * FROM Trabajador WHERE id_trabajador = ?',
                [id]
            );
            return trabajador;
        } catch (error) {
            throw new Error('Error al obtener el trabajador por ID: ' + error.message);
        }
    }

    static async getByUser({ usuario }) {
        try {
            const [trabajador, tableInfo] = await connection.query(
                'SELECT * FROM Trabajador WHERE usuario = ?',
                [usuario]
            );
            if (trabajador.length === 0) 
                return null;
            return trabajador[0];
        } catch (error) {
            throw new Error('Error al obtener el trabajador por usuario: ' + error.message);
        }
    }

    static async getByEmail({ email }) {
        try {
            const [trabajador, tableInfo] = await connection.query(
                'SELECT * FROM Trabajador WHERE correo_electronico = ?',
                [email]
            );
            return trabajador;
        } catch (error) {
            throw new Error('Error al obtener el trabajador por correo electrónico: ' + error.message);
        }
    }

    static async getByRol({ rol }) {
        try {
            const [trabajadores, tableInfo] = await connection.query(
                'SELECT * FROM Trabajador WHERE rol = ?',
                [rol]
            );
            return trabajadores;
        } catch (error) {
            throw new Error('Error al obtener los trabajadores por rol: ' + error.message);
        }
    }

    static async create({ usuario, rol, password, nombre_completo, correo_electronico }) {
        const query = `
            INSERT INTO Trabajador (usuario, rol, pass, nombre_completo, correo_electronico) 
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [usuario, rol, password, nombre_completo, correo_electronico]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el trabajador: ' + error.message);
        }
    }

    static async update({ id, usuario, rol, password, nombre_completo, correo_electronico }) {
        const query = `
            UPDATE Trabajador 
            SET usuario = ?, rol = ?, pass = ?, nombre_completo = ?, correo_electronico = ? 
            WHERE id_trabajador = ?
        `;
        try {
            const [result] = await connection.query(query, [usuario, rol, password, nombre_completo, correo_electronico, id]);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el trabajador: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Trabajador WHERE id_trabajador = ?',
                [id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el trabajador: ' + error.message);
        }
    }
}
