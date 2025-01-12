import connection from "../../database.js"

export class ProductosTallasInventarioModelo {
    static async getAll() {
        try {
            const [results, tableInfo] = await connection.query(`
                SELECT 
                    Productos.id_producto, 
                    Productos.nombre, 
                    Productos.descripcion,
                    Productos.precio, 
                    Categorias.nombre_categoria, 
                    Productos.imagen_url, 
                    Productos.fecha_agregada,
                    Tallas.nombre_talla, 
                    Inventario.stock 
                FROM Productos
                JOIN Categorias ON Productos.id_categoria = Categorias.id_Categoria
                JOIN Inventario ON Productos.id_producto = Inventario.id_producto
                JOIN Tallas ON Inventario.id_talla = Tallas.id_talla;
            `);

            if(results.length == 0) return [];
    
            const productosMap = results.reduce((acc, row) => {
                const { id_producto, nombre, precio, descripcion, nombre_categoria, imagen_url, fecha_agregada, nombre_talla, stock } = row;
    
                if (!acc[id_producto]) {
                    acc[id_producto] = {
                        id_producto,
                        nombre,
                        precio,
                        descripcion,
                        nombre_categoria,
                        imagen_url,
                        fecha_agregada,
                        tallas: []
                    };
                }
    
                acc[id_producto].tallas.push({
                    nombre_talla,
                    stock
                });
    
                return acc;
            }, {});
    
            const productosConTallas = Object.values(productosMap);
    
            return productosConTallas;
    
        } catch (error) {
            throw new Error('Error al obtener todos los productos: ' + error.message);
        }
    }

    static async getById({id}) {
        try {
            const [results, tableInfo] = await connection.query(`
                SELECT 
                    Productos.id_producto, 
                    Productos.nombre, 
                    Productos.descripcion,
                    Productos.precio, 
                    Categorias.nombre_categoria, 
                    Productos.imagen_url, 
                    Productos.fecha_agregada,
                    Tallas.nombre_talla, 
                    Inventario.stock 
                FROM Productos
                JOIN Categorias ON Productos.id_categoria = Categorias.id_Categoria
                JOIN Inventario ON Productos.id_producto = Inventario.id_producto
                JOIN Tallas ON Inventario.id_talla = Tallas.id_talla
                WHERE Productos.id_producto = ?;
            `, [id]);
    
            if (results.length === 0) {
                return null; // Retornar null si no se encuentra el producto
            }
    
            const producto = {
                id_producto: results[0].id_producto,
                nombre: results[0].nombre,
                precio: results[0].precio,
                descripcion: results[0].descripcion,
                nombre_categoria: results[0].nombre_categoria,
                imagen_url: results[0].imagen_url,
                fecha_agregada: results[0].fecha_agregada,
                tallas: results.map(row => ({
                    nombre_talla: row.nombre_talla,
                    stock: row.stock
                }))
            };
    
            return producto;
    
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
        }
    }
    

    static async getByNombre({ nombre }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.nombre LIKE ? AND i.stock > 0;

            `, [`%${nombre}%`]);
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por nombre: ' + error.message);
        }
    }

    static async getByNombreTalla({ nombre_talla }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE t.nombre_talla = ? AND i.stock > 0
            `, [nombre_talla]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por nombre de talla: ' + error.message);
        }
    }

    static async getByPrecio({ precio }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.precio <= ? AND i.stock > 0
            `, [precio]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por precio: ' + error.message);
        }
    }

    static async getByIdCategoria({ id_categoria }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.id_categoria = ? AND i.stock > 0
            `, [id_categoria]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por ID de categoría: ' + error.message);
        }
    }

    //metodo para obtener 4 productos con tendencia, ahorita no funciona, me devuelve null
    static async getByTendence() {
        console.log("Hola");
        try {
             
            // Primer consulta: obtener los 4 productos más vendidos
            const [productos] = await connection.query(`
                SELECT 
                    dv.id_producto, 
                    SUM(dv.cantidad) as total_vendidos
                FROM Detalle_venta dv
                GROUP BY dv.id_producto
                ORDER BY total_vendidos DESC
                LIMIT 4
            `);
              
            // Verificar si la consulta devuelve resultados
            if (productos.length === 0) {
                console.log("No se encontraron productos más vendidos.");
                return [];
            }
            
            // Obtener los IDs de los productos
            const ids_productos = productos.map(p => p.id_producto);
            console.log("IDs de productos más vendidos:", ids_productos);
    
            // Segunda consulta: obtener detalles de los productos más vendidos
            const [result] = await connection.query(`
                SELECT 
                    Productos.id_producto, 
                    Productos.nombre, 
                    Productos.descripcion, 
                    Productos.precio,
                    Categorias.nombre_categoria, 
                    Productos.imagen_url, 
                    Productos.fecha_agregada,
                    Tallas.nombre_talla, 
                    Inventario.stock 
                FROM Productos
                JOIN Inventario ON Productos.id_producto = Inventario.id_producto
                JOIN Tallas ON Inventario.id_talla = Tallas.id_talla
                JOIN Categorias ON Productos.id_categoria = Categorias.id_categoria
                WHERE Productos.id_producto IN (?)
                ORDER BY FIELD(Productos.id_producto, ${ids_productos.join(',')})
            `, [ids_productos]);
    
            // Mapear los resultados para estructurarlos correctamente
            const productosMap = result.reduce((acc, item) => {
                if (!acc[item.id_producto]) {
                    acc[item.id_producto] = {
                        id_producto: item.id_producto,
                        nombre: item.nombre,
                        descripcion: item.descripcion,
                        precio: item.precio,
                        nombre_categoria: item.nombre_categoria,
                        imagen_url: item.imagen_url,
                        fecha_agregada: item.fecha_agregada,
                        tallas: []
                    };
                }
    
                acc[item.id_producto].tallas.push({
                    nombre_talla: item.nombre_talla,
                    stock: item.stock
                });
    
                return acc;
            }, {});
    
            // Convertir el mapa de productos a un array
            const productosConTallas = Object.values(productosMap);
            console.log("Productos con tallas:", productosConTallas);
    
            return productosConTallas;
        } catch (error) {
            console.error('Error in getByTendence:', error);
            throw error;
        }
    }
}
