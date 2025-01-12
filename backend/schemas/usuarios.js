export class SchemaUsuarios {
    static validarCrearUsuario({ nombre, apellido, correo_electronico, telefono, pass }) {
        if (!nombre || !apellido || !correo_electronico || !telefono || !pass) {
            return { success: false, error: 'Nombre, apellido, correo electrónico, teléfono y contraseña son obligatorios' };
        }

        if (typeof nombre !== 'string' || typeof apellido !== 'string' ||
            typeof correo_electronico !== 'string' || typeof telefono !== 'string' || typeof pass !== 'string') {
            return { success: false, error: 'Nombre, apellido, correo electrónico, teléfono y contraseña deben ser cadenas de texto' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo_electronico)) {
            return { success: false, error: 'Correo electrónico inválido' };
        }

        const telefonoRegex = /^\d{10}$/;
        if (!telefonoRegex.test(telefono)) {
            return { success: false, error: 'Teléfono inválido' };
        }

        // Validación opcional: longitud mínima de la contraseña, caracteres especiales, etc.

        return { success: true };
    }

    static validarActualizarUsuario({ nombre, apellido, correo_electronico, telefono, pass }) {
        // Validación para la actualización de usuario
        if (nombre && typeof nombre !== 'string') {
            return { success: false, error: 'El nombre debe ser una cadena de texto' };
        }
        if (apellido && typeof apellido !== 'string') {
            return { success: false, error: 'El apellido debe ser una cadena de texto' };
        }
        if (correo_electronico && typeof correo_electronico !== 'string') {
            return { success: false, error: 'El correo electrónico debe ser una cadena de texto' };
        }
        if (telefono && typeof telefono !== 'string') {
            return { success: false, error: 'El teléfono debe ser una cadena de texto' };
        }
        if (pass && typeof pass !== 'string') {
            return { success: false, error: 'La contraseña debe ser una cadena de texto' };
        }

        // Otras validaciones necesarias...

        return { success: true };
    }
}
