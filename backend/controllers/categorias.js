/*
Este controlador se encarga de manejar las peticiones de categorías. Por tanto aquí se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactúe con la base de datos para
finalmente retornar una respuesta al cliente.
*/

import { SchemaCategoria } from "../schemas/categorias.js"

export class CategoriasController {

    constructor({ categoriasModelo }) {
        this.categoriasModelo = categoriasModelo;
    }

    getAll = async (req, res) => {
        try {
            const categorias = await this.categoriasModelo.getAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Categorías' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const categoria = await this.categoriasModelo.getById({ id });
            if (categoria) return res.json(categoria);
            res.status(404).json({ error: 'Categoría no encontrada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaCategoria.validarCreateCategoria(req.body);

        if (!result.success)
            return res.status(400).json(result);
        try {
            const newCategoria = await this.categoriasModelo.create({ input: req.body });
            res.status(201).json(newCategoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const result = SchemaCategoria.validarUpdateCategoria(req.body);
            if (!result.success) return res.status(400).json(result);

            const updatedCategoria = await this.categoriasModelo.update({ id, input: req.body });
            res.json(updatedCategoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCategoria = await this.categoriasModelo.delete({ id });
            res.json(deletedCategoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
