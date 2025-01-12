/*
Este controlador se encarga de manejar las peticiones de productos. Por tanto aqui se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactue con la base de datos para
finalmente retornar una respuesta al cliente.
*/


import { SchemaProducto } from "../schemas/productos.js"

export class ProductosController{

    constructor({productosModelo}){
        this.productosModelo = productosModelo
    }

    getAll = async (req, res)=>{

        try {
            const productos = await this.productosModelo.getAll()
            res.json(productos)
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Productos' });
        }
    }

    getById = async (req, res)=>{
        const {id} = req.params
        try {
            const producto = await this.productosModelo.getById({id})
            if(producto) return res.json(producto)
                res.status(404).json({error: 'Producto no encontrado'})
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }

    create = async (req, res)=>{
        const result = SchemaProducto.validarCreateProducto(req.body) 
        
        if(!result.success) 
            return res.status(400).json(result)
        try {
            const newProducto = await this.productosModelo.create({input: req.body})
            res.status(201).json(newProducto)
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
    
    update = async (req, res) => {
        const { id } = req.params;

        // Aquí puedes agregar la validación para verificar si el producto con la ID proporcionada existe en la base de datos
        // Por ejemplo:
        // const productoExistente = await this.productosModelo.getById({ id });
        // if (!productoExistente) return res.status(404).json({ error: 'Producto no encontrado' });

        try {
            const result = SchemaProducto.validarUpdateProducto(req.body);
            if (!result.success) return res.status(400).json(result);

            const updatedProducto = await this.productosModelo.update({ id, input: req.body });
            res.json(updatedProducto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res)=>{
        const {id} = req.params
        try {
            const deletedProducto = await this.productosModelo.delete({id})
            res.json(deletedProducto)
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }

}





