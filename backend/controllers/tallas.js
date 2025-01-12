/*
Este controlador se encarga de manejar las peticiones de tallas. Por tanto, aquí se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactúe con la base de datos para
finalmente retornar una respuesta al cliente.
*/
import { SchemaTallas } from "../schemas/tallas.js";

export class TallasController {
    constructor({ tallasModelo }) {
        this.tallasModelo = tallasModelo;
    }

    getAll = async (req, res) => {
        try {
            const tallas = await this.tallasModelo.getAll();
            res.json(tallas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Tallas' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const talla = await this.tallasModelo.getById({ id });
            if (talla.length > 0) return res.json(talla);
            res.status(404).json({ error: 'Talla no encontrada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaTallas.validarCreateTalla(req.body);
        if (!result.success) return res.status(400).json(result);

        const { nombre_talla } = req.body;

        try {
            const nuevaTalla = await this.tallasModelo.create({ nombre_talla });
            res.status(201).json(nuevaTalla);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { nombre_talla } = req.body;

        const result = SchemaTallas.validarUpdateTalla({ nombre_talla });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedTalla = await this.tallasModelo.update({ id, nombre_talla });
            res.json(updatedTalla);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la talla: ' + error.message });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedTalla = await this.tallasModelo.delete({ id });
            res.json(deletedTalla);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
