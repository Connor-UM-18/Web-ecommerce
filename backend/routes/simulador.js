import { Router } from "express";
import { SimuladorController } from "../controllers/simulador.js";

export const createSimuladorRouter = ({ simuladorModelo }) => {
    const simuladorRouter = Router();
    const simuladorController = new SimuladorController({ simuladorModelo });

    simuladorRouter.patch('/cambiarEstado4', simuladorController.cambiarEstado4);
    simuladorRouter.patch('/cambiarEstado5/:id', simuladorController.cambiarEstado5);

    return simuladorRouter;
}
