export class SchemaTallas {
    static validarCreateTalla(talla) {
        const { nombre_talla } = talla;

        if (!nombre_talla) {
            return { success: false, error: 'Falta el campo nombre_talla' };
        }

        if (typeof nombre_talla !== 'string') {
            return { success: false, error: 'El campo nombre_talla debe ser de tipo string' };
        }

        if (nombre_talla.length > 10) {
            return { success: false, error: 'El nombre_talla no puede tener más de 10 caracteres' };
        }

        return { success: true };
    }

    static validarUpdateTalla(talla) {
        const { nombre_talla } = talla;

        if (!nombre_talla) {
            return { success: false, error: 'Falta el campo nombre_talla' };
        }

        if (typeof nombre_talla !== 'string') {
            return { success: false, error: 'El campo nombre_talla debe ser de tipo string' };
        }

        if (nombre_talla.length > 10) {
            return { success: false, error: 'El nombre_talla no puede tener más de 10 caracteres' };
        }

        return { success: true };
    }
}
