import bcrypt from 'bcrypt';
import { SchemaUsuarios } from "../schemas/usuarios.js";

export class UsuariosController {
    constructor({ usuariosModelo }) {
        this.usuariosModelo = usuariosModelo;
    }

    getAll = async (req, res) => {
        try {
            const usuarios = await this.usuariosModelo.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Usuarios' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await this.usuariosModelo.getById({ id_usuario: id });
            if (usuario.length > 0) return res.json(usuario);
            res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEmail = async (req, res) => {
        const { correo_electronico } = req.params;
        try {
            const usuario = await this.usuariosModelo.getByEmail({ correo_electronico });
            if (usuario) return res.json(usuario);
            res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
    const result = SchemaUsuarios.validarCrearUsuario(req.body);
    if (!result.success) return res.status(400).json(result);

    const { nombre, apellido, correo_electronico, pass, telefono } = req.body;

    try {
        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(pass, 10);

        const nuevoUsuario = await this.usuariosModelo.create({ 
            nombre, 
            apellido, 
            correo_electronico, 
            pass: hashedPassword, 
            telefono 
        });

        // No devolver la contraseña en la respuesta
        const { id_usuario } = nuevoUsuario;
        delete nuevoUsuario.pass;

        res.status(201).json({ id_usuario, nombre, apellido, correo_electronico, telefono, message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

    update = async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, correo_electronico, pass, telefono } = req.body;

        // Validar los campos que se van a actualizar
        const result = SchemaUsuarios.validarActualizarUsuario({ nombre, apellido, correo_electronico, telefono });
        if (!result.success) return res.status(400).json(result);

        try {
            // Encriptar la nueva contraseña si se proporciona
            let hashedPassword = pass;
            if (pass) {
                hashedPassword = await bcrypt.hash(pass, 10);
            }

            const updatedUsuario = await this.usuariosModelo.update({ 
                id_usuario: id, 
                nombre, 
                apellido, 
                correo_electronico, 
                pass: hashedPassword, 
                telefono 
            });

            // No devolver la contraseña en la respuesta
            delete updatedUsuario.pass;

            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUsuario = await this.usuariosModelo.delete({ id_usuario: id });
            res.json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

