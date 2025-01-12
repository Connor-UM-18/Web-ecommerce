import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.js";

export const createCategoriasRouter = ({ categoriasModelo }) => {
    const categoriasRouter = Router();

    const categoriasController = new CategoriasController({ categoriasModelo });

    categoriasRouter.get('/', categoriasController.getAll);
    categoriasRouter.get('/:id', categoriasController.getById);
    categoriasRouter.post('/', categoriasController.create);
    categoriasRouter.patch('/:id', categoriasController.update);
    categoriasRouter.delete('/:id', categoriasController.delete);

    return categoriasRouter;
}
