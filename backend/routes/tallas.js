import { Router } from 'express';
import { TallasController } from '../controllers/tallas.js';

export const createTallasRouter = ({tallasModelo}) => {
    const tallasRouter = Router();

    const tallasController = new TallasController({tallasModelo});
    
    tallasRouter.get('/', tallasController.getAll);
    tallasRouter.get('/:id', tallasController.getById);
    tallasRouter.post('/', tallasController.create);
    tallasRouter.patch('/:id', tallasController.update);
    tallasRouter.delete('/:id', tallasController.delete);

    return tallasRouter;
};
