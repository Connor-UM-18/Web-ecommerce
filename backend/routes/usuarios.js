import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.js';

export const createUsuariosRouter = ({ usuariosModelo }) => {
    const usuariosRouter = Router();
    const usuariosController = new UsuariosController({ usuariosModelo });

    usuariosRouter.get('/', usuariosController.getAll);
    usuariosRouter.get('/:id', usuariosController.getById);
    usuariosRouter.get('/email/:correo_electronico', usuariosController.getByEmail);
    usuariosRouter.post('/', usuariosController.create);
    
    // Ruta para actualizar cualquier campo del usuario
    usuariosRouter.patch('/:id', usuariosController.update);

    // ruta de actualización para campos específicos
    /*
    usuariosRouter.patch('/:id/nombre', usuariosController.update);
    usuariosRouter.patch('/:id/apellido', usuariosController.update);
    usuariosRouter.patch('/:id/email', usuariosController.update);
    usuariosRouter.patch('/:id/telefono', usuariosController.update);
    */

    usuariosRouter.delete('/:id', usuariosController.delete);

    return usuariosRouter;
};
