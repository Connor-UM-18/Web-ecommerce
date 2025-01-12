import { Router } from "express";
import { DetalleVentaController } from "../controllers/detalle_venta.js";

export const createDetalleVentaRouter = ({ detalleVentaModelo }) => {
    const detalleVentaRouter = Router();
    const detalleVentaController = new DetalleVentaController({ detalleVentaModelo });

    detalleVentaRouter.get('/', detalleVentaController.getAll);
    detalleVentaRouter.get('/:id_detalle_venta', detalleVentaController.getByIdDetalleVenta);
    detalleVentaRouter.get('/venta/:id_venta', detalleVentaController.getByIdVenta);
    detalleVentaRouter.get('/producto/:id_producto', detalleVentaController.getByProducto);
    detalleVentaRouter.get('/talla/:id_talla', detalleVentaController.getByIdTalla);
    detalleVentaRouter.post('/', detalleVentaController.create);
    detalleVentaRouter.patch('/:id_detalle_venta', detalleVentaController.update);
    detalleVentaRouter.delete('/:id_detalle_venta', detalleVentaController.delete);
    detalleVentaRouter.get('/detalle/:id_venta', detalleVentaController.getDetallesVenta);

    return detalleVentaRouter;
};
