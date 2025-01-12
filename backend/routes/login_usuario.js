import { Router } from "express";
import { LoginUsuarioController } from "../controllers/login_usuario.js";

export const createLoginUsuarioRouter = ({usuariosModelo}) => {
    const loginUsuarioRouter = Router();

    const loginUsuarioController = new LoginUsuarioController({usuariosModelo});

    loginUsuarioRouter.post('/', loginUsuarioController.login);

    return loginUsuarioRouter;
}