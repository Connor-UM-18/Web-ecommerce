import connection from "../../database.js";
import { v4 as uuidv4 } from 'uuid';

export class VentaModelo {
    static async getAll() {
        try {
            const [venta, tableInfo] = await connection.query('SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas');
            return venta;
        } catch (error) {
            throw new Error('Error al obtener todas las ventas: ' + error.message);
        }
    }

    static async getById({ id }) {
        try {
            const [venta, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return venta;
        } catch (error) {
            throw new Error('Error al obtener la venta por ID: ' + error.message);
        }
    }

    static async getByUserId({ id_usuario }) {
        try {    
            const [ventas, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
    
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener ventas por ID de usuario: ' + error.message);
        }
    }

    static async getByEstado({ id_estado }) {
        try {
            const [ventas, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE id_estado = ?',
                [id_estado]
            );
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener ventas por estado: ' + error.message);
        }
    }

    static async create({ id_usuario, monto, id_estado, fecha }) {
        const query = `
            INSERT INTO Ventas (id_venta, id_usuario, monto, id_estado, fecha) 
            VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, ?, ?)
        `;
    
        try {
            const [result] = await connection.query(query, [id_usuario, monto, id_estado, fecha]);
            return result;
        } catch (error) {
            throw new Error('Error al crear la venta: ' + error.message);
        }
    }    

    static async update({ id, id_usuario, monto, fecha, id_estado }) {
        const fields = [];
        const values = [];

        if (id_usuario) {
            fields.push('id_usuario = UUID_TO_BIN(?)');
            values.push(id_usuario);
        }

        if (monto) {
            fields.push('monto = ?');
            values.push(monto);
        }

        if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
        }

        if (id_estado !== undefined) {
            fields.push('id_estado = ?');
            values.push(id_estado);
        }

        values.push(id);

        const query = `UPDATE Ventas SET ${fields.join(', ')} WHERE id_venta = UUID_TO_BIN(?)`;

        try {
            const [result] = await connection.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la venta: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }

    static async createVentaEcommerce({ id_usuario, total, productos, es_apartado }) {
        try {
            await connection.beginTransaction();
    
            // Generar el UUID para la venta
            const id_venta = uuidv4();
            const id_estado = es_apartado ? 1 : 2; // 1: apartada, 2: pagada
    
            // Crear la venta o apartado
            await connection.query(
                `INSERT INTO Ventas (id_venta, id_usuario, monto, id_estado) 
                 VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)`, 
                [id_venta, id_usuario, total, id_estado]
            );
    
            // Verificar el stock y actualizar el inventario
            for (const producto of productos) {
                const { id_producto, id_talla, cantidad } = producto;
    
                // Verificar el stock disponible
                const [stockResult] = await connection.query(
                    'SELECT stock FROM Inventario WHERE id_producto = ? AND id_talla = ?',
                    [id_producto, id_talla]
                );
    
                const stockDisponible = stockResult[0].stock;
    
                if (es_apartado) {
                    // Calcular el 20% del stock disponible
                    const maxApartar = Math.floor(stockDisponible * 0.2);
                    if (cantidad > maxApartar) {
                        throw new Error(`Stock insuficiente para apartar el producto ID ${id_producto} en talla ${id_talla}. Solo se puede apartar hasta el 20% del stock disponible.`);
                    }
                } else {
                    if (stockDisponible < cantidad) {
                        throw new Error(`Stock insuficiente para el producto ID ${id_producto} en talla ${id_talla}`);
                    }
                }
    
                // Obtener el precio del producto desde la tabla Productos
                const [productoResult] = await connection.query(
                    'SELECT precio FROM Productos WHERE id_producto = ?',
                    [id_producto]
                );
    
                const precio_unitario = productoResult[0].precio;
    
                // Insertar detalle de venta
                await connection.query(
                    'INSERT INTO Detalle_venta (id_venta, id_producto, precio_unitario, cantidad, id_talla) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)',
                    [id_venta, id_producto, precio_unitario, cantidad, id_talla]
                );
    
                // Actualizar inventario
                await connection.query(
                    'UPDATE Inventario SET stock = stock - ? WHERE id_producto = ? AND id_talla = ?',
                    [cantidad, id_producto, id_talla]
                );
            }
    
            if (es_apartado) {
                // Crear el pedido apartado
                const [resultApartado] = await connection.query(
                    'INSERT INTO Pedido_apartado (id_usuario, estado) VALUES (UUID_TO_BIN(?), TRUE)',
                    [id_usuario]
                );
    
                const id_pedido_apartado = resultApartado.insertId;
    
                // Insertar los detalles del pedido apartado
                for (const producto of productos) {
                    const { id_producto, id_talla, cantidad } = producto;
    
                    await connection.query(
                        'INSERT INTO Detalle_pedido_apartado (id_pedido_apartado, id_producto, id_talla, cantidad) VALUES (?, ?, ?, ?)',
                        [id_pedido_apartado, id_producto, id_talla, cantidad]
                    );
                }
            }
    
            await connection.commit();
            return { message: 'Venta o apartado creado exitosamente', id_venta };
        } catch (error) {
            await connection.rollback();
            throw new Error('Error al crear la venta o apartado con detalles: ' + error.message);
        }
    }
    

    static async getByDate({ mes, anio }) {
        try {
            const [ventas, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, id_estado, fecha FROM Ventas WHERE MONTH(fecha) = ? AND YEAR(fecha) = ? AND id_estado = 2',
                [mes, anio]
            );
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener ventas por fecha: ' + error.message);
        }
    }
    
    
}
