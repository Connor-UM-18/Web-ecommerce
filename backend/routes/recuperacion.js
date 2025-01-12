import { Router } from "express";
import { RecuperacionController } from "../controllers/recuperacion.js";

export const createRecuperacionRouter = ({ recuperacionModelo }) => {
  const recuperacionRouter = Router();
  const recuperacionController = new RecuperacionController({ recuperacionModelo });

  recuperacionRouter.post('/', recuperacionController.recuperar);

  return recuperacionRouter;
};
