export class SchemaCategoria {
    static validarCreateCategoria(categoria) {
        const { nombre_categoria } = categoria;

        if (!nombre_categoria) {
            return { success: false, error: 'El campo nombre_categoria es obligatorio' };
        }

        if (typeof nombre_categoria !== 'string') {
            return { success: false, error: 'El campo nombre_categoria debe ser de tipo string' };
        }

        return { success: true };
    }

    static validarUpdateCategoria(categoria) {
        const { nombre_categoria } = categoria;

        if (nombre_categoria && typeof nombre_categoria !== 'string') {
            return { success: false, error: 'El campo nombre_categoria debe ser una cadena de texto válida' };
        }

        return { success: true };
    }
}
