import connection from "../../database.js"
/*
Este contiene al modelo de productos, el cual se encarga de interactuar con la base de datos
se instancia una conexion a la base de datos y se exporta la clase ProductosModelo que contiene los metodos
estaticos (pueden ser llamados sin instanciar la clase) cada metodo realiza una consulta a la base de datos y retorna el resultado
*/ 

export class ProductosModelo {
    static async getAll() {
        try {
            const [productos, tableInfo] = await connection.query('SELECT * FROM Productos where activo = 1')
            
            return productos
        } catch (error) {
            throw new Error('Error al obtener todas las ventas: ' + error.message);
        }
    }

    static async getById({id}) {
        try {
            const [producto, tableInfo] = await connection.query('SELECT * FROM Productos WHERE id_producto = ? AND activo = 1', [id])          
            return producto
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + error.message);
        }
    }

    static async create({input}) {
        try {
            const{
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen_url,
            } = input
            

            const result= await connection.query('INSERT INTO Productos (nombre, descripcion, precio, id_categoria, imagen_url) VALUES (?, ?, ?, ?, ?)'
            , [nombre, descripcion, precio, id_categoria, imagen_url])

            return result;
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    static async update({ id, input }) {
        try {
            const {
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen_url,
            } = input;
    
            const result = await connection.query(
                'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria= ?,imagen_url = ? WHERE id_producto = ? and activo = 1',
                [nombre, descripcion, precio, id_categoria,imagen_url, id]
            );
    
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    static async delete({id}) {
        try {
            const result = await connection.query('UPDATE Productos SET activo = 0 WHERE id_producto = ?', [id])
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}
