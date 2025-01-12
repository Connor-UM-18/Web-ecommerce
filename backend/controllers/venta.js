/*
Este controlador se encarga de manejar las peticiones de ventas. Por tanto aqui se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactue con la base de datos para
finalmente retornar una respuesta al cliente.
*/
import { SchemaVenta } from "../schemas/venta.js";

export class VentaController {
    constructor({ ventaModelo }) {
        this.ventaModelo = ventaModelo;
    }

    getAll = async (req, res) => {
        try {
            const ventas = await this.ventaModelo.getAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Ventas' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const venta = await this.ventaModelo.getById({ id });
            if (venta.length > 0) return res.json(venta);
            res.status(404).json({ error: 'Venta no encontrada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByUserId = async (req, res) => {
        const { id_usuario } = req.params;

        try {
            const ventas = await this.ventaModelo.getByUserId({ id_usuario });

            if (ventas.length > 0) {
                return res.json(ventas);
            }

            res.status(404).json({ error: 'Ventas no encontradas para el usuario especificado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEstado = async (req, res) => {
        const { id_estado } = req.params;
    
        try {
            const ventas = await this.ventaModelo.getByEstado({ id_estado });
    
            if (ventas.length > 0) {
                return res.json(ventas);
            }
    
            res.status(404).json({ error: 'Ventas no encontradas para el estado especificado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    create = async (req, res) => {
        const { error, value } = SchemaVenta.validarCreateVenta(req.body);
    
        if (error) return res.status(400).json({ error });
    
        const { id_usuario, monto, id_estado, fecha } = value;
    
        try {
            const result = await this.ventaModelo.create({ id_usuario, monto, id_estado, fecha });
    
            res.json({ message: 'Venta creada exitosamente', venta: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    update = async (req, res) => {
        const { id } = req.params;
        const { id_usuario, monto, fecha, id_estado } = req.body;
    
        const result = SchemaVenta.validarUpdateVenta(req.body);
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedVenta = await this.ventaModelo.update({ id, id_usuario, monto, fecha, id_estado });
            res.json({ message: 'Venta actualizada exitosamente', result: updatedVenta });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la venta: ' + error.message });
        }
    }
    

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.ventaModelo.delete({ id });
            res.json({ message: 'Venta eliminada exitosamente', result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    createVentaEcommerce = async (req, res) => {
        const { id_usuario, total, productos, es_apartado } = req.body;
    
        try {
            const result = await this.ventaModelo.createVentaEcommerce({ id_usuario, total, productos, es_apartado });
    
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    getByDate = async (req, res) => {
        const { mes, anio } = req.params;
        try {
            const ventas = await this.ventaModelo.getByDate({ mes, anio });
            
            if (ventas.length > 0) {
                return res.json(ventas);
            }
            res.status(404).json({ error: 'Ventas no encontradas para el mes y año especificados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

