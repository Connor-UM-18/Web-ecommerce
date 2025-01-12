import { SchemaDetallePedidoApartado } from "../schemas/detalle_pedido_apartado.js";

export class DetallePedidoApartadoController {
    constructor({ detallePedidoApartadoModelo }) {
        this.detallePedidoApartadoModelo = detallePedidoApartadoModelo;
    }

    getAll = async (req, res) => {
        try {
            const detallesPedidosApartados = await this.detallePedidoApartadoModelo.getAll();
            res.json(detallesPedidosApartados);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle de Pedido Apartado' });
        }
    }

    getById = async (req, res) => {
        const { id_detalle_pedido_apartado } = req.params;
        try {
            const detallePedidoApartado = await this.detallePedidoApartadoModelo.getById({ id_detalle_pedido_apartado });
            if (detallePedidoApartado.length > 0) return res.json(detallePedidoApartado);
            res.status(404).json({ error: 'Detalle de Pedido Apartado no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByPedidoApartadoId = async (req, res) => {
        const { id_pedido_apartado } = req.params;
        try {
            const detallesPedidosApartados = await this.detallePedidoApartadoModelo.getByPedidoApartadoId({ id_pedido_apartado });
            if (detallesPedidosApartados.length > 0) return res.json(detallesPedidosApartados);
            res.status(404).json({ error: 'Detalles de Pedido Apartado no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByProductoId = async (req, res) => {
        const { id_producto } = req.params;
        try {
            const detallesPedidosApartados = await this.detallePedidoApartadoModelo.getByProductoId({ id_producto });
            if (detallesPedidosApartados.length > 0) return res.json(detallesPedidosApartados);
            res.status(404).json({ error: 'Detalles de Pedido Apartado no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByTallaId = async (req, res) => {
        const { id_talla } = req.params;
        try {
            const detallesPedidosApartados = await this.detallePedidoApartadoModelo.getByTallaId({ id_talla });
            if (detallesPedidosApartados.length > 0) return res.json(detallesPedidosApartados);
            res.status(404).json({ error: 'Detalles de Pedido Apartado no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaDetallePedidoApartado.validarCrearDetallePedidoApartado(req.body);
        if (!result.success) return res.status(400).json(result);

        const { id_pedido_apartado, id_producto, id_talla, cantidad } = req.body;

        try {
            const nuevoDetallePedidoApartado = await this.detallePedidoApartadoModelo.create({ id_pedido_apartado, id_producto, id_talla, cantidad });
            res.status(201).json(nuevoDetallePedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateCantidad = async (req, res) => {
        const { id_detalle_pedido_apartado } = req.params;
        const { cantidad } = req.body;
        const result = SchemaDetallePedidoApartado.validarCantidad({ cantidad });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedDetallePedidoApartado = await this.detallePedidoApartadoModelo.updateCantidad({ id_detalle_pedido_apartado, cantidad });
            res.json(updatedDetallePedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        const { id_detalle_pedido_apartado } = req.params;
        try {
            const deletedDetallePedidoApartado = await this.detallePedidoApartadoModelo.delete({ id_detalle_pedido_apartado });
            res.json(deletedDetallePedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
