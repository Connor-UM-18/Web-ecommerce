import connection from "../../database.js"

export class DetalleVentaModelo {
    static async getAll() {
        try {
            const [detalleVentas] = await connection.query('SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta, Productos.id_producto,nombre, precio_unitario, cantidad,Tallas.id_talla,nombre_talla FROM Detalle_venta,Tallas,Productos where Detalle_venta.id_talla = Tallas.id_talla and Productos.id_producto = Detalle_venta.id_producto;');
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener todos los detalles de venta: ' + error.message);
        }
    }

    static async getVentaDetalles(id_venta) {
        try {
            // Verificar si la venta es apartada y han pasado más de 24 horas
            const [ventaResult] = await connection.query(
                `SELECT id_estado, TIMESTAMPDIFF(HOUR, fecha, NOW()) AS horas_transcurridas 
                 FROM Ventas 
                 WHERE BIN_TO_UUID(id_venta) = ?`,
                [id_venta]
            );

            const venta = ventaResult[0];
            if (!venta) {
                throw new Error(`Venta con ID ${id_venta} no encontrada`);
            }

            // Si es un apartado y han pasado más de 24 horas, cancelar la venta
            if (venta.id_estado === 1 && venta.horas_transcurridas > 48) { // 1: apartada
                await connection.query(
                    `UPDATE Ventas SET id_estado = 3 WHERE BIN_TO_UUID(id_venta) = ?`, // 3: cancelada
                    [id_venta]
                );
            }

            // Obtener los detalles de la venta
            const [detalles] = await connection.query(
                `SELECT 
                    BIN_TO_UUID(v.id_venta) as id_venta,
                    v.monto AS total_venta,
                    v.fecha,
                    v.fecha_entrega,
                    ev.descripcion AS estado,
                    dv.id_producto,
                    p.nombre AS nombre_producto,
                    p.imagen_url,
                    t.id_talla,
                    t.nombre_talla,
                    dv.cantidad,
                    dv.precio_unitario
                 FROM 
                    Ventas v
                 JOIN 
                    Detalle_venta dv ON v.id_venta = UUID_TO_BIN(?)
                 JOIN 
                    Productos p ON dv.id_producto = p.id_producto
                 JOIN 
                    Tallas t ON dv.id_talla = t.id_talla
                 JOIN 
                    estados ev ON v.id_estado = ev.id_estado`,
                [id_venta]
            );

            if (detalles.length === 0) {
                throw new Error(`No se encontraron detalles para la venta con ID getVentaDetalles ${id_venta}`);
            }

            // Reestructurar la respuesta agrupando los productos
            const productosMap = new Map();
            detalles.forEach(detalle => {
                const key = `${detalle.id_producto}-${detalle.id_talla}`;
                if (!productosMap.has(key)) {
                    productosMap.set(key, {
                        id_producto: detalle.id_producto,
                        nombre_producto: detalle.nombre_producto,
                        id_talla: detalle.id_talla,
                        nombre_talla: detalle.nombre_talla,
                        cantidad: detalle.cantidad,
                        precio_unitario: detalle.precio_unitario,
                        total_producto: (detalle.cantidad * detalle.precio_unitario).toFixed(2),
                        imagen_url: detalle.imagen_url
                    });
                } else {
                    const producto = productosMap.get(key);
                    producto.cantidad += detalle.cantidad;
                    producto.total_producto = (producto.cantidad * producto.precio_unitario).toFixed(2);
                }
            });

            const ventaInfo = {
                id_venta: detalles[0].id_venta,
                total_venta: detalles[0].total_venta,
                fecha: detalles[0].fecha,
                fecha_entrega: detalles[0].fecha_entrega,
                estado: detalles[0].estado,
                productos: Array.from(productosMap.values())
            };

            return ventaInfo;
        } catch (error) {
            throw new Error('Error al obtener los detalles de la venta: ' + error.message);
        }
    }

    static async getByIdDetalleVenta(id_detalle_venta) {
        try {
            const [detalleVenta] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_detalle_venta = ?',
                [id_detalle_venta]
            );
            return detalleVenta;
        } catch (error) {
            throw new Error('Error al obtener el detalle de venta por ID: ' + error.message);
        }
    }

    static async getByIdVenta({ id_venta }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_venta = UUID_TO_BIN(?)',
                [id_venta]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de venta: ' + error.message);
        }
    }

    static async getByProducto({ id_producto }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_producto = ?',
                [id_producto]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de producto: ' + error.message);
        }
    }

    static async getByIdTalla({ id_talla }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_talla = ?',
                [id_talla]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de talla: ' + error.message);
        }
    }

    static async create({ id_venta, id_producto, precio_unitario, cantidad, id_talla }) {
        const query = `
            INSERT INTO Detalle_venta (id_venta, id_producto, precio_unitario, cantidad, id_talla) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [id_venta, id_producto, precio_unitario, cantidad, id_talla]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el detalle de venta: ' + error.message);
        }
    }


    static async update({ id_detalle_venta, input }) {
        const fields = Object.keys(input);
        const values = Object.values(input);

        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const query = `
            UPDATE Detalle_venta 
            SET ${setClause} 
            WHERE id_detalle_venta = ?
        `;

        try {
            const [result] = await connection.query(query, [...values, id_detalle_venta]);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el detalle de venta: ' + error.message);
        }
    }

    static async delete({ id_detalle_venta }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Detalle_venta WHERE id_detalle_venta = ?',
                [id_detalle_venta]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el detalle de venta: ' + error.message);
        }
    }

    static async bestSellers({ mes, anio }) {
        try {
            const [bestSellers] = await connection.query(
                `SELECT 
                    Productos.nombre, 
                    SUM(Detalle_venta.cantidad) AS total_vendido, 
                    Tallas.nombre_talla, 
                    Productos.imagen_url
                 FROM 
                    Detalle_venta
                    JOIN Tallas ON Detalle_venta.id_talla = Tallas.id_talla
                    JOIN Productos ON Productos.id_producto = Detalle_venta.id_producto
                    JOIN Ventas ON Detalle_venta.id_venta = Ventas.id_venta
                 WHERE 
                    YEAR(Ventas.fecha) = ? AND MONTH(Ventas.fecha) = ?
                 GROUP BY 
                    Productos.id_producto, Productos.nombre, Tallas.nombre_talla
                 ORDER BY 
                    total_vendido DESC
                 LIMIT 5;`,
                [anio, mes]
            );
            return bestSellers;
        } catch (error) {
            throw new Error('Error al obtener los productos más vendidos: ' + error.message);
        }
    }

    static async bestCategorias({mes, anio}){
        try{
            const [bestCategorias] = await connection.query(`SELECT 
                c.nombre_categoria,
                COUNT(dv.id_detalle_venta) AS total_ventas,
                SUM(dv.cantidad * dv.precio_unitario) AS total_monto_vendido
            FROM 
                Ventas v
                INNER JOIN Detalle_venta dv ON v.id_venta = dv.id_venta
                INNER JOIN Productos p ON dv.id_producto = p.id_producto
                INNER JOIN Categorias c ON p.id_categoria = c.id_categoria
            WHERE 
                YEAR(v.fecha) = ? AND MONTH(v.fecha) = ?
            GROUP BY 
                c.nombre_categoria
            ORDER BY 
                total_monto_vendido DESC;`
        ,[anio, mes]);
            return bestCategorias;
        }catch (error) {
            throw new Error('Error al obtener las categorias más vendidas: ' + error.message);
        }   
    }
}

