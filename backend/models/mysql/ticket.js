import connection from "../../database.js"
/*
Este contiene al modelo de ventas, el cual se encarga de interactuar con la base de datos
se instancia una conexion a la base de datos y se exporta la clase VentaModelo que contiene los metodos
estaticos (pueden ser llamados sin instanciar la clase) cada metodo realiza una consulta a la base de datos y retorna el resultado
*/

export class TicketModelo {
   
    static async getInfo({ id }) {
        try {
            const [infoProductos, tableInfo] = await connection.query(
                'SELECT id_detalle_venta,precio_unitario,cantidad,nombre_talla,nombre,precio,Productos.id_producto FROM Detalle_venta JOIN Tallas JOIN Productos WHERE id_venta = uuid_to_bin(?) AND Detalle_venta.id_talla = Tallas.id_talla AND Detalle_venta.id_producto = Productos.id_producto;',
                [id]
            );
            const [infoVenta, tableInfo2] = await connection.query(
                'SELECT bin_to_uuid(id_venta) id_venta,monto, fecha FROM Ventas WHERE id_venta = uuid_to_bin(?)',
                [id]
            );
            
            return {
                infoVenta: infoVenta[0],
                infoProductos,
            };
        } catch (error) {
            throw new Error('Error al obtener la venta-detalle por ID: ' + error.message);
        }
    }

}