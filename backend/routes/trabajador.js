import { Router } from "express";
import { TrabajadorController } from "../controllers/trabajador.js";

export const createTrabajadorRouter = ({ trabajadorModelo }) => {
    const trabajadorRouter = Router();
    const trabajadorController = new TrabajadorController({ trabajadorModelo });

    trabajadorRouter.get('/', trabajadorController.getAll);
    trabajadorRouter.get('/:id', trabajadorController.getById);
    trabajadorRouter.get('/usuario/:usuario', trabajadorController.getByUser);
    trabajadorRouter.get('/email/:email', trabajadorController.getByEmail);
    trabajadorRouter.get('/rol/:rol', trabajadorController.getByRol);
    trabajadorRouter.post('/', trabajadorController.create);
    trabajadorRouter.patch('/:id', trabajadorController.update);
    trabajadorRouter.delete('/:id', trabajadorController.delete);

    return trabajadorRouter;
};
