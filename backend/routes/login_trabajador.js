import { Router } from "express";
import { LoginTrabajadorController } from "../controllers/login_trabajador.js";

export const createLoginTrabajadorRouter = ({trabajadorModelo}) => {
    const loginTrabajadorRouter = Router();

    const loginUsuarioController = new LoginTrabajadorController({trabajadorModelo});

    loginTrabajadorRouter.post('/', loginUsuarioController.login);

    return loginTrabajadorRouter;
}