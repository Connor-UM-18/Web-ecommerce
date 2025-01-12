import { SchemaDetalleVenta } from "../schemas/detalle_venta.js";

export class DetalleVentaController {
    constructor({ detalleVentaModelo }) {
        this.detalleVentaModelo = detalleVentaModelo;
    }

    getAll = async (req, res) => {
        try {
            const detalleVentas = await this.detalleVentaModelo.getAll();
            res.json(detalleVentas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle de Venta' });
        }
    }

    getDetallesVenta = async (req, res) => {
        const { id_venta } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getVentaDetalles(id_venta);
            res.json(detalleVentas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo obtener los detalles de la veta'+ error.message });
        }
    }

    getByIdDetalleVenta = async (req, res) => {
        const { id_detalle_venta } = req.params;
        try {
            const detalleVenta = await this.detalleVentaModelo.getByIdDetalleVenta(id_detalle_venta);
            
            if (detalleVenta.length > 0) return res.json(detalleVenta);
            res.status(404).json({ error: 'Detalle de venta no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdVenta = async (req, res) => {
        const { id_venta } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByIdVenta({ id_venta });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    getByProducto = async (req, res) => {
        const { id_producto } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByProducto({ id_producto });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdTalla = async (req, res) => {
        const { id_talla } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByIdTalla({ id_talla });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaDetalleVenta.validarCrearDetalleVenta(req.body);
        if (!result.success) return res.status(400).json(result);

        const { id_venta, id_producto, precio_unitario, cantidad, id_talla } = req.body;

        try {
            const nuevoDetalleVenta = await this.detalleVentaModelo.create({ id_venta, id_producto, precio_unitario, cantidad, id_talla });
            res.status(201).json(nuevoDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    update = async (req, res) => {
        const { id_detalle_venta } = req.params;

        const result = SchemaDetalleVenta.validarUpdateDetalleVenta(req.body);
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedDetalleVenta = await this.detalleVentaModelo.update({ id_detalle_venta, input: req.body });
            res.json(updatedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        const { id_detalle_venta } = req.params;
        try {
            const deletedDetalleVenta = await this.detalleVentaModelo.delete({ id_detalle_venta });
            res.json(deletedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
