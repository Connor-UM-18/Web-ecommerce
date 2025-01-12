import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginUsuarioController{

    constructor({usuariosModelo}) {
        this.usuariosModelo = usuariosModelo
    }

    login = async (req, res) => {
        try {
            const { correo_electronico, pass } = req.body;
            const usuario = await this.usuariosModelo.getByEmail({correo_electronico}) 
            const passwordCorrect = usuario === null
                ? false
                : await bcrypt.compare(pass, usuario.pass)
            
            if (!(usuario && passwordCorrect)) {
                return res.status(401).json({
                    error: 'Correo o contraseña incorrectos'
                })
            }
            
            const usuarioParaToken = {
                id: usuario.id,
                correo_electronico: usuario.correo_electronico
            }

            const token = jwt.sign(usuarioParaToken, process.env.SECRET,{
                expiresIn: 60 * 60
            })//guardar en variable de entorno '123'
            
            res.status(200).send({ 
                token, 
                correo_electronico: usuario.correo_electronico, 
                id_usuario: usuario.id_usuario 
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Usuarios' });
            
        }
    }
}