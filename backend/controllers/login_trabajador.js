import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginTrabajadorController{

    constructor({trabajadorModelo}) {
        this.trabajadorModelo = trabajadorModelo
    }

    login = async (req, res) => {
        try {
            const { usuario, pass } = req.body;
            const user = await this.trabajadorModelo.getByUser({usuario}) 
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(pass, user.pass)
            
            if (!(user && passwordCorrect)) {
                return res.status(401).json({
                    error: 'Correo o contraseña incorrectos'
                })
            }
            
            const usuarioParaToken = {
                id: user.id_trabajador,
                rol: user.rol,
                nombre_completo: user.nombre_completo
            }

            const token = jwt.sign(usuarioParaToken, process.env.SECRET,{
                expiresIn: 60 * 60 * 8
            })//guardar en variable de entorno '123'

            res.status(200).send({ 
                token, 
                rol: user.rol,
                nombre_completo: user.nombre_completo, 
                id_trabajador: user.id_trabajador 
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Usuarios' });
            
        }
    }
}