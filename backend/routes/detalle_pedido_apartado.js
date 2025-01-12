import { Router } from 'express';
import { DetallePedidoApartadoController } from '../controllers/detalle_pedido_apartado.js';

export const createDetallePedidoApartadoRouter = ({ detallePedidoApartadoModelo }) => {
    const detallePedidoApartadoRouter = Router();
    const detallePedidoApartadoController = new DetallePedidoApartadoController({ detallePedidoApartadoModelo });

    detallePedidoApartadoRouter.get('/', detallePedidoApartadoController.getAll);
    detallePedidoApartadoRouter.get('/:id_detalle_pedido_apartado', detallePedidoApartadoController.getById);
    detallePedidoApartadoRouter.get('/pedido_apartado/:id_pedido_apartado', detallePedidoApartadoController.getByPedidoApartadoId);
    detallePedidoApartadoRouter.get('/producto/:id_producto', detallePedidoApartadoController.getByProductoId);
    detallePedidoApartadoRouter.get('/talla/:id_talla', detallePedidoApartadoController.getByTallaId);
    detallePedidoApartadoRouter.post('/', detallePedidoApartadoController.create);
    detallePedidoApartadoRouter.patch('/:id_detalle_pedido_apartado/cantidad', detallePedidoApartadoController.updateCantidad);
    detallePedidoApartadoRouter.delete('/:id_detalle_pedido_apartado', detallePedidoApartadoController.delete);

    return detallePedidoApartadoRouter;
};
