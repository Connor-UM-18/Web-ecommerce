import bcrypt from 'bcrypt';
import { SchemaTrabajador } from "../schemas/trabajador.js";

export class TrabajadorController {
    constructor({ trabajadorModelo }) {
        this.trabajadorModelo = trabajadorModelo;
    }

    getAll = async (req, res) => {
        try {
            const trabajador = await this.trabajadorModelo.getAll();
            res.json(trabajador);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Trabajador' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getById({ id });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByUser = async (req, res) => {
        const { usuario } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByUser({ usuario });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEmail = async (req, res) => {
        const { email } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByEmail({ email });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByRol = async (req, res) => {
        const { rol } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByRol({ rol });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaTrabajador.validarCreateTrabajador(req.body);
        if (!result.success) return res.status(400).json(result);

        const { usuario, rol, password, nombre_completo, correo_electronico } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const nuevoTrabajador = await this.trabajadorModelo.create({ usuario, rol, password: hashedPassword, nombre_completo, correo_electronico });
            res.status(201).json(nuevoTrabajador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { usuario, rol, password, nombre_completo, correo_electronico } = req.body;
      
        const result = SchemaTrabajador.validarUpdateTrabajador({ usuario, rol, password, nombre_completo, correo_electronico });
        if (!result.success) return res.status(400).json(result);
      
        try {
          let hashedPassword = null; // Inicializar hashedPassword como null
      
          if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
          }
      
          const updatedTrabajador = await this.trabajadorModelo.update({ id, usuario, rol, password: hashedPassword, nombre_completo, correo_electronico });
          res.json(updatedTrabajador);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el trabajador: ' + error.message });
        }
    };
      

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedTrabajador = await this.trabajadorModelo.delete({ id });
            res.json(deletedTrabajador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
