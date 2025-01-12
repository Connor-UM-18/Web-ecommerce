import { exec } from 'child_process';

export const executePythonProgram = (correo_electronico, contrasena) => {
  return new Promise((resolve, reject) => {
    console.log("aqui 5")
    exec(`python3 backend/programs/programa.py ${correo_electronico} ${contrasena}`, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error al ejecutar el programa de Python: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

