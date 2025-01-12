import connection from "../../database.js";

export class UsuariosModelo {
    static async getAll() {
        try {
            const [usuarios] = await connection.query('SELECT bin_to_uuid(id_usuario) id_usuario,nombre,apellido,correo_electronico,pass,telefono FROM Usuarios WHERE activo = 1');
            return usuarios;
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios: ' + error.message);
        }
    }

    static async getById({ id_usuario }) {
        try {
            const [usuario] = await connection.query(
                'SELECT bin_to_uuid(id_usuario) id_usuario,nombre,apellido,correo_electronico,pass,telefono FROM Usuarios WHERE id_usuario = UUID_TO_BIN(?) and activo = 1',
                [id_usuario]
            );
            return usuario;
        } catch (error) {
            throw new Error('Error al obtener el usuario por ID: ' + error.message);
        }
    }

    static async getByEmail({ correo_electronico }) {
        try {
            const [usuario] = await connection.query(
                'SELECT bin_to_uuid(id_usuario) id_usuario,nombre,apellido,correo_electronico,pass,telefono,activo FROM Usuarios WHERE correo_electronico = ? and activo = 1',
                [correo_electronico]
            );
            if (usuario.length === 0) 
                return null;
            return usuario[0];

        } catch (error) {
            throw new Error('Error al obtener el usuario por correo electrónico: ' + error.message);
        }
    }

    static async create({ nombre, apellido, correo_electronico, pass, telefono }) {
        try {
            // Verificar si el usuario ya existe y está inactivo
            const [activo] = await connection.query('SELECT id_usuario, activo FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);
            if (activo.length > 0 && activo[0].activo === 0) {
                // Si el usuario existe pero está inactivo, actualiza sus datos y actívalo
                const query = `UPDATE Usuarios SET activo = 1, nombre = ?, apellido = ?, pass = ?, telefono = ? WHERE correo_electronico = ?`;
                await connection.query(query, [nombre, apellido, pass, telefono, correo_electronico]);
                return { id_usuario: activo[0].id_usuario, message: 'Usuario existente, activado correctamente' };
            }
    
            // Insertar nuevo usuario
            const query = `
                INSERT INTO Usuarios (nombre, apellido, correo_electronico, pass, telefono) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await connection.query(query, [nombre, apellido, correo_electronico, pass, telefono]);
    
            // Recuperar el id_usuario recién insertado
            const [nuevoUsuario] = await connection.query('SELECT bin_to_uuid(id_usuario) AS id_usuario FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);
            return nuevoUsuario[0];
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    static async update({ id_usuario, nombre, apellido, correo_electronico, pass, telefono }) {
        const updateFields = [];
        const updateParams = [];

        if (nombre) {
            updateFields.push('nombre = ?');
            updateParams.push(nombre);
        }
        if (apellido) {
            updateFields.push('apellido = ?');
            updateParams.push(apellido);
        }
        if (correo_electronico) {
            updateFields.push('correo_electronico = ?');
            updateParams.push(correo_electronico);
        }
        if (pass) {
            updateFields.push('pass = ?');
            updateParams.push(pass);
        }
        if (telefono) {
            updateFields.push('telefono = ?');
            updateParams.push(telefono);
        }

        updateParams.push(id_usuario); // Pushing id_usuario as the last parameter

        const updateQuery = `
            UPDATE Usuarios 
            SET ${updateFields.join(', ')} 
            WHERE id_usuario = UUID_TO_BIN(?) AND activo = 1
        `;

        try {
            const [result] = await connection.query(updateQuery, updateParams);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    
    static async delete({ id_usuario }) {
        try {
            const [result] = await connection.query(
                'UPDATE Usuarios SET activo=0 WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
    
}

