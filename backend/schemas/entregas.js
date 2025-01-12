export class SchemaEntrega {
    static validarFecha({ fecha }) {
        if (!fecha) {
            return { success: false, error: 'La fecha es requerida' };
        }

        // Validar formato de fecha (YYYY-MM-DD HH:mm:ss)
        const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        if (!datePattern.test(fecha)) {
            return { success: false, error: 'El formato de fecha no es válido' };
        }

        return { success: true };
    }
}

