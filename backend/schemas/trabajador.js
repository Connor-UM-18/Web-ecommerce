export class SchemaTrabajador {
    static validarCreateTrabajador({ usuario, rol, password, nombre_completo, correo_electronico }) {
        if (!usuario || !rol || !password || !nombre_completo || !correo_electronico) {
            return { success: false, error: 'Usuario, rol, contraseña, nombre completo y correo electrónico son obligatorios' };
        }

        if (typeof usuario !== 'string' || typeof rol !== 'string' || 
            typeof password !== 'string' || typeof nombre_completo !== 'string' || 
            typeof correo_electronico !== 'string') {
            return { success: false, error: 'Usuario, rol, contraseña, nombre completo y correo electrónico deben ser cadenas de texto' };
        }

        const rolesValidos = ["gerente", "vendedor", "almacenista"];
        if (!rolesValidos.includes(rol.toLowerCase())) {
            return { success: false, error: 'Rol inválido' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo_electronico)) {
            return { success: false, error: 'Correo electrónico inválido' };
        }

        return { success: true };
    }

    static validarUpdateTrabajador({ usuario, rol, password, nombre_completo, correo_electronico }) {
        if (usuario && typeof usuario !== 'string') {
            return { success: false, error: 'El usuario debe ser una cadena de texto' };
        }
        if (rol && typeof rol !== 'string') {
            return { success: false, error: 'El rol debe ser una cadena de texto' };
        }
        if (password && typeof password !== 'string') {
            return { success: false, error: 'La contraseña debe ser una cadena de texto' };
        }
        if (nombre_completo && typeof nombre_completo !== 'string') {
            return { success: false, error: 'El nombre completo debe ser una cadena de texto' };
        }
        if (correo_electronico && typeof correo_electronico !== 'string') {
            return { success: false, error: 'El correo electrónico debe ser una cadena de texto' };
        }

        const rolesValidos = ["gerente", "vendedor", "almacenista"];
        if (rol && !rolesValidos.includes(rol.toLowerCase())) {
            return { success: false, error: 'Rol inválido' };
        }

        if (correo_electronico) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo_electronico)) {
                return { success: false, error: 'Correo electrónico inválido' };
            }
        }

        return { success: true };
    }
}
