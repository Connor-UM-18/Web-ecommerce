import { Router } from "express";
import { VentaController } from "../controllers/venta.js";

export const createVentaRouter = ({ ventaModelo }) => {
    const ventaRouter = Router();

    const ventaController = new VentaController({ ventaModelo });
    ventaRouter.get("/date/:mes/:anio", ventaController.getByDate);
    ventaRouter.get("/", ventaController.getAll);
    ventaRouter.get("/:id", ventaController.getById);
    ventaRouter.get("/usuario/:id_usuario", ventaController.getByUserId);
    ventaRouter.get("/estado/:id_estado", ventaController.getByEstado);
    ventaRouter.post("/", ventaController.create);
    ventaRouter.patch("/:id", ventaController.update);
    ventaRouter.delete("/:id", ventaController.delete);
    ventaRouter.post('/venta_ecommerce', ventaController.createVentaEcommerce);
    

    return ventaRouter;
};


