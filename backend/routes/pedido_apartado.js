import { Router } from 'express';
import { PedidoApartadoController } from '../controllers/pedido_apartado.js';

export const createPedidoApartadoRouter = ({ pedidoApartadoModelo }) => {
    const pedidoApartadoRouter = Router();
    const pedidoApartadoController = new PedidoApartadoController({ pedidoApartadoModelo });

    pedidoApartadoRouter.get('/', pedidoApartadoController.getAll);
    pedidoApartadoRouter.get('/:id_pedido_apartado', pedidoApartadoController.getById);
    pedidoApartadoRouter.get('/usuario/:id_usuario', pedidoApartadoController.getByUserId);
    pedidoApartadoRouter.get('/estado/:estado', pedidoApartadoController.getByEstado);
    pedidoApartadoRouter.get('/fecha/:fecha_apartado', pedidoApartadoController.getByFecha);
    pedidoApartadoRouter.post('/', pedidoApartadoController.create);
    pedidoApartadoRouter.patch('/:id_pedido_apartado/estado', pedidoApartadoController.updateEstado);
    pedidoApartadoRouter.delete('/:id_pedido_apartado', pedidoApartadoController.delete);

    return pedidoApartadoRouter;
};
