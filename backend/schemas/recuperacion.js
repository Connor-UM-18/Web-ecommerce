export class SchemaRecuperacion {
    static validarCorreo({ correo_electronico }) {
      const correoPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correo_electronico || typeof correo_electronico !== 'string' || !correoPattern.test(correo_electronico)) {
        return { success: false, error: 'Correo electrónico no válido' };
      }
      return { success: true };
    }
  }
  