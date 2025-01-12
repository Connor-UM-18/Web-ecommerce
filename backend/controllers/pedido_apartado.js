import { SchemaPedidoApartado } from "../schemas/pedido_apartado.js";

export class PedidoApartadoController {
    constructor({ pedidoApartadoModelo }) {
        this.pedidoApartadoModelo = pedidoApartadoModelo;
    }

    getAll = async (req, res) => {
        try {
            const pedidosApartados = await this.pedidoApartadoModelo.getAll();
            res.json(pedidosApartados);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Pedido apartado' });
        }
    }

    getById = async (req, res) => {
        const { id_pedido_apartado } = req.params;
        try {
            const pedidoApartado = await this.pedidoApartadoModelo.getById({ id_pedido_apartado });
            if (pedidoApartado.length > 0) return res.json(pedidoApartado);
            res.status(404).json({ error: 'Pedido apartado no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByUserId = async (req, res) => {
        const { id_usuario } = req.params;
        try {
            const pedidosApartados = await this.pedidoApartadoModelo.getByUserId({ id_usuario });
            if (pedidosApartados.length > 0) return res.json(pedidosApartados);
            res.status(404).json({ error: 'Pedidos apartados no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEstado = async (req, res) => {
        const { estado } = req.params;
        try {
            const pedidosApartados = await this.pedidoApartadoModelo.getByEstado({ estado });
            if (pedidosApartados.length > 0) return res.json(pedidosApartados);
            res.status(404).json({ error: 'Pedidos apartados no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByFecha = async (req, res) => {
        const { fecha_apartado } = req.params;
        try {
            const pedidosApartados = await this.pedidoApartadoModelo.getByFecha({ fecha_apartado });
            if (pedidosApartados.length > 0) return res.json(pedidosApartados);
            res.status(404).json({ error: 'Pedidos apartados no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaPedidoApartado.validarCrearPedidoApartado(req.body);
        if (!result.success) return res.status(400).json(result);

        const { id_usuario, estado } = req.body;

        try {
            const nuevoPedidoApartado = await this.pedidoApartadoModelo.create({ id_usuario, estado });
            res.status(201).json(nuevoPedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateEstado = async (req, res) => {
        const { id_pedido_apartado } = req.params;
        const { estado } = req.body;
        const result = SchemaPedidoApartado.validarEstado({ estado });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedPedidoApartado = await this.pedidoApartadoModelo.updateEstado({ id_pedido_apartado, estado });
            res.json(updatedPedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        const { id_pedido_apartado } = req.params;
        try {
            const deletedPedidoApartado = await this.pedidoApartadoModelo.delete({ id_pedido_apartado });
            res.json(deletedPedidoApartado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
