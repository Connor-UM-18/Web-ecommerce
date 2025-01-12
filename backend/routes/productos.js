import { Router } from "express"
import { ProductosController } from "../controllers/productos.js"
import { handleFileUploadAndUpdate } from '../uploadHandler.js'; // Importa funciones

export const createProdutosRouter = ({productosModelo}) => {
    const productosRouter = Router()

    const productosController = new ProductosController({productosModelo})
    
    productosRouter.get('/', productosController.getAll)
    productosRouter.get('/:id', productosController.getById)
    productosRouter.post('/', productosController.create)
    //productosRouter.patch('/:id', productosController.update)
    // Nueva ruta PATCH para actualizar productos (incluyendo la imagen)
    productosRouter.patch('/:id', handleFileUploadAndUpdate);

    productosRouter.delete('/:id', productosController.delete)

    return productosRouter;
}

