import { exec } from 'child_process';
import path from 'path'; // Importa la biblioteca 'path' de Node.js
import { fileURLToPath } from 'url'; // Importa la función para convertir URL a ruta de archivo
import { SchemaRecuperacion } from '../schemas/recuperacion.js';
import { RecuperacionModelo } from '../models/mysql/recuperacion.js'; // Importa el modelo de recuperación
import bcrypt from 'bcrypt';

export class RecuperacionController {
  constructor({ recuperacionModelo }) {
    this.recuperacionModelo = recuperacionModelo || RecuperacionModelo;
  }

  executePythonProgram(correo_electronico, contrasena) {
    return new Promise((resolve, reject) => {
      try {
        // Obtiene la ruta absoluta del directorio actual
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        console.log(__dirname);
        // Construye la ruta absoluta al programa.py
        const programaPath = path.join(__dirname, '../../backend/programs/programa.py');
        console.log(programaPath);
        
        exec(`python3 ${programaPath} ${correo_electronico} ${contrasena}`, (error, stdout, stderr) => {
          if (error) {
            return reject(`Error al ejecutar el programa de Python: ${stderr}`);
          }
          console.log("salimos");
          console.log(stdout);
          resolve(stdout);
        });
      } catch (error) {
        reject(`Error al obtener la ruta del programa de Python: ${error.message}`);
      }
    });
  }

  recuperar = async (req, res) => {
    const result = SchemaRecuperacion.validarCorreo(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    const { correo_electronico } = req.body;

    try {
      const usuario = await this.recuperacionModelo.buscarPorCorreo(correo_electronico);

      if (!usuario) {
        return res.status(404).json({ error: 'Correo electrónico no encontrado' });
      }
      
      // Generar una nueva contraseña temporal
      const nuevaContrasenaTemporal = generarContrasenaTemporal();
      let hashedPassword = null; // Inicializar hashedPassword como null
      
      if (nuevaContrasenaTemporal) {
        hashedPassword = await bcrypt.hash(nuevaContrasenaTemporal, 10);
      }
      //console.log(nuevaContrasenaTemporal)
      //console.log(hashedPassword)
      // Actualizar la contraseña en la base de datos
      await this.recuperacionModelo.actualizarContrasena(correo_electronico, hashedPassword);

      // Ejecutar el programa de Python aquí directamente
      await this.executePythonProgram(correo_electronico, nuevaContrasenaTemporal);

      res.status(200).json({ mensaje: 'Correo de recuperación enviado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

function generarContrasenaTemporal() {
  // Generar una cadena aleatoria para la contraseña temporal (ejemplo)
  const longitud = 10;
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nuevaContrasena = '';
  for (let i = 0; i < longitud; i++) {
    nuevaContrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return nuevaContrasena;
}
