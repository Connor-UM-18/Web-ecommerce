export class ProductosTallasInventarioController {
    constructor({ productosTallasInventarioModelo }) {
        this.productosTallasInventarioModelo = productosTallasInventarioModelo;
    }

    getAll = async (req, res) => {
        try {
            const result = await this.productosTallasInventarioModelo.getAll();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.productosTallasInventarioModelo.getById({ id });

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }

    getByNombre = async (req, res) => {
        const { nombre } = req.params;
        try {
            const result = await this.productosTallasInventarioModelo.getByNombre({ nombre });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }

    getByNombreTalla = async (req, res) => {
        const { nombre_talla } = req.params;
        
        try {
            const result = await this.productosTallasInventarioModelo.getByNombreTalla({ nombre_talla });
            res.json(result);
        } catch (error) {
            res.status (500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }

    getByPrecio = async (req, res) => {
        const { precio } = req.params;
        try {
            const result = await this.productosTallasInventarioModelo.getByPrecio({ precio });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }

    getByIdCategoria = async (req, res) => {
        const { id_categoria } = req.params;
        try {
            const result = await this.productosTallasInventarioModelo.getByIdCategoria({ id_categoria });
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }
    //getby tendence para obtener 4 productos tendencia, al parecer no funciona, devuelve null
    getByTendence = async (req, res) => {
        console.log('entro a tendencia');
        try {
            const result = await this.productosTallasInventarioModelo.getByTendence();
            
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos' });
        }
    }
}
