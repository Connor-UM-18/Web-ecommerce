import { SchemaInventario } from "../schemas/inventario.js";

export class InventarioController {
    constructor({ inventarioModelo }) {
        this.inventarioModelo = inventarioModelo;
    }

    getAll = async (req, res) => {
        try {
            const inventario = await this.inventarioModelo.getAll();
            res.json(inventario);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Inventario' });
        }
    }

    getById = async (req, res) => {
        const { id_producto, id_talla } = req.params;
        try {
            const inventario = await this.inventarioModelo.getById({ id_producto, id_talla });
            if (inventario.length > 0) return res.json(inventario);
            res.status(404).json({ error: 'Inventario no encontradop' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdTalla = async (req, res) => {
        const { id_talla } = req.params;
        try {
            const inventario = await this.inventarioModelo.getByIdTalla({ id_talla });
            if (inventario.length > 0) {
                return res.json(inventario);
            } else {
                res.status(404).json({ error: 'Inventario no encontrado para la talla especificada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    create = async (req, res) => {
        const { id_producto, id_talla, stock } = req.body;

        const result = SchemaInventario.validarCrearInventario({ id_producto, id_talla, stock });
        if (!result.success) return res.status(400).json(result);

        try {
            const nuevoInventario = await this.inventarioModelo.create({ id_producto, id_talla, stock });
            res.status(201).json(nuevoInventario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateStock = async (req, res) => {
        const { id_producto, id_talla } = req.params;
        const { stock } = req.body;

        const result = SchemaInventario.validarActualizarStock(stock);
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedInventario = await this.inventarioModelo.updateStock({ id_producto, id_talla, stock });
            res.json(updatedInventario);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el stock del inventario: ' + error.message });
        }
    }

    delete = async (req, res) => {
        const { id_producto, id_talla } = req.params;
        try {
            const deletedInventario = await this.inventarioModelo.delete({ id_producto, id_talla });
            res.json(deletedInventario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
