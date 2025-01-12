import { Router } from "express";
import { ProductosTallasInventarioController } from "../controllers/productos_tallas_inventario.js";

export const createProductosTallasInventarioRouter = ({ productosTallasInventarioModelo }) => {
    const productosTallasInventarioRouter = Router();
    const productosTallasInventarioController = new ProductosTallasInventarioController({ productosTallasInventarioModelo });

    productosTallasInventarioRouter.get('/', productosTallasInventarioController.getAll);
    productosTallasInventarioRouter.get('/:id', productosTallasInventarioController.getById);
    productosTallasInventarioRouter.get('/nombre/:nombre', productosTallasInventarioController.getByNombre);
    productosTallasInventarioRouter.get('/talla/:nombre_talla', productosTallasInventarioController.getByNombreTalla);
    productosTallasInventarioRouter.get('/precio/:precio', productosTallasInventarioController.getByPrecio);
    productosTallasInventarioRouter.get('/categoria/:id_categoria', productosTallasInventarioController.getByIdCategoria);
    // Nueva ruta para obtener productos por tendencia de ventas
    productosTallasInventarioRouter.get('/tendencia', productosTallasInventarioController.getByTendence);

    return productosTallasInventarioRouter;
}
