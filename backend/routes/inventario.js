import { Router } from "express";
import { InventarioController } from "../controllers/inventario.js";

export const createInventarioRouter = ({ inventarioModelo }) => {
    const inventarioRouter = Router();
    const inventarioController = new InventarioController({ inventarioModelo });

    inventarioRouter.get('/', inventarioController.getAll);
    inventarioRouter.get('/talla/:id_talla', inventarioController.getByIdTalla);
    inventarioRouter.get('/:id_producto/:id_talla', inventarioController.getById);
    inventarioRouter.post('/', inventarioController.create);
    inventarioRouter.patch('/:id_producto/:id_talla/stock', inventarioController.updateStock);
    inventarioRouter.delete('/:id_producto/:id_talla', inventarioController.delete);

    return inventarioRouter;
};

    
