import connection from "../../database.js";

export class RecuperacionModelo {
  static async buscarPorCorreo(correo_electronico) {
    try {
      const [resultado] = await connection.query(
        `SELECT pass as contrasena FROM Trabajador WHERE correo_electronico = ? 
         UNION 
         SELECT pass as contrasena FROM Usuarios WHERE correo_electronico = ?`, 
         [correo_electronico, correo_electronico]
      );

      return resultado.length > 0 ? resultado[0] : null;
    } catch (error) {
      throw new Error('Error al buscar el correo electrónico: ' + error.message);
    }
  }

  static async actualizarContrasena(correo_electronico, nuevaContrasena) {
    try {
      await connection.query(
        `UPDATE Trabajador SET pass = ? WHERE correo_electronico = ?`, 
        [nuevaContrasena, correo_electronico]
      );

      await connection.query(
        `UPDATE Usuarios SET pass = ? WHERE correo_electronico = ?`, 
        [nuevaContrasena, correo_electronico]
      );
    } catch (error) {
      throw new Error('Error al actualizar la contraseña: ' + error.message);
    }
  }
}
