import { Router } from "express";
import { EntregasController } from "../controllers/entregas.js";
import { EntregasModelo } from "../models/mysql/entregas.js";

export const createEntregasRouter = () => {
    const entregasRouter = Router();
    const entregasController = new EntregasController({ entregasModelo: EntregasModelo });

    entregasRouter.patch('/:id', entregasController.updateEstado3);

    return entregasRouter;
};
